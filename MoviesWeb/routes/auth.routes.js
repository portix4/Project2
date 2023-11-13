const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require("./../models/User.model")
const uploaderMiddleware = require("../middleware/uploader.middleware")

router.get("/registro", (req, res, next) => res.render("auth/signup"))

router.post("/registro", uploaderMiddleware.single('photo'), (req, res, next) => {

    const { path: photo } = req.file
    const { username, email, password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPass => User.create({ username, email, password: hashedPass, photo }))
        .then(() => res.redirect('/'))
        .catch(error => next(error))
})

module.exports = router