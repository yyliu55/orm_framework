var assert = require("assert");
var util = require("../lib/util");


describe("util", function(){

	it('is array ', function(){
		assert.equal(true, util.isArray([1, 2]) );
	});
	it('is not array ', function(){
		assert.equal(false, util.isArray("1") );
	});
})
