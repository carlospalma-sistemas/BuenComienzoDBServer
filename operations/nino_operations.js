const coleccionNinos = require('../models/nino_model');
const ninoOperations = {};

ninoOperations.getNinos = async function(req, res) {
	try {
		const filter = req.query
		const ninos = await coleccionNinos.find(filter).populate({path : 'adultos.adulto', select : ['nombres', 'apellidos']})
		res.status(200).json(ninos)
	}
	catch(err) {
		res.status(400).json({message:"Bad request searching for data. "+err.message})
	}
}

ninoOperations.getNino = async function(req, res) {
	try {
		const nino = await coleccionNinos.findById(req.params.id);
		if (nino==null) {
			res.status(404).json({message: "Not found"})	
		}
		else {
			res.status(200).json(nino)
		}
	}
	catch(err) {
		res.status(400).json({message: "Bad request searching for data. "+err.message})	
	}
}

ninoOperations.crearNino = async function(req, res) {
	try{
		const nino = new coleccionNinos(req.body);
		await nino.save()
		res.status(201).json(nino)
	}
	catch(err) {
		res.status(400).json({message: "Bad request creating data. "+err.message})
	}
}

ninoOperations.actualizarNino = async function(req, res) {
	try {
		const dato = req.body
		const nino = {
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
			asiste_valoracion: dato.asiste_valoracion,
			grupo_sanguineo: dato.grupo_sanguineo,
			vacunacion_completa: dato.vacunacion_completa,
			domicilio: {
				direccion: dato.domicilio.direccion,
				barrio: dato.domicilio.barrio,
				municipio: dato.domicilio.municipio,
				departamento: dato.domicilio.departamento
			},
		}
		await coleccionNinos.findByIdAndUpdate(req.params.id, {$set: nino}, {new: true});
		res.status(200).json(nino);
	}
	catch(err) {
		res.status(400).json({message: "Bad request updating data. "+err.message})
	}
}

ninoOperations.anadirDiscapacidadNino = async function(req, res) {
	try {
		const dato = req.body
		const discapAnadir = dato.discapacidad
		if (discapAnadir == null) throw new Error("discapacidad value not found")
		await coleccionNinos.findByIdAndUpdate(req.params.id, {$addToSet: {discapacidades: discapAnadir}}, {new: true});
		res.status(200).json(discapAnadir);
	}
	catch(err) {
		res.status(400).json({message: "Bad request updating data. "+err.message})
	}
}

ninoOperations.removerDiscapacidadNino = async function(req, res) {
	try {
		const dato = req.body
		const discapBorrar = dato.discapacidad
		const ninos = await coleccionNinos.find({"_id" : req.params.id, "discapacidades" : discapBorrar});
		if (ninos==null || ninos.length==0) {
			res.status(404).json({message: "Discapacidad not found for specified nino"})
		}
		else {
			await coleccionNinos.findByIdAndUpdate(req.params.id, {$pull: {discapacidades: discapBorrar}});
			res.status(200).json({message: discapBorrar + " deleted OK"})
		}
	}
	catch(err) {
		res.status(400).json({message: "Bad request deleting data. "+err.message})
	}
}

ninoOperations.anadirAlergiaNino = async function(req, res) {
	try {
		const dato = req.body
		const alergiaAnadir = dato.alergia
		if (alergiaAnadir == null) throw new Error("alergia value not found")
		await coleccionNinos.findByIdAndUpdate(req.params.id, {$addToSet: {alergias: alergiaAnadir}}, {new: true});
		res.status(200).json(alergiaAnadir);
	}
	catch(err) {
		res.status(400).json({message: "Bad request updating data. "+err.message})
	}
}

ninoOperations.removerAlergiaNino = async function(req, res) {
	try {
		const dato = req.body
		const alergiaBorrar = dato.alergia
		const ninos = await coleccionNinos.find({"_id" : req.params.id, "alergias" : alergiaBorrar});
		if (ninos==null || ninos.length==0) {
			res.status(404).json({message: "Alergia not found for specified nino"})
		}
		else {
			await coleccionNinos.findByIdAndUpdate(req.params.id, {$pull: {alergias: alergiaBorrar}});
			res.status(200).json({message: alergiaBorrar + " deleted OK"})
		}
	}
	catch(err) {
		res.status(400).json({message: "Bad request deleting data. "+err.message})
	}
}

ninoOperations.anadirAdultoNino = async function(req, res) {
	try {
		const dato = req.body
		const adultoAnadir = {
			"adulto" : dato.adulto,
			"parentesco" : dato.parentesco,
			"adulto_responsable" : dato.adulto_responsable
		}
		if (dato.adulto == null) throw new Error("adulto value not found")
		if (dato.parentesco == null) throw new Error("parentesco value not found")
		if (dato.adulto_responsable == null) throw new Error("adulto_responsable value not found")
		await coleccionNinos.findByIdAndUpdate(req.params.id, {$addToSet: {adultos: adultoAnadir}}, {new: true});
		res.status(200).json(adultoAnadir);
	}
	catch(err) {
		res.status(400).json({message: "Bad request updating data. "+err.message})
	}
}

ninoOperations.editarAdultoNino = async function(req, res) {
	try {
		const dato = req.body
		const adultoEditar = {
			"adulto" : dato.adulto,
			"parentesco" : dato.parentesco,
			"adulto_responsable" : dato.adulto_responsable
		}
		if (dato.adulto == null) throw new Error("adulto value not found")
		if (dato.parentesco == null) throw new Error("parentesco value not found")
		if (dato.adulto_responsable == null) throw new Error("adulto_responsable value not found")
		await coleccionNinos.findOneAndUpdate({"_id": req.params.id, "adultos.adulto":adultoEditar.adulto }, {$set: {"adultos.$": adultoEditar}}, {new: false});
		res.status(200).json(adultoEditar);
	}
	catch(err) {
		res.status(400).json({message: "Bad request updating data. "+err.message})
	}
}

ninoOperations.removerAdultoNino = async function(req, res) {
	try {
		const dato = req.body
		const adultoBorrar = {
			"adulto" : dato.adulto,
			"parentesco" : dato.parentesco,
			"adulto_responsable" : dato.adulto_responsable
		}
		if (dato.adulto == null) throw new Error("adulto value not found")
		if (dato.parentesco == null) throw new Error("parentesco value not found")
		if (dato.adulto_responsable == null) throw new Error("adulto_responsable value not found")
		await coleccionNinos.findOneAndUpdate({"_id": req.params.id, "adultos.adulto":adultoBorrar.adulto }, {$pull : {"adultos":adultoBorrar}});
		res.status(200).json("removed OK");
	}
	catch(err) {
		res.status(400).json({message: "Bad request removing data. "+err.message})
	}
}

ninoOperations.borrarNino = async function(req, res) {
	try {
		const nino = await coleccionNinos.findByIdAndRemove(req.params.id);
		if (nino==null) {
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

module.exports = ninoOperations