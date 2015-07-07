/* jshint -W001 */
var assert = require("assert"),
    hasSrc = require.resolve("../src/index"),
    has = require(hasSrc);


var nativeHasOwnProp = Object.prototype.hasOwnProperty;


describe("has", function() {
    it("should return true if object has own property", function() {
        var object = {
                key: "key"
            },
            protoObject = Object.create({
                protoKey: "protoKey"
            }),
            noProtoObject = Object.create(null);

        protoObject.key = "key";
        noProtoObject.key = "key";

        assert.equal(has(object, "key"), true);
        assert.equal(has(object, "value"), false);
        assert.equal(has(protoObject, "key"), true);
        assert.equal(has(protoObject, "protoKey"), false);
        assert.equal(has(noProtoObject, "key"), true);
        assert.equal(has(noProtoObject, "value"), false);

        delete require.cache[hasSrc];
        Object.prototype.hasOwnProperty = function(key) {
            return nativeHasOwnProp.call(this, key);
        };
        has = require(hasSrc);

        assert.equal(has(object, "key"), true);
        assert.equal(has(object, "value"), false);
        assert.equal(has(protoObject, "key"), true);
        assert.equal(has(protoObject, "protoKey"), false);
        assert.equal(has(noProtoObject, "key"), true);
        assert.equal(has(noProtoObject, "value"), false);
    });
});
