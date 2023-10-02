/*
    Ruta: /api/hospitales
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos')

const router = Router();

router.get('/', validarJWT, getMedicos); // Asocia / con la ruta /api/usuarios

router.post('/',
    [   //Middlewares funciones que se ejecutan antes de los controller de una ruta, generalmente para validar la data enviada.
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospitales','Debe ser un id válido de MongoDB').isMongoId(),
        validarCampos
    ], crearMedico);

router.put('/:id',
    [   //Middlewares funciones que se ejecutan antes de los controller de una ruta, generalmente para validar la data enviada.
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospitales','Debe ser un id válido de MongoDB').isMongoId(),
        validarCampos
    ], actualizarMedico
);

router.delete('/:id', validarJWT, borrarMedico)

module.exports = router;