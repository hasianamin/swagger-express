const jwt = require('jsonwebtoken');

module.exports = {
  auth: (req, res, next) => {
    if (req.headers.authorization) {
      const key = 'testing1';
      const token = req.headers.authorization.split(' ');
      jwt.verify(token[1], key, (error, decoded) => {
        if (error) {
          return res.status(403).json({
            message: 'User not authorized.',
            error: 'User not authorized.',
          });
        }
        req.user = decoded;
        next();
      });
    } else {
      return res.status(403).json({
        message: 'User not authorized.',
        error: 'User not authorized.',
      });
    }
  },
};
