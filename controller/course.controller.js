const { model } = require('mongoose');
const Curso =  require('../models/curso');
const { response } = require('express');

const cursosPost = async (req,res) => {
    const {nombre, codigoCurso, descripcion, maestro} = req.body;
    const curso = new Curso({nombre, codigoCurso, descripcion, maestro});

    await curso.save();
    res.status(200).json({
        curso
    });
}

module.exports = {
    personaPost
}