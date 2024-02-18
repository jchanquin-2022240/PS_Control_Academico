const bcryptjs = require('bcryptjs');
const Persona = require('../models/persona');
const { response } = require('express');

const personaGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true}

    const[total, personas] = await Promise.all([
        Persona.countDocuments(query),
        Persona.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.status(200).json({  
        total,
        personas
    });
}

const personasPost = async (req, res) => {
    const {nombre, correo, password, role} = req.body;
    const persona = new Persona({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    persona.password = bcryptjs.hashSync(password, salt);

    await persona.save();
    res.status(202).json({
        persona
    });
}

const putPersonas = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, role, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Persona.findByIdAndUpdate(id, resto);
    const persona = Persona.findOne({id});

    res.status(200).json({
        msg: "Perfil Actualizado Correctamente!!!",
        persona
    });
}

const deletePersona = async(req, res, next) => {
    const {id} = req.params;
    const usuario = await Persona.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.persona;

    res.status(200).json({
        msg: 'Usuario a eliminar',
        usuario,
        usuarioAutenticado
    });
}

module.exports = {
    personasPost,
    personaGet,
    putPersonas,
    deletePersona
}