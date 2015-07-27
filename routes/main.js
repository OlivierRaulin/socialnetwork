exports.index = function (req, res){
    global.checkRequest(req, res, function(){
        res.send("Hello");
    });
	
}
