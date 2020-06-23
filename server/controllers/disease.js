const Disease = require('../models/disease');
const SubDisease = require('../models/subdisease');

exports.getDiseases = (req, res) => {
	Disease.find({}, (err, foundDiseases) => {
		if (err) {
			console.log(err);
		} else {
			res.send(foundDiseases);
		}
	});
};

exports.getDisease = async (req, res) => {
	Disease.findById(req.params.dId, (err, foundDisease) => {
		if (err) {
			console.log(err);
		} else {
			res.send(foundDisease);
		}
	});
};
exports.createDisease = (req, res) => {
	console.log(req.body);
	Disease.create(req.body, function(err, createdDisease) {
		if (err) {
			console.log(err);
		} else {
			res.send(createdDisease);
		}
	});
};

exports.updateDisease = (req, res) => {
	Disease.findByIdAndUpdate(req.params.dId, req.body, { new: true }, (err, updatedDisease) => {
		if (err) {
			console.log(err);
		} else {
			res.send(updatedDisease);
		}
	});
};

exports.deleteDisease = (req, res) => {
	Disease.findById(req.params.dId, (err, foundDisease) => {
		if (err) {
			console.log(err);
		} else {
			foundDisease.subdiseases.forEach((sub) => {
				SubDisease.findByIdAndRemove(sub._id, (err) => {
					console.log(err);
				});
			});

			foundDisease.remove((err) => {
				if (err) {
					console.log(err);
				} else {
					const response = {
						status: 200,
						message: 'Disease successfully deleted',
						id: req.params.dId
					};
					res.send(response);
				}
			});
		}
	});
};
