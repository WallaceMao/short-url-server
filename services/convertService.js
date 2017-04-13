/**
 * Created by user on 2017/4/12.
 * 转换引擎，基本方法convert：
 * 根据传入的params中的参数，获取转换后的返回值，转换后的返回值至少包括：
 * convertVersion： 转换算法版本
 * shortCode：转换之后的code值
 */
'use strict'
var db = require('../db');

var CONVERT_VERSION = 1;

function convert(params){
	return getCode(0)
		.then(function(code){
			params.convertVersion = CONVERT_VERSION;
			params.shortCode = code;
			return params;
		});
}

/**
 * 获取code值，当获取到code值之后会去数据库查询是否存在该code，如果不存在，则返回；
 * 如果存在，则重新生成。未防止系统bug导致的无限递归问题，目前设置最大递归次数为5次
 * 在使用nosql的情况下，由于没有事务处理，这种方式仍然不可避免会出现生成重复值。
 * @param redoTimes
 * @returns {Promise.<TResult>}
 */
function getCode(redoTimes){
	redoTimes = redoTimes || 0;
	redoTimes ++;

	var code = randomCode();
	winston.debug('code is:' + code);
	winston.debug('redoTimes is:' + redoTimes);
	return db.UrlMapping.findOne({shortCode: code}).exec()
		.then(function(m){
			winston.debug('m is:' + m);
			if(null === m){
				return code;
			}

			winston.error('duplicated short code occurred:' + code);
			//TODO 发生碰撞之后需要记录

			//-----------

			//设置最大允许的重试次数
			if(redoTimes > 5){
				winston.error('reach maximum short code regenerate times, code is '
					+ code + ', regenerate times is ' + redoTimes);
				//TODO 超过重试的最大次数后，需要记录

				//--------
				return null;
			}
			return getCode(redoTimes);
		});
}

/**
 * 生成随机digit位的代码
 */
// var ct = 0;
function randomCode(digit){
	 // 用于测试发生碰撞的情况
	// winston.debug('ct:' + ct);
	// ct += 1;
	//
	// if(ct > 10){
	// 	return 'aaaaa';
	// }
	// return 'bbbbb';

	digit = digit || 8;
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < digit; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

exports.convert = convert;