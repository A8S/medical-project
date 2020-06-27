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

exports.updatePathy = (req, res) => {
  pathys.findByIdAndUpdate(req.body, (err, updatedPathy) => {
    if (err) {
      console.log(err);
    } else {
      res.send(updatedPathy);
    }
  });
};

exports.deletePathy = (req, res) => {
  pathys.remove((err, pathys) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Pathy deleted successfully',
    });
  });
};
