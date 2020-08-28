var express = require('express');
var app= express();
var bodyParser = require('body-parser');
    
var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));



app.get("/",function(req,res){
	res.sendFile("index.html");
});

app.use('/api/todos',todoRoutes);



var port = process.env.PORT || 6000;
app.listen(port, function () {
  console.log("Server Has Started!");
});