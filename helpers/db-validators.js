const { Cursor } = require("mongoose");
const Persona = require("../models/persona");
const Curso = require("../models/curso");

const existenteEmail = async (correo = '') => {
    const existeEmail = await Persona.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existenteCurso = async (nombre = '') => {
    const existeCurso = await Curso.findOne({nombre});
    if(existeCurso){
        throw new Error(`El curso ${ nombre } ya está registrado`); 
    }
}

const codigoCursoExiste = async (codigoCurso = '') => {
    const existeCodigoCurso = await Curso.findOne({codigoCurso});
    if(existeCodigoCurso){
        throw new Error(`El ${ codigoCurso } ya está registrado`);
    }
}

module.exports = {
    existenteEmail,
    existenteCurso,
    codigoCursoExiste
}