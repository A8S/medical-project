const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	rating: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Feedback', feedbackSchema);
