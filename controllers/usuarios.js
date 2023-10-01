const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google') // Denota que campos serán retornados de la colección Usuario
        .skip(desde)  //Se salta los registro de la BD indicados
        .limit(5),

        Usuario.count()

    ]);

    
    res.json({ usuarios, token: req.uid, total });


};

const crearUsuario = async (req, res) => {
    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save(); //Almacena usuario en la base de datos

        //Generar JWT 
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const actualizarUsuario = async (req, res) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id!'
            })
        }

        //Actualizaciones
        const { email, password, google, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email!'
                });
            }

        }



        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            msg: usuarioActualizado
        })

    } catch (error) {
        res.status(400).json(
            {
                ok: false,
                msg: 'Error inesperado'
            }
        )
    }
}

const borrarUsuario = async (req, res) => {

    const uid = req.params.id;

    try {

        const existeEmail = await Usuario.findById(uid);

        if (!existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese Id!'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuarios eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador!'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}