const coleccionNinos = require('../schemas/nino.schema')	
const ninoOperations = {};

ninoOperations.getNinos = async function(req, res) {
	const ninos = await coleccionNinos.find();
	res.json(ninos);
}

ninoOperations.getNino = async function(req, res) {
	const nino = await coleccionNinos.findById(req.params.id);
	res.json(nino);
}

ninoOperations.crearNino = async function(req, res) {
	const nino = new coleccionNinos(req.body);
	await nino.save();
	res.json({"status":"Dato de niño guardado"});
}

ninoOperations.actualizarNino = async function(req, res) {
	const { id } = req.params;
	const nino = {
		nombres: req.body.nombres,
    	apellidos: req.body.apellidos,
    	documento:{
        	tipo: req.body.documento.tipo,
        	numero: req.body.documento.numero
    	}
	}
	console.log(nino)
	await coleccionNinos.findByIdAndUpdate(req.params.id, {$set: nino}, {new: true});
	res.json({"status":"Dato de niño actualizado"});
}

ninoOperations.borrarNino = function(req, res) {}

module.exports = ninoOperations