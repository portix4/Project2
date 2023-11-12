const router = require('express').Router()


router.get(('/crear'), (req, res, next) => {
    res.render('moviesevents/create')
})

router.post(('/crear'), (req, res, next) => {
    const { movie, location, place, latitude, longitude, date, description } = req.body
    console.log(movie, location, place, latitude, longitude, date, description)

})


module.exports = router