'use strict';

function UserManager(){}

UserManager.prototype = {
	getById: function(id, appid, callback){
		console.log("Fetching user by id", id, appid);
		callback("Test");
	}
}

// Instanciating the user manager
var _UserManager = new UserManager();
console.log(_UserManager);

User.manager = _UserManager;

function User(appId, userId, userName){
	this.app_id 	= appId;
	this.user_id 	= userId;
	this.userName 	= userName;
}

User.prototype = {
	manager : _UserManager,
	
	
	setUsername: function(newName){
		this.userName = newName;
	},
	
	save: function(){
		global.db.saveUser(this);
	}
}

module.exports = User;
