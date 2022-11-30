const mongoose = require("mongoose");

const postulanteSchema = mongoose.Schema({
    contrasena: {type: String, required: true},
    correo: {type: String, required: true},
    tipoUsuario: {type: String, required: true},
    nombre: {type: String, required: true},
    apellidoP: {type: String, required: true},
    apellidoM: {type: String, required: true},
    curp: {type: String, required: true},
    domicilio: {type: String, required: true},
    telefono: {type: String, required: true}
});

module.exports = mongoose.model('Postulante', postulanteSchema);
