const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");



const crearUsuario = async (req, res = response) => {

   const { idUsuario, password } = req.body;

    try {
        const existeUsuario = await Usuario.findOne({idUsuario});

        if(existeUsuario){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario ya esta registrado'
            });
        }

        const Usuarios = new Usuario( req.body );

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();

        Usuarios.password = bcrypt.hashSync(password, salt);

        await Usuarios.save();

        //Generar mi JWT
        const token = await generarJWT(Usuarios.id);

        res.json({
            ok: true,
            Usuarios,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    
};


const login = async (req, res = response)=>{

    const {idUsuario, password} = req.body;

    try {

        //validar email
        const usuarioDB = await Usuario.findOne({ idUsuario });
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no registrado'
            });
        }

        //Validar Password
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        //Generar JWT

        const token = await generarJWT(usuarioDB.id);
        const usuarios = usuarioDB;
        res.json({
            ok: true,
            usuarios,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const renewToken = async (req, res = response) => {
    

    try {
        const uid = req.uid;

        const token = await generarJWT(uid);

        const usuarios = await Usuario.findById(uid);

        if(usuarios){
            res.json({
                ok:true,
                usuarios,
                token
            });
        }else{
            res.status(401).json({
                ok:false,
                usuarios,
                token
            });
        }
    } catch (error) {
        return res.status(401).json({
            ok: true,
            msg: 'Hable con el administrador'
        });

    }
    
    
};

const resetPsw = async (req, res = response) => {

    const { idUsuario, password } = req.body;

    try {
        const usuarios = await Usuario.findOne({idUsuario});

        if(!usuarios){
            return res.status(400).json({
                ok:false,
                msg: 'Usuario no registrado'
            });
        }

        //Validar Password
        const validarPassword = bcrypt.compareSync(password, usuarios.password);
        if(validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no puede ser la misma que la anterior.'
            });
        }
        //const Usuarios = new Usuario( req.body );

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();

        usuarios.password = bcrypt.hashSync(password, salt);
        usuarios.chPassword = true;

        await usuarios.save();

        //Generar mi JWT
        //const token = await generarJWT(usuarios.id);

        res.json({
            ok: true,
            msg: "Contraseña Reseteada con exito"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    
};

const chgPsw = async (req, res = response) => {

    const { idUsuario, password } = req.body;

    try {
        const usuarios = await Usuario.findOne({idUsuario});

        if(!usuarios){
            return res.status(400).json({
                ok:false,
                msg: 'Usuario no registrado'
            });
        }

        //Validar Password
        const validarPassword = bcrypt.compareSync(password, usuarios.password);
        if(validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no puede ser la misma que la anterior.'
            });
        }
        //const Usuarios = new Usuario( req.body );

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();

        usuarios.password = bcrypt.hashSync(password, salt);
        usuarios.chPassword = false;

        await usuarios.save();

        //Generar mi JWT
        //const token = await generarJWT(usuarios.id);

        res.json({
            ok: true,
            usuarios,
            msg: "Contraseña Modificada con exito"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    
};

module.exports ={
    crearUsuario,
    login,
    renewToken,
    resetPsw,
    chgPsw
};