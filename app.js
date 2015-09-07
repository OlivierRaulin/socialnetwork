var config 	= require ('./config.js');
var events 	= require ('./events.js');
var mainRoutes 	= require ('./routes/main');
var userRoutes  = require ('./routes/user');
var apps        = require ('./routes/apps');
var express 	= require ('express');
var Setup       = require ('./setup');

var setup = new Setup();
setup.check();

var app = express() ;
app.use(express.static(__dirname + '/www'));

// Main routes
app.get( '/', mainRoutes.index );

//TODO: handle with app.routes('/test').get(callback).post(callback).put(callback); ...
// Apps related routes
// This one needs to be changed to post one day
app.post('/app', apps.createApp);

// User-related routes
app.post( '/user/register', mainRoutes.checkRequest, userRoutes.register );
app.get( '/user/:id/:appid/:appkey', mainRoutes.checkRequest, userRoutes.getById );

app.listen( config.http.port || 8000, function(err){
	if( err ){ throw err; exit(1) ; }
	console.log("Listening on port", config.http.port || 8000);
});
