// 类（class）
class Animal {
    // 在类的constructor中只能修改类中声明的成员，无法为实例添加属性，因为成员不存在
    // 在es6中，可以在constructor中可以修改类中声明的属性，也可以为实例添加任意属性方法

    private name: string = "jojo" ; // 声明实例私有属性，此属性只允许在类的内部访问
    age: number = 100 ; // 声明实例属性， 定义在实例上

    constructor(name: string){
        this.name = name // 构造器中访问私有属性 并修改其值
    } 

    sayName(){ // 声明继承方法，定义在类的prototype上
        return `i'm ${this.name}` // 实例方法内部 访问实例私有属性
    } 
}
// 只读属性
class Dog {
    readonly name: String  // 第一种 直接已属性限定符声明，然后在构造函数内对其赋值
    constructor(name) {
        this.name = name
    }
}
class Cat {
    constructor(readonly name:string) { // 第二种 直接使用限定访问符号对构造函数参数进行声明， 定义只读属性
    }
}

// 声明静态属性
class Peg {
    static baseProperty= {eat: true, sleep: true} // 类的静态属性
    static showBaseproperty() { // 类的静态方法 内部this指向类本身
        console.log(this.baseProperty)
    }
}
// Peg.showBaseproperty()

// 抽象类
abstract class Wolf {  // 定义一个抽象类  抽象类不允许直接实例化  只能用来继承  相当于类的构造方法是一个受保护的成员（protected）
    constructor(public name:string, public age:number) { } // 通过访问限定符 简化声明成员
    abstract sayName():void; // 抽象方法 此处只有定义 无实现  此抽象成员必须在子类中实现 
    sayAge(){ // 公开的成员
        console.log(this.age)
    }
}

class Haha extends Wolf { // 二哈继承狼的抽象类
    constructor(name: string, age: number) {
        super(name, age) // 必须调用基类构造方法
    }
    sayName(){ // 实现抽象类中定义的抽象方法
        console.log(this.name)
    }
}

const lily = new Haha('lily',  2)

lily.sayName() // 调用实现的抽象方法
lily.sayAge() // 调用继承的父类公共方法