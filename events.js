var Setup = require('./setup');
var setup = new Setup();

/* Handle uncaught exception */
process.on ( 'uncaughtException', function ( err ) {
    if ( err.code == "EADDRINUSE" ) {
        console.error ( "Address already in use" );
        process.exit ( 1 );
    }
    console.error ( "UncaughtException:", err.stack );
} );

/* Handle TERM signal to exit cleanly */
process.on ( "SIGTERM", function () {
    console.warn ( 'SIGTERM received' );
    /*webserver.close ( function () {
        console.warn ( "Server has been shut down" );
    } );*/
});

// We are asked to reload some stuff.
// Connect to new databases added dynamically.
process.on('SIGUSR1', function(){
	// Do the reloading
	global.db.query("SELECT * FROM apps", "main", function(err, dbs){
		setup.fetchApps();
	});
});
