const router = require('express').Router();
const ninoOperations = require('../operations/nino.operations');

/*
	Archivo de operaciones
	-----------------------------------------
	const operacion = require('archivo de operaciones');

	Ruta base
	-----------------------------------------
	'/api/ninos'

	Puntos de conexión (endpoints)
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