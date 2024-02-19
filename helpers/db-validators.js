const Role = require('../models/role');
const Persona = require("../models/persona");
const Curso = require("../models/curso");

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

//validar si el personaId existe
const existentePersonaById = async (id = '') => {
    const existePersonaById = await Persona.findOne({ id });
    if (existePersonaById) {
        throw new Error(`La persona con el ${id} no existe`)
    }
}

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

//validar si el cursobyid existe
const existenteCursoById = async (id = '') => {
    const existeCursoById = await Curso.findOne({id});
    if(existeCursoById){
        throw new Error (`El curso con el ${id} no existe`)
    }
}

//validar si existeAsinaciondeCurso
const existenteRoleEnCurso = async (role, { req }) => {
    const { id } = req.params;
    const { cursos } = req.body;

    // Verificar si el role ya está asignado a alguno de los cursos
    const personasConRoleEnCurso = await Persona.find({
        _id: { $ne: id }, // Excluir la persona actual
        cursos: { $in: cursos },
        role: role
    });

    if (personasConRoleEnCurso.length > 0) {
        throw new Error(`El role ${role} ya está asignado a uno o más cursos.`);
    }

    return true;
};

const obtenerCursosAsignados = async (personaId) => {
    try {
        const persona = await Persona.findById(personaId);
        return persona ? persona.cursos : [];
    } catch (error) {
        console.error('Error al obtener cursos asignados:', error);
        throw new Error('Error al obtener cursos asignados.');
    }
};


module.exports = {
    esRoleValido,
    existenteEmail,
    existenteCurso,
    codigoCursoExiste,
    existenteCursoById,
    existentePersonaById,
    existenteRoleEnCurso,
    obtenerCursosAsignados
}