const coleccionAdultos = require('../models/adulto_model');
const adultoOperations = {};

adultoOperations.getAdultos = async function(req, res) {
	try {
		const filter = req.query
		const adultos = await coleccionAdultos.find(filter)
		res.status(200).json(adultos)
	}
	catch(err) {
		res.status(400).json({message:"Bad request searching for data. "+err.message})
	}
}

adultoOperations.getAdulto = async function(req, res) {
	try {
		const adulto = await coleccionAdultos.findById(req.params.id);
		if (adulto==null) {
			res.status(404).json({message: "Not found"})	
		}
		else {
			res.status(200).json(adulto)
		}
	}
	catch(err) {
		res.status(400).json({message: "Bad request searching for data. "+err.message})	
	}
}

adultoOperations.crearAdulto = async function(req, res) {
	try{
		const adulto = new coleccionAdultos(req.body);
		await adulto.save()
		res.status(201).json(adulto)
	}
	catch(err) {
		res.status(400).json({message: "Bad request creating data. "+err.message})
	}
}

adultoOperations.actualizarAdulto = async function(req, res) {
	try {
		const dato = req.body
		const adulto = {
			nombres: dato.nombres,
			apellidos: dato.apellidos,
			identificacion: {
				tipo: dato.identificacion.tipo,
				numero: dato.identificacion.numero,
				lugar: {
					departamento: dato.identificacion.lugar.departamento,
					municipio: dato.identificacion.lugar.municipio
				}
			},
			genero: dato.genero,
			nacimiento: {
				fecha: dato.nacimiento.fecha,
				lugar: {
					departamento: dato.nacimiento.lugar.departamento,
					municipio: dato.nacimiento.lugar.municipio
				}
			},
			domicilio: {
				direccion: dato.domicilio.direccion,
				barrio: dato.domicilio.barrio,
				municipio: dato.domicilio.municipio,
                departamento: dato.domicilio.departamento
			},
            estado_civil: dato.estado_civil,
            ocupacion: dato.ocupacion
		}
		await coleccionAdultos.findByIdAndUpdate(req.params.id, {$set: adulto}, {new: true});
		res.status(200).json(adulto);
	}
	catch(err) {
		res.status(400).json({message: "Bad request updating data. "+err.message})
	}
}

adultoOperations.anadirTelefonoAdulto = async function(req, res) {
	try {
		const dato = req.body
		const telefonoAnadir = dato.telefono
		await coleccionAdultos.findByIdAndUpdate(req.params.id, {$addToSet: {telefonos: telefonoAnadir}}, {new: true});
		res.status(200).json(telefonoAnadir);
	}
	catch(err) {
		res.status(400).json({message: "Bad request updating data. "+err.message})
	}
}

adultoOperations.removerTelefonoAdulto = async function(req, res) {
	try {
		const dato = req.body
		const telefonoBorrar = dato.telefono
		const adultos = await coleccionAdultos.find({"_id" : req.params.id, "telefonos" : telefonoBorrar});
		if (adultos==null || adultos.length==0) {
			res.status(404).json({message: "telefono not found for specified adulto"})
		}
		else {
			await coleccionAdultos.findByIdAndUpdate(req.params.id, {$pull: {telefonos: telefonoBorrar}});
			res.status(200).json({message: telefonoBorrar + " deleted OK"})
		}
	}
	catch(err) {
		res.status(400).json({message: "Bad request deleting data. "+err.message})
	}
}

adultoOperations.borrarAdulto = async function(req, res) {
	try {
		const adulto = await coleccionAdultos.findByIdAndRemove(req.params.id);
		if (adulto==null) {
			res.status(404).json({message: "Not found"})	
		}
		else {
			res.status(200).json({message: "Deleted OK"})
		}	
	}
	catch(err) {
		res.status(404).json({message: "Bad request deleting data. "+err.message})	
	}
}

module.exports = adultoOperations