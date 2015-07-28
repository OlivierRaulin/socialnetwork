var mysql = require("mysql");
var config = require('./config.js');
var Database = require('./db.js');
//global db;

/*
var connection = mysql.createConnection({
  host     : config.db.host     || 'localhost',
  user     : config.db.user     || 'socialnetwork',
  password : config.db.password || 'nopassword',
  database : config.db.db_name  || 'socialnetwork'
});
*/
exports.check = function(){
    // Check database structure and create if necessary
    global.db = new Database();
    fetchApps( commonCallback );    
}

function commonCallback( err ){
    if(err) throw err;
}

function connectDb(cb){
    connection.connect(function(err) {
        if (err) {
            throw err;
        }
    });
    cb();
}

function fetchApps(err){
    global.db.query("SELECT * from apps", "main", function(err, result){
        global.apps = result;
        console.log("Found", result.length, "apps, starting");
        for(var i=0, max=result.length; i < max; i++){
            console.log('Initiating connection to DB', result[i].app_id);
            global.db.connect(result[i].app_id, result[i].app_key);
        }
    })
}


