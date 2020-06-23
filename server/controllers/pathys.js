const Feedback = require('../models/feedback');
const pathys = require('../models/pathys');

exports.getPathys = (req, res) => {
	pathys.find({}, (err, foundPathys) => {
		if (err) {
			console.log(err);
		} else {
			res.send(foundPathys);
		}
	});
};

exports.createPathy = (req, res) => {
	pathys.create(req.body, (err, createPathy) => {
		if (err) {
			console.log(err);
		} else {
			res.send(createPathy);
		}
	});
};
