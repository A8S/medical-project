const express = require('express');
const { getPathys, createPathy } = require('../controllers/pathys');

const router = express.Router();

// get all
router.get('/pathys', (req, res) => {
	getPathys(req, res);
});

//create route
router.post('/pathy', function(req, res) {
	createPathy(req, res);
});

module.exports = router;
