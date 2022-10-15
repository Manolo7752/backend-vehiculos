import bodyParser from "body-parser";
import mongoose from "mongoose";
import Server from "./classes/server";
import defaultRoutes from "./routes/defaul.routes";
import vehiculoRoutes from "./routes/vehiculo.routes";
import core from "cors";
import express from "express";

const app =express();
const server = new Server();

server.app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requeted-With,content-type');
    next();
    
});



server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended:true}));


server.app.use('/',defaultRoutes);
server.app.use('/vehiculos',vehiculoRoutes);

mongoose.connect('mongodb+srv://usr_vehiculos:vehiculos2022@cluster0.3izzg9s.mongodb.net/autosdb',(error)=>{
    if(error){
        throw error;
    }

    console.log('Base de datos online');
})

server.Start(()=>{

    console.log(`Servidor corriendo en puerto ${server.port}`)
})