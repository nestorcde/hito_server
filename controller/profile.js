const { response } = require("express");
const Usuario = require('../models/usuario');
var fs = require('fs');

const updateProfile = async (req, res = response) => {

    try {

        const { uid, nombre, telefono } = req.body;

        const usuario = await Usuario.findOne({_id: uid});

        usuario.nombre = nombre;
        usuario.telefono = telefono;

        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    
};


module.exports = {
    updateProfile
};