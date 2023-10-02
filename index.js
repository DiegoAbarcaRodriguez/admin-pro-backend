require('dotenv').config(); //Le dice a Node que busque en el file sysmtem el archivo .env y setea las variables 
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Carpeta public
app.use(express.static('public'));

//Conexión con base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

//Petición get
// app.get('/',(req,res)=>{
//     res.json({ok:true})
// });

app.listen(process.env.PORT, () => {
    console.log('hola mundo' + process.env.PORT)
})