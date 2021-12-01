/**
 * Path: '/api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campo');

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

module.exports = router;