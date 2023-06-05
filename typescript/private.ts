// 私有成员 provate
class Rois {
    private name: string; // 声明私有属性
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Rois { // 继承Rois类， 同时继承私有成员
    constructor(name: string) { super(name); }  // 利用超类构造函数 包装字类实例
    age: number
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Rois("Goat");
let rhino = new Rhino("Rhino");
let employee = new Employee("Bob");

animal = rhino;  // rhino的类型是animal类型的子类，所以rhino类型兼容animal
// rhino = animal //错误  （nimal的类型内没有声明age成员，所以animal类型不兼容rhino）
// animal = employee; //错误 （employee虽然声明了name属性，与animal类一致，但是二者不是同一个声明，所以employee不兼容animal）