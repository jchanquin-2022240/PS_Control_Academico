const Curso =  require('../models/curso');
const { response } = require('express');

const cursoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estadoCurso: true}

    const[total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

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
    const curso = Curso.findOne({id});

    //problemas con el traslado de convertir a .JSON
    res.status(200).json({
        msg: 'Curso Actualizado Exitosamente!!!',
        curso
    });

}

const cursosDelete = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findByIdAndUpdate(id, {estadoCurso: false});
    
    res.status(200).json({
        msq: 'Curso eliminado'
    });
}

module.exports = {
    cursosPost,
    cursoGet,
    getCursoById,
    putCursos,
    cursosDelete
}