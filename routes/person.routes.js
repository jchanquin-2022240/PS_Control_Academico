const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const {
    personasPost} = require('../controller/person.controller');

const { existenteEmail} = require('../helpers/db-validators');


const router = Router();

//router.get("/", personaGet);

router.post(
    "/", 
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password","El password debe ser mayor a 8 caracteres").not().isArray({min:8}),
        check("role", "Agregar rol").not().isEmpty(),
        check("correo","El correo no puede estar vacio").not().isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], personasPost);

module.exports = router;