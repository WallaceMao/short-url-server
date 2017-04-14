/**
 * Created by user on 2017/4/13.
 */

var convertService = require('../services/convertService');
var dao = require('../db/dao');
/**
 * 将longUrl转换为shortUrl
 * 1 根据longUrl读取mapping，如果可以找到mapping，则直接返回mapping，如果找不到，则执行2
 * 2 通过convert引擎做转换，获取到code值
 * 3 保存code值
 * @param longUrl
 */
function longUrl2ShortUrl(longUrl){
	var params = {longUrl: longUrl};
	return dao.getMappingByLongUrl(params)
		.then((m) => {
			if(null != m){
				return Promise.resolve(m);
			}else{
				return convertService.convert(params)
					.then((result) => {
						winston.debug('result code is:' + JSON.stringify(result));
						return dao.createMapping(result);
					});
			}
		});
}

/**
 * 根据shortCode查找数据库的mapping
 * 1  查找mapping
 * 2  如果找不到，直接返回null
 * 3  如果能找到，则记录访问信息，并返回m
 * @param shortCode
 */
function shortUrl2LongUrl(shortCode){
	var params = {shortCode: shortCode};
	return dao.getMappingByShortCode(params)
		.then((m) => {
			if(null === m){
				return m;
			}else{
				return dao.updateShortUrlVisit(m);
			}
		});
}

/**
 * 根据params.longUrl或者shortCode删除数据库中的映射
 * @param params
 */
function deleteMappings(params){
	if(params.longUrl){
		return dao.deleteMappingByLongUrl(params);
	}else if(params.shortCode){
		return dao.deleteMappingByShortCode(params);
	}else{
		return Promise.reject(new Error('params longUrl or shortCode not found when delete mappings'));
	}
}

/**
 * 根据params.longUrl或者shortCode查询数据库中的映射
 * @param params
 */
function queryMappings(params){
	if(params.longUrl){
		return dao.getMappingByLongUrl(params);
	}else if(params.shortCode){
		return dao.getMappingByShortCode(params);
	}else{
		return Promise.reject(new Error('params longUrl or shortCode not found when query mappings'));
	}
}

function mongoTest(){
	var params = {longUrl: 'http://www.rishiqing.com/task?t=12343wefw32f32sf3ee2111'};
	return convertService.convert(params)
		.then((result) => {
			winston.debug('result code is:' + JSON.stringify(result));
			return dao.createMapping(result);
		});
}

exports.longUrl2ShortUrl = longUrl2ShortUrl;
exports.shortUrl2LongUrl = shortUrl2LongUrl;
exports.deleteMappings = deleteMappings;
exports.queryMappings = queryMappings;
exports.mongoTest = mongoTest;