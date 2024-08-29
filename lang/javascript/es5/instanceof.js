isInstanc = function (obj, constructor) {
    if (typeof constructor !== 'function') {
        throw new TypeError('constructor must be a function');
    }
    if (obj === null || obj === undefined) {
        return false;
    }
    if (obj.constructor === constructor) {
        return true;
    }
    // return isInstanc(obj.__proto__, constructor);
    // return isInstanc(Object.getPrototypeOf(obj), constructor);
    // return obj instanceof constructor;
    return constructor.prototype.isPrototypeOf(obj);
}

console.log(isInstanc(123, Number))
console.log(123 instanceof Number);