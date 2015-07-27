var config 	= require ('./config.js');
var events 	= require ('./events.js');
var mainRoutes 	= require ('./routes/main.js');
var user        = require ('./routes/user.js');
var apps        = require ('./routes/apps.js');
var express 	= require ('express');
var setup       = require ('./setup.js');

setup.check();

var app = express() ;

// Main routes
app.get( '/', mainRoutes.index );

// Apps related routes
// This one needs to be changed to post one day
app.get('/apps/create/:referer?', apps.createApp);

// User-related routes
app.post( '/user/register', user.register );

app.listen( config.http.port || 8000, function(err){
	if( err ){ throw err; exit(1) ; }
	console.log("Listening on port", config.http.port || 8000);
});

process.on( 'uncaughtException', function ( err ) {
    if (config.debug == true) process.exit( 1 );
    console.error( "UncaughtException:", err );
} );

global.checkRequest = function(req, res, ok){
    console.log("-------- HEADERS --------- \n", req.headers, "\n---------- PARAMS ---------- \n", req.params); 
    console.log('REFERER ', req.headers.referer);
    if( req.params.appid && req.params.appkey && req.headers.referer ){
        // Checking if we authorize the call
        res.status(200);
        ok();
    }
    else res.status(401).send("Unauthorized");
}
