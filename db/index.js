/**
 * Created by user on 2017/4/13.
 * 初始化mongoose
 */
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('../config');

var urlMappingSchema = require('./urlMappingSchema');
var clientSchema = require('./clientSchema');
var codeCollisionSchema = require('./codeCollisionSchema');


function init(){
	mongoose.Promise = bluebird;
	mongoose.connect(config.mongo.url, {
		user: config.mongo.user,
		pass: config.mongo.pwd
	})
		.then(
			() => {
				console.log('connect to mongodb ' + config.mongo.url + ' successfully');
			},
			err => {
				winston.error(err);
			});
}

var UrlMapping = mongoose.model('UrlMapping', urlMappingSchema);
var Client = mongoose.model('Client', clientSchema);
var CodeCollision = mongoose.model('CodeCollision', codeCollisionSchema);

exports.init = init;
exports.UrlMapping = UrlMapping;
exports.Client = Client;
exports.CodeCollision = CodeCollision;
