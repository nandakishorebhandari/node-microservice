"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("config"));

var _koa = _interopRequireDefault(require("koa"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaHelmet = _interopRequireDefault(require("koa-helmet"));

var _registerRoutes = _interopRequireDefault(require("./registerRoutes"));

var _middlewares = require("./middlewares");

var _logger = _interopRequireDefault(require("./lib/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appLogger = (0, _logger.default)(_config.default.get('logs.app'));

const PORT_INTERNAL = _config.default.get('api.ports.internal');

const PORT_EXTERNAL = _config.default.get('api.ports.external');

const configureRoutes = (routes, port) => {
  const app = new _koa.default(); // Use BodyParser

  app.use((0, _koaBodyparser.default)({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })); // ToDo: Add Loger
  // ToDO: Add HTTP request log
  // HTTP header security

  app.use((0, _koaHelmet.default)()); // Set RequestId

  app.use((0, _middlewares.requestId)()); // Set ResponseTime

  app.use((0, _middlewares.responseTime)()); // Set CORS

  app.use((0, _middlewares.cors)()); // Error Handler

  app.use((0, _middlewares.systemError)()); // Register all routes

  const router = (0, _registerRoutes.default)(routes);
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.server = app.listen(port, () => {
    appLogger.info(`API server listening on port ${port}`);
  });
  return app;
};

const startService = (externalRoutes, internalRoutes) => {
  return [configureRoutes(externalRoutes, PORT_EXTERNAL), configureRoutes(internalRoutes, PORT_INTERNAL)];
};

var _default = startService;
exports.default = _default;