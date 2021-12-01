const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre");

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uidUser = req.uid;
  const medico = new Medico({ usuario: uidUser, ...req.body });

  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador.",
    });
  }
};

const actualizarMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "actualizarMedico",
  });
};

const eliminarMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "eliminarMedico",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
