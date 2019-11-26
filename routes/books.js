const express = require('express');

const router = express.Router();
const bookController = require('../controllers/books');

router.get('/', bookController.getBook);

router.post('/', bookController.postBook);

router.get('/:bookId', bookController.getSingleBook);

router.get('/title/:bookTitle', bookController.fromTitle);
router.get('/ISBN/:bookISBN', bookController.fromISBN);
router.get('/description/:bookDescription', bookController.fromDescription);
router.get('/date/:bookDate', bookController.fromDate);
router.get('/price/:bookPrice', bookController.fromPrice);
router.get('/editorial/:bookEditorial', bookController.fromEditorial);

router.patch('/:bookId', bookController.patchBook);

router.delete('/:bookId', bookController.deleteBook);

module.exports = router;
