const sql = require("./db.js");

// Constructor
const Actor = function(actor) {
  this.first_name = actor.first_name;
  this.last_name = actor.last_name;
};

Actor.create = (newActor, result) => {
  sql.query("INSERT INTO actor(first_name, last_name) values(?, ?)", [newActor.first_name, newActor.last_name], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Actor creado: ", { id: res.insertId, ...newActor });
    result(null, { id: res.insertId, ...newActor });
  });
};

Actor.findById = (id, result) => {
  sql.query(`SELECT * FROM actor WHERE actor_id = ?`,[id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Actor encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    //Actor no encontrado con el ID
    result({ kind: "not_found" }, null);
  });
};

Actor.getAll = result => {
  sql.query("SELECT * FROM actor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Actores: ", res);
    result(null, res);
  });
};

Actor.updateById = (id, actor, result) => {
  sql.query(
    "UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?",
    [actor.first_name, actor.last_name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró el actor con el id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Actor actualizado: ", { id: id, ...actor });
      result(null, { id: id, ...actor });
    }
  );
};

Actor.remove = (id, result) => {
  sql.query("DELETE FROM actor WHERE actor_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      //No se encontró el actor con el id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Actor borrado con el id: ", id);
    result(null, res);
  });
};

Actor.removeAll = result => {
  sql.query("DELETE FROM actor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Actores borrados ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = Actor;