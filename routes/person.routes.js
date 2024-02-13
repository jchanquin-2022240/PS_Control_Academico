const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const {
    personaPost,
    personaGet} = require('../controller/person.controller');

const { existenteEmail} = require('../helpers/db-validators');


const router = Router();

router.get("/", personaGet);

router.post(
    "/", 
    [
        check("nombre", "El nombre no puede estar vacio").isEmpty(),
        check("password","El password debe ser mayor a 7 caracteres").isArray({min:8}),
        check("correo","El correo no puede estar vacio").isEmail(),
        check("correo".custom(existenteEmail)),
        validarCampos
    ], personaPost);

module.exports = router;