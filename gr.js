var express = require("express");
var bodyParser = require("body-parser");

var goodreads = require("goodreads");

var port = 3002;

var app = express();
app.use(express.static(__dirname + "/app"));
app.use(bodyParser.json());

app.get("/shelves", goodreads.getShelves);
app.get("/shelf/:shelf", goodreads.getShelf);

/*
	LISTEN
*/
app.listen(port);
console.log("Listening ...");
