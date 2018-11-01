var db = require("../models");
var authController = require('../controllers/authcontroller.js');

var  ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

// module.exports = function (app, passport) {

//   //This is the root route 
//   app.get("/", function (req, res) {
//     var render_obj = {
//       pageTitle: "New Exciting Trips"
//     };
//     db.Reviews.findAll({
//       limit: 5,
//       order: 'createdAt DESC'
//     }).then(function(dbRecentReviews) {
//       render_obj.reviews = dbRecentReviews;
//       res.render("index", render_obj);

//     });
//   });

// }
