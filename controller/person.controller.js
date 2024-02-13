const bcryptjs = require('bcryptjs');
const Usuario = require('../models/persona');
const { response } = require('express');

/*const personaGet = async (req, res = response) => {
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
}*/

const personasPost = async (req, res) => {
    const {nombre, correo, password, cursos, role} = req.body;
    const persona = new Persona({nombre, correo, password, cursos, role});

    const salt = bcryptjs.genSaltSync();
    persona.password = bcryptjs.hashSync(password, salt);

    await persona.save();
    res.status(202).json({
        persona
    });
}

module.exports = {
    personasPost
    //personaGet
}