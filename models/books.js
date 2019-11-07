const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  ISBN: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: String, required: true },
  editorial: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
