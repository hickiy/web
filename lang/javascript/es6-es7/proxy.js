/**
 * Proxy 与 Reflect
 */
var obj = {
  name: 1,
};

Object.defineProperty(obj, 'self', {
  get() {
    return this;
  },
});

/**
 * get陷阱
 */
var proxy = new Proxy(obj, {
  get(target, key, receiver) {
    // return target[key] // 这种方式会导致getter方法内部的this指向obj
    return Reflect.get(target, key, receiver); // 这种方式会导致getter方法内部的this指向proxy
  },
});
console.log(proxy.self == obj); // false
console.log(proxy.self == proxy); // true

/**
 * set陷阩
 */
var proxy = new Proxy(obj, {
  set(target, key, value) {
    // target[key] = value // 赋值失败会静默失败, 表达式返回target[key]的值
    Reflect.set(target, key, value); // 赋值失败会返回false
  },
});
proxy.name = 2; // 触发proxy.set
