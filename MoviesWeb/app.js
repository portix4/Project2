require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require('./config/session.config')(app)
require("./config")(app)

const capitalize = require("./utils/capitalize")
const projectName = "MoviesWeb"
app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

const layout = require("./middleware/layout")
app.use(layout)

require("./routes")(app)
require("./error-handling")(app)

module.exports = app