var express = require('express');
var router = express.Router();
var convertService = require('../services/convertService');
var handlers = require('../handlers');

router.get('/unauthorized', function(req, res, next){
	res.status(403).json({errcode: 403});
});

/* GET url redirect */
router.get('/:shortCode', function(req, res, next) {
	var code = req.params.shortCode;

	if(!code){
		var error = new Error('code not exist');
		winston.error(error);
		return next(error);
	}
	handlers.shortUrl2LongUrl(code)
		.then((m) => {
			winston.debug('=====mapping=====' + JSON.stringify(m));
			if(!m){
				var error = new Error('code not exist');
				winston.error(error);
				return next(error);
			}
			return res.redirect(m.longUrl);
		})
		.catch(err => {
			winston.error(err);
			return next(err);
		});
  // res.render('index', { title: 'Express' });
});

module.exports = router;
