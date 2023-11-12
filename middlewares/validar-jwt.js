const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    //Recupera parametros enviador desde el header
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición '
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        //Envia en el request subsecuente el uid, ene ste caso al controller subsiguiente
        req.uid = uid;
        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}

const validarADMIN_ROLE = async (req, res, next) => {
    try {

        const uid = req.uid;

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        if (usuario.role != 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene los privilegios necesarios'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte a su administrador'
        })
    }

}
const validarADMIN_ROLE_o_Mismo_usuario = async (req, res, next) => {
    try {

        const uid = req.uid;
        const id = req.params.id;

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        if (usuario.role == 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene los privilegios necesarios'
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte a su administrador'
        })
    }

}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_Mismo_usuario
}