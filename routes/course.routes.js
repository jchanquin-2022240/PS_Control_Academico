const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos')

const {
    cursosPost,
    cursoGet} = require('../controller/course.controller');

const { existenteCurso, codigoCursoExiste} = require('../helpers/db-validators');

const router = Router();

router.get("/", cursoGet); //listado de cursos

router.post(
    "/",
    [
        check("nombre").custom(existenteCurso),
        check("codigoCurso").custom(codigoCursoExiste),
        check("descripcion", "La descripción no puede ir vacía").not().isEmpty(),
        check("maestro", "El maestro no puede ir vacio").not().isEmpty(),
        validarCampos,
    ],cursosPost );

module.exports = router;