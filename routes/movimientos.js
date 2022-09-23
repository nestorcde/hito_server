//{
//     /api/usuarios
//}

const {Router, response} = require('express');
const { getMovimientos, registrarMovimiento, getMovimientosDet } = require('../controller/movimiento');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.post('/',validarJWT, getMovimientos);
router.post('/det',validarJWT, getMovimientosDet);
router.post('/nuevo',validarJWT,registrarMovimiento);








module.exports = router;