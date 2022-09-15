const {Router, response} = require('express');
const { check } = require('express-validator');
const { updateProfile, setUsuarioImage } = require('../controller/profile');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/', [
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('telefono','El telefono es obligatorio').notEmpty(),
    check('telefono','El telefono debe ser valido').isMobilePhone('es-PY'),
    validarCampos,
    validarJWT
] , updateProfile);

module.exports = router;