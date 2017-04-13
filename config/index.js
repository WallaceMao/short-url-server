/**
 * Created by user on 2017/4/13.
 */

var config = {};

config.mongo = {
	url: 'mongodb://182.92.222.40:27017/shortUrl',
	user: 'shortUrlUser',
	pwd: '640321'
};
config.log = {
	level: 'debug',
	logFile: 'logs/winston.log',
	exceptionFile: 'logs/exception.log'
};
config.sys = {
	shortUrlDomain: 'rurl.ltd'
};

module.exports = config;
