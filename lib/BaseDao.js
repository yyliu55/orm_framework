/**
 * Created by yyliu on 16/3/14.
 */

var BaseDBHelper = require('./BaseDBHelper');
/**
 * @todo 基本Dao，供Dao初始化基础表操作方法
 * @type
 */

var BaseDao = function BaseDao(modelObj) {

    this.modelObj = modelObj;
}


/**
  * @todo 创建
  * @param obj   实体对象
  * @param callback 回调function(err, data)
  */
BaseDao.prototype.doCreate = function (obj, callback) {
    BaseDBHelper.create(this.modelObj['tableName'], obj, callback);
};

/**
 * @todo 通过ID查询
 * @param id    主键ID
 * @param callback 回调function(err, data)
 */
BaseDao.prototype.doRead = function (id, callback) {
    BaseDBHelper.getById(this.modelObj['tableName'], id, callback);
};

/**
 * @todo 查询表的某个字段数据值
 * @param conditions    查询条件
 * @param order     排序
 * @param columns   查询字段名
 * @param callback   回调function(err, data)
 */
BaseDao.prototype.doQueryColumn = function (conditions, order, columns, callback) {
    BaseDBHelper.getColumn(this.modelObj['tableName'], conditions, order, columns, callback);
};

/**
 * @todo 更新数据
 * @param obj   更新数据实体
 * @param callback   回调function(err, data)
 */
BaseDao.prototype.doUpdate = function (obj, callback) {
    BaseDBHelper.update(this.modelObj['tableName'], obj, callback);
};

/**
 * @todo 通过条件删除
 * @param conditions    删除条件
 * @param callback  回调function(err, data)
 */
BaseDao.prototype.doDelete = function (conditions, callback) {
    BaseDBHelper.delete(this.modelObj['tableName'], conditions, callback);
};

/**
 * @todo 通过ID删除
 * @param id    ID
 * @param callback  回调function(err, data)
 */
BaseDao.prototype.doDeleteById = function (id, callback) {
    BaseDBHelper.delete(this.modelObj['tableName'], {id: id }, callback);
};

/**
 * @todo 根据条件查询数据集
 * @param conditions 查询条件
 * @param order 排序
 * @param callback 回调function(err, data)
 */
BaseDao.prototype.doQuery = function (conditions, order, callback) {
    if(conditions == 'undefined') conditions = null;
    if(order == 'undefined' || order == null) order = 'id';
    BaseDBHelper.getByConditions(this.modelObj['tableName'], conditions, order, function( err, rows) {

        if(err != null) return callback(err, rows);
        return callback(err, rows);
    });
};

/**
 * @todo 根据条件计算数据总数
 * @param conditions 查询条件
 * @param callback 回调function(err, data)
 */
BaseDao.prototype.doCount = function (conditions, callback) {
    if(conditions == 'undefined') conditions = null;
    BaseDBHelper.countByConditions(this.modelObj['tableName'], conditions, function( err, rows) {
        if(err) return callback(err, rows);
        return callback(err, rows);
    });
};

/**
 * @todo 根据条件进行数据集翻页查询
 * @param conditions 查询条件
 * @param pageSize 每页数据集个数
 * @param pageNo 页码从0开始计数
 * @param order 排序
 * @param callback 回调function(err, data)
 */
BaseDao.prototype.doQueryForPage = function (conditions, pageSize, pageNo, order, callback) {
    if(conditions == 'undefined') conditions = null;
    if(order == 'undefined' || order == null) order = 'id';
    if(pageSize == null) pageSize = 10 ; else pageSize = parseInt(pageSize);
    if(pageNo == null) pageNo = 0; else pageNo = parseInt(pageNo);

    BaseDBHelper.getPageByConditions(this.modelObj['tableName'], conditions, pageSize, pageNo, order, function( err, rows) {

        if(err != null) return callback(err, rows);
        return callback(null, rows);
    });
};

/**
 * @todo 获取该表所有数据(慎用)
 */
BaseDao.prototype.doAllData = function(callback){

    BaseDBHelper.getAll(this.modelObj['tableName'], function( err, rows) {
        return callback(err, rows);
    });
};

module.exports = BaseDao;