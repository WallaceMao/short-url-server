/**
 * Created by user on 2017/4/13.
 */
var mongoose = require('mongoose');

module.exports = mongoose.Schema({
	name: {type: String},
	token: {type: String}
});