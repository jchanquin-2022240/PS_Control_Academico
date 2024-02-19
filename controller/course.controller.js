const Curso =  require('../models/curso');
const { response } = require('express');

const obtenerCursosAsignados = require('../helpers/db-validators').obtenerCursosAsignados;

const cursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estadoCurso: true };

    try {
        console.log('Persona:', req.persona);

        // Verifica si la persona tiene el rol STUDENT_ROLE
        if (req.persona.role === 'STUDENT_ROLE') {
            // Obtén los cursos asignados a la persona actual
            const cursosAsignados = await obtenerCursosAsignados(req.persona.id);
            console.log('Cursos asignados:', cursosAsignados);
            query._id = { $in: cursosAsignados }; // Filtra solo los cursos asignados a la persona
        }

        // Realiza la consulta de cursos con la nueva condición
        const [total, cursos] = await Promise.all([
            Curso.countDocuments(query),
            Curso.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        console.log('Total:', total);
        console.log('Cursos:', cursos);

        res.status(200).json({
            total,
            cursos
        });
    } catch (e) {
        console.error('Error en la consulta de cursos:', e);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

const getCursoById = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    });

}

const cursosPost = async (req,res) => {
    const {nombre, codigoCurso, descripcion, maestro} = req.body;
    const curso = new Curso({nombre, codigoCurso, descripcion, maestro});

    await curso.save();
    res.status(202).json({
        curso
    });
}

const putCursos = async ( req, res) => {
    const { id } = req.params;
    const { _id,nombre, codigoCurso,...resto} = req.body;

    await Curso.findByIdAndUpdate(id, resto);
    const curso = await Curso.findOne({_id: id}).lean();

    res.status(200).json({
        msg: 'Curso Actualizado Exitosamente!!!',
        curso
    });

}

const cursosDelete = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findByIdAndUpdate(id, {estadoCurso: false});
    
    res.status(200).json({
        msq: 'Curso eliminado',
        curso
    });
}

module.exports = {
    cursosPost,
    cursoGet,
    getCursoById,
    putCursos,
    cursosDelete
}