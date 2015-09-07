var config = require('../config.js');
var main = require('../routes/main');

exports.createApp = function(req,res){
    // We are requested to create a new app. We should generate an appid, an appkey and record the referer in the DB
    var appid, appkey, referer ;
    console.log(req.params);
    appid = main.randomString(16);
    appkey = main.randomString(32);
    // TODO: for prod, go with a file that gets parsed by a cron job to create and grant rights.
    /*global.db.query("CREATE DATABASE " + appid + ";", "main", function(err, created){
    	console.log("create", err, created)
    	global.db.query("GRANT ALL PRIVILEGES ON "+ appid +".* to " + appid + " IDENTIFIED BY '" + appkey + "';", "main", function(err, granted){
    		console.log("grant", err, granted);
    		global.db.query("INSERT INTO apps(app_id, app_key) VALUES ('"+ appid +"', '"+ appkey +"'); ", "main", function(err, inserted){
    			console.log("insert", err, inserted);
    		});
    	});    
    });*/
    console.log("Generated new app, appid", appid, "appkey", appkey, "referer", referer);
    global.appids[appid] = appkey;
    res.send({"appid":appid, "appkey":appkey});
}
