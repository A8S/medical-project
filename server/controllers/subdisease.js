const Disease = require('../models/disease');
const Subdisease = require('../models/subdisease');
const subdisease = require('../models/subdisease');

exports.getSubdiseases = (req, res) => {
	Disease.findById(req.params.dId, (err, foundDisease) => {
		if (err) {
			console.log(err);
		} else {
			console.log(foundDisease);
			let ret = [];
			for (let i = 0; i < foundDisease.subdiseases.length; i++) {
				Subdisease.findById(foundDisease.subdiseases[i], (e, foundSubdisease) => {
					if (e) {
						console.log(e);
					} else {
						console.log(foundSubdisease);
						ret.push(foundSubdisease);
					}
				});
			}

			console.log(ret);
			res.send(ret);
		}
	});
	Subdisease.findById(req.params.sdId, (err, foundSubdisease) => {
		if (err) {
			console.log(err);
		} else {
			res.send(foundSubdisease);
		}
	});
};

exports.getSubdisease = async (req, res) => {
	Subdisease.findById(req.params.sdId, (err, foundSubdisease) => {
		if (err) {
			console.log(err);
		} else {
			res.send(foundSubdisease);
		}
	});
};
exports.createSubdisease = (req, res) => {
	console.log(req.body);
	Disease.findById(req.params.dId, (err, foundDisease) => {
		if (err) {
			console.log(err);
		} else {
			req.body.disease = req.params.dId;
			Subdisease.create(req.body, function(err, subdisease) {
				if (err) {
					console.log(err);
				} else {
					subdisease.save();
					foundDisease.subdiseases.push(subdisease);
					foundDisease.save();
					res.send(subdisease);
				}
			});
		}
	});
};

exports.updateSubdisease = (req, res) => {
	Subdisease.findByIdAndUpdate(req.params.sdId, req.body, { new: true }, (err, updatedSubdisease) => {
		if (err) {
			console.log(err);
		} else {
			res.send(updatedSubdisease);
		}
	});
};

exports.deleteSubdisease = (req, res) => {
	Subdisease.findById(req.params.sdId, (err, foundSubdisease) => {
		if (err) {
			console.log(err);
		} else {
			Disease.findById(foundSubdisease.disease, (err, foundDisease) => {
				if (err) {
					console.log(err);
				} else {
					foundDisease.subdiseases = arrayRemove(foundDisease.subdiseases, req.params.sdId);
					foundDisease.save();
				}
			});
			foundSubdisease.remove();
			const response = {
				status: 200,
				message: 'Subdisease successfully deleted',
				id: req.params.sdid
			};
			res.send(response);
		}
	});
};

exports.book = (req, res) => {
	Subdisease.findByIdAndUpdate(
		req.params.sdId,
		{ $push: { bookmark: req.body.userId } },
		{ new: true }
	).exec((err, result) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		} else {
			res.json(result);
		}
	});
  };
  
  
  exports.unbook = (req, res) => {
	Subdisease.findByIdAndUpdate(
		req.params.sdId,
		{ $pull: { bookmark: req.body.userId } },
		{ new: true }
	).exec((err, result) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		} else {
			res.json(result);
		}
	});
  };

function arrayRemove(arr, value) {
	return arr.filter(function(ele) {
		return ele != value;
	});
}

