/**
 * Path: '/api/medicos'
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campo");

const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} = require("../controllers/medicos.controller");

const router = Router();

router.get("/", validarJWT, getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "Es necesario el nombre del médico.").not().isEmpty(),
    check("hospital", "Es necesario el id del hospital.").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "Es necesario el nombre del médico.").not().isEmpty(),
    check("hospital", "Es necesario el id del hospital.").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

router.delete("/:id", validarJWT, eliminarMedico);

module.exports = router;
