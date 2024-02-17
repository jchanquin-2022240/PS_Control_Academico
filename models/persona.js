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
        default: "none"
    },
    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});


/*PersonaSchema.methods.toJSON = function () {
    const{__v, password, _id,...persona} = this.toObject();
    persona.uid = _id;
    return persona;
}*/

module.exports = model('Persona', PersonaSchema);