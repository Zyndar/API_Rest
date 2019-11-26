const jwt = require('jsonwebtoken');

function createToken(req, res, mail) {
  const payload = { email: mail };
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '5m' });
}

function verifyToken(req, res, next) {
  const token = req.headers['token-access'];
  if (!token) return res.status(401).json({ auth: false, message: 'Not Authenticated' });

  jwt.verify(token, process.env.JWT_KEY, (err) => {
    if (err) return res.status(500).json({ auth: false, message: 'No Authentication' });
    next();
  });
}

module.exports = {
  createToken,
  verifyToken,
};
