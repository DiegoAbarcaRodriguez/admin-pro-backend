/* 
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getUsuarios); // Asocia / con la ruta /api/usuarios

router.post('/',
    [   //Middlewares funciones que se ejecutan antes de los controller de una ruta, generalmente para validar la data enviada.
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], crearUsuario);

router.put('/:id',
    [   //Middlewares funciones que se ejecutan antes de los controller de una ruta, generalmente para validar la data enviada.
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ], actualizarUsuario
);

router.delete('/:id', validarJWT, borrarUsuario)

module.exports = router;