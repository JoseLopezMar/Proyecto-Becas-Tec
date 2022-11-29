const mongoose = require("mongoose");

const postulanteSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    apellidoP: {type: String, required: true},
    apellidoM: {type: String, required: true},
    curp: {type: String, required: true},
    domicilio: {type: String, required: true},
    telefono: {type: String, required: true}
});

module.exports = mongoose.model('Postulante', postulanteSchema);
