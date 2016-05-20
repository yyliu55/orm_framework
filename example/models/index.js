/**
 * Created by liujianlong on 2016/5/20.
 */

/**
 * @todo 加载数据库实例
 * @param connection
 */
var loadModel = function loadModel(connection){
    require('./User').getModels(connection);
};

module.exports.loadModel = loadModel;