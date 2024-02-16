const {request, response } = require("express");
const Persona = require("../models/persona");
const bycryptjs = require('bcryptjs');


const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        const persona = await Persona.findOne({correo});

        if (!persona) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en base de datos."
            });
        }

        if(persona.estado){
            return res.status(400).json({
                msg: " El usuario no existe en la base de datos."
            });
        }

        const validarPassword = bycryptjs.compareSync(password, persona.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        res.status(200).json({
            msg: "Bienvenido"
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }
}

module.exports = {
    login
}