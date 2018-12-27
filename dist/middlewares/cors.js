"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEV = _config.default.get('dev');

const corsHandlerMiddleware = () => {
  return async (ctx, next) => {
    if (DEV) {
      ctx.set('access-control-allow-origin', '*');
      ctx.set('access-control-allow-headers', ['Content-Type', 'Authorization']);
    }

    await next();
  };
};

var _default = corsHandlerMiddleware;
exports.default = _default;