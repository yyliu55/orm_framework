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
        this.config = config;
    },
    getConnection: function (callback) {
        var that = this;
        if(!that.config) {
            return callback("config is null error");
        }
        orm.connect(that.config['database'], function (err, db) {
            if (err) return callback(err);
            if(that.config['options']['instance.cache']) {
                db.settings.set('instance.cache', that.config['options']['instance.cache']);
            }
            that.connection = db;
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

