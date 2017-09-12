var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:"main"});
app.engine("handlebars",handlebars.engine);
app.set("view engine","handlebars");
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname +'/public'));

var fortunes =["Conquer your fears or they will coquer you.",
               "Rivers need springs.",
               "Do not fear what you don't know.",
               "Rivers need springs.",
               "Rivers need springs.",
              ];

app.get("/", function(req,res){
  res.render("home");
});
app.get("/about", function(req,res){
var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
  res.render("about",{fortune:randomFortune}); 
});

app.get("/datetime", function(req,res){
var d = new Date();
  res.render("datetime",{date:d});
});

//custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render("404"); ;
});
//custom 500 page
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function(){
  console.log("Express started on");
});

