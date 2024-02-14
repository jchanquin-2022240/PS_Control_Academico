const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del maestro es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    },
    cursos:{
        type: String,
        required: [true, 'El curso es obligatorio']
    },
    role:{
        type: String,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]

    },
    estado:{
        type: Boolean,
        default: true
    }
});


module.exports = model('Persona', PersonaSchema);