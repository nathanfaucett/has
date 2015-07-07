var isNative = require("is_native"),
    getPrototypeOf = require("get_prototype_of"),
    isNullOrUndefined = require("is_null_or_undefined");


var nativeHasOwnProp = Object.prototype.hasOwnProperty,
    has;


if (isNative(nativeHasOwnProp)) {
    has = function has(object, key) {
        if (isNullOrUndefined(object)) {
            return false;
        } else {
            return nativeHasOwnProp.call(object, key);
        }
    };
} else {
    has = function has(object, key) {
        var proto;

        if (isNullOrUndefined(object)) {
            return false;
        } else {
            proto = getPrototypeOf(object);

            if (isNullOrUndefined(proto)) {
                return key in object;
            } else {
                return (key in object) && (!(key in proto) || proto[key] !== object[key]);
            }
        }
    };
}


module.exports = has;
