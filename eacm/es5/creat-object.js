// 字面量模式
const obj = {
    name: 'n1',
    age: 12,
}


// 工厂模式生成对象(没有类的概念)
function persion(name, age) {
    return { name, age };
}


// 构造函数模式生成对象一（未实现基于原型的继承、每个实例都有一个sanName方法）
function Persion1(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = () => {
        console.log(this.name);
    }
}
// console.log(new Persion1('n1', 99).sayName == new Persion1('n2', 90).sayName);


//  构造函数模式生成对象二（实现基于原型的继承、每个实例都继承原型中的sanName方法）
function Persion2(name, age) {
    this.name = name;
    this.age = age;
}
Persion2.prototype.sayName = function () {
    console.log(this.name);
}
// console.log(new Persion2('n1', 99).sayName == new Persion2('n2', 90).sayName);


// 使用Object.creat方法
Object.create(Persion2.prototype, {
    name: {
        value: 'n1',
    },
    age: {
        value: 12
    }
})


// 使用Object.assign方法
Object.assign(Persion2.prototype, {sayAge(){
    console.log(this.age);
}})
