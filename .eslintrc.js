
module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		babelOptions: {
			configFile: './babel.config.json',
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: ['eslint:recommended', 'google'],
	rules: {
		'no-trailing-spaces': 0,
		'no-tabs': 0,
		'no-mixed-spaces-and-tabs': 0,
		'require-jsdoc': 0,
	},
}
;