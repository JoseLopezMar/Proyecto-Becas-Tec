const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    contrasena: {type: String, required: true},
    correo: {type: String, required: true},
    tipoUsuario: {type: String, required: true}
});

module.exports = mongoose.model('Usuario', usuarioSchema);
