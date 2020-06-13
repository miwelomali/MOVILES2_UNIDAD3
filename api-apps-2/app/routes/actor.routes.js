module.exports = app => {
  const actors = require("../controllers/actor.controller.js");

  // Crear nuevo actor
  app.post("/actors", actors.create);

  // Recuperar todos los actores
  app.get("/actors", actors.findAll);

  // Consultar un solo actor con su Id
  app.get("/actors/:actorId", actors.findOne);

  // Actualizar un actor con su Id
  app.put("/actors/:actorId", actors.update);

  // Borrar un actor con su Id
  app.delete("/actors/:actorId", actors.delete);

  // Borrar todos los actores
  app.delete("/actors", actors.deleteAll);
};