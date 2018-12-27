import config from 'config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import registerRoutes from './registerRoutes';
import { requestId, responseTime, systemError, cors } from './middlewares';
import logger from './lib/logger';
const appLogger = logger(config.get('logs.app'));
const PORT_INTERNAL = config.get('api.ports.internal');
const PORT_EXTERNAL = config.get('api.ports.external');

const configureRoutes = (routes, port) => {
	const app = new Koa();

	// Use BodyParser
	app.use(
		bodyParser({
			enableTypes: ['json', 'form'],
			formLimit: '10mb',
			jsonLimit: '10mb',
		})
	);
	// ToDo: Add Loger

	// ToDO: Add HTTP request log

	// HTTP header security
	app.use(helmet());

	// Set RequestId
	app.use(requestId());

	// Set ResponseTime
	app.use(responseTime());

	// Set CORS
	app.use(cors());

	// Error Handler
	app.use(systemError());

	// Register all routes
	const router = registerRoutes(routes);

	app.use(router.routes());
	app.use(router.allowedMethods());

	app.server = app.listen(port, () => {
		appLogger.info(`API server listening on port ${port}`);
	});

	return app;
};

const startService = (externalRoutes, internalRoutes) => {
	return [
		configureRoutes(externalRoutes, PORT_EXTERNAL),
		configureRoutes(internalRoutes, PORT_INTERNAL),
	];
};

export default startService;
