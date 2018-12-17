//app .js

// Load Packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect to mongodb server
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function(){
  console.log("Connected to mongod server");
});
mongoose.connect("mongodb://localhost:27017/mongodb_tutorial",{useNewUrlParser:true});

//define model
var Book = require("./models/book");

//config app to use bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//config server port
var port = process.env.PORT || 3000;

//config router
var router = require("./routes")(app, Book);

//run server
var server = app.listen(port, function(){
  console.log("Express server has started on port " + port);
});
