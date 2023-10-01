const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const expressfileUpload = require('express-fileupload');
const { fileUpload, retonarImagen } = require("../controllers/uploads");

const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retonarImagen);

module.exports = router;