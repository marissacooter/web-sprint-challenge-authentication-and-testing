const router = require('express').Router();
const bcrypt = require("bcryptjs")
const Auth = require("./auth-model")
const restrict = require("./authenticate-middleware")

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Auth.findBy({ username }).first()

    if (user) {
      return res.status(409).json({
        message: "Username is already taken"
      })
    }

    const newUser = await Auth.add({
      username,
      password: await bcrypt.hash(password, 14)
    })

    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Auth.findBy({ username }).first()

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    req.session.user = user

    res.json({
      message: `Welcome ${user.username}!`
    })

  } catch(err) {
    next(err)
  }
});

module.exports = router;
