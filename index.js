const express = require('express');
const {dbConnection} =require('./database/config');
require('dotenv').config(); //Le dice a Node que busque en el file sysmtem el archivo .env y setea las variables 

//Crear el servidor de express
const app=express();

//Conexión con base de datos
dbConnection();

//Petición get
app.get('/',(req,res)=>{
    res.json({ok:true})
});

app.listen(process.env.PORT,()=>{
    console.log('hola mundo'+process.env.PORT)
})