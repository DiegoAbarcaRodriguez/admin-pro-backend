const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const { response } = require('express');

const fileUpload = (req, res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    const tipoValidos = ['usuarios', 'medicos', 'hospitales'];

    if (!tipoValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario o hospital (tipo)'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo cargado'
        });
    }


    //procesar la imagen
    const file = req.files.imagen;
    const nombre = file.name;

    //Extraer extensión 
    const nombreCortado = nombre.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    //Mover la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, async (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Ha ocurrido un error al mover la imagen"
            });
        }

        //Guardar en la base de datos
        await actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: "Archivo subido",
            nombreArchivo
        });

    });



}

const retonarImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);


    //Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg =  path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    retonarImagen
}