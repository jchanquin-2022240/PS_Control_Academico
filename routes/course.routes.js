const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos')

const {
    cursosPost,
    cursoGet,
    getCursoById,
    putCursos,
    cursosDelete} = require('../controller/course.controller');

const { existenteCurso, codigoCursoExiste, existenteCursoById} = require('../helpers/db-validators');

const router = Router();

router.get("/", cursoGet); //listado de cursos

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existenteCursoById),
        validarCampos
    ], getCursoById);

router.post(
    "/",
    [
        check("nombre").custom(existenteCurso),
        check("codigoCurso").custom(codigoCursoExiste),
        check("descripcion", "La descripción no puede ir vacía").not().isEmpty(),
        check("maestro", "El maestro no puede ir vacio").not().isEmpty(),
        validarCampos,
    ],cursosPost );

router.put(
    "/:id",
    [
        check("id", 'No es un id válido').isMongoId(),
        check('id').custom(existenteCursoById),
        validarCampos
    ], putCursos);


router.delete(
    "/:id",
    [
        check('id', 'No es un id valido ').isMongoId(),
        check('id').custom(existenteCursoById),
        validarCampos
    ], cursosDelete);

module.exports = router;