const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

const getBusqueda = async (req, res) => {

    const query = req.params.busqueda;
    const regex = new RegExp(query, 'i');

    try {

        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
        ]);

        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte al administrado'
        });
    }
}


const getDocumentosColeccion = async (req, res) => {
    const tabla = req.params.tabla;
    const query = req.params.busqueda;
    const regex = new RegExp(query, 'i');
    let data = [];

    try {

        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                    .populate('usuarios', 'nombre img')
                    .populate('hospitales', 'nombre img')
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('usuarios', 'nombre img')
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex })
                break;

            default:
                return res.status(404).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/hospitales/medicos'
                })

        }

        res.json({
            ok: true,
            resultados: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte al administrado'
        });
    }
}

module.exports = {
    getBusqueda,
    getDocumentosColeccion
}