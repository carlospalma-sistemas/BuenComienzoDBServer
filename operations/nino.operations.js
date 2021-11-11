const coleccionNinos = require('../schemas/nino.schema')	
const ninoOperations = {};

ninoOperations.getNinos = async function(req, res) {
	const ninos = await coleccionNinos.find();
	res.json(ninos);
}
ninoOperations.getNino = function(req, res) {}
ninoOperations.crearNino = function(req, res) {}
ninoOperations.actualizarNino = function(req, res) {}
ninoOperations.borrarNino = function(req, res) {}

module.exports = ninoOperations