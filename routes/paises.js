//{
//     /api/usuarios
//}

const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearPais,getPaises,updatePaises } = require('../controller/paises');
const router = Router();




router.get('/', getPaises);
router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),],
    updatePaises);
    router.post('/new',[
        check('nombre','El nombre es obligatorio').notEmpty(),],
        crearPais);








module.exports = router;