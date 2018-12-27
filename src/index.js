/**
 * @author Nanda
 * @description This service provides facilities for authentication
 * @flow
 */
import svc from './service';

async function createAccount(ctx): Promise<*> {
	const response = { name: 'hiii', token: ctx.session };

	return response;
}
const exampleMiddleware = () => {
	return async function exampleMiddleware2(ctx, next: Function) {
		const session = { token: 'dasdasd' };
		ctx.session = session;

		await next();
	};
};
const internalApi = [
	{
		method: 'GET',
		path: '/test',
		handler: createAccount,
	},
];
const externalApi = [
	/**
	 * Authentication and Authorization
	 */
	// Authentication
	{
		method: 'GET',
		path: '/test',
		handler: createAccount,
		middleware: exampleMiddleware(),
	},
];

svc(externalApi, internalApi);
