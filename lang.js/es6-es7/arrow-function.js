/**
 * 箭头函数中的this指向定义时所在的作用域，而不是执行时所在的作用域
 * 箭头函数继承了call，apply和bind方法，但是无法改变this的指向
 * 箭头函数没有prototype属性，所以箭头不能作为构造函数使用
 * nodejs中的模块是运行在模块作用域中的，模块顶层定义的箭头函数中的this指向的是模块本身(即exports对象)，
 * 即使在严格模式下，this也指向模块本身(即exports对象)
 **/

var a = 1;
const f = () => {
  console.log(this);
};
exports.a = a;
f(); // { a: 1 }
