"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _config = _interopRequireDefault(require("config"));

var _AppError = _interopRequireDefault(require("../errors/AppError.js"));

var _logger = _interopRequireDefault(require("../lib/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appLogger = (0, _logger.default)(_config.default.get('logs.app'));

const errorHandlerMiddleware = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      let error = err;

      if (error instanceof _AppError.default) {
        error = error.toJSON();
      }

      if (error && error['__appError']) {
        ctx.status = error['__httpCode'] || 500;
        ctx.body = _lodash.default.omit(error, ['__httpCode', '__appError']);
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Unknown Internal Server Error'
        };
      }

      const errorDetails = {
        status: ctx.status,
        error: err.message,
        stack: err.stack,
        err
      };
      const url = typeof ctx.request !== 'undefined' ? ctx.request.url : '';
      appLogger.error(url, errorDetails);
    }
  };
};

var _default = errorHandlerMiddleware;
exports.default = _default;