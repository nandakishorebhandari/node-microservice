import _ from 'lodash';
import config from 'config';
import AppError from '../errors/AppError.js';
import logger from '../lib/logger';
const appLogger = logger(config.get('logs.app'));
const errorHandlerMiddleware = () => {
	return async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			let error = err;
			if (error instanceof AppError) {
				error = error.toJSON();
			}

			if (error && error['__appError']) {
				ctx.status = error['__httpCode'] || 500;
				ctx.body = _.omit(error, ['__httpCode', '__appError']);
			} else {
				ctx.status = 500;
				ctx.body = {
					error: true,
					message: 'Unknown Internal Server Error',
				};
			}
			const errorDetails = {
				status: ctx.status,
				error: err.message,
				stack: err.stack,
				err,
			};
			const url = typeof ctx.request !== 'undefined' ? ctx.request.url : '';
			appLogger.error(url, errorDetails);
		}
	};
};

export default errorHandlerMiddleware;
