import loaderUtils from 'loader-utils';

export default function loader(content) {
	let options = {};
	if(this !== undefined) {
		options = loaderUtils.getOptions(this) || {};
	}

	if(options.delimiter === undefined) {
		options.delimiter = '\n';
	}

	if(options.trim !== false) {
		content = content.trim();
	}

	let list = content.split(options.delimiter);

	if(options.filter === true) {
		list = list.filter((e) => {
			return e !== '';
		});
	}

	let data = '[';
	if(options.number === true) {
		data += list.join(',') + ']';
	} else if (options.date === true) {
		data += list.map((e) => {
			return `new Date("${e}")`;
		}).join(',') + ']';
	} else {
		data = JSON.stringify(list);
	}

	return `module.exports = ${data}`;
}
