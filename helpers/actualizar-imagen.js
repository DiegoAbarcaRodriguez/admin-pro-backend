const fs = require('fs')

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}



const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo;
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);

            if (!medico) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/${tipo}/${medico.img}`;
            borrarImagen(pathViejo);

            //Guarda nombre de imagen en la BD
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/${tipo}/${hospital.img}`;
            borrarImagen(pathViejo);

            //Guarda nombre de imagen en la BD
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/${tipo}/${usuario.img}`;
            borrarImagen(pathViejo);

            //Guarda nombre de imagen en la BD
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }
}

module.exports = {
    actualizarImagen
}