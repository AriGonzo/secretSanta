var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WishSchema = new Schema({
	description: String,
	url: String,
	metaDescription: String,
	metaTitle: String,
	metaImage: String
});

module.exports = mongoose.model('Wish', WishSchema);