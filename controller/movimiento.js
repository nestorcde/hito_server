const { response } = require("express");
const { } = require("mongoose");
const Movimientos = require('../models/movimiento');
const Usuario = require('../models/usuario');
const Paises = require('../models/paises');




const getMovimientos = async (req, res = response)  => {
    
    const {fchDesde, fchHasta, idUsuario = "" } = req.body;

    try {
        if(fchDesde==='' || fchHasta===''){
            res.json({
                ok:false,
                msg: "Ingrese rango de fecha"
            });
        }else{
            var movimientos;
            if(idUsuario==""){
                movimientos = await Movimientos.find({fchHra:{$gte:fchDesde,$lte:fchHasta}})
                .populate('idUsuario', 'nombre idUsuario')
                .populate('idPais', 'nombre idPais');
            }else{
                movimientos = await Movimientos.find({fchHra:{$gte:fchDesde,$lte:fchHasta}, idUsuario})
                .populate('idUsuario', 'nombre idUsuario')
                .populate('idPais', 'nombre idPais');
            }
            //{fchHra:{$gte:Date(fchDesde),$lte:Date(fchHasta)}}
            if(movimientos){
                if(movimientos.length > 0){
                    var cantMovLocal = 0;
                    var cantMovMerc = 0;
                    var cantMovNoMerc = 0;
                    var impMovLocal = 0;
                    var impMovMerc = 0;
                    var impMovNoMerc = 0;
                    movimientos.forEach((movimiento)=>{
                        if(movimiento.tipoIngreso==1){
                            cantMovLocal++;
                            impMovLocal += movimiento.importe;
                        }
                        if(movimiento.tipoIngreso==2){
                            cantMovMerc++;
                            impMovMerc += movimiento.importe;
                        }
                        if(movimiento.tipoIngreso==3){
                            cantMovNoMerc++;
                            impMovNoMerc+=movimiento.importe;
                        }
                    });
                    res.json({
                        ok:true,
                        //movimientos,
                        msg: "Resumen de movimientos",
                        resumen : {
                            "cantMovLocal": cantMovLocal,
                            "impMovLocal": impMovLocal,
                            "cantMovMerc":cantMovMerc,
                            "impMovMerc": impMovMerc,
                            "cantMovNoMerc": cantMovNoMerc,
                            "impMovNoMerc": impMovNoMerc
                        }
                    });
                }else{
                    res.json({
                        ok:false,
                        msg: "Sin movimientos",
                        resumen : {
                            "cantMovLocal": 0,
                            "impMovLocal": 0,
                            "cantMovMerc":0,
                            "impMovMerc": 0,
                            "cantMovNoMerc": 0,
                            "impMovNoMerc": 0
                        }
                    });
                }
            }else{
                res.json({
                    ok:false,
                    msg: "Sin movimientos",
                    resumen : {
                        "cantMovLocal": 0,
                        "impMovLocal": 0,
                        "cantMovMerc":0,
                        "impMovMerc": 0,
                        "cantMovNoMerc": 0,
                        "impMovNoMerc": 0
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            resumen : {
                "cantMovLocal": 0,
                "impMovLocal": 0,
                "cantMovMerc":0,
                "impMovMerc": 0,
                "cantMovNoMerc": 0,
                "impMovNoMerc": 0
            }
        });

    }
    
    
};

const registrarMovimiento = async (req, res = response ) => {
    try {
        const movimiento = new Movimientos(req.body);
        await movimiento.save();
        return res.status(200).json({
            ok: true,
            msg: 'Movimiento Registrado',
            fecha: movimiento.fchHra
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Error: Hable con el administrador',
            fecha: "2000-01-01T00:00:00.000Z"
        });
    }
};


module.exports = {
    getMovimientos,
    registrarMovimiento
}