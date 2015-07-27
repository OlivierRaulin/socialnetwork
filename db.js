var mysql = require('mysql');
var config = require('./config.js');
var connections = {}

function Db(){
    this.connect();
    console.log('Connected to general database');
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
        }
        else{
            connections[dbname] = mysql.createConnection({
              host     : config.db.host     || 'localhost',
              user     : dbname,
              password : dbpass,
              database : dbname
            });
        }
    },
    
    query: function(query, db, cb){
        connections[db].query(query, cb);    
    },
    
    createDB: function(dbname, dbpass){
        // Not possible through mysql module.
        // Maybe a file in a folder and a cron passing and creating the db ?
    }


}

module.exports = Db;
