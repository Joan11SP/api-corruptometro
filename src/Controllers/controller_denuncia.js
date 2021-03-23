const consul = require('../Consultas/consulta_denuncia');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'dm8jnpxaf',
    api_key:'351546717888564',
    api_secret:'7ThWaEOgU4U9LfUPzgp7rYGEYHc',    
});
const nueva_denuncia = async (req,res) => {
    try {
        const denuncia = req.body;
        const file = req.file;
        console.log(req.file);
        console.log(denuncia)
        if(denuncia.idInstitucion || denuncia.nivelCorrupcion || denuncia.detallesDenuncia){
            var foto
           if(file != null){
                foto = await cloudinary.uploader.upload(
                    file.path,{ folder:'Corruptometro'}
                  );
                foto = foto.url
            }
            denuncia.archivo = foto;
            const guardar = await consul.crear_denuncia(denuncia);
            if(guardar.respuesta == 1){
                res.json({mensaje:'Se realizo correctamente', ok:1})
            }else{                
                res.json({mensaje:'No se pudo completar', ok:0})
            }
        }
        else{                
            res.json({mensaje:'Informacion incompleta', ok:0})
        }
    } catch (error) {
        console.log(error)
        res.json({mensaje:'Error', ok:0})
    }
}
const buscar_anonima = async (req,res) => {
    try {
        
        const buscar = await consul.buscar_denuncia_anonima();
        res.json(buscar)
        

    } catch (error) {
        res.json({mensaje:'Error', ok:2})
    }
}
const buscar_no_anonima = async (req,res) => {
    try {
        
        const buscar = await consul.buscar_denuncia_no_anonima();
        res.json(buscar)
        

    } catch (error) {
        res.json({mensaje:'Error', ok:2})
    }
}
const datos_lista = async (req,res) => {
    try {
        
        const buscar = await consul.obtner_datos_lista();
        res.json(buscar)
        

    } catch (error) {
        res.json({mensaje:'Error', ok:2})
    }
}
const datos_lista_institucion = async (req,res) => {
    try {
        
        if(req.body.idProvincia){
            const buscar = await consul.obtner_institucion(req.body);
            res.json(buscar)
        }else{
            res.json({mensaje:'Informacion incompleta', ok:0, resultados:null})
        }
        

    } catch (error) {
        res.json({mensaje:'Error', ok:2})
    }
}
const filtro_insitutciones = async (req,res) => {
    try {
        
        const buscar = await consul.filtrar_institucion(req.body);
        res.json(buscar);        

    } catch (error) {
        res.json({mensaje:'Error', ok:2})
    }
}
module.exports = {
    nueva_denuncia,
    buscar_anonima,
    buscar_no_anonima,
    datos_lista,
    datos_lista_institucion,
    filtro_insitutciones
}