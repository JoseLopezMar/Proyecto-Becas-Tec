const express = require('express');
const Postulante = require('../models/postulante');
const Postulacion = require('../models/postulacion');
const Beca = require('../models/beca');
const router = express.Router();
const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Extensión no válida');
        if (isValid) {
            error = null;
        }
        cb(error, "Backend/images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

//------------------------------------------ POSTULANTES ------------------------------------------

router.post('/postulante', (req, res, next) => {
    const postulante = new Postulante({
        contrasena: req.body.contrasena,
        correo: req.body.correo,
        tipoUsuario: req.body.tipoUsuario,
        nombre: req.body.nombre,
        apellidoP: req.body.apellidoP,
        apellidoM: req.body.apellidoM,
        curp: req.body.curp,
        domicilio: req.body.domicilio,
        telefono: req.body.telefono
    });
    postulante.save().then(createdPostulante => {
        res.status(201).json(
            {
                message: 'Postulante agregado correctamente',
                postulanteId: createdPostulante._id
            }
        )
    });
})

router.put('/postulante/:id', (req, res, next) => {
    const postulante = new Postulante({
        _id: req.body.id,
        contrasena: req.body.contrasena,
        correo: req.body.correo,
        tipoUsuario: req.body.tipoUsuario,
        nombre: req.body.nombre,
        apellidoP: req.body.apellidoP,
        apellidoM: req.body.apellidoM,
        curp: req.body.curp,
        domicilio: req.body.domicilio,
        telefono: req.body.telefono
    });
    Postulante.updateOne({_id: req.params.id}, postulante).then(result => {
        res.status(200).json({message: 'Postulante actualizada correctamente'})
    });
});

router.get('/postulante', (req, res, next) => {
    Postulante.find().then(documents => {
        res.status(200).json(
            {message: '¡Postulantes expuestos con exito!', postulantes: documents}
        )
    });
});

router.get('/postulante/:id', async(req, res, next) => {
    await Postulante.findById(req.params.id).then(postulante  => {
        if (postulante) {
            res.status(200).json(postulante);
        } else {
            res.status(404).json({message: 'Postulante no encontrado'});
        }
    })
});

router.delete('/postulante/:id', (req, res, next) => {
    Postulante.deleteOne({_id: req.params.id}).then(result => {
        res.status(201).json(
            {
                message: 'Postulante borrado correctamente'
            }
        )
    });
});

//------------------------------------------ USUARIOS ------------------------------------------

//router.post('/usuario',(req, res, next) => {
//    const usuario = new Usuario({
//        nombre: req.body.nombre,
//        contrasena: req.body.contrasena,
//        correo: req.body.correo,
//        tipoUsuario: req.body.tipoUsuario
//    });
//    usuario.save().then(createdUsuario => {
//        res.status(201).json(
//            {
//                message: 'Usuario agregado correctamente',
//                usuarioId: createdUsuario._id
//            }
//        )
//    });
//})
//
//router.put('/usuario/:id', (req, res, next) => {
//    const usuario = new Usuario({
//        _id: req.body.id,
//        nombre: req.body.nombre,
//        contrasena: req.body.contrasena,
//        correo: req.body.correo,
//        tipoUsuario: req.body.tipoUsuario
//    });
//    Usuario.updateOne({_id: req.params.id}, usuario).then(result => {
//        res.status(200).json({message: 'Usuario actualizado correctamente'})
//    });
//});
//
//router.get('/usuario', (req, res, next) => {
//    Usuario.find().then(documents => {
//        res.status(200).json(
//            {message: '¡Usuarios expuestos con exito!', usuarios: documents}
//        )
//    });
//});
//
//router.get('/usuario/:id', (req, res, next) => {
//    Usuario.findById(req.params.id).then(usuario  => {
//        if (usuario) {
//            res.status(200).json(usuario);
//        } else {
//            res.status(404).json({message: 'Usuario no encontrado'});
//        }
//    })
//});
//
//router.delete('/usuario/:id', (req, res, next) => {
//    Usuario.deleteOne({_id: req.params.id}).then(result => {
//        res.status(201).json(
//            {
//                message: 'Usuario borrado correctamente'
//            }
//        )
//    });
//});

//------------------------------------------ POSTULACIONES ------------------------------------------

router.post('/postulacion',(req, res, next) => {
    const postulacion = new Postulacion({
        idPostulante: req.body.idPostulante, 
        idBeca: req.body.idBeca,
        postulante: req.body.postulante,
        beca: req.body.beca,
        ingresoMensual: req.body.ingresoMensual,
        promedioEscolar: req.body.promedioEscolar,
        gradoActual: req.body.gradoActual,
        escuela: req.body.escuela,
        estado: req.body.estado
    });
    postulacion.save().then(createdPostulacion => {
        res.status(201).json(
            {
                message: 'Postulacion agregada correctamente',
                postulacionId: createdPostulacion._id
            }
        )
    });
})

router.put('/postulacion/:id', (req, res, next) => {
    const postulacion = new Postulacion({
        _id: req.body.id,
        idPostulante: req.body.idPostulante, 
        idBeca: req.body.idBeca,
        postulante: req.body.postulante,
        beca: req.body.beca,
        ingresoMensual: req.body.ingresoMensual,
        promedioEscolar: req.body.promedioEscolar,
        gradoActual: req.body.gradoActual,
        escuela: req.body.escuela,
        estado: req.body.estado
    });
    Postulacion.updateOne({_id: req.params.id}, postulacion).then(result => {
        res.status(200).json({message: 'Postulación actualizada correctamente'})
    });
});

router.get('/postulacion', (req, res, next) => {
    Postulacion.find().then(documents => {
        res.status(200).json(
            {message: '¡Postulaciones expuestas con exito!', postulaciones: documents}
        )
    });
});

router.get('/postulacion/:id', (req, res, next) => {
    Postulacion.findById(req.params.id).then(postulacion  => {
        if (postulacion) {
            res.status(200).json(postulacion);
        } else {
            res.status(404).json({message: 'Postulacion no encontrada'});
        }
    })
});

router.delete('/postulacion/:id', (req, res, next) => {
    Postulacion.deleteOne({_id: req.params.id}).then(result => {
        res.status(201).json(
            {
                message: 'Postulacion borrada correctamente'
            }
        )
    });
});

//------------------------------------------ BECAS ------------------------------------------

router.post('/beca', multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const beca = new Beca({
        nombre: req.body.nombre,
        monto: req.body.monto,
        fechaApertura: req.body.fechaApertura,
        fechaCierre: req.body.fechaCierre,
        limitePostulantes: req.body.limitePostulantes,
        postulantesRegistrados: 0,
        limiteAceptados: req.body.limiteAceptados,
        postulantesAceptados: 0,
        nivelEducativo: req.body.nivelEducativo,
        rutaImagen: url + "/images/" + req.file.filename,
        estado: 1
    });
    beca.save().then(createdBeca => {
        res.status(201).json(
            {
                message: 'Beca agregada correctamente',
                beca: {
                    ...createdBeca,
                    id: createdBeca._id
                }
            }
        )
    });
})

