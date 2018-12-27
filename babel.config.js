const presets = [
	'@babel/flow',
	[
		'@babel/preset-env',
		{
			targets: {
				node: 'current',
			},
		},
	],
];

module.exports = { presets };
