'use strict'
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controllers');
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
 	autoescape: true
});

function templating() {
	return async (ctx, next) => {
		console.log('bind render function to ctx');
		ctx.render = function (view, model) {
			console.log(`render ${view}`);
			ctx.response.body = nunjucks.render(view, 
				Object.assign({}, ctx.state || {}, model || {}));
			ctx.response.type = 'text/html';
		}

		await next();
	};
}

const app = new Koa();
app.use(bodyParser());
app.use(templating('view', {
	noCache: true
}))
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
