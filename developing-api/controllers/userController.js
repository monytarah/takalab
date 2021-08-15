const jwt = require('jsonwebtoken')

class UserController {
  static login (req, res) {
    // hardcode
    const payload = {
      name: 'user',
      pass: 'user123'
    }
    const access_token = jwt.sign(payload, 'rahasia')
    res.status(200).json({ access_token })
  }
}

module.exports = UserController