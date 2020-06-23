const Feedback = require('../models/feedback');

exports.getFeedbacks = (req, res) => {
	Feedback.find({}, (err, foundFeedbacks) => {
		if (err) {
			console.log(err);
		} else {
			res.send(foundFeedbacks);
		}
	});
};

exports.createFeedback = (req, res) => {
	Feedback.create(req.body, (err, createFeedback) => {
		if (err) {
			console.log(err);
		} else {
			res.send(createFeedback);
		}
	});
};
