const { response } = require('express');
const Medico = require('../models/medicos');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuarios', 'nombre img')
                                .populate('hospitales', 'nombre img');

    res.json({
        ok: true,
        medicos
    })
}
const crearMedico = async (req, res = response) => {

    const uid = req.uid;

    try {

        const medico = new Medico(req.body);
        medico.usuarios = uid;
        await medico.save();

        res.json({
            ok: true,
            medico,
            msg: ''
        })


    } catch (err) {
        console.log(err)
        res.status('500').json({
            ok: false,
            msg: 'Consulte al administrador'
        });
    }

}
const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obteniendo medicos...'
    })
}
const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obteniendo medicos...'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}