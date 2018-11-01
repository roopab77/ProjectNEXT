var exports = module.exports = {}


exports.signup = function (req, res) {
  var title = {
    pageTitle: "Sign UP"
  };
  res.render("signup", title);
 }

exports.signin = function (req, res) {
  
  var title = {
    pageTitle: "Sign In"
  };
  res.render("signin", title);
}


exports.dashboard = function (req, res) {
  var title = {
    pageTitle: "Dash Board"
  };
  res.render('dashboard',title);
}

exports.logout = function(req, res) {
 
  req.session.destroy(function(err) {

      res.redirect('/');

  });

}
exports.signinFailed = function (req, res) {

  res.render("signinFailed");
 }

 exports.reviewsSearch = function (req, res) {
  
  // var title = {
  //   pageTitle: "Reviews Search"
  // };
  res.render("reviewsSearch");
}

