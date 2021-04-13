module.exports = function(app, passport, db) {
const fetch = require('node-fetch')

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  //what if there is no profile???
  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('profile').findOne({
      user: req.user.local.email
    }, (err, result) => {
      console.log(result);
      if (err) return console.log(err)
      res.render('profile.ejs', {
        profile: result
      })
    })
  });

  //WHAT IF THE USER ALRRADY HAS A PROFILE??
  app.get('/create', isLoggedIn, function(req, res) {
    // db.collection('messages').find().toArray((err, result) => {
    //   if (err) return console.log(err)
    res.render('createProfile.ejs', {
      user: req.user.local.email,
      // messages: result
    })
  });

  app.get('/expensePage', isLoggedIn, function(req, res) {
    //find method ensures that its only showing that specific users info and sorts by current date
    db.collection('expenses').find({
      user: req.user.local.email
    }).sort({
      currentDate: 1
    }).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('expenses.ejs', {
        user: req.user,
        expenses: result
      })
    })
  });

  app.get('/expenseReport', isLoggedIn, function(req, res) {
    //find method ensures that its only showing that specific users info and sorts by current date
    db.collection('expenses').find({
      user: req.user.local.email
    }).sort({
      currentDate: 1
    }).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('expenseReport.ejs', {
        user: req.user,
        expenses: result
      })
    })
  });

  app.get('/livechatPage', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('livechat.ejs', {
        user: req.user.local.email,
        messages: result
      })
    })
  });

  app.get('/diningPage', isLoggedIn, function(req, res) {
      res.render('dining.ejs', {
        restaurants: null,
        zip: null,
        user: req.user,
      })
    });

  app.get('/jobPage', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('jobs.ejs', {
        user: req.user.local.email,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================


  app.post('/createProfile', isLoggedIn, (req, res) => {
    db.collection('profile').save({
      user: req.user.local.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      currentEmployed: req.body.currentEmployed,
      city: req.body.city,
      state: req.body.state,
      aboutMe: req.body.aboutMe
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/profile')
    })
  })

  app.post('/expensePage', (req, res) => {
    const date = new Date(Date.parse(req.body.currentDate + ' ' + req.body.time + ' GMT'))
    console.log(date);
    db.collection('expenses').save({
      user: req.user.local.email,
      currentDate: date,
      category: req.body.category,
      amount: req.body.amount,
      description: req.body.description
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/expensePage')
    })
  })

  app.post('/expenseReport', (req, res) => {
    const date = new Date(Date.parse(req.body.currentDate + ' ' + req.body.time + ' GMT'))
    console.log(date);
    db.collection('expenses').save({
      user: req.user.local.email,
      currentDate: date,
      category: req.body.category,
      amount: req.body.amount,
      description: req.body.description
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/expenseReport')
    })
  })

  app.post('/diningPage', (req, res) => {
    const zip = req.body.Zipcode
    const url = `https://api.documenu.com/v2/restaurants/zip_code/${zip}?key=d2742dcef78e36acc44f109a098f3fb3&page=1`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        let restaurants = data.data
        res.render('dining.ejs', {
          user: req.user,
          zip: zip,
          restaurants: restaurants
        })
        console.log(zip);
      }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/expensePage')
      })
  })




  app.put('/messages', (req, res) => {
    db.collection('messages')
      .findOneAndUpdate({
        name: req.body.name,
        msg: req.body.msg
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.put('/messages/thumbDown', (req, res) => {
    db.collection('messages')
      .findOneAndUpdate({
        name: req.body.name,
        msg: req.body.msg
      }, {
        $set: {
          thumbUp: req.body.thumbUp - 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.delete('/deleteExpense', (req, res) => {
    db.collection('expenses').findOneAndDelete({
      user: req.user.local.email
    }, (err, result) => {
      console.log(result);
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/create', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
