/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function createUser(req, res) {
  User.find({ email: req.body.email }).exec().then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'email already in use',
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          firstname: req.body.firstname,
          surname: req.body.surname,
          phonenumber: req.body.phonenumber,
        });
        user.save().then((result) => {
          console.log(result);
          res.status(201).json({
            message: 'User created.',
          });
        }).catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
      });
    }
  }).catch();
}

function login(req, res) {
  User.find({ email: req.body.email }).exec().then((user) => {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Authentication failed.',
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Authentication failed.',
        });
      }
      if (result) {
        const token = jwt.sign( {
          email: user[0].email,
          userId: user[0]._id,
        }, process.env.JWT_KEY, {
          expiresIn: '1h',
        });
        return res.status(200).json({
          message: 'Authentication Successful.',
          token,
        });
      }
      res.status(401).json({
        message: 'Authentication failed.',
      });
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
}

function deleteUser(req, res) {
  User.remove({ _id: req.params.userId }).exec().then((result) => {
    res.status(200).json({
      message: 'User deleted.',
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
}

module.exports = {
  createUser,
  login,
  deleteUser,
};
