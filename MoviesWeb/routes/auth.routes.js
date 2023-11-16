const express = require("express")
const router = express.Router()

const uploaderMiddleware = require("../middleware/uploader.middleware")

const { getRegister,
    postRegister,
    getLogin,
    postLogin,
    logOut
} = require('./../controllers/auth.controllers')


router.get("/registro", getRegister)

router.post("/registro", uploaderMiddleware.single('photo'), postRegister)

router.get(('/iniciar-sesion'), getLogin)

router.post(('/iniciar-sesion'), postLogin)

router.post(('/cerrar-sesion'), logOut)

module.exports = router

