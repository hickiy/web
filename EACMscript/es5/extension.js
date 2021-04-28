/* 工厂模式 */
/**
 * 快速批量生成对象，没有抽象出事务的类别
 */
function factries(name, age) {
  return {
    name,
    age,
  };
}
console.log(factries('baimei', 99));
/* 构造函数模式 */
/**
 * 生成的实例可以使用 instance操作符 和 实例的constructor属性 区分类别  抽象出了事务具体的类别
 * 所有的实例以及方法都必须写在构造函数内，所有实例都有各自的功能相同的方法，没有抽离出公共部分以节省内存
 */
function Persion(name, age) {
  this.name = name;
  this.age = age;
}
console.log(new Persion('baimei', 99));
/*  借用构造函数 */
/**
 * 通过借用构造函数实现了属性与方法的继承
 * 节省了代码量 同样没有抽离出共同的属性与方法以节省内存
 */
function Borrow(name, age, address) {
  Persion.call(this, name, age);
  this.address = address;
}
console.log(new Borrow('baimei', 99, 'beijin'));

/* 原型模式 */
/**
 * 利用原型链改写实现公共方法属性抽离 所有实例共享公共方法及属性
 */
function Prototype(name, age, address) {
  Persion.call(this, name, age);
  this.address = address;
}
Prototype.prototype.sayName = function () {
  console.log(this.name);
};
/* 寄生模式 */
/**
 * 利用原型模式 子类实例可以继承父类的原型上的公共方法及属性
 * 与借用构造函数混合使用时 要调用两次父类构造函数
 * 子类实例中的属性会与子类原型中的属性重复
 */
function parasitism(ParrentClass) {
  function F() {}
  F.prototype = new ParrentClass('baimei', 99, 'beijin');
  F.prototype.constructor = F;
  return new F();
}
console.log(parasitism(Borrow).address);
/* 优化寄生模式 配合原型模式  借用构造函数 实现的组合继承 */
/**
 * 类似Object.create()方法实现 实现对象间的继承
 * 利用继承增强过的对象作为子类的原型
 * 借用构造函数实现属性继承， 利用原型模式实现方法继承
 * 利用寄生模式 解决继承两次调用父类导致的实例与原型中属性重复问题
 * 不影响 instance 操作符检测结果
 * 不影响 isPrototypeOf 检测结果
 */
function createPrototype(target) {
  function F() {}
  F.prototype = target;
  return new F();
}
const prototype = Object.create ? Object.create(Prototype.prototype) : createPrototype(Prototype.prototype);
function OptimizeParasitism(...args) {
  Prototype.apply(this, [...args]);
  this.isOwnHouse = true;
}
prototype.constructor = OptimizeParasitism;
OptimizeParasitism.prototype = prototype;
const obj = new OptimizeParasitism('baimei', 99, 'beijin');
console.log(obj);
