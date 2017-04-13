/**
 * Created by user on 2017/4/13.
 * 初始化mongoose
 */
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('../config');

var urlMappingSchema = require('./urlMappingSchema');


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

exports.init = init;
exports.UrlMapping = UrlMapping;
