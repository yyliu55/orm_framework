/**
 * Created by yyliu on 15/5/19.
 */
var OrmInstance = require('./OrmInstance');

/**
 * @todo 数据库操作封装func
 * @type {{create: Function, getById: Function, getPageByConditions: Function, getByConditions: Function, countByConditions: Function, getColumn: Function, getAll: Function, update: Function, delete: Function, execSql: Function}}
 */

module.exports = {

    /**
     * @todo 数据写入
     * @param model 表名或ORM对应model名称
     * @param item 写入数据Obj
     * @param callback 回调function(err, data)
     */
    create : function (model, item , callback){
        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            db.models[model].create(item, function (err, items) {
                if(err) return callback(err, items);

                return callback(null, items);
            });
        })
    },

    /**
     * @todo 根据ID查询
     * @param model 表名或ORM对应model名称
     * @param id ID
     * @param callback 回调function(err, data)
     */
    getById : function (model, id, callback) {

        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            db.models[model].get(id, function(err, result) {
                if (err){
                    return callback(err, result);
                }
                return callback(null , result);
            });
        })
    },

    /**
     * @todo 翻页查询
     * @param model 表名或ORM对应model名称
     * @param conditions 查询条件
     * @param limit 数据量
     * @param offset 偏移即页码 从0开始
     * @param order 排序
     * @param callback 回调function(err, data)
     */
    getPageByConditions : function (model, conditions, limit, offset, order, callback) {

        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }

            db.models[model].find(conditions).limit(limit).offset(offset).orderRaw(order).run(function (err, results) {

                if (err) {
                    return callback(err, results);
                }
                return callback(null, results);
            });
        });
    },

    /**
     * @todo 翻页查询(特定字段)
     * @param model 表名或ORM对应model名称
     * @param conditions 查询条件
     * @param onlyList 字段列表
     * @param limit 数据量
     * @param offset 偏移即页码 从0开始
     * @param order 排序
     * @param callback 回调function(err, data)
     */
    getPageByConditionsOnlyList : function (model, conditions, onlyList, limit, offset, order, callback) {

        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }

            db.models[model].find(conditions).only(onlyList).limit(limit).offset(offset).orderRaw(order).run(function (err, results) {

                if (err) {
                    return callback(err, results);
                }
                return callback(null, results);
            });
        });
    },

    /**
     * @todo 根据条件查询数据
     * @param model 表名或ORM对应model名称
     * @param conditions 查询条件
     * @param order 排序
     * @param callback 回调function(err, data)
     * @param [columns] 可选 返回查询字段列数组[]
     */
    getByConditions : function (model, conditions, order, callback, columns) {

        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            if(columns) {
                db.models[model].find(conditions).only(columns).orderRaw(order).run(function (err, results) {

                    if (err) {

                        return callback(err, results);
                    }
                    return callback(null, results);
                });
            } else {
                db.models[model].find(conditions).orderRaw(order).run(function (err, results) {

                    if (err) {

                        return callback(err, results);
                    }
                    return callback(null, results);
                });
            }
        });
    },

    /**
     * @todo 计算某条件下的数据量
     * @param model 表名或ORM对应model名称
     * @param conditions count条件
     * @param callback 回调function(err, data)
     */
    countByConditions :  function (model, conditions,  callback) {

        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            db.models[model].find(conditions).count(function (err, results) {

                if (err) {

                    return callback(err, results);
                }
                return callback(null, results);
            });
        });
    },

    /**
     * @todo 查询表column数据
     * @param model 表名或ORM对应model名称
     * @param conditions 查询条件
     * @param orders 排序
     * @param onlyList column名称
     * @param callback 回调function(err, data)
     */
    getColumn : function (model, conditions, orders, onlyList, callback) {
        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            db.models[model].find(conditions).only(onlyList).orderRaw(orders).run(function (err, results) {
                if (err) return callback(err, null);

                return callback(null, results);
            });
        });
    },

    /**
     * @todo 查询所有数据集
     * @param model 表名或ORM对应model名称
     * @param callback 回调function(err, data)
     */
    getAll : function (model, callback) {
        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            db.models[model].find({}, function (err, model) {
                if (err) return callback(err, null);

                return callback(null, model);
            });
        });
    },

    /**
     * @todo 更新数据
     * @param model 表名或ORM对应model名称
     * @param conditions 更新实体条件，必须包含ID主键
     * @param callback 回调function(err, data)
     */
    update : function(model, conditions, callback) {

        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            } else {
                var key = db["models"][model].id[0];
                if(!key) {
                    callback("no key for update");
                } else {
                    db.models[model].get(conditions[db["models"][model].id[0]], function (err, item) {

                        if(err) return callback(err);

                        item.save(conditions, function (err) {
                            if (err) return callback(err, item);
                            return callback(null, item);
                        });
                    });
                }
            }
        });
    },

    /**
     * @todo 删除数据
     * @param model 表名或ORM对应model名称
     * @param conditions 删除条件
     * @param callback 回调function(err, data)
     * @returns {*}
     */
    delete : function (model, conditions, callback){

        if(conditions == null || conditions == '')
            return callback('conditions is null' , null);

        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            db.models[model].find(conditions).remove(function (err, rows) {

                if (err) {
                    return callback(err, rows);
                }
                return callback(null, rows);
            });
        });
    },
    /**
     * @todo 执行SQL
     * @param sql SQL语句
     * @param params 条件参数
     * @param callback 回调function(err, data)
     */
    execSql : function (sql, params, callback){
        OrmInstance.loadModels(function(err, db){
            if(err) {
                return callback(err);
            }
            db.driver.execQuery(sql, params, function (err, rows) {

                if (err) {
                    return callback(err, rows);
                }
                return callback(null, rows);
            });
        })
    }
};