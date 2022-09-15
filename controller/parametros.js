const { response } = require("express");

const Parametro = require('../models/parametros');
const Paises = require('../models/paises');



const crearParametro = async (req, res = response) => {

    const { precioLocal, plusMercosur, plusNoMercosur } = req.body;

    try {
        // const existeUsuario = await Usuario.findOne({idUsuario});

        if(precioLocal <= 0 || plusMercosur <= 0 || plusNoMercosur <= 0){
            return res.status(400).json({
                ok:false,
                msg: 'Complete los campos que son Obligatorios'
            });
        }

        const parametro = new Parametro( req.body );

        await parametro.save();
        const pais = await Paises.findById(req.body.paises);
        parametro.paises = pais;


        res.json({
            ok: true,
            msg: 'Parametro registrado',
            parametro,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            parametro: {
                "precioLocal": 0,
                "plusMercosur": 0,
                "plusNoMercosur": 0,
                "plusFinde": 0,
                "descMenores": 0,
                "descMayores": 0,
                "paises": {
                    "_id": "",
                    "idPais": 0,
                    "nombre": "",
                    "mercosur": false
                },
                "uid": ""
            },
        });
    }

    
};

const getParametro = async (req, res = response) => {

    //const { precioLocal, precioExtranjero } = req.body;

    try {
        // const existeUsuario = await Usuario.findOne({idUsuario});

        // if(precioLocal <= 0 || precioExtranjero <= 0){
        //     return res.status(400).json({
        //         ok:false,
        //         msg: 'Los precios son Obligatorios'
        //     });
        // }

        const parametro = await Parametro.findOne()
        .populate('paises', 'idPais nombre mercosur');

        //await parametro.save();

        if(parametro){
            res.json({
                ok: true,
                msg: "Parametro devueltos",
                parametro,
            });
        }else{
            
            res.json({
                ok: false,
                msg: "No hay registro de parametro",
                parametro: {
                    "precioLocal": 0,
                    "plusMercosur": 0,
                    "plusNoMercosur": 0,
                    "plusFinde": 0,
                    "descMenores": 0,
                    "descMayores": 0,
                    "paises": {
                        "_id": "",
                        "idPais": 0,
                        "nombre": "",
                        "mercosur": false
                    },
                    "uid": ""
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            parametro: {
                "precioLocal": 0,
                "plusMercosur": 0,
                "plusNoMercosur": 0,
                "plusFinde": 0,
                "descMenores": 0,
                "descMayores": 0,
                "paises": {
                    "_id": "",
                    "idPais": 0,
                    "nombre": "",
                    "mercosur": false
                },
                "uid": ""
            },
        });
    }

    
};

const updateParametro = async (req, res = response) => {

    try {

        const { uid, precioLocal, plusMercosur, plusNoMercosur, plusFinde, descMenores, descMayores, paises} = req.body;

        if(precioLocal <= 0 || plusMercosur <= 0 || plusNoMercosur <= 0){
            return res.status(400).json({
                ok:false,
                msg: 'Complete los campos que son Obligatorios'
            });
        }

        const parametro = await Parametro.findOne({_id: uid});

        parametro.precioLocal = precioLocal;
        parametro.plusMercosur = plusMercosur;
        parametro.plusNoMercosur = plusNoMercosur;
        parametro.plusFinde = plusFinde;
        parametro.descMenores = descMenores;
        parametro.descMayores = descMayores;
        parametro.paises = paises;

        await parametro.save();
        const pais = await Paises.findById(paises);
        parametro.paises = pais;
        // parametro.paises.idPais = pais.idPais;
        // parametro.paises.nombre = pais.nombre;
        // parametro.paises.mercosur = pais.mercosur;

        res.json({
            ok: true,
            msg: 'Parametro registrado',
            parametro
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            parametro: {
                "precioLocal": 0,
                "plusMercosur": 0,
                "plusNoMercosur": 0,
                "plusFinde": 0,
                "descMenores": 0,
                "descMayores": 0,
                "paises": {
                    "_id": "",
                    "idPais": 0,
                    "nombre": "",
                    "mercosur": false
                },
                "uid": ""
            },
        });
    }

    
};


module.exports ={
    crearParametro,
    updateParametro,
    getParametro
};