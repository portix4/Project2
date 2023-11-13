module.exports = app => {

    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    const eventRouter = require("./event.routes")
    app.use('/evento', eventRouter)

    const apiRouter = require("./api.routes")
    app.use('/api', apiRouter)

    const userRouter = require("./user.routes")
    app.use('/user', userRouter)

    const authRouter = require("./auth.routes")
    app.use('/', authRouter)

    const movieRouter = require("./movie.routes")
    app.use('/movie', movieRouter)

}

