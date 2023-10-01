const jwt = require('jsonwebtoken');

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
        req.uid=uid;
        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
    
}

module.exports = {
    validarJWT
}