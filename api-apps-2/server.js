//El paquete express nos ayuda acrear las REST API's
const express = require("express");
//El paquete bodyParser nos ayuda a procesar las peticiones y crear objetos req.body necesarios
//para acceder en nuestras rutas.

const bodyParser = require("body-parser");
//Creamos una app usando el módulo express
const app = express();

// Asignamos el parser a la App, para hacer "Parsing" de peticiones de contenido: application/json
app.use(bodyParser.json());

// Asignamos el parser a la App, para hacer "Parsing" de peticiones de contenido: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Ejemplo: cuando la ruta es simple "/" mandaremos un mensaje
app.get("/", (req, res) => {
  res.json({ message: "PRUEBA API PARA APPS 2." });
});

require("./app/routes/actor.routes")(app);

// ASIGNAR PUERTO PARA PETICIONES
app.listen(3000, () => {
  console.log("Servidor jalando en el puerto 3000.");
});