// 受保护的成员 protected
class Person {
    protected name: string; // 定义受保护的属性
    protected constructor(name: string) { this.name = name; } // 定义受保护的构造器
}

class Aman extends Person {
    private department: string; // 定义子类的 私有成员

    constructor(name: string, department: string) {
        super(name) // 使用超类构造器包装子类实例
        this.department = department; // 修改子类私有属性
    }

    public getElevatorPitch() { // 定义子类成员，方法声明在字类的prototype中
        return `Hello, my name is ${this.name} and I work in ${this.department}.`; // 字类中可以访问继承自超类的受保护的成员
    }
}

let howard = new Aman("Howard", "Sales");
console.log(howard.getElevatorPitch()); // 可以正常打印  说明子类中可以访问超类中protected成员
// console.log(howard.name); // 错误  （子类实例继承了超类的name属性，但是protected成员在类的外部无法被访问到）
// let people = new Person('jojo') // 错误 （Person类的构造器是受保护的，在类的外部无法访问，意味着Person类无法被实例化，只能用来继承）