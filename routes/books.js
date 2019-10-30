const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Book = require('../models/books');

router.get('/', (req, res, next) => {
  Book.find().select().exec().then((docs) => {
    const response = {
      count: docs.length,
      books: docs.map((doc) => {
        return {
          title: req.body.title,
          ISBN: req.body.ISBN,
          description: req.body.description,
          date: req.body.date,
          price: req.body.price,
          editorial: req.body.editorial,
          _id: doc.id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/books/${doc._id}`,
          },
        };
      }),
    };
    if (docs.length >= 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: 'No entries found',
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

router.post('/', (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    ISBN: req.body.ISBN,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    editorial: req.body.editorial,
  });
  book.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: 'Created book.',
      createdBook: {
        title: req.body.title,
        ISBN: req.body.ISBN,
        description: req.body.description,
        date: req.body.date,
        price: req.body.price,
        editorial: req.body.editorial,
        _id: result._id,
        request: {
          type: 'POST',
          url: `http://localhost:3000/books/${result._id}`,
        },
      },
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

router.get('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id).exec().then((doc) => {
    console.log(doc);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'No valid entry found for provided ID' });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

router.patch('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Book.update({ _id: id }, { $set: updateOps }).exec().then((result) => {
    console.log(result);
    res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

router.delete('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id }).exec().then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

module.exports = router;