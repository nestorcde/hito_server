//{
//     /api/usuarios
//}

const {Router, response} = require('express');
const { check } = require('express-validator');
const { getUsuarios, updateUsuario } = require('../controller/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();




router.get('/',validarJWT, getUsuarios);
router.post('/',[
    check('idUsuario','El idUsuario es obligatorio').notEmpty(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('tipo','El tipo es obligatorio').notEmpty(),
    validarCampos,
    validarJWT],
    updateUsuario);








module.exports = router;