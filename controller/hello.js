'use strict'
const Sequelize = require('sequelize');
const config = require('../config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	poll: {
		max: 5,
		min: 0,
		idle: 30000
	}
});

var Pet = sequelize.define('pet', {
	id: {
		type: Sequelize.STRING(50),
		primaryKey: true
	},

	name: Sequelize.STRING(100),
	gender: Sequelize.BOOLEAN,
	birth: Sequelize.STRING(10),
	createdAt: Sequelize.BIGINT,
	updateAt: Sequelize.BIGINT,
	version: Sequelize.BIGINT
}, 
{
	timestamps: false
});

// var now = Date.now();
// (async() => {
// 	var dog = await Pet.create({
// 		id: 'g-' + now,
// 		name : 'Gaffey',
// 		gender: false,
// 		birth: '2007-07-07',
// 		createdAt: now,
// 		updateAt: now,
// 		version: 0
// 	});
// 	console.log('create. ' + JSON.stringify(p));
// })();

(async() => {
	var pets = await Pet.findAll({
		where: {
			name: 'Gaffey'
		}
	});
	console.log(`find ${pets.length} pets:`);
	for (let p of pets) {
		console.log(JSON.stringify(p));
	}
})();

var fn_hello = async (ctx, next) => {
	ctx.render('index.html', {
        title: 'Welcome'
    });
};

module.exports = {
	'GET /hello/:name': fn_hello
};