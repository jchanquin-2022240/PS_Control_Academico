const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    personasPost,
    personaGet,
    putPersonas,
    deletePersona} = require('../controller/person.controller');

const { existenteEmail, esRoleValido, existentePersonaById } = require('../helpers/db-validators');

const router = Router();

router.get("/", personaGet);

router.post(
    "/", 
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password","El password debe ser mayor a 8 caracteres").isLength({min:8}),
        check("correo","El correo no puede estar vacio").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], personasPost);


router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existentePersonaById),
        check("correo").custom(existenteEmail),
        validarCampos
    ], putPersonas);


router.delete(
    "/:id",
    [
        validarJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existentePersonaById),
        validarCampos
    ], deletePersona);

module.exports = router;