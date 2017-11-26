var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
	name: String,
	captain: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	drawStarted: Boolean,
	drawCompleted: Boolean,
	members: [{
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}]
});

module.exports = mongoose.model('List', ListSchema);