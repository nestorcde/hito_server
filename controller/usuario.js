const { response } = require("express");
const Usuario = require('../models/usuario');




const getUsuarios = async (req, res = response)  => {
    

    try {

        usuarios = await Usuario.find();
        
        res.json({
            ok:true,
            msg:"Lista de Usuarios",
            usuarios
        });
    } catch (error) {
        return res.status(401).json({
            ok: true,
            msg: 'Hable con el administrador'
        });

    }
    
    
};

const updateUsuario = async (req, res = response)  => {
    
    const { uid, nombre, tipo } = req.body;
    try {

        usuarios = await Usuario.findById({ _id: uid });

        usuarios.nombre = nombre;
        usuarios.tipo = tipo;

        await usuarios.save();
        
        res.json({
            ok:true,
            msg: "Modificacion Realizada",
            usuarios
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            "usuarios": {
                "idUsuario": "",
                "nombre": "",
                "tipo": "",
                "uid": ""
            }
        });

    }
    
    
};




module.exports = {
    getUsuarios,
    updateUsuario
};