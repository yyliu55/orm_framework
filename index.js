var OrmInstance = require("./lib/OrmInstance");
var BaseDao = require("./lib/BaseDao");

/**
*	
*/
exports.init = function(config) {
	OrmInstance.init(config);
}

exports.baseDao = BaseDao;