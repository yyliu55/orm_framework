/**
 * Created by liujianlong on 2016/5/20.
 */
/**
 * Created by yyliu on 15/5/10.
 */

module.exports = {
    tableName: "users",
    getModels: function(connection) {

        var users = connection.define('users',
            {
                id: {type: 'serial', key: true}, // the auto-incrementing primary key
                uuid: {type: 'text'},
                login: {type: 'text'},
                alias: {type: 'text'},
                roleName: {type: 'text'},
                password: {type: 'text'},
                email: {type: 'text'}

            }
        );
    }
};
