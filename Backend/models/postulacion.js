const mongoose = require("mongoose");

const postulacionesSchema = mongoose.Schema({
    idPostulante: {type: String, required: true}, 
    idBeca: {type: String, required: true},
    ingresoMensual: {type: Number, required: true},
    promedioEscolar: {type: Number, required: true},
    gradoActual: {type: String, required: true},
    escuela: {type: String, required: true},
    estado: {type: String, required: true}
});

module.exports = mongoose.model('Postulacion', postulacionesSchema);
