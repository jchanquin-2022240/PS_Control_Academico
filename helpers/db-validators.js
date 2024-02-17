const Role = require('../models/role');
const Persona = require("../models/persona");

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

module.exports = {
    esRoleValido,
    existenteEmail,
    existentePersonaById
}