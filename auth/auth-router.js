const router = require('express').Router();
const bcrypt = require("bcryptjs")
const restrict = require("./authenticate-middleware")

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
  } catch(err) {
    next(err)
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
