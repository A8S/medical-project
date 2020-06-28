const express = require('express');
const cors = require('cors');
const {
  getPathys,
  createPathy,
  updatePathy,
  deletePathy,
} = require('../controllers/pathys');

const router = express.Router();

// get all
router.get('/pathys', (req, res) => {
  getPathys(req, res);
});

//create route
router.post('/pathy', function (req, res) {
  createPathy(req, res);
});

// //update route
// router.put('/pathy', (req, res) => {
//   updatePathy(req, res);
// });

// //delete route
// router.delete('/pathy/delete', (req, res) => {
//   deletePathy(req, res);
// });

module.exports = router;
