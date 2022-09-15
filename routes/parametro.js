const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearParametro, getParametro, updateParametro} = require('../controller/parametros');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();




router.post('/new', [
    check('precioLocal','El Precio Local es obligatorio').notEmpty(),
    check('plusMercosur','El Plus Mercosur es obligatorio').notEmpty(),
    check('plusNoMercosur','El Plus No Mercosur es obligatorio').notEmpty(),
    validarCampos
] , crearParametro);

router.get('/',getParametro);
router.post('/', [
    check('precioLocal','El Precio Local es obligatorio').notEmpty(),
    check('plusMercosur','El Plus Mercosur es obligatorio').notEmpty(),
    check('plusNoMercosur','El Plus No Mercosur es obligatorio').notEmpty(),
    validarCampos
] ,updateParametro);








module.exports = router;