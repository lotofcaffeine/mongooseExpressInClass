var express = require('express');
var router = express.Router();
const User = require(__dirname + "/../models/User.js");


/* GET users listing. */
router.get('/all', function (req, res, next) {

  User.find().then(allUsers => {

      res.render("showUsers", {
        allUsers: allUsers
      });
      // res.send(allUsers);

    })
    .catch((err) => {
      console.log("An error happened:" + err);
    });

});

router.get('/one/:name', function (req, res, next) {

  const name = req.params.name;


  User.find({
      name: name
    }).then(user => {
      //res.send(user);
      res.render("showUsers", {
        allUsers: user
      });
      // res.send(allUsers);

    })
    .catch((err) => {
      console.log("An error happened:" + err);
    });

});

module.exports = router;