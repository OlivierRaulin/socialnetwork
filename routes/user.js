var userModel = require('../models/user');

exports.register = function( req, res ){
    // Register a new user
    console.log('user register');
    var mandatoryParams = ["username", "login", "email", "password"];
    for(var i=0, max=mandatoryParams.length; i < max ; i++){
        if(!req.params[mandatoryParams[i]]){
            res.status('400').send("Missing parameter" + mandatoryParams[i]);
        }
    }
    
    global.db.query("INSERT INTO users (username, login, email, password, salt) VALUES('"+ username +"', '"+ login +"', '"+ email +"', '"+ password +"', '"+ salt +"')", req.params.appid, function(err){
        if(err){
            global.randomString(8, function(number){
                res.send("{status:'error',errorId:"+ number +"}");
                console.err("Error", number, ":", err);
            })
            
        } 
        else res.json("{status:'created'}");
    });
};

exports.getById = function(req, res){
	userModel.manager.getById(req.id, req.appid, function(user){
		console.log("Returning user", user);
		res.json(user);
	});
	
};
