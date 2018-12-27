"use strict";

var _service = _interopRequireDefault(require("./service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Nanda
 * @description This service provides facilities for authentication
 * 
 */
async function createAccount(ctx) {
  const response = {
    name: 'hiii',
    token: ctx.session
  };
  return response;
}

const exampleMiddleware = () => {
  return async function exampleMiddleware2(ctx, next) {
    const session = {
      token: 'dasdasd'
    };
    ctx.session = session;
    await next();
  };
};

const internalApi = [{
  method: 'GET',
  path: '/test',
  handler: createAccount
}];
const externalApi = [
/**
 * Authentication and Authorization
 */
// Authentication
{
  method: 'GET',
  path: '/test',
  handler: createAccount,
  middleware: exampleMiddleware()
}];
(0, _service.default)(externalApi, internalApi);