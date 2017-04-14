var express = require('express');
var router = express.Router();
var handlers = require('../handlers');
var config = require('../config');

/**
 * 获取长链接对应的短链接，如果已存在则直接返回，如果不存在，则新建
 * req.body.longUrl:
 */
router.post('/shorturl', function(req, res, next) {
	var body = req.body;
	var longUrl = body.longUrl;
	if(!longUrl){
		return res.json({errcode: 501, errmsg: 'longUrl not exists'});
	}
	handlers.longUrl2ShortUrl(body.longUrl)
		.then((m) => {
			winston.debug('=====mapping=====' + JSON.stringify(m));
			return res.json({
				errcode: 0,
				longUrl: m.longUrl,
				shortCode: m.shortCode,
				shortDomain: config.sys.shortUrlDomain
			});
		})
		.catch(err => {
			winston.error(err);
			return res.json({errcode: 1});
		});
});

/**
 * 根据longUrl或者shortCode查询链接映射，可传入longUrl或者shortCode参数。优先根据longUrl查询
 * req.body.longUrl
 * req.body.shortCode
 */
router.post('/shorturl/query', function(req, res, next) {
	var body = req.body;
	var longUrl = body.longUrl;
	var shortCode = body.shortCode;
	if(!longUrl && !shortCode){
		return res.json({errcode: 501, errmsg: 'longUrl or shortCode not exists'});
	}
	handlers.queryMappings({longUrl: longUrl, shortCode: shortCode})
		.then((m) => {
			winston.debug('=====query mapping=====' + JSON.stringify(m));
			return res.json({
				errcode: 0,
				longUrl: m.longUrl,
				shortCode: m.shortCode,
				shortDomain: config.sys.shortUrlDomain
			});
		})
		.catch(err => {
			winston.error(err);
			return res.json({errcode: 1});
		});
});

/**
 * 根据longUrl或者shortCode删除链接映射，可传入longUrl或者shortCode参数。优先根据longUrl删除
 * req.body.longUrl
 * req.body.shortCode
 */
router.post('/shorturl/delete', function(req, res, next) {
	var body = req.body;
	var longUrl = body.longUrl;
	var shortCode = body.shortCode;
	if(!longUrl && !shortCode){
		return res.json({errcode: 501, errmsg: 'longUrl or shortCode not exists'});
	}
	handlers.deleteMappings({longUrl: longUrl, shortCode: shortCode})
		.then((result) => {
			return res.json({
				errcode: 0,
				deleted: result.n
			});
		})
		.catch(err => {
			winston.error(err);
			return res.json({errcode: 1});
		});
});

/**
 * 测试使用
 */
router.post('/systest', function(req, res, next){

	handlers.mongoTest()
		.then(() => {
			return res.json({errcode: 0});
		})
		.catch(err => {
			winston.error(err);
			return res.json({errcode: 1});
		});
});

module.exports = router;
