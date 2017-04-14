/**
 * Created by user on 2017/4/13.
 */

var db = require('../db');

/**
 * params.shortCode: 查询使用的shortCode
 * @param params
 */
function getMappingByShortCode(params){
	return db.UrlMapping.findOne({shortCode: params.shortCode}).exec()
		.then((m) => {
			return m;
		});
}

/**
 * params.longUrl：需要转换的longUrl
 * @param params
 */
function getMappingByLongUrl(params){
	return db.UrlMapping.findOne({longUrl: params.longUrl}).exec()
		.then((m) => {
			return m;
		});
}

/**
 * params.longUrl
 * params.convertVersion
 * params.shortCode
 * @param params
 * @returns {Promise.<TResult>}
 */
function createMapping(params){
	var allVal = {
		dateCreated: new Date(),
		convertVersion: params.convertVersion,
		longUrl: params.longUrl,
		shortCode: params.shortCode,
		visitCount: 0,
		lastVisited: null
	};
	var mapping = new db.UrlMapping(allVal);

	return mapping.save().then(function(m){
		return m;
	});
}

/**
 * 更新mapping的用户访问信息
 * @param mapping
 */
function updateShortUrlVisit(mapping){
	mapping.visitCount = mapping.visitCount + 1;
	mapping.lastVisited = new Date();
	return mapping.save().then(function(m){
		return m;
	});
}

/**
 * 根据shortCode删除urlMapping
 * @param params
 */
function deleteMappingByShortCode(params){
	return db.UrlMapping.remove({shortCode: params.shortCode}).exec()
		.then((result) => {
			return JSON.parse(result);
		});
}

/**
 * 根据longUrl删除urlMapping
 * @param params
 */
function deleteMappingByLongUrl(params){
	return db.UrlMapping.remove({longUrl: params.longUrl}).exec()
		.then((result) => {
			return JSON.parse(result);
		});
}

/**
 * 根据token值获取到client授权
 * @param token
 * @returns {Promise.<TResult>}
 */
function checkAuth(token){
	return db.Client.findOne({token: token}).exec()
		.then((c) => {
			return c;
		});
}

/**
 * 保存code冲突错误信息
 * @param params
 * @returns {Promise.<TResult>}
 */
function logCodeCollision(params){
	var allVal = {
		dateCreated: new Date(),
		convertVersion: params.convertVersion,
		shortCode: params.shortCode,
		reason: 'collision',
		retryTimes: params.retryTimes
	};
	var model = new db.CodeCollision(allVal);

	return model.save().then(function(m){
		return m;
	});
}

/**
 * 保存达到最大重新生成次数的错误信息
 * @param params
 */
function logMaximumCodeRegeneration(params){
	var allVal = {
		dateCreated: new Date(),
		convertVersion: params.convertVersion,
		shortCode: params.shortCode,
		reason: 'maxRegeneration',
		retryTimes: params.retryTimes
	};
	var model = new db.CodeCollision(allVal);

	return model.save().then(function(m){
		return m;
	});
}

exports.checkAuth = checkAuth;

exports.getMappingByShortCode = getMappingByShortCode;
exports.getMappingByLongUrl = getMappingByLongUrl;
exports.createMapping = createMapping;
exports.updateShortUrlVisit = updateShortUrlVisit;
exports.deleteMappingByShortCode = deleteMappingByShortCode;
exports.deleteMappingByLongUrl = deleteMappingByLongUrl;

exports.logCodeCollision = logCodeCollision;
exports.logMaximumCodeRegeneration = logMaximumCodeRegeneration;