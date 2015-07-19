var config 	= require ('./config.js');
var events 	= require ('./events.js');
var mainRoutes 	= require ('./routes/main.js');
var express 	= require ('express');

var app = express() ;

app.get( '/', mainRoutes.index );

app.listen( config.http.port || 8000, function(err){
	if( err ){ throw err; exit(1) ; }
	console.log("Listening on port", config.http.port || 8000);
});
