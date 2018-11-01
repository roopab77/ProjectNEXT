var db = require("../models");
var authController = require('../controllers/authcontroller.js');
nodeMailer = require("nodemailer");
var htmlToText = require('nodemailer-html-to-text').htmlToText;


const Op = require('sequelize').Op;

var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
module.exports = function (app, passport) {
  // Create all our routes and set up logic within those routes where required.

  //This route is to render the add trips page. Will work only if logged in
  app.get('/trips',
    ensureLoggedIn('/signin'),
    function (req, res) {
      res.render('trips', {
        pageTitle: "Add a Trip"
      });
    });

  app.get("/destinations", function (req, res) {
    var title = {
      pageTitle: "Add Destinations"
    };
    res.render("destinations", title);
  });

  app.get("/reviews", function (req, res) {
    var title = {
      pageTitle: "Add Reviews"
    };
    res.render("reviews", title);
  });

  app.get('/send-email',
    ensureLoggedIn('/signin'),
    function (req, res) {
      res.render('email', {
        pageTitle: "Send an email"
      });
    });

  app.get('/api/send-email', function (req, res) {
    //code to send e-mail.
    console.log(req.query);

    var mailOptions = {
      to: req.query.to,
      subject: req.query.subject,
      html: req.query.text
    }
    console.log(mailOptions);
    var smtpTransport = nodeMailer.createTransport({
      service: "gmail",
      // host: "smtp.gmail.com",
      auth: {
        user: "projectnextrutgers@gmail.com",
        pass: "neXtproject2018"
      }
    });
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        res.end("error");
      } else {
        console.log("Message sent: " + response.message);
        res.end("sent");
      }
    });




  });

  //This route would create new trips 
  app.post("/api/trips", function (req, res) {
    req.body.UserId = req.user.id;
    // req.user.id => req.body.UserId = req.user.id   
    db.Trips.create(req.body)
      .then(function (dbTrips) {
        console.log(dbTrips);
        res.json(dbTrips);
        //This route would create new trips 

      });
  });

  //This route would create new destinations 
  app.post("/destinations", function (req, res) {

    db.Destinations.create(req.body)
      .then(function (dbDestinations) {
        console.log(dbDestinations);
        res.json(dbDestinations);
      });
  });
  //This route would pull add destinations page
  app.get("/destinations/:params", function (req, res) {
    const tripdetails = req.params.params.split("&");
    console.log(tripdetails);
    res.render("destinations", {
      pageTitle: "Add Destinations",
      trip_name_from_trips: tripdetails[1],
      trip_id_from_trips: tripdetails[0],
      tripStart_from_trips: tripdetails[2],
      tripEnd_from_trips: tripdetails[3]
    });
  });
  //This route would create new trips 
  app.post("/api/review", function (req, res) {
    console.log("I made it to app.post for reviews")
    // console.log(req.user);
    // req.body.UserId = req.user.id;
    req.body.DestinationId = 3
    // req.user.id => req.body.UserId = req.user.id
    console.log(req.body);
    db.Reviews.create(req.body)
      .then(function (dbReviews) {
        //console.log(dbTrips)
        res.json(dbReviews);
      });
  });

  //This is the root route 
  app.get("/", function (req, res) {
    var render_obj = {
      pageTitle: "New Exciting Trips"
    };
    db.Reviews.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [db.Destinations]
    }).then(function (dbRecentReviews) {
      render_obj.reviews = dbRecentReviews;
      res.render("index", render_obj);

    });
  });

  //This route would pull the countries from the database
  app.get("/countries", function (req, res) {
    db.countries.findAll({}).then(function (dbCountries) {
      //console.log(dbCountries);
      res.json(dbCountries);
    });
  });

  app.get("/states/:id", function (req, res) {
    db.States.findAll({
      where: {
        country_id: req.params.id
      }
    }).then(function (dbStates) {
      res.json(dbStates);
    });
  });

  app.get("/cities/:id", function (req, res) {
    db.Cities.findAll({
      where: {
        state_id: req.params.id
      }
    }).then(function (dbCities) {
      res.json(dbCities);
    });
  });

  app.get("/add-trips", function (req, res) {
    var title = {
      pageTitle: "Add a Trip"
    };
    res.render("trips", title);
  });

  //This is the my profile route which will work only when signed in 
  app.get("/my-profile", ensureLoggedIn('/signin'), function (req, res) {
    db.Trips.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (dbTrips) {
      var tripsIdArray = dbTrips.map(function (res) {
        return res.id;
      })
      db.Destinations.findAll({
        where: {
          TripId: tripsIdArray
        }
      }).then(function (dbDestinations) {
        var destIdArray = dbDestinations.map(function (res) {
          return res.id;
        })
        db.Reviews.findAll({
          where: {
            DestinationId: destIdArray
          },
          order: [
            ['createdAt', 'DESC']
          ],
          include: [db.Destinations]
        }).then(function (dbReviews) {
          var render_obj = {
            pageTitle: "My Profile",
            trips: dbTrips,
            reviews: dbReviews
          };
          res.render("my-profile", render_obj);
        })
      })
    })
  })



  app.get("/reviews-searching/:search", function (req, res) {
   
    var searchedReview = req.params.search
    console.log("Searched Place");
    console.log(searchedReview);
    db.Destinations.findAll({
      where: {
        [Op.or]: [{
          destinationCountry: searchedReview
        }, {
          destinationState: searchedReview
        }, {
          destinationCity: searchedReview
        }],
        // [req.params.destinationtype] : req.params.search
      }

    }).then(function (searchedDestination) {
      console.log("SearchedDestination");
      console.log(searchedDestination);
      if (searchedDestination === undefined || searchedDestination.length == 0) {
        console.log("No Reviews");
        res.json("empty");
    }
    else {
      var searchedDestinationID = searchedDestination.map(function(res) {
        return res.id
      });
      console.log("Search Destination ID");
      console.log(searchedDestinationID);
      db.Reviews.findAll({
        where: {
          DestinationId: searchedDestinationID
        }
      }).catch(function (err) {
        return res.status(400).json({
          message: "issues trying to connect to database"
        });
      }).then(function (dbReviews) {
        console.log("SEARCHED REVIEW");
        console.log(searchedReview);
        var hbsObject = {

          review: dbReviews

        };
        console.log("HANDLEBARS OBJ: ", hbsObject);

        res.json(hbsObject);
      }).catch(function (err) {
        return res.status(400).json({
          message: "issues trying to connect to database"
        });
      });
    }});
  });

  


  //This route is just to get the user name to be displayed when logged in
  app.get("/loggedIn", function (req, res) {
    res.send(req.user);
  });

  //This is just a placeholder route when signed up or signed in will go here 
  app.get('/dashboard', isLoggedIn, function (req, res) {
    var username = "";
    username = req.user.firstname + " " + req.user.lastname;
    res.render('dashboard', {
      pageTitle: "DASH BOARD",
      username: username
    });
  });
  app.get("/getdestinations/:id", function (req, res) {
    db.Destinations.findAll({
      where: {
        TripId: req.params.id
      }
    }).then(function (dbDestinations) {
      console.log(dbDestinations);
      res.json(dbDestinations);
    });
  });


  app.post("/reviews", function (req, res) {
    db.Reviews.create(req.body)
      .then(function (dbReviews) {
        res.json(dbReviews);
      });
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/signin');
}