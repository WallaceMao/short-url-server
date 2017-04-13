var express = require('express');
var router = express.Router();
var handlers = require('../handlers');
var config = require('../config');

/* GET users listing. */
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

module.exports = router;
