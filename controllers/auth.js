const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require("../models/usuario");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-fronted");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Verificar poassword
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        //Generar JWT 
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                email,
                nombre: name,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;

        }

        await usuario.save();

        //Generar JWT 
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenuFrontEnd(usuario.role)
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Ha ocurrido un error"
        });
    }

}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    try {
        const token = await generarJWT(uid);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario asociado al json web token!'
            })
        }



        res.json({
            ok: true,
            token,
            usuario,
            menu: getMenuFrontEnd(usuario.role)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error',
        })
    }

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}