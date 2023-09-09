require('dotenv').config(); //Le dice a Node que busque en el file sysmtem el archivo .env y setea las variables 
const express = require('express');
const cors = require('cors')
const {dbConnection} =require('./database/config');

//Crear el servidor de express
const app=express();

//Configurar Cors
app.use(cors);


//Conexión con base de datos
dbConnection();

//Petición get
app.get('/',(req,res)=>{
    res.json({ok:true})
});

app.listen(process.env.PORT,()=>{
    console.log('hola mundo'+process.env.PORT)
})