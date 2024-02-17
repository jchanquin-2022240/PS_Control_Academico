const esTeacherRole = (req, resp, next) => {
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

module.exports = {
    esTeacherRole
}

