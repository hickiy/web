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