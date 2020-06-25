const cors = require('cors');
const express = require('express');
const {
  getSubdisease,
  getSubdiseases,
  createSubdisease,
  updateSubdisease,
  deleteSubdisease,
  book,
  unbook,
} = require('../controllers/subdisease');
const router = express.Router();

var corsOptions = {
  origin: ['https://gifted-gates-e3aa20.netlify.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// read all of a perticular disease
router.get('/subdiseases/:dId', (req, res) => {
  getSubdiseases(req, res);
});

//create route
router.post('/subdisease/:dId', (req, res) => {
  console.log('creating sub');
  createSubdisease(req, res);
});

//read route
router.get('/subdisease/:sdId', (req, res) => {
  getSubdisease(req, res);
});

//update route
router.put('/subdisease/:sdId', (req, res) => {
  updateSubdisease(req, res);
});

//bookmark
router.put('/subdisease/book/:sdId', cors(corsOptions), (req, res) => {
  book(req, res);
});

//unbookmark
router.put('/subdisease/unbook/:sdId', cors(corsOptions), (req, res) => {
  unbook(req, res);
});

//delete route
router.delete('/subdisease/delete/:sdId', (req, res) => {
  deleteSubdisease(req, res);
});

module.exports = router;
