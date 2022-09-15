const { response } = require("express");
const Paises = require('../models/paises');


const crearPais = async (req, res = response) => {

    const { nombre } = req.body;
 
     try {
         const existePaises = await Paises.findOne({nombre});
 
         if(existePaises){
             return res.status(400).json({
                 ok:false,
                 msg: 'El Pais ya esta registrado'
             });
         }
         var ultPais;
        try {
             ultPais = await Paises.findOne({}).sort({idPais: -1});
        } catch (error) {
            req.body.idPais = 1;
            console.log(error);
        }

        if(ultPais){
            req.body.idPais = ultPais.idPais + 1;
        }else{
            req.body.idPais = 1;
        }
 
         const paises = new Paises( req.body );
 
         await paises.save();
 
         res.json({
             ok: true,
             msg: 'Pais creado',
             paises
         });
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Hable con el Administrador',
             "paises": {
                 "idPais": "",
                 "nombre": "",
                 "mercosur": false,
                 "uid": "",
             }
         });
     }
 
     
 };

const getPaises = async (req, res = response)  => {
    

    try {

        paises = await Paises.find();
        
        res.json({
            ok:true,
            msg:"Lista de Paises",
            paises
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            "paises": [{
                "idPais": "",
                "nombre": "",
                "mercosur": false,
                "uid": "",
            }]
        });

    }
    
    
};

const updatePaises = async (req, res = response)  => {
    
    const { idPais, nombre, mercosur } = req.body;
    try {

        paises = await Paises.findOne({ idPais: idPais });

        paises.nombre = nombre;
        paises.mercosur = mercosur;

        await paises.save();
        
        res.json({
            ok:true,
            msg: "Modificacion Realizada",
            paises
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            "paises": {
                "idPais": "",
                "nombre": "",
                "mercosur": false,
                "uid": "",
            }
        });

    }
    
    
};




module.exports = {
    getPaises,
    updatePaises,
    crearPais
};