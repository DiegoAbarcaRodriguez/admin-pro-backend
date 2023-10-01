const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales= await Hospital.find()
                                    .populate('usuarios','nombre img'); // Se trae el campo nombre e img de la tabla vinculada usuarios

    res.json({
        ok: true,
        hospitales
    })
}
const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        ...req.body,
        usuarios: uid,
    });


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admnistrador'
        })
    }

}
const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obteniendo hospitales...'
    })
}
const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obteniendo hospitales...'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}