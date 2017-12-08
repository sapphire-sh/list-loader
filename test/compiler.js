import path from 'path';
import vm from 'vm';

import webpack from 'webpack';

import config from './webpack.config';

class Compiler {
	run(entry, options, callback) {
		let self = this;

		if(entry === undefined || (typeof entry !== 'string')) {
			throw new Error('entry file is not valid');
		}

		if((typeof options === 'function') && (callback === undefined)) {
			callback = options;
			options = {};
		}

		if(options !== undefined && typeof options !== 'object') {
			throw new Error('options are not valid');
		}

		if(callback === undefined || (typeof callback !== 'function')) {
			throw new Error('callback function is not valid');
		}

		const compiler = webpack({
			...config,
			'entry': path.resolve(__dirname, 'cases', entry),
			'module': {
				'rules': [
					{
						'test': /\.txt$/,
						'use': [
							{
								'loader': path.resolve(__dirname, '../src'),
								'options': options,
							},
						],
					},
				],
			},
		});

		compiler.run((err, stats) => {
			if(err) {
				callback(err);
				return;
			}

			const info = stats.toJson();

			if(stats.hasErrors()) {
				callback(info.errors);
				return;
			}

			if(stats.hasWarnings()) {
				callback(info.warnings);
				return;
			}

			const sandbox = {
				'module': {},
			};

			try {
				vm.runInNewContext(info.modules[1].source, sandbox);
			}
			catch(err) {
				callback(err);
				return;
			}
			callback(null, sandbox.module.exports);
		});
	}
}

export default Compiler;
