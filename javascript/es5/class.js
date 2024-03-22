// class1
function Persion1(name, age) {
  this.name = name;
  this.age = age;
}
Persion1.prototype.sayName = function(){
  console.log(this.name)
}


// class2
function Persion2(sex, addres) {
  this.sex = sex;
  this.addres = addres;
}


//借用构造函数 
// 本质上生成的实例与Persion1之间没有继承关系，利用Persion1构造函数增强了Persion2实例属性
function Persion2(sex, addres, name, age) {
  Persion1.call(this, name, age)
  this.sex = sex;
  this.addres = addres;
}

// 寄生继承 
// 本质上生成的实例与Persion2之间没有继承关系，利用Persion2构造函数增强了Persion1实例属性
function Persion2(sex, addres, name, age) {
  let instance = new Persion1(name, age)
  instance.sex = sex;
  instance.addres = addres;
  return instance
}

// 原型继承 
// 生成的实例与Persion1、Persion2都有继承关系，但是实际上所有实例的name、age属性都是一样的
function Persion2(sex, addres) {
  this.sex = sex;
  this.addres = addres;
}
Persion2.prototype = new Persion1('name', 12);
Persion2.prototype.constrctor = Persion2;


// 组合继承
function Persion2(sex, addres, name, age) {
  Persion1.call(this, name, age)
  this.sex = sex;
  this.addres = addres;
}
Persion2.prototype = Object.create(Persion1.prototype)
Persion2.prototype.constrctor = Persion2;

const o = new Persion2('man', 'beijin', 'n1', 12)
console.log(o instanceof Persion2)
