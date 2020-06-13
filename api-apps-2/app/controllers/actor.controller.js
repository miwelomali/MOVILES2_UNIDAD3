const Actor = require("../models/actor.model.js");

// Crear un nuevo actor
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede estar vacío!"
      });
    }
  
    // Crear un objeto actor con los datos recibidos
    const actor = new Actor({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    });
  
    // Enviar el objeto actor a la función para que se guarde en la BD
    Actor.create(actor, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al crear el actor."
        });
      else res.send(data);
    });
  };
  
  // Recuperar todos los actores de la tabla.
  exports.findAll = (req, res) => {
    Actor.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al recuperar los actores."
        });
      else res.send(data);
    });
  };
  
  // Encontrar un actor con su ID
  exports.findOne = (req, res) => {
    Actor.findById(req.params.actorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró el actor con su id ${req.params.actorId}.`
          });
        } else {
          res.status(500).send({
            message: "Error recuperando el actor con su id " + req.params.actorId
          });
        }
      } else res.send(data);
    });
  };
  
  // Actualizar un actor con su id
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede estar vacío!"
      });
    }
  
    console.log(req.body);
  
    Actor.updateById(req.params.actorId, new Actor(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se encuentra el actor con el id ${req.params.actorId}.`
            });
          } else {
            res.status(500).send({
              message: "Error actualizando el actor con el id " + req.params.actorId
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Borrar un actor con el Id
  exports.delete = (req, res) => {
    Actor.remove(req.params.actorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra el actor con el id ${req.params.actorId}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo borrar el actor con el id " + req.params.actorId
          });
        }
      } else res.send({ message: `Actor borrado exitosamente!` });
    });
  };
  
  // Borrar todos los actores en la BD.
  exports.deleteAll = (req, res) => {
    Actor.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrió un error al borrar todos los actores."
        });
      else res.send({ message: `Todos los actores fueron borrados exitosamente!` });
    });
  };
  