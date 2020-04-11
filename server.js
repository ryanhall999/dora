const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const port = process.env.PORT || 3000;
const passport = require('passport')
const cookieSession = require('cookie-session')
const keys = require('./keys')
//Dont delete 
const passportSetup = require('./config/passport-setup')

app.use(express.json());

app.use(cookieSession({
  maxAge: 24*60*60*1000, //How long the cookie lasts
  keys: [keys.session.cookieKey] //encrypts the cookie
}))
//initialize passport 
app.use(passport.initialize());
app.use(passport.session());


app.use('/dist', express.static('dist'));

app.use(express.static(path.join(__dirname + '/assets')));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res, next) => {
  console.log(req.user)
  res.sendFile(path.join(__dirname, '/index.html'));
});

//authenticate with google
app.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

//callback route for google to redirect to.
app.get('/google/callback', passport.authenticate('google'), (req, res, next) => {
  res.redirect('/')
})

const authCheck = (req, res, next) => {
  if(!req.user) {
    res.redirect('/')
  } else {
    next()
  }
}

app.get('/loggedIn', authCheck, (req, res) => {
  res.send(req.user)
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
});
