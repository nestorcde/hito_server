const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken, resetPsw, chgPsw } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.post('/new', [
    check('idUsuario','El idUsuario es obligatorio').notEmpty(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('tipo','El tipo es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
] , crearUsuario);

router.post('/', [
    check('idUsuario','El idUsuario es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
] , login);

router.post('/repsw',[
    check('idUsuario','El idUsuario es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
],  validarJWT, resetPsw);

router.post('/chgpsw',[
    check('idUsuario','El idUsuario es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
],  validarJWT, chgPsw);

router.get('/renew',validarJWT, renewToken);








module.exports = router;