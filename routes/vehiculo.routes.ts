import { Request, Response, Router } from "express";
import { Vehiculo } from "../models/vehiculo.model";


const vehiculoRoutes = Router();

vehiculoRoutes.get('/',async(req:Request,res:Response)=>{
   
   const vehiculos = await Vehiculo.find();

    return res.json({
        ok:true,
        vehiculos

    })
})

vehiculoRoutes.get('/paging', async(req:Request,res:Response)=>{

    let perPage = 4;
    let page = Number(req.query.page) || 1;
    let skip = page-1;
    skip = skip*perPage;

    const vehiculos = await Vehiculo.find().skip(skip).limit(perPage);

    return res.json({
        ok:true,
        vehiculos
    })

});



vehiculoRoutes.post('/',(req:Request,res:Response)=>{

    const body = req.body;
    
    const vehiculo = {
        marca:body.marca,
        modelo:body.modelo,
        motor:body.motor,
        imagen:body.imagen
    }

    Vehiculo.create(vehiculo).then(vehiculoDb =>{

        return res.json({
            ok:true,
            vehiculoDb 
         })
    }).catch(err=>{
        return res.json({
            ok:false,
            err 
         })
    })

    
});

vehiculoRoutes.put('/:id',(req:Request,res:Response)=>{

    const vehiculoId = req.params.id;
    const body = req.body;

    const vehiculo = {
        marca:body.marca,
        modelo:body.modelo,
        motor:body.motor,
        imagen:body.imagen
    } 

    Vehiculo.findByIdAndUpdate(vehiculoId,vehiculo).then(vehiculoDb=>{

        return res.json({
            ok:true,
            vehiculoDb
        })
        
    })
    
});

vehiculoRoutes.delete('/',async(req:Request,res:Response)=>{

    const vehiculoId = req.query.id;

    if(!vehiculoId){

        return res.json({
            ok:false,
            msj:"El registro solicitado no existe"
        })    
    }

   

    Vehiculo.findByIdAndDelete(vehiculoId).then(vehiculo=>{

        return res.json({
            ok:true,
            msj:"Eliminado correctamente"
        })
    }).catch(err=>{

        return res.json({
            ok:false,
            msj:"El registro solicitado no existe"
        })    

    })

})



export default vehiculoRoutes;