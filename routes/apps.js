var config = require('../config.js');

exports.createApp = function(req,res){
    // We are requested to create a new app. We should generate an appid, an appkey and record the referer in the DB
    var appid, appkey, referer ;
    console.log(req.params);
    if(!req.params.referer) res.status('400').send('Missing referer');
    else {
        referer = req.params.referer;
        global.randomString(32, function(id){appid = id});
        global.randomString(32, function(key){appkey = key});
        // Temporaryly disabling apps registration as it's not ready
        //global.db.getConnections()["main"].query("INSERT INTO apps(app_id, app_key, referer) VALUES ('"+ appid +"', '"+ appkey +"', '"+ referer +"')");
        console.log("Generated new app, appid", appid, "appkey", appkey, "referer", referer);
        res.send({"appid":appid, "appkey":appkey, "referer":referer})
    }
}
