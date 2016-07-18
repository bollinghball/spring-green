var express = require('express');

//Formats the request bdoy from POST, PUT, PATCH and puts them on the 'req.body' property
var bodyParser = require('body-parser');
// CORS allows for cross-origin requests, making our API available across multiple HTTP origins/hosts.
var cors = require('cors');

var app = express();

app.use(bodyParser());
app.use(cors());

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/public'));

// API Routes go here
// 
app.listen(8000);