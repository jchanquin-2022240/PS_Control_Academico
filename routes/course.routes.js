const { Router } = require('express');
const { check } = require('edpress-validator');

//const { validarCampos } = require ('../middlewares/validar-campos')

const {
    cursosPost} = require('../controller/course.controller');

const router = Router();

/*router.post(
    "/",

    ]
)*/