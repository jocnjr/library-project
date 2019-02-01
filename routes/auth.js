const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  if (username == '' || password == '') {
    res.render('auth/signup', {
      msgError: `username and password can't be empty`
    })
    return;
  }

  User.findOne({ "username": username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", {
        msgError: "The username already exists!"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      name: name
    });

    newUser.save()
    .then(user => {
      res.redirect("/books");
    })
    .catch(err => { throw new Error(err)});
  })
  .catch(err => { throw new Error(err)});

});


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ "username": username })
  .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist"
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = {userId: user._id, name: user.name};
        res.redirect("/books");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(err => { throw new Error(err) })
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw new Error(err);
    res.redirect("/");
  });
});

module.exports = router;