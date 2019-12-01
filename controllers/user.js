const User = require('../models/user');
const verify = require('../middleware/verify');

function getUser(req, res) {
  User.find().then((users) => {
    const response = {
      count: users.length,
      users: users.map((user) => ({
        users,
        request: {
          type: 'GET',
          url: `http://localhost:3000/books/${user._id}`,
        },
      })),
    };
    if (users.length >= 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: 'No entries found',
      });
    }
  })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

function getSpecificUser(req, res) {
  const id = req.params.userId;

  User.findById(id).then((doc) => {
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'No valid entry found for provided ID' });
    }
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}

function createUser(req, res) {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'email already in use',
      });
    }
    const newUser = new User(req.body);
    newUser.save((err) => {
      if (err) return res.status(400).json({ error: 'Error creating User' });

      return res.status(201).json({ message: 'User Created Successfully' });
    });
  });
}

function login(req, res) {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Could not find User.',
      });
    }
    user[0].comparePassWithHash(req.body.password, (isMatch, error) => {
      if (error) return res.status(500).json({ error });
      if (isMatch) {
        return res.status(201).json({ message: 'Authentication Successful.', token: verify.createToken(req, res, req.email) });
      }

      return res.status(404).json({ message: 'Authentication failed.' });
    });
  });
}

function deleteUser(req, res) {
  User.remove({ _id: req.params.userId }).then((result) => {
    res.status(200).json({
      message: 'User deleted.',
    });
  }).catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
}

function patchUser(req, res) {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
}

module.exports = {
  getUser,
  getSpecificUser,
  createUser,
  login,
  deleteUser,
  patchUser,
};
