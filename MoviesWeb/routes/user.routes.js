const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')

const { isLoggedIn, isLoggedOut, checkRole } = require('./../middleware/route-guard')

router.get(('/'), isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('users/list', { users })
        })
        .catch(error => next(error))
})

router.get(('/:id'), isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render('users/profile', {
            user,
            isAdmin: req.session.currentUser.role === 'ADMIN',
            isUser: req.session.currentUser._id === id
        }))
        .catch(error => next(error))
})


module.exports = router