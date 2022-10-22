const { response } = require("express");
const { } = require("mongoose");
const Movimientos = require('../models/movimiento');
const Usuario = require('../models/usuario');
const Paises = require('../models/paises');
const { DateTime } = require("luxon");




const getMovimientos = async (req, res = response)  => {
    
    let {fchDesde, fchHasta, idUsuario = "" } = req.body;

    try {
        if(fchDesde==='' || fchHasta===''){
            res.json({
                ok:false,
                msg: "Ingrese rango de fecha"
            });
        }else{
            var movimientos;
            fchDesde = fchDesde + " 00:00:00";
            fchHasta = fchHasta + " 23:59:59";
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
                            cantMovLocal+=movimiento.cantidad;
                            impMovLocal += movimiento.importe;
                        }
                        if(movimiento.tipoIngreso==2){
                            cantMovMerc+=movimiento.cantidad;
                            impMovMerc += movimiento.importe;
                        }
                        if(movimiento.tipoIngreso==3){
                            cantMovNoMerc+=movimiento.cantidad;
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

const getMovimientosDet = async (req, res = response)  => {
    
    let {fchDesde, fchHasta, idUsuario = "" } = req.body;

    try {
        if(fchDesde==='' || fchHasta===''){
            res.json({
                ok:false,
                msg: "Ingrese rango de fecha"
            });
        }else{
            var movimientos;
            var detalles = [];
            var cant = 0;
            var detalle;
            fchDesde = fchDesde + " 00:00:00";
            fchHasta = fchHasta + " 23:59:59";
            //console.log(`fchDesde: ${fchDesde} - fchHasta: ${fchHasta}`);
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
                movimientos.forEach((movimiento)=>{
                    cant ++;
                    const fecha = new Date(movimiento.fchHra).toLocaleString( { timeZone: 'America/Asuncion' });
                    detalle = {
                        "num": cant,
                        "movNum": movimiento.idMovimiento,
                        "fecha": movimiento.fchHra.toLocaleString('es-PY', {
                            timeZone: 'America/Asuncion'
                          }),
                        "cantidad": movimiento.cantidad,
                        "importe": movimiento.importe,
                        "pais": movimiento.idPais.nombre,
                        "usuario": movimiento.idUsuario.nombre
                    };
                    detalles.push(detalle);
                });
                res.json({
                    ok:true,
                    msg: "Detalle de movimientos",
                    detalles
                });
           }
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            detalles : []
        });

    }
    
    
};

const registrarMovimiento = async (req, res = response ) => {
    try {
        var ultMov;
        try {
            ultMov = await Movimientos.findOne({}).sort({idMovimiento: -1});
       } catch (error) {
           req.body.idMovimiento = 1;
           console.log(error);
       }

       if(ultMov){
           req.body.idMovimiento = ultMov.idMovimiento + 1;
       }else{
           req.body.idMovimiento = 1;
       }
        const movimiento = new Movimientos(req.body);
        movimiento.fchHra = Date.now();
        await movimiento.save();
        return res.status(200).json({
            ok: true,
            msg: 'Movimiento Registrado',
            movimiento
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

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}


module.exports = {
    getMovimientos,
    registrarMovimiento,
    getMovimientosDet
}
