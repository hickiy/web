'use strict';
/**
 * 箭头函数中的this指向定义时所在的作用域，而不是执行时所在的作用域，
 * 箭头函数继承了call，apply和bind方法，但是无法改变this的指向
 * 箭头函数没有prototype属性，所以箭头不能作为构造函数使用
 * 如果是在全局作用域中定义的箭头函数，那么其中的this指向的就是window
 * 即使在严格模式下，在全局作用域定义的箭头函数中的this也指向window
 **/
var f = () => {
  'use strict';
  console.log(this);
};
f(); // window
