module.exports = app => {

    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    const eventRouter = require("./event.routes")
    app.use('/evento', eventRouter)

    const apiRouter = require("./api.routes")
    app.use('/api', apiRouter)

}

