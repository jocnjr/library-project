require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const SlackStrategy = require('passport-slack').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./models/user");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

mongoose
  .connect('mongodb://localhost/library-project', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport local config

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) { return done(err); }
    done(null, user);
  });
});

app.use(flash());

passport.use(new GoogleStrategy({
  clientID: "434329582585-i2m5r36n1sekk5dbcv5r1jduvo47oqga.apps.googleusercontent.com",
  clientSecret: "ghP1qoTdl2SzyNaTpt3mjtG1",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id })
  .then((user, err) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      name: profile.displayName,
      googleID: profile.id
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    done(error)
  })

}));

// clientId: 2432150752.540272364340
// clientSecret: 9243ec28256862f0c4488de5ea8a83bc

passport.use(new SlackStrategy({
  clientID: "2432150752.540272364340",
  clientSecret: "9243ec28256862f0c4488de5ea8a83bc"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ slackID: profile.id })
  .then((user, err) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      name: profile.user.name,
      slackID: profile.id
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    done(error)
  })

}));

passport.use(new LocalStrategy({
  passReqToCallback: true
},(req, username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());


// old basic auth config
// app.use(session({
//   secret: "basic-auth-secret",
//   cookie: { maxAge: 60000 },
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 // 1 day
//   })
// }));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Library Project';




const authRoutes = require('./routes/auth');
const siteRoutes = require('./routes/index');

app.use('/', authRoutes);
app.use('/', siteRoutes);


module.exports = app;
