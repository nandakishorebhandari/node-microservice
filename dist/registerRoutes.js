"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerRoute = (route, router) => {
  const handler = route.handler;
  const args = [route.path];

  if (route.middleware) {
    if (Array.isArray(route.middleware)) {
      Array.prototype.push.apply(args, route.middleware);
    } else if (typeof route.middleware === 'function') {
      args.push(route.middleware);
    }
  }

  args.push(async ctx => {
    const data = await handler(ctx);

    if (typeof data === 'object' && data !== null && data.__override === true) {
      ctx.body = _lodash.default.omit(data, '__override');
    } else {
      ctx.body = {
        error: false,
        data
      };
    }
  });

  switch (route.method) {
    case 'GET':
      router.get.apply(router, args);
      break;

    case 'POST':
      router.post.apply(router, args);
      break;

    case 'PUT':
      router.put.apply(router, args);
      break;

    case 'DELETE':
      router.delete.apply(router, args);
      break;

    case 'PATCH':
      router.patch.apply(router, args);
      break;
  }
};

const registerRoutes = routes => {
  const router = new _koaRouter.default();

  _lodash.default.each(routes, route => registerRoute(route, router));

  return router;
};

var _default = registerRoutes;
exports.default = _default;