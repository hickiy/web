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