const mongoose = require('mongoose');

const Book = require('../models/books');

function getBook(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        Book.find().select().exec().then((docs) => {
            const response = {
                count: docs.length,
                books: docs.map((doc) => {
                return {
                    title: doc.title,
                    ISBN: doc.ISBN,
                    description: doc.description,
                    date: doc.date,
                    price: doc.price,
                    editorial: doc.editorial,
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
    }
    else
    {
        Book.find({
            $or: [
                { title: req.body.title },
                { ISBN: req.body.ISBN },
                { description: req.body.description },
                { date: req.body.date },
                { price: req.body.price },
                { editorial: req.body.editorial }
            ]}).select().exec().then((docs) => {
                const response = {
                    books: docs.map((doc) => {
                        return {
                            title: doc[0].title,
                            ISBN: doc[0].ISBN,
                            description: doc[0].description,
                            date: doc[0].date,
                            price: doc[0].price,
                            editorial: doc[0].editorial,
                        };
                    }),
                };
        res.status(200).json(response);
    })
        
    }
}

function postBook(req, res) {
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
}

function getSingleBook(req, res) {
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
}
  
function patchBook (req, res) {
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
}

function deleteBook(req, res) {
    const id = req.params.bookId;
    Book.remove({ _id: id }).exec().then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
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
}