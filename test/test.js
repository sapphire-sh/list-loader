import fs from 'fs';
import path from 'path';

import chai from 'chai';

const expect = chai.expect;

import config from './webpack.config';
import Compiler from './compiler';

import loader from '../src';

describe('list-loader', () => {
	const compiler = new Compiler();

	it('loader', (done) => {
		const result = loader('1\n2\n3\n4');

		expect(result).to.equal('module.exports = ["1","2","3","4"]');

		done();
	});

	it('default', (done) => {
		compiler.run('default', undefined, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('newline', (done) => {
		compiler.run('newline', {
			'delimiter': '\n',
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('tab', (done) => {
		compiler.run('tab', {
			'delimiter': '\t',
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('number', (done) => {
		compiler.run('number', {
			'delimiter': 0,
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('alphabet', (done) => {
		compiler.run('alphabet', {
			'delimiter': 'c',
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'',
				'',
				'd',
			]);

			done();
		});
	});

	it('string', (done) => {
		compiler.run('string', {
			'delimiter': 'str',
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('unicode', (done) => {
		compiler.run('unicode', {
			'delimiter': '🤔',
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('regex', (done) => {
		compiler.run('regex', {
			'delimiter': /[0-9]/,
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('none', (done) => {
		compiler.run('none', {
			'delimiter': '',
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('filter', (done) => {
		compiler.run('filter', {
			'filter': true,
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
			]);

			done();
		});
	});

	it('trim', (done) => {
		compiler.run('trim', {
			'trim': false,
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				'a',
				'b',
				'c',
				'd',
				'',
			]);

			done();
		});
	});

	it('number_values', (done) => {
		compiler.run('number_values', {
			'number': true,
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				1,
				1,
				2,
				3,
				5,
			]);

			done();
		})
	});

	it('date', (done) => {
		compiler.run('date', {
			'date': true,
		}, (err, result) => {
			if(err) {
				console.log(err);
			}

			expect(result).to.deep.equal([
				new Date('2017-12-6'),
				new Date('2017-12-6T13:23:00+09:00'),
			]);

			done();
		});
	});

	after((done) => {
		const bundle = path.resolve(config.output.path, config.output.filename);
		fs.unlink(bundle, (err) => {
			if(err) {
				console.log(err);
			}
			fs.rmdir(config.output.path, (err) => {
				if(err) {
					console.log(err);
				}
				done();
			});
		});
	});
});
