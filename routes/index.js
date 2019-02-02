const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Author = require("../models/author");
const ensureLogin = require("connect-ensure-login");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});

// protecting pages below
router.use(ensureLogin.ensureLoggedIn());

router.get("/books", (req, res, next) => {
  Book.find({})
    .then(books => {

      books.forEach(book => {
        if (book.owner && book.owner.equals(req.user._id)) {
          book.owned = true;
        }
      });

      res.render("books", { books, currentUser: req.user });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/book/:id", (req, res, next) => {
  let bookId = req.params.id;
  Book.findOne({ _id: bookId })
    .populate("author")
    .then(book => {
      // res.send(book);
      res.render("book-detail", { book });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/books/add", (req, res, next) => {
  res.render("book-add");
});

router.post("/books/add", (req, res, next) => {

  let { name, description, author, rating } = req.body;

  const newBook = new Book({ name, description, rating, owner: req.user._id });

  newBook
    .save()
    .then(book => {
      res.redirect("/books");
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.get("/books/edit", (req, res, next) => {
  Book.findOne({ _id: req.query.book_id })
    .then(book => {
      if (book.owner && book.owner.equals(req.user._id)) {
        res.render("book-edit", { book });
      } else {
        // no access for you!
        res.redirect(`/book/${book._id}`);
      }
      
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/books/edit", (req, res, next) => {
  let { name, description, author, rating } = req.body;

  Book.update(
    { _id: req.query.book_id },
    { $set: { name, description, author, rating } },
    { new: true }
  )
    .then(book => {
      res.redirect("/books");
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.get("/authors/add", (req, res, next) => {
  res.render("author-add");
});

router.post("/authors/add", (req, res, next) => {
  const { name, lastName, nationality, birthday, pictureUrl } = req.body;
  const newAuthor = new Author({
    name,
    lastName,
    nationality,
    birthday,
    pictureUrl
  });
  newAuthor
    .save()
    .then(book => {
      res.redirect("/books");
    })
    .catch(error => {
      throw new Error(error);
    });
});

router.post("/reviews/add", (req, res, next) => {
  const { user, comments } = req.body;
  Book.update(
    { _id: req.query.book_id },
    { $push: { reviews: { user, comments } } }
  )
    .then(book => {
      res.redirect(`/book/${req.query.book_id}`);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
