/**
 * Proxy
 * proxy代理的对象无法被绕过，无法通过proxy直接访问到原对象
 * 因此所有的修改都必须通过proxy
 */
var obj = {name: 1};
var proxy = new Proxy(obj, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    console.log('set', target, key, value);
    return true;
  },
});
// proxy.name = 2; // 触发proxy.set
// obj.name = 2; // 不触发proxy.set
Reflect.set(proxy, 'name', 2); // 触发proxy.set, 它无法绕过proxy.set
console.log(obj.name, proxy.name)