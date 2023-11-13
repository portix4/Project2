const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require("./../models/User.model")
const uploaderMiddleware = require("../middleware/uploader.middleware")
const { checkEmail } = require('./../middleware/route-guard')

router.get("/registro", (req, res, next) => res.render("auth/signup"))

router.post("/registro", uploaderMiddleware.single('photo'), (req, res, next) => {

    // rompe si no metes foto
    const { path: photo } = req.file
    const { username, email, password } = req.body

    const promises = [
        User.findOne({ username }),
        User.findOne({ email })
    ]

    Promise
        .all(promises)
        .then(response => {
            const checkuser = response[0]
            const checkemail = response[1]
            if (checkuser) {
                res.render('auth/signup', { errorMessage: 'Nick en uso' })
            } else if (checkemail) {
                res.render('auth/signup', { errorMessage: 'Email en uso' })
            } else {
                bcrypt
                    .genSalt(saltRounds)
                    .then(salt => bcrypt.hash(password, salt))
                    .then(hashedPass => User.create({ username, email, password: hashedPass, photo }))
                    .then(() => res.redirect('/'))
                    .catch(error => next(error))
            }
        })

})

module.exports = router

