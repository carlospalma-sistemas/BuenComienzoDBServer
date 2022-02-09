const ninoOperations = require('../operations/nino_operations');
const router = require('express').Router();

router.get('/', ninoOperations.getNinos)
router.get('/:id', ninoOperations.getNino)
router.post('/', ninoOperations.crearNino)
router.put('/:id', ninoOperations.actualizarNino)
router.delete('/:id', ninoOperations.borrarNino)
router.put('/adddiscapacidad/:id', ninoOperations.anadirDiscapacidadNino)
router.put('/removediscapacidad/:id', ninoOperations.removerDiscapacidadNino)
router.put('/addalergia/:id', ninoOperations.anadirAlergiaNino)
router.put('/removealergia/:id', ninoOperations.removerAlergiaNino)
router.put('/addadulto/:id', ninoOperations.anadirAdultoNino)
router.put('/editadulto/:id', ninoOperations.editarAdultoNino)
router.put('/removeadulto/:id', ninoOperations.removerAdultoNino)

module.exports = router