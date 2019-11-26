const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: [true, 'email required'], unique: true },
  password: { type: String, required: [true, 'password required'] },
  firstname: { type: String, required: [true, 'firstname required'] },
  surname: { type: String, required: [true, 'surname required'] },
  phonenumber: { type: String, minlength: 9, maxlength: 9 },
  dateCreated: { type: String, required: [true, 'date required'] },
});

userSchema.pre('save', function (next) {
  const newUser = this;

  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err) return next(err);
    newUser.password = hash;
    next();
  });
});

userSchema.methods.comparePassWithHash = function (password, cb) {
  const user = this;
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
