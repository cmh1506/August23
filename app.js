const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')('app')
const app = express()
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
if (process.env.ENV === 'Test') {
  const db = mongoose.connect('mongodb://127.0.0.1/spoc_test')
} else if (process.argv[2] === 'int') {
  const db = mongoose.connect('mongodb://127.0.0.1/spoc')
} else {
  const db = mongoose.connect('mongodb://mongodb/spoc')
}

const path = require('path')
const port = process.env.PORT || 3000

const Material = require('./models/material')
const User = require('./models/user')


const materialRouter = require('./routes/materialRouter')(Material)
const authRouter = require('./routes/authRouter')(User)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  next();
});
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/frontend/dist/frontend')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/api', materialRouter)

app.use('/api', authRouter)

app.post('/api/signIn', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" })
  }
  else if (!req.body.password) {
    res.json({ success: false, message: "Password was not given" })
  }
  else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err });
      }
      else {
        if (!user) {
          res.json({ success: false, message: "username or password incorrect" });
        }
        else {
          const token = jwt.sign({ userId: user._id, username: user.username }, 'weolrjdlksldvslvf', { expiresIn: "24h" });
          res.json({ success: true, message: "Authentication successful", token });
        }
      }
    })(req, res);
  }
})

app.get('/logout', function(req, res) {
  req.logout();
});

app.server = app.listen(port, () => {
  debug(`Listening on ${port}`)
})



module.exports = { app }