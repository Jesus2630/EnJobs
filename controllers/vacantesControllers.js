const mongoose = require('mongoose')
const Vacante = mongoose.model('Postulacion')

exports.nuevaVacante = (req,res) =>{
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagLine: 'Publicá tu empleo',
    })
}

//Agregar Vacante a base de datos
exports.agregarVacante = async(req,res) =>{
     const vacante = new Vacante(req.body);

     //Crear arreglo de habilidades
     vacante.skills = req.body.skills.split(',');

     //Almacenar en base de datos
     const nuevaVacante = await vacante.save()  

     //Redireccionar
     res.redirect(`/vacantes/${nuevaVacante.url}`);
}