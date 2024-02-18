const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del curso es obligatorio']
    },
    codigoCurso:{
        type: String,
        required: [true, 'El codigo del curso es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    //validar si existe el maestro
    maestro:{
        type: String,
        ref: 'Persona',
        require: [true, 'El maestro es obligatorio']
    },
    estadoCurso:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);