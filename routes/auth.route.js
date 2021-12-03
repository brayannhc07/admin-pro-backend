/**
 * Path: '/api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.post('/', [
	check('email', 'El email es obligatorio.').isEmail(),
	check('password', 'La contraseña es obligatoria.').not().isEmpty(),
	validarCampos
], login);

router.post('/google', [
	check('token', 'El token de google es obligatorio.').not().isEmpty(),
	validarCampos
], googleSignIn);

router.get('/renew', validarJWT, renewToken);


module.exports = router;