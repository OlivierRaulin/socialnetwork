var mysql = require('mysql');
var config = require('./config.js');
var connections = {}

function Db(){
    this.connect();
}

Db.prototype = {
    connect: function(dbname, dbpass){
        if(connections[dbname]){
            console.log("Already connected to", dbname)
        }
        else if(!dbname){
            connections["main"] = mysql.createConnection({
              host     : config.db.host     || 'localhost',
              user     : config.db.user     || 'socialnetwork',
              password : config.db.password || 'nopassword',
              database : config.db.db_name  || 'socialnetwork'
            });
            connections["main"].connect(function(err){
                if(err) throw err;
                else console.log("Connected to DB main");
            });
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
                else console.log("Connected to DB", dbname);
            });
        }
    },
    
    query: function(query, db, cb){
        connections[db].query(query, cb);    
    },
    
    createDB: function(dbname, dbpass){
        // Not possible through mysql module.
        // Maybe a file in a folder and a cron passing and creating the db ?
    },
    
    getConnections:function(){
        return connections;
    }


}

module.exports = Db;
