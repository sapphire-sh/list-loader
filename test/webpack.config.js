let path = require('path');

module.exports = {
	'output': {
		'path': path.resolve(__dirname, 'dist'),
		'filename': 'bundle.js',
	},
	'target': 'node',
	'resolveLoader': {
		'modules': [
			path.resolve(__dirname, '../node_modules'),
		],
	},
	'mode': 'production',
};
