var mysql = require('mysql');
var config = require('../config.js');
var connections = {}

function Db(){
    this.connect();
}

Db.prototype = {
    connect: function(dbname, dbpass){
        if(!dbname){
        	if(connections["main"]){
            	console.log("Already connected to", dbname)
        	}
        	else {
		        connections["main"] = mysql.createConnection({
		          host     : config.db.host     || 'localhost',
		          user     : config.db.user     || 'socialnetwork',
		          password : config.db.password || 'nopassword',
		          database : config.db.db_name  || 'socialnetwork'
		        });
		        connections["main"].connect(function(err){
		            if(err) throw err;
		            else {
		            	console.log("Connected to DB main");
		            	this.checkMainTables();
		            }
		        }.bind(this));
            }
        }
        else if(connections[dbname]){
            console.log("Already connected to", dbname)
        }
        else{
            connections[dbname] = mysql.createConnection({
              host     : config.db.host     || 'localhost',
              user     : dbname,
              password : dbpass,
              database : dbname
            });
            connections[dbname].connect(function(err){
                if(err) throw err;
                else {
                	console.log("Connected to DB", dbname);
                	this.checkTables(dbname);
                }
            }.bind(this));
        }
    },
    
    checkMainTables: function(){
    	this.checkAndCreateTable("apps", "main", function(err, result){
    		//console.log(err, result);
    	}.bind(this));
   	},
   	
   	checkAndCreateTable: function(table, dbname, callback){
   		this.query("SHOW TABLES FROM " + dbname + " WHERE Tables_in_" + dbname + " = '" + table + "';", dbname, function(err, result){
   			if(!result.length){
	   			var fields = ["app_id VARCHAR (32) PRIMARY KEY", "app_key VARCHAR(32)"];
	   			this.createTable("apps", "main", fields, function(err, result){
	   				callback(err, result);
	   			});
	   		}
   		}.bind(this));
   	},
    
    checkTables:function(dbname){
    	//console.log("Assuming tables from DBname %s are correct, as creation is not yet implemented", dbname);
    	this.checkTable("user", dbname, function(err, result){
    		var fields = ["user_id VARCHAR(32) PRIMARY KEY", "app_id VARCHAR(32)", "user_name VARCHAR(32)"];
    		this.createTable("user", dbname, fields, function(err, result){
    			console.log(err, result);
    		});
    	}.bind(this));
    },
    
    createTable: function(table, db, fields, callback){
    	var queryFields = "";
    	for(var i = 0, max=fields.length; i < max; i++){
    		queryFields += fields[i];
    		queryFields += i < max - 1 ? ", " : "";
    		console.log(queryFields);
    	}
    	this.query("CREATE TABLE " + table + " (" + queryFields + ");", db, function(err, create){
    		console.log(err, create);
    	});
    },
    
    query: function(query, db, cb){
        connections[db].query(query, cb);    
    },
    
    createDB: function(dbname, dbpass){
        // Not possible through mysql module.
        // Maybe a file in a folder and a cron passing and creating the db ?
        // We should capture a signal to reload and connect to the new DB then
    },
    
    getConnections:function(){
        return connections;
    }
}

module.exports = Db;
