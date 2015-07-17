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
}.bind ( this ) );
