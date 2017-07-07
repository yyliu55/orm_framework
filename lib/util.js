
module.exports = {
	isArray : function(v){
        return toString.apply(v) === '[object Array]';
    },
    isFunction : function(v){
        return Object.prototype.toString.call(v)=== '[object Function]';
    }
}