const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');

router.get('/', bookController.getBook);

router.post('/', bookController.postBook);

router.get('/:bookId', bookController.getSingleBook);

router.patch('/:bookId', bookController.patchBook);

router.delete('/:bookId', bookController.deleteBook);

module.exports = router;