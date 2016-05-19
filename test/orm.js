var assert = require("assert");
var orm_framework = require("orm_framework");
var config = require("../sample.config");

describe("mydql connection", function(){


	describe("OrmInstance connection", function(){

		it('should return -1 when the value is not present', function(){
        	assert.equal(-1, [1,2,3].indexOf(5));
		    assert.equal(-1, [1,2,3].indexOf(0));
		})
	})
})