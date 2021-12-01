require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Crear el servidor de express
const app = express();

// Configurar Cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios.route"));
app.use("/api/login", require("./routes/auth.route"));
app.use("/api/hospitales", require("./routes/hospitales.route"));
app.use("/api/medicos", require("./routes/medicos.route"));
app.use("/api/todo", require("./routes/busquedas.route"));
app.use("/api/upload", require("./routes/uploads.route"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriento en puerto " + process.env.PORT);
});
