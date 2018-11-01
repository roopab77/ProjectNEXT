//require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
path = require("path");
nodeMailer = require("nodemailer");

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({  extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// For Passport

app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Routes
var authRoute = require('./controllers/auth.js')(app, passport);

require("./controllers/tripscontroller.js")(app,passport);


require('./config/passport/passport.js')(passport, db.Users);
// require("./routes/auth")(app);

// for sending emails
// var smtpTransport = nodeMailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: {
//       user: "seemastunes@gmail.com",
//       pass: "Bandra50"
//   }
// });

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;