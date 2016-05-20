var path = require("path");
var config = {
    "database": {
        "host": "",
        "user": "",
        "password": "",
        "port": "",
        "database": "",
        "max": 4,
        "min": 2,
        "idleTimeoutMillis": 10000,
        "protocol": "mysql",
        "socketPath": "",
        "query": {
            "pool": true,
            "debug": false
        }
    },
    "modelsPath": "../example/models",
    "options": {
        "instance.cache": false
    }
}

config['modelsPath'] = path.normalize(path.join(__dirname, './models'));


module.exports = config;