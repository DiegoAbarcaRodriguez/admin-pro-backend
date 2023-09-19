const mongoose = require('mongoose');
require('dotenv').config(); //Le dice a Node que busque en el file sysmtem el archivo .env y setea las variables 

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('DB online')
    } catch (error) {
        console.log(error);
        throw Error('Error a la hora de iniciar la BD')
    }

}

module.exports = { dbConnection }