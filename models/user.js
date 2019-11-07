const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, 'email required'], unique: true },
  password: { type: String, required: [true, 'password required'] },
  firstname: { type: String, required: [true, 'firstname required'] },
  surname: { type: String, required: [true, 'surname required'] },
  phonenumber: { type: String, minlength: 9, maxlength: 9 },
});

module.exports = mongoose.model('User', userSchema);