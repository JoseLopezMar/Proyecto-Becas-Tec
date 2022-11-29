const mongoose = require("mongoose");

const becasSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    monto: {type: Number, required: true},
    fechaApertura: {type: String, required: true},
    fechaCierre: {type: String, required: true},
    limitePostulantes: {type: Number, required: true},
    limiteAceptados: {type: Number, required: true},
    nivelEducativo: {type: String, required: true}
});

module.exports = mongoose.model('Beca', becasSchema);
