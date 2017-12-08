# List Loader

[![npm](https://img.shields.io/npm/v/list-loader.svg)](https://www.npmjs.com/package/list-loader)
[![Build Status](https://travis-ci.org/sapphiredev/list-loader.svg?branch=master)](https://travis-ci.org/sapphiredev/list-loader)
[![Coverage Status](https://coveralls.io/repos/github/sapphiredev/list-loader/badge.svg?branch=master)](https://coveralls.io/github/sapphiredev/list-loader?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/sapphiredev/list-loader.svg)](https://gemnasium.com/github.com/sapphiredev/list-loader)
[![Maintainability](https://api.codeclimate.com/v1/badges/e1ed105c37c9df52611a/maintainability)](https://codeclimate.com/github/sapphiredev/list-loader/maintainability)

## Introduction

A webpack-loader for importing files as a list

## Usage

### Install

```sh
$ npm install list-loader --save-dev
```

### Setup

#### webpack.config.js

```js
'module': {
	'rules': [
		{
			'test': /\.txt$/,
			'use': [
				{
					'loader': 'list-loader',
					'options': {
						'delimiter': '\n',
						'filter': false,
						'trim': true,
						'number': false,
						'date': false,
					},
				},
			],
		},
	],
},
```

### Options

Name | Type | Default | Description
----|----|----|----
`delimiter` | `{string\|number\|RegExp}` | `'\n'` | Set delimiter
`filter` | `{boolean}` | `false` | Enable / Disable filtering empty elements
`trim` | `{boolean}` | `true` | Enable / Disable trimming
`number` | `{boolean}` | `false` | Enable / Disable parsing numbers
`date` | `{boolean}` | `false` | Enable / Disable parsing dates
