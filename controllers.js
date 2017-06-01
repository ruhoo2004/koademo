'use strict'
const fs = require('fs');

function addMapping(router, mapping) {
	for (var url in mapping) {
		if (url.startsWith('GET ')) {
			let path = url.substring(4);
			router.get(path, mapping[url]);
			console.log(`register URL mapping: GET ${path}`);
		} else if (url.startsWith('POST ')) {
			let path = url.substring(5);
			router.post(path, mapping[url]);
			console.log(`register URL mapping: POST ${path}`);
		} else {
			console.log('invalid URL: ${url}');
		}
	}
}

function addControllers(router, dir) {
	var files = fs.readdirSync(__dirname + '/controller');
	var js_files = files.filter((f)=> {
		return f.endsWith('.js');
	});

	for (var f of js_files) {
		console.log(`process controllers: ${f}...`);
		let mapping = require(__dirname + '/controller/' + f);
		addMapping(router, mapping);
	}
}

module.exports = function() {
	let	router = require('koa-router')();
	addControllers(router);
	return router.routes();
};