const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},

	subdiseases: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subdisease'
		}
	]
});

module.exports = mongoose.model('Disease', diseaseSchema);
