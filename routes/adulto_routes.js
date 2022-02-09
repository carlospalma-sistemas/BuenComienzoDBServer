const adultoOperations = require('../operations/adulto_operations');
const router = require('express').Router();

router.get('/', adultoOperations.getAdultos)
router.get('/:id', adultoOperations.getAdulto)
router.post('/', adultoOperations.crearAdulto)
router.put('/:id', adultoOperations.actualizarAdulto)
router.delete('/:id', adultoOperations.borrarAdulto)
router.put('/addtelefono/:id', adultoOperations.anadirTelefonoAdulto)
router.put('/removetelefono/:id', adultoOperations.removerTelefonoAdulto)

module.exports = router