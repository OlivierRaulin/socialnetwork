exports.register = function( req, res ){
    // Register a new user
    console.log('user register');
    global.checkRequest(req, res, function(){
        var mandatoryParams = ["username", "login", "email", "password"];
        for(var i=0, max=mandatoryParams.length; i < max ; i++){
            if(!req.params[mandatoryParams[i]]){
                res.status('400').send("Missing parameter" + mandatoryParams[i]);
            }
        }
        
        db.connexions[req.params.appid].query("INSERT INTO users (username, login, email, password, salt) VALUES('"+ username +"', '"+ login +"', '"+ email +"', '"+ password +"', '"+ salt +"')", function(err){
            if(err){
                global.randomString(8, function(number){
                    res.send("{status:'error',errorId:"+ number +"}");
                    console.err("Error", number, ":", err);
                })
                
            } 
            else res.send("{status:'created'}");
        });
        
    });
    

}
