var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	exceptions: [{
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}],
	selected: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	requests: [String],
	drawn: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);