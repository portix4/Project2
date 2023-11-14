const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const saltRounds = 10

const User = require("./../models/User.model")
const uploaderMiddleware = require("../middleware/uploader.middleware")
const { checkEmail } = require('./../middleware/route-guard')

router.get("/registro", (req, res, next) => res.render("auth/signup"))

router.post("/registro", uploaderMiddleware.single('photo'), (req, res, next) => {

    const { username, email, password } = req.body
    const { path: photo } = req.file
    //     console.log(photo)}}

    if (req.file !== undefined) {
        const { path: photo } = req.file
    }
    // si no se mete foto peta, no se cogerlo

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
                return
            } else if (checkemail) {
                res.render('auth/signup', { errorMessage: 'Email en uso' })
                return
            } else {
                bcrypt
                    .genSalt(saltRounds)
                    .then(salt => bcrypt.hash(password, salt))
                    .then(hashedPass => User.create({ username, email, password: hashedPass, photo }))
                    .then(() => res.redirect('/'))
                    .catch(error => next(error))
            }
        })
        .catch(error => next(error))
})

router.get(('/iniciar-sesion'), (req, res, next) => res.render('auth/login'))

router.post(('/iniciar-sesion'), (req, res, next) => {
    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render(('auth/login'), { errorMessage: 'Email no registrado' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render(('auth/login'), { errorMessage: 'Datos incorrectos' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }

        })
        .catch(error => next(error))
})

router.post(('/cerrar-sesion'), (req, res, next) => {
    req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router

