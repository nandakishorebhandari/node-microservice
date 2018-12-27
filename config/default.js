const config = {
	api: {
		ports: {
			external: 30021,
			internal: 30011,
		},
	},
	logs: {
		app: { Console: { timestamp: true, colorize: true, level: 'info' } },
		http: { Console: { timestamp: true, colorize: true } },
	},
	dev: true,
};
module.exports = config;
