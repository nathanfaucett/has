var tape = require("tape"),
    create = require("create"),
    has = require("..");


tape("has(object, key) should return true if object has own property", function(assert) {
    var object = {
            key: "key"
        },
        protoObject = create({
            protoKey: "protoKey"
        }),
        noProtoObject = create(null);

    protoObject.key = "key";
    noProtoObject.key = "key";

    assert.equal(has(object, "key"), true);
    assert.equal(has(object, "value"), false);
    assert.equal(has(protoObject, "key"), true);
    assert.equal(has(protoObject, "protoKey"), false);
    assert.equal(has(noProtoObject, "key"), true);
    assert.equal(has(noProtoObject, "value"), false);

    assert.end();
});
