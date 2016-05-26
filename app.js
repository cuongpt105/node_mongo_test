// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

//mongodb://<dbuser>:<dbpassword>@ds015953.mlab.com:15953/mongo-example-test
mongoose.connect('mongodb://cuongmongolab105:cuongmongolab675214@ds015953.mlab.com:15953/mongo-example-test'); // connect to our database

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var routes = require('./routes/routes');
app.use('/api', routes);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);