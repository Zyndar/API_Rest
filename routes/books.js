const express = require('express');

const router = express.Router();
const bookController = require('../controllers/books');

router.get('/', bookController.getBook);

router.post('/', bookController.postBook);

router.get('/:bookId', bookController.getSingleBook);

router.get('/title/:title', bookController.fromTitle);
router.get('/ISBN/:ISBN', bookController.fromISBN);
router.get('/description/:description', bookController.fromDescription);
router.get('/date/:date', bookController.fromDate);
router.get('/price/:price', bookController.fromPrice);
router.get('/editorial/:editorial', bookController.fromEditorial);

router.patch('/:bookId', bookController.patchBook);

router.delete('/:bookId', bookController.deleteBook);

module.exports = router;
