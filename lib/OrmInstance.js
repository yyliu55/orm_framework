/**
 * Created by yyliu on 16/3/7.
 */

var orm = require("orm");
var util = require("./util");

var OrmInstance = {
    connection: false,
    debug: false,
    models: [],
    config: false,
    init: function(config) {
        console.log(config);
        this.config = config;
    },
    getConnection: function (callback) {
        if(!OrmInstance.config) {
            return callback("config is null error");
        }
        orm.connect(OrmInstance.config['database'], function (err, db) {
            if (err) return callback(err);
            if(OrmInstance.config['options']['instance.cache']) {
                db.settings.set('instance.cache', OrmInstance.config['options']['instance.cache']);
            }
            OrmInstance.connection = db;
            callback(null, db);
        });
    },
    loadModels: function(callback) {
        var that = this;
        if(!that.connection) {
            that.getConnection(function(err, connection) {
                if(err) {
                    return callback(err);
                }

                if(util.isArray(that.config['modelsPath'])) {

                    that.config['modelsPath'].forEach(function(item) {
                        require(item).loadModel(connection);
                    })
                } else {
                    require(that.config['modelsPath']).loadModel(connection);
                }
                
                callback(null, connection);
            })
        } else {

            callback(null, that.connection);
        }
    }
}

module.exports = OrmInstance;

