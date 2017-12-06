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

	return `module.exports = ${JSON.stringify(list)}`;
}
