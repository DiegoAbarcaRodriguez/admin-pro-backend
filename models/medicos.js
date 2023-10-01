const { Schema, model } = require('mongoose');

const medicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuarios: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospitales: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }


});
//Reescibe valores por default definidos por mongo
medicoSchema.method('toJSON', function () { //Función regular alude a la instancia creada!! con this
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Medico', medicoSchema);