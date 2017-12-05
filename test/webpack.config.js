let path = require('path');

module.exports = {
	'entry': path.resolve(__dirname, 'entry.js'),
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
};
