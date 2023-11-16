const layoutLogged = (req, res, next) => {
    if (req.session.currentUser) {
        res.locals.user = req.session.currentUser
    }
    next()
}

module.exports = layoutLogged