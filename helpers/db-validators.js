const Persona = require("../models/persona");

const existenteEmail = async (id = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

module.exports = {
    existenteEmail
}