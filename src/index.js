import loaderUtils from 'loader-utils';

function fillDefaultOptions(options) {
	if(options.delimiter === undefined) {
		options.delimiter = '\n';
	}
}

function generateModule(options, list) {
	let data;
	if(options.number === true) {
		data = `[${list.join(',')}]`;
	}
	else if(options.date === true) {
		data = `[${list.map((e) => {
			return `new Date('${e}')`;
		})
		.join(',')}]`;
	}
	else {
		data = JSON.stringify(list);
	}

	return `module.exports = ${data}`;
}

export default function loader(content) {
	let options = {};
	if(this !== undefined) {
		options = loaderUtils.getOptions(this) || {};
	}

	fillDefaultOptions(options);

	if(options.trim !== false) {
		content = content.trim();
	}

	let list = content.split(options.delimiter);

	if(options.filter === true) {
		list = list.filter((e) => {
			return e !== '';
		});
	}

	return generateModule(options, list);
}
