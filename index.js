var OrmInstance = require("./lib/OrmInstance");
var BaseDao = require("./lib/BaseDao");
var BaseDBHelper = require("./lib/BaseDBHelper");

/**
*	
*/
exports.init = function(config) {
	OrmInstance.init(config);
}

exports.BaseDao = BaseDao;
exports.BaseDBHelper = BaseDBHelper;