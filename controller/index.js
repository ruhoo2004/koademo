'use strict'
var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
};

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password ${password}`);
    if (name === 'koa' &&  password === '12345') {
        ctx.render('hello.html', {
            title: 'Sign In OK',
            name: name
        });
    } else {
        ctx.render('failed.html', {
            title: 'Sign In Failed'
        });
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}