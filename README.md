#orm_framework
#please read example how to use
##Install
```sh
$npm install --save orm_framework
```
##Example config
```js
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
config['modelsPath'] = path.normalize(path.join(__dirname, '../example//models'));
module.exports = config;
```
##Example init
```js
var OrmInstance = require("orm_framework");
OrmInstance.init(require("../config"));
```
##License
MIT