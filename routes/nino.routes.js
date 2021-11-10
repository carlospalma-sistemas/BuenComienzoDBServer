const router = require('express').Router();
const ninoOperations = require('../operations/nino.operations');

/*
	Ruta base
	-----------------------------------------
	'/api/ninos'

	Puntos de conexión
	-----------------------------------------
	crear un dato: 				post('/',      operacion.metodo)
	obtener todos los datos: 	get('/',       operacion.metodo)
	obtener un dato: 			get('/:id',    operacion.metodo)
	modificar un dato: 			put('/:id',    operacion.metodo)
	eliminar un dato: 			delete('/:id', operacion.metodo)
*/
router.get('/', ninoOperations.getNinos)
router.get('/:id', ninoOperations.getNino)
router.post('/', ninoOperations.crearNino)
router.put('/:id', ninoOperations.actualizarNino)
router.delete('/:id', ninoOperations.borrarNino)

module.exports = router