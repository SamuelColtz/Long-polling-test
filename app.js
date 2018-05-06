var clients = [];

exports.subscirbe = function(req, res) {
	clients.push(res);
};
exports.publish = function(message) {
	clients.forEach(function(res){
		res.end(message);
	});
	clients = [];
};
