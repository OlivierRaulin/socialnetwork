var config = require('../config.js');
var mysql  = require('mysql');
exports.createApp = function(req,res){
    // We are requested to create a new app. We should generate an appid, an appkey and record the referer in the DB
    var appid, appkey, referer ;
    console.log(req.params);
    if(!req.params.referer) res.status('400').send('Missing referer');
    else {
        referer = req.params.referer;
        generateKey(32, function(id){appid = id});
        generateKey(32, function(key){appkey = key});
        console.log("Generated new app, appid", appid, "appkey", appkey, "referer", referer);
        res.send({"appid":appid, "appkey":appkey, "referer":referer})
    }
}

function generateKey(length, cb){
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var generated = "";
    
    function getRandom(){
        return Math.random() * chars.length;
    }
    for( var i=0; i<length; i++ ){
        generated += chars.charAt( getRandom() );
    }
    cb(generated);
}
