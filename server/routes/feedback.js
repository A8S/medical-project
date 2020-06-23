const express = require('express');
const { getFeedbacks, createFeedback } = require('../controllers/feedback');
const router = express.Router();

// get all
router.get('/feedbacks', (req, res) => {
	getFeedbacks(req, res);
});

//create route
router.post('/feedback', function(req, res) {
	createFeedback(req, res);
});

module.exports = router;
