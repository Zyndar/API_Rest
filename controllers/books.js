const Book = require('../models/books');

function getBook(req, res) {
  Book.find().then((books) => {
    const response = {
      count: books.length,
      books: books.map((doc) => ({
        books,
        request: {
          type: 'GET',
          url: `http://localhost:3000/books/${doc._id}`,
        },
      })),
    };
    if (books.length >= 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: 'No entries found',
      });
    }
  })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
function fromTitle(req, res) {
  const { title } = req.params;
  Book.find({ title }).then((book) => res.status(200).json(book))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
function fromISBN(req, res) {
  const { ISBN } = req.params;
  Book.find({ ISBN }).then((book) => res.status(200).json(book))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
function fromDescription(req, res) {
  const { description } = req.params;
  Book.find({ description }).then((book) => res.status(200).json(book))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
function fromDate(req, res) {
  const { date } = req.params;
  Book.find({ date }).then((book) => res.status(200).json(book))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
function fromPrice(req, res) {
  const { price } = req.params;
  Book.find({ price }).then((book) => res.status(200).json(book))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}
function fromEditorial(req, res) {
  const { editorial } = req.params;
  Book.find({ editorial }).then((book) => res.status(200).json(book))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

function postBook(req, res) {
  const book = new Book({
    title: req.body.title,
    ISBN: req.body.ISBN,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    editorial: req.body.editorial,
  });
  book.save().then((result) => {
    res.status(201).json({
      message: 'Created book.',
      createdBook: {
        result,
        _id: result._id,
        request: {
          type: 'POST',
          url: `http://localhost:3000/books/${result._id}`,
        },
      },
    });
  }).catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
}

function getSingleBook(req, res) {
  const id = req.params.bookId;
  Book.findById(id).then((doc) => {
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'No valid entry found for provided ID' });
    }
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}

function patchBook(req, res) {
  const id = req.params.bookId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Book.update({ _id: id }, { $set: updateOps }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
}

function deleteBook(req, res) {
  const id = req.params.bookId;
  Book.remove({ _id: id }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
}

module.exports = {
  getBook,
  postBook,
  getSingleBook,
  patchBook,
  deleteBook,
  fromTitle,
  fromISBN,
  fromDescription,
  fromDate,
  fromPrice,
  fromEditorial,
};
