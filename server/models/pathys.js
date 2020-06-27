const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const pathySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  effective: {
    type: String,
  },
});

module.exports = mongoose.model('Pathy', pathySchema);
