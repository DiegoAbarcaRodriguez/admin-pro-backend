/*
    Ruta: /api/hospitales
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales')

const router = Router();

router.get('/', validarJWT, getHospitales); // Asocia / con la ruta /api/usuarios

router.post('/',
    [   //Middlewares funciones que se ejecutan antes de los controller de una ruta, generalmente para validar la data enviada.
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], crearHospital);

router.put('/:id',
    [   //Middlewares funciones que se ejecutan antes de los controller de una ruta, generalmente para validar la data enviada.
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], actualizarHospital
);

router.delete('/:id', validarJWT, borrarHospital)

module.exports = router;