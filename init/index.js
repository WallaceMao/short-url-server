/**
 * Created by user on 2017/4/13.
 * 系统初始化工作
 */
var config = require('../config');
var winston = require('winston');

function init(){
	winstonInit();
}

function winstonInit(){
	global.winston = winston;
	winston.level = config.log.level;
	winston.add(winston.transports.File, {
		filename: config.log.logFile
	});
	winston.handleExceptions(new winston.transports.File({
		filename: config.log.exceptionFile
	}));
}

module.exports = init;
