// call the packages we need
var express    		= require('express');        // call express
var app        		= express();                 // define our app using express
var bodyParser 		= require('body-parser');
var mongoose   		= require('mongoose');
var methodOverride 	= require('method-override');

//mongodb://<dbuser>:<dbpassword>@ds015953.mlab.com:15953/mongo-example-test
mongoose.connect('mongodb://cuongpt105:123456@ds015953.mlab.com:15953/mongo-example-test'); // connect to our database

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// ROUTES FOR OUR API
// =============================================================================
var routes = require('./routes/routes');
app.use('/api', routes);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);