
module.exports = {
	isArray : function(v){
        return toString.apply(v) === '[object Array]';
    }	
}