module.exports = {
	parser: 'babel-eslint',
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:security/recommended',
		// 'plugin:node/recommended',
		'prettier',
		'plugin:flowtype/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['prettier', 'flowtype', 'security'],
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'space-before-blocks': ['error', 'always'],
	},
};
