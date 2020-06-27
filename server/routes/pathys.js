const express = require('express');
const cors = require('cors');
const {
  getPathys,
  createPathy,
  updatePathy,
  deletePathy,
} = require('../controllers/pathys');

var corsOptions = {
  origin: ['https://gifted-gates-e3aa20.netlify.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = express.Router();

// get all
router.get('/pathys', (req, res) => {
  getPathys(req, res);
});

//create route
router.post('/pathy', cors(corsOptions), function (req, res) {
  createPathy(req, res);
});

//update route
router.put('/pathy', (req, res) => {
  updatePathy(req, res);
});

//delete route
router.delete('/pathy/delete', (req, res) => {
  deletePathy(req, res);
});

module.exports = router;
