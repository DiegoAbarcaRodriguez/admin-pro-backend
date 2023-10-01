const { Schema, model } = require('mongoose');

const hospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuarios: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }


}, { collection: 'hospitales' }); //Seter nombre de la tabla en Mongo DB
//Reescibe valores por default definidos por mongo
hospitalSchema.method('toJSON', function () { //Función regular alude a la instancia creada!! con this
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', hospitalSchema);