const express = require('express');
const { getDiseases, getDisease, createDisease, updateDisease, deleteDisease } = require('../controllers/disease');
const router = express.Router();

// get all
router.get('/diseases', function(req, res) {
	getDiseases(req, res);
});

//create route
router.post('/disease', function(req, res) {
	createDisease(req, res);
});

//read route
router.get('/diseases/:dId', function(req, res) {
	getDisease(req, res);
});

//update route
router.put('/disease/:dId', (req, res) => {
	updateDisease(req, res);
});

//delete route
router.delete('/disease/delete/:dId', function(req, res) {
	deleteDisease(req, res);
});

module.exports = router;
