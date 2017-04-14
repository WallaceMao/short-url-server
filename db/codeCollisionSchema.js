/**
 * Created by user on 2017/4/13.
 */
var mongoose = require('mongoose');

module.exports = mongoose.Schema({
	dateCreated: {type: Date},
	shortCode: {type: String},
	convertVersion: {type: String},
	reason: {type: String},
	retryTimes: {type: Number}
});