const { response } = require("express");

const esTeacherRole = (req, resp = response, next) => {
    if (!req.persona) {
        return resp.status(500).json({
            msg: "se quiere verificar un role sin validar el token primero"
        });
    }

    const { role, nombre} = req.persona;

    if( role !== "TEACHER_ROLE") {
        return resp.status(401).json({
            msg: `${nombre} no es un administrador, no puedes usar este endpoint`
        });
    }
    next();
}

/*const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (rolesPermitidos.includes(req.persona.role)) {
            next();
        } else {
            res.status(403).json({ msg: 'No tienes permiso para realizar esta acción' });
        }
    };
};*/

module.exports = {
    esTeacherRole,
    verificarRol
}

