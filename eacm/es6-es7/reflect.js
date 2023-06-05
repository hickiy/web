/**
 * Reflect作为新的命名空间，定义了以往定义在Object上的语言内部的方法，比如difinedProperty方法
 * Reflect上定义的方法调整了其返回值，Object.difinedProperty(obj, name, desc)方法在对一个封闭对象定义新的属性时会报错，Reflect.difinedProperty(obj, name, desc)则返回false
 * Reflect将以往对象的一些通过运算符操作的行为api化，比如 name in obj，使用Reflect.has(obj, name)代替
 * Reflect对象的方法与Proxy代理器中定义的方法一一对应，Proxy拦截器修改了对象操作的默认行为，Reflect的方法则总是以原生方式操作对象，总共13种方法
 */

// 封闭对象新增属性时definedProerty方法的返回值差别
// const obj = { test: 'preventDefault' };
// Reflect.preventExtensions(obj);
// const result = Object.defineProperty(obj, 'name', {
//   value: 'sam',
//   enumerable: true,
//   writable: true,
//   configurable: false,
// });
// console.log(result);
