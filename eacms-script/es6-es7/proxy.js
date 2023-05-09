/**
 * 理解
 * 在目标对象中添加的私有属性和方法，可通过代理对象进行拦截，实现私有属性方法不可读写，不可调用
 * 代理对象的拦截器内定义的方法调用时内部的上下文时拦截器，不是目标对象 也不是代理对象
 * 1.在拦截器中 this 统一指向生产代理对象的代理器handle
 * 2.在被拦截的属性中，如果属性是一个函数,target.method()调用 this指向target, proxy.method()调用 this指向proxy
 * Proxy无法代理对象的存取器属性，目标对象的存取器属性对代理对象是不可见的
 * proxy无法代理特殊对象的内部属性，比如Math、Date、Regexp
 */
/**
 * 拦截器
 * 当被拦截对象封闭、冻结、或者属性不可配置时，代理对象拦截器对目标对象的任何拦截行为都会报错
 * 拦截行为是指，对目标对象默认状态的任何操作：
 * 1.get拦截器修改属性读取的返回值
 * 2.has拦截器修改in运算符的返回结果
 * 3.delete拦截器删除属性
 * 4.defineProperty拦截器定义属性
 * 当可写性为true、可配置性为false时，set代理可正常写入属性值，两者都为false时 报错
 * 当可写性为false、可配置性为false时，set代理写入会报错
 * 当可写性为false、可配置性为true时，set代理可正常写入属性值会失败，但不会报错
 * set拦截器的第四个参数 指向代理对象自身
 * apply拦截器拦截函数的apply调用时的行为，接受3个参数 target this params
 * has拦截器拦截对象的属性in运算操作，包括自身属性及继承属性，返回布尔值代表是否存在此属性，对for...in循环、hasOwnPorperty调用无效
 * construct拦截器拦截构造函数的new 运算操作 接受3个参数 targetFunction， new调用params，代理对象proxy，new调用 params中如传递了construct属性 则此属性指向的函数必须返回一个对象，否则报错
 * 其他不常用拦截器 deleteProperty、defineProperty、getOwnPropertyDescriptor、getPrototypeOf、isExtensible、ownKeys、preventExtensions、setPrototypeOf
 */
/**
 * Proxy构造函数及其属性
 * 构造函数调用 new Proxy(target, handler)
 * 属性 Proxy.revocable(target, handler)，此处不使用new操作符调用，调用返回一个可撤销的proxy实例，调用实例的revoke方法撤销代理，也可直接设置代理对象值为null，等同撤销代理对象
 */

// 例子不可配置不可写属性被代理时的行为
// const obj = Object.defineProperties({}, {
//   foo: {
//     value: 123,
//     writable: false,
//     configurable: false,
//   },
// });
// const handler = {
//   get(target, key) {
//     return target[key];
//   },
//   set(target, key, value) {
//     const tar = target;
//     tar[key] = value;
//     return true;
//   },
// };
// const proxy = new Proxy(obj, handler);
// proxy.foo = 234;
// console.log(proxy.foo);

// set拦截器第四个参数，及内部的this指向
// function invariant(key, action) {
//   if (key[0] === '_') {
//     throw new Error(`Invalid attempt to ${action} private "${key}" property`);
//   }
// }
// const handler = {
//   get(target, key) {
//     console.log(this === handler);
//     invariant(key, 'get');
//     return target[key];
//   },
//   set(target, key, value, receiver) {
//     console.log(this === handler);
//     const localTarget = target;
//     invariant(key, 'set');
//     localTarget[key] = receiver;
//     return true;
//   },
// };
// const obj = { _prop: '123', $prop: '234' };
// const proxy = new Proxy(obj, handler);
// console.log(proxy.$prop);

// has拦截器的拦截行为
// const obj = Object.defineProperties({}, {
//   foo: {
//     enumerable: true,
//     configurable: true,
//   },
//   bar: {
//     enumerable: true,
//     configurable: true,
//   },
// });
// const handler = {
//   has() {
//     return false;
//   },
// };
// const proxy = new Proxy(obj, handler);
// console.log('foo' in proxy);
// console.log(Object.keys(obj));
// console.log(Object.hasOwnProperty.call(obj, 'foo'));

const weakMap = new WeakMap();

class Person {
  constructor(name) {
    weakMap.set(this, name);
    this.age = function () { return 1000; };
  }

  get name() {
    return weakMap.get(this);
  }
}

const jane = new Person('Jane');
const proxy = new Proxy(jane, {});
console.log(jane.name);

console.log(jane, proxy);
