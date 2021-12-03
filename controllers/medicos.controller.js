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

const actualizarMedico = async (req, res) => {
  const medicoId = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(medicoId);

    if (!medico) {
      return (
        res.status(404),
        json({
          ok: false,
          msg: "Médico no encontrado por id.",
        })
      );
    }
    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      medicoId,
      cambiosMedico,
      { new: true }
    );
    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador.",
    });
  }
};

const eliminarMedico = async (req, res) => {
  const medicoId = req.params.id;

  try {
    const medico = await Medico.findById(medicoId);

    if (!medico) {
      return (
        res.status(404),
        json({
          ok: false,
          msg: "Médico no encontrado por id.",
        })
      );
    }

    await Medico.findOneAndDelete(medicoId);

    res.json({
      ok: true,
      msg: "Médico eliminado.",
      medico,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador.",
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
