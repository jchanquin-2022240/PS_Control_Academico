const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const {
    personasPost,
    personaGet} = require('../controller/person.controller');

<<<<<<< HEAD
const { existenteEmail} = require('../helpers/db-validators');
=======
<<<<<<< HEAD
const { existenteEmail} = require('../helpers/db-validators');
=======
const { existenteEmail, esRoleValido} = require('../helpers/db-validators');
>>>>>>> feature/persona
>>>>>>> developer


const router = Router();

router.get("/", personaGet);

router.post(
    "/", 
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password","El password debe ser mayor a 8 caracteres").isLength({min:8}),
        check("correo","El correo no puede estar vacio").isEmail(),
        check("correo").custom(existenteEmail),
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        check("role").custom(esRoleValido),
>>>>>>> feature/persona
>>>>>>> developer
        validarCampos,
    ], personasPost);

module.exports = router;