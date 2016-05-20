/**
 * Created by yyliu on 16/3/7.
 */

/**
 * @todo 用户数据库操作方法
 * @type {{create: Function, getById: Function, getPageByConditions: Function, getByConditions: Function, countByConditions: Function, getColumn: Function, getAll: Function, update: Function, delete: Function, execSql: Function}|exports|module.exports}
 */
var OrmInstance = require('../../lib/OrmInstance')
var BaseDao = require('../../lib/BaseDao')
OrmInstance.init(require("../config"));
var UserObj = require('../models/User');
var UserDao = function UserDao(){};

UserDao.prototype = new BaseDao(UserObj);


module.exports = new UserDao();


var u = new UserDao();
u.doRead(1, function(err, result){
    console.log(err);
    console.log(result);
})