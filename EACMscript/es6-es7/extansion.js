// 超类
function Super(name) {
  this.name = name;
}
// 超类方法
Super.prototype.sayName = function () {
  console.log(this.name);
}
Super.prototype.sayAge = function () {
  console.log(this.age);
}

// 基于原型继承父类方法
function Sub(name) {
  this.name = name;
}
Sub.prototype = new Super();
Sub.prototype.constractor = Sub
var person = new Sub('原型继承父类方法sayName');
person.sayName();


// 借用构造函数继承父类属性
function Sbu2(name) {
  Super.call(this, name);
}
Sbu2.prototype.sayName = function () {
  console.log(this.name);
}
var person2 = new Sbu2('借用构造函数添加name属性');
person2.sayName();

// 组合继承
function Sbu3(name) {
  Super.call(this, name);
}

Sbu3.prototype = new Super();
Sbu3.prototype.constractor = Sbu3;
var person3 = new Sbu3('同时利用原型和借用构造函数模式，实现属性与方法的继承');
person3.sayName();

// 组合继承优化版本
function Sub4(name) {
  Super.call(this, name);
}

Sub4.prototype = Object.create(Super.prototype);
Sub4.prototype.constractor = Sub4;
var person4 = new Sub4('组合继承优化')
person4.sayName();

// 寄生继承（实际是利用函数增强Super超类的实例）
function Sub5(name, age) {
  var person = new Super(name);
  person.age = age;
  return person;
}
var person5 = new Sub5('寄生继承输出父类定义的name属性', '寄生继承输出子类增强age属性');
person5.sayName();
person5.sayAge();