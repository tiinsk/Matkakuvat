var Flickr = require("flickrapi"),
flickrOptions = require("./flickrauth");
var express = require('express');

Flickr.authenticate(flickrOptions, function(error, flickr) {
	if(error){
		console.log(error);
	}
	else{

		var app = express();

		app.use(express.static(__dirname + '/public'));

		app.get('/', function(req, res){

			res.sendfile('index.html');
		});

		var kohde = require('./routes/kohde.js');
		kohde(app, flickr);
		
		var port = process.env.PORT || 3000;
		app.listen(port);
		
		console.log("Hello world!");
	}

});
