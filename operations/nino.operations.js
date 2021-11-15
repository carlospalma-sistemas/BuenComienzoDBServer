const coleccionNinos = require('../schemas/nino.schema')	
const ninoOperations = {};


ninoOperations.getNinos = async function(req, res) {
	try {
		const ninos = await coleccionNinos.find()
		res.status(200).json(ninos)
	}
	catch(err) {
		res.status(404).json({message: err.message})
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
		res.status(400).json({message: err.message})	
	}
}


ninoOperations.crearNino = async function(req, res) {
	try{
		const nino = new coleccionNinos(req.body);
		await nino.save()
		res.status(201).json(nino)
	}
	catch(err) {
		res.status(400).json({message: err.message})
	}
}


ninoOperations.actualizarNino = async function(req, res) {
	try {
		const { id } = req.params;
		const nino = {
			nombres: req.body.nombres,
	    	apellidos: req.body.apellidos,
	    	identificacion:{
	    		tipo: req.body.identificacion.tipo,
	        	numero: req.body.identificacion.numero,
	        	expedicion:{
	        		municipio: req.body.identificacion.expedicion.municipio,
	        		departamento: req.body.identificacion.expedicion.departamento
	        	}
	    	},
	    	nacimiento: {
				fecha: req.body.nacimiento.fecha,
				lugar: {
					municipio: req.body.nacimiento.lugar.municipio,
					departamento: req.body.nacimiento.lugar.departamento
				},
			},
			genero: req.body.genero,
			gruposanguineo: req.body.gruposanguineo	
		}
		await coleccionNinos.findByIdAndUpdate(req.params.id, {$set: nino}, {new: true});
		res.status(200).json(nino);
	}
	catch(err) {
		res.status(400).json({message: err.message})
	}
}


ninoOperations.borrarNino = async function(req, res) {
	try {
		await coleccionNinos.findByIdAndRemove(req.params.id);
		res.status(200).json({message: "Delete OK"});	
	}
	catch(err) {
		res.status(404).json({message: err.message})	
	}
}

module.exports = ninoOperations