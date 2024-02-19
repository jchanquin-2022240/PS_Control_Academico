const bcryptjs = require('bcryptjs');
const Persona = require('../models/persona');
const { response } = require('express');
const Curso = require('../models/curso');

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
    try {
        const { id } = req.params;
        const { _id, password, cursos, ...resto } = req.body;

        // Verificar si el ID de la persona existe en la base de datos
        const existingPersona = await Persona.findById(id);
        if (!existingPersona) {
            return res.status(404).json({
                msg: "El ID proporcionado no existe en la base de datos."
            });
        }

        // Verificar si los IDs de cursos existen en la base de datos
        if (cursos && cursos.length > 0) {
            const existingCursos = await Curso.find({ _id: { $in: cursos } });
            if (existingCursos.length !== cursos.length) {
                return res.status(400).json({
                    msg: "Uno o más IDs de cursos proporcionados no existen en la base de datos."
                });
            }
        }

        // Validar restricciones según el role (asumir que existingPersona tiene el campo role)
        if (existingPersona.role === "STUDENT_ROLE" && cursos && cursos.length > 3) {
            return res.status(400).json({
                msg: "El role STUDENT_ROLE solo puede tener asignados hasta 3 cursos."
            });
        }

        // Hash de la contraseña si se proporciona
        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        // Incluir el campo cursos en la actualización
        resto.cursos = cursos;

        // Actualizar la persona en la base de datos
        await Persona.findByIdAndUpdate(id, resto);

        // Obtener la persona actualizada
        const persona = await Persona.findOne({ _id: id }).lean();

        res.status(200).json({
            msg: "Perfil Actualizado Correctamente!!!",
            persona
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al procesar la solicitud."
        });
    }
};


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