const jwt = require('jsonwebtoken');
const Persona = require('../models/persona');
const {request, response} = require('express');

const validarJWT = async(req, res, next) => {
    const token = req.header('delete-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        //verificación del token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const persona = await Persona.findById(uid);
        if (!persona) {
            return res.status(401).json({
                msg: "Persona no existe en la base de datos"
            });
        }

        if (!persona.estado) {
            return.res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }

        req.persona = persona;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}

module.exports = {
    validarJWT
}