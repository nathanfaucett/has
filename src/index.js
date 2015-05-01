var hasOwnProp = Object.prototype.hasOwnProperty;


module.exports = has;


function has(obj, key) {
    return hasOwnProp.call(obj, key);
}
