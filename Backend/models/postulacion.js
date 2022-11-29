const mongoose = require("mongoose");

const postulacionesSchema = mongoose.Schema({
    //idUsuario: {type: String, required: true}, 
    //idBeca: {type: String, required: true},
    postulante: {type: String, required: true}, 
    beca: {type: String, required: true},
    ingresoMensual: {type: Number, required: true},
    promedioEscolar: {type: Number, required: true},
    gradoActual: {type: Number, required: true},
    escuela: {type: String, required: true},
    estado: {type: String, required: true}
});

module.exports = mongoose.model('Postulacion', postulacionesSchema);
