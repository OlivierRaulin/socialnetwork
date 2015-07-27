exports.register = function( req, res ){
    // Register a new user
    console.log('user register');
    global.checkRequest(req);
    
    res.send("{}");
}
