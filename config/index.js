/**
 * Created by user on 2017/4/13.
 */

var config = {};

config.mongo = {
	url: process.env.MONGO_URL || '',
	user: process.env.MONGO_USER || '',
	pwd: process.env.MONGO_PWD || ''
};
config.log = {
	level: process.env.LOG_LEVEL || '',
	logFile: process.env.LOG_LOG_FILE || '',
	exceptionFile: process.env.LOG_EXCEPTION_FILE || ''
};
config.sys = {
	shortUrlDomain: process.env.SYS_SHORT_URL_DOMAIN || ''
};
config.security = {
	whiteList: (process.env.SECURITY_WHITE_LIST || '').split(','),
	blackList: (process.env.SECURITY_BLACK_LIST || '').split(',')
};

module.exports = config;
