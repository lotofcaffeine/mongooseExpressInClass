var express = require("express");
var router = express.Router();
const User = require(__dirname + "/../models/User.js");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));

/* GET home page. */
router.get("/", function (req, res, next) {
    User.find().then(allUsers => {

            res.render("showForm", {
                allUsers: allUsers,
                route: "/form"
            });
            // res.send(allUsers);

        })
        .catch((err) => {
            console.log("An error happened:" + err);
        });
    // res.render("form");
});

router.post("/", function (req, res, next) {
    debugger;
    let name = req.body.name;
    let mood = req.body.mood;
    let age = req.body.age;
    console.log(`${name},${mood},${age}`);


    User.create({
        name: name,
        mood: mood,
        age: age
    }, function (err, user) {
        if (err) {
            console.log('An error happened:', err);

        } else {
            // let form = window.document.querySelector(".form-user");
            // form.reset();
            res.redirect("/form");
            console.log('The user is saved and its value is: ', user);
        }
    });
});

router.post("/updateUser", function (req, res, next) {

    let name = req.body.name;
    let mood = req.body.mood;


    User.updateOne({
            name: name
        }, {
            mood: mood
        })
        .then(() => {
            res.redirect("/form");

        })
        .catch(() => console.log("error"));


});

router.post("/deleteUser", function (req, res, next) {

    let name = req.body.name;
    User.deleteOne({
            name: name
        })
        .then(() => {
            res.redirect("/form");
        }).catch(() => console.log("error"));


});

module.exports = router;