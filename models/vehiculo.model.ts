import { Document, model, Schema } from "mongoose";


const vehiculoSchema = new Schema({

    marca:{
        type : String,
        require : [true,'El nombre es requerido']
    },
    modelo:{
        type : String
    },
    motor:{
        type : String
    },
    imagen:{
        type : String,
        require : [true,'La imagen es requeria']
    }
});

interface IVehiculo extends Document{
    marca:string;
    modelo:string;
    motor:string;
    imagen:string
}

export const Vehiculo = model<IVehiculo>('Vehiculo',vehiculoSchema);