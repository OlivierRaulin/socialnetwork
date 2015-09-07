var mysql = require("mysql");
var config = require('./config');
var Database = require('./models/db');
//global db;

/*
var connection = mysql.createConnection({
  host     : config.db.host     || 'localhost',
  user     : config.db.user     || 'socialnetwork',
  password : config.db.password || 'nopassword',
  database : config.db.db_name  || 'socialnetwork'
});
*/
function Setup(){}

Setup.prototype = {
	check : function(){
		// Check database structure and create if necessary
		if( !global.appids ) global.appids = {};
		if( !global.db ) global.db = new Database();
		this.fetchApps( this.commonCallback );    
	},

	commonCallback: function( err ){
		if(err) throw err;
	},

	connectDb: function(cb){
		connection.connect(function(err) {
		    if (err) {
		        throw err;
		    }
		});
		cb();
	},

	fetchApps : function (err){
		global.db.query("SELECT * from apps", "main", function(err, result){
			if(result){
				global.apps = result;
				console.log("Found", result.length, "apps, starting");
				for(var i=0, max=result.length; i < max; i++){
				    console.log('Initiating connection to DB', result[i].app_id);
				    global.db.connect(result[i].app_id, result[i].app_key);
				    global.appids[result[i].app_id] = result[i].app_key;
				}
		    }
		    else console.log("Found 0 app :(");
		});
	}
}

module.exports = Setup;
