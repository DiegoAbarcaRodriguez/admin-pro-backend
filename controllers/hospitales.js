const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuarios', 'nombre img'); // Se trae el campo nombre e img de la tabla vinculada usuarios

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
const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }


        const cambiosHospital = {
            ...req.body,
            usuarios: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }

}
const borrarHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }


        await Hospital.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}