router.put('/beca/:id', multer({storage: storage}).single("image"), (req, res, next) => {
    let rutaImagen = req.body.rutaImagen;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        rutaImagen = url + "/images/" + req.file.filename
    }
    const beca = new Beca({
        _id: req.body.id,
        nombre: req.body.nombre,
        monto: req.body.monto,
        fechaApertura: req.body.fechaApertura,
        fechaCierre: req.body.fechaCierre,
        limitePostulantes: req.body.limitePostulantes,
        postulantesRegistrados: req.body.postulantesRegistrados,
        limiteAceptados: req.body.limiteAceptados,
        postulantesAceptados: req.body.postulantesAceptados,
        nivelEducativo: req.body.nivelEducativo,
        rutaImagen: rutaImagen,
        estado: req.body.estado
    });
    Beca.updateOne({_id: req.params.id}, beca).then(result => {
        res.status(200).json({message: 'Beca actualizada correctamente'})
    });
});

router.get('/beca', (req, res, next) => {
    Beca.find().then(documents => {
        res.status(200).json(
            {message: '¡Becas expuestas con exito!', becas: documents}
        )
    });
});

router.get('/beca/:id', (req, res, next) => {
    Beca.findById(req.params.id).then(beca  => {
        if (beca) {
            res.status(200).json(beca);
        } else {
            res.status(404).json({message: 'Beca no encontrada'});
        }
    })
});

router.delete('/beca/:id', (req, res, next) => {
    Beca.deleteOne({_id: req.params.id}).then(result => {
        res.status(201).json(
            {
                message: 'Beca borrada correctamente'
            }
        )
    });
});

module.exports = router;