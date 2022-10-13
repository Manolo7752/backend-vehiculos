import bodyParser from "body-parser";
import mongoose from "mongoose";
import Server from "./classes/server";
import defaultRoutes from "./routes/defaul.routes";
import vehiculoRoutes from "./routes/vehiculo.routes";

const server = new Server();

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