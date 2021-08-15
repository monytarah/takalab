const jwt = require('jsonwebtoken')

function authentication (req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.access_token, 'rahasia')
    if (decoded) {
      next()
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = authentication