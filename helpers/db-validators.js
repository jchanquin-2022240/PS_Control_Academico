const Role = require('../models/role');
const Persona = require("../models/persona");

const existenteEmail = async (correo = '') => {
    const existeEmail = await Persona.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existenteRole = async (role = '') => {
    const existeRole = await Role.findOne({role});
    if(!existeRole) {
        throw new Error(`El role ${ role } no se encontro en la base de datos`);
    }
};

module.exports = {
    existenteEmail,
    existenteRole
}