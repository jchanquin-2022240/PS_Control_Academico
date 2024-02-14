const Persona = require("../models/persona");

const existenteEmail = async (correo = '') => {
    const existeEmail = await Persona.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

module.exports = {
    existenteEmail
}