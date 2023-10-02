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
const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;


    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado el médico por id'
            });
        }

        const camposActualizado = { ...req.body, usuarios: uid }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, camposActualizado, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}
const borrarMedico = async (req, res = response) => {

    const id = req.params.id;


    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado el médico por id'
            });
        }


        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El médico ha sido eliminado'
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}