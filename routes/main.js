exports.index = function (req, res){
    res.send("Hello");
}

exports.checkRequest = function(req, res, next){
	console.log("-------- HEADERS --------- \n", req.headers, "\n---------- PARAMS ---------- \n", req.params); 
    console.log('REFERER ', req.headers.referer);
    var appid = req.params.appid;
    var appkey = req.params.appkey;
    if( appid && appkey ){
    	if(global.appids && global.appids[appid] && global.appids[appid] == appkey){ // App exists and appkey is correct
			console.log("Call authorized, calling next function");
			next();
    	} 
    	else res.status(401).send("Incorrect couple appid / appkey");    	      
    }
    else res.status(401).send("Unauthorized");
}

exports.randomString = function(length){
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var generated = "";
    
    function getRandom(){
        return Math.random() * chars.length;
    }
    for( var i=0; i<length; i++ ){
        generated += chars.charAt( getRandom() );
    }
    return generated;
}
