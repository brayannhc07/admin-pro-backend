const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		const usuarioDB = await Usuario.findOne({ email });
		// Verificar email
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "Email no encontrado.",
			});
		}

		// Verificar contraseña

		const validPassword = bcrypt.compareSync(password, usuarioDB.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Contraseña no válida.",
			});
		}

		// Generar un token - JWT
		const token = await generarJWT(usuarioDB.id);

		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador.",
		});
	}
};

const googleSignIn = async (req, res = response) => {
	const googleToken = req.body.token;

	try {
		const { name, email, picture } = await googleVerify(googleToken);

		const usuarioDB = await Usuario.findOne({ email });
		let usuario;

		if (!usuarioDB) {
			// Si no existe el usuario
			usuario = new Usuario({
				nombre: name,
				email,
				password: "@@@",
				img: picture,
				google: true
			});
		} else {
			// si existe
			usuario = usuarioDB;
			usuario.google = true;
		}

		// Guardar en base de datos

		await usuario.save();
		// Generar token
		const token = await generarJWT(usuario);

		res.json({
			ok: true,
			token
		});

	} catch (error) {
		console.log(error);
		res.status(401).json({
			ok: false,
			msg: "El token no es correcto.",

		});
	}
};

const renewToken = async (req, res = reponse) => {
	const uid = req.params.id;

	const token = await generarJWT(uid);
	res.json({
		ok: true,
		token
	});
};

module.exports = {
	login,
	googleSignIn,
	renewToken
};
