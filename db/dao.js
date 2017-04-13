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

exports.getMappingByShortCode = getMappingByShortCode;
exports.getMappingByLongUrl = getMappingByLongUrl;
exports.updateShortUrlVisit = updateShortUrlVisit;
exports.createMapping = createMapping;