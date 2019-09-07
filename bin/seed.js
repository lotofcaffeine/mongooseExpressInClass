const mongoose = require("mongoose");
const User = require(__dirname + "/../models/User.js");
const data = require(__dirname + "/data.js");

mongoose
  .connect("mongodb://localhost:27017/mytestapp", { useNewUrlParser: true })
  .then(() => {
    console.log("I AM CONNECTED");
    return User.deleteMany();
  })
  .then(() => {
    //throw new Error("Users cannot be inserted");
    return User.insertMany(data);
  })
  .then(() => {
    mongoose.connection.close();
    console.log("Conn closed");
  })
  .catch(err => {
    console.log("Something went wrong", err);
    mongoose.connection.close();
  });

//### dependencies = stuff we rely on. are dependent on

// libraries, node module third party library
//mongoose
//user model
//data

//Make connection

//delete first
//insert data
// close connection
