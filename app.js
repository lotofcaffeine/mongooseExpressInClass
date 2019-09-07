const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const form = require("./routes/form");

const mongoose = require("mongoose");

const app = express();

//here connect with database

mongoose
  .connect("mongodb://localhost:27017/mytestapp", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("I AM CONNECTED");
  })
  .catch(err => {
    console.log("Something went wrong");
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

//serving static files;
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/form", form);
app.use("/delete", form);



app.get("/newRoute", (req, res) => {
  res.render("index", {
    route: "/newRoute"
  })
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;