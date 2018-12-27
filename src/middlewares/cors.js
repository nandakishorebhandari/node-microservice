import config from 'config';
const DEV = config.get('dev');
const corsHandlerMiddleware = () => {
	return async (ctx, next) => {
		if (DEV) {
			ctx.set('access-control-allow-origin', '*');
			ctx.set('access-control-allow-headers', [
				'Content-Type',
				'Authorization',
			]);
		}
		await next();
	};
};

export default corsHandlerMiddleware;
