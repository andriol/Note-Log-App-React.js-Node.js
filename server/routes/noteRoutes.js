const router = require('express').Router();
const noteController = require('../controllers/Notes');

router.get('/', noteController.getAllNotes);
router.get(':id', noteController.getSingleNote);
router.post('/', noteController.postNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
