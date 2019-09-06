const mongoose = require('mongoose');

const FilterSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  categories: [
    {
      type: String,
      required: true
    }
  ],
  location: {
    type: String,
    required: false
  },
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('filter', FilterSchema);
