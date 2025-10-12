/**
* 对象接口
* readonly定义与普通声明的区别在于，前者是作为属性使用的场景，后者是用作为变量使用的场景
* 使用对象字面量{}进行参数传递时，会进行额外的检查，不允许字面量对象出现类型检查之外的任何属性
* 绕过检查的方式就是使用类型断言或者添加索引签名
* 当同时存在两种索引签名时，比如在数组中，你可以使用"0"或者0进行访问一个元素，在js中返回值是一致的
* 所以在类型声明中为了维持这种一致性，typscirpt规定数字索引签名的返回值类型必须是字符串索引签名返回值类型的子类型
*/
interface labelledValue {
  readonly size: number, //必传且只读属性
  label: number, // 必传参数
  age?: number | undefined, // 可选的参数
  [index: string]: number | undefined, // 字符串索引签名相当与告诉typescript 字符类型的索引（key）对应的值必须是number类型
  [index: number]: any, // 数字索引签名相当于告诉typescirpt 数字类型的索引（key）对应的返回值是any类型
}

/**
 * 函数接口
 * 声明函数的参数类型以及返回值类型，对于参数名称没有限制，只限制对应位置的参数的类型是否一致
 */
interface searchFunc {
  (source: string, subString: string): boolean // 括号内定义传入的参数类型 ， 括号外定义返回值的类型
}

/**
 * 类的接口
 */
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface; // 定义类的构造函数接口
}

interface ClockInterface {
  currentTime: Date; // 声明类必须有一个属性 currentTime
  setTime(d: Date): void; // 声明类必须有一个方法 setTime
}

class Clock implements ClockInterface { // 定义一个类使用类的接口
  constructor (h: number, m: number) { }
  currentTime!: Date;
  setTime(){}
}

/**
 * 接口继承
 */
interface Shape {
  color: string;
}

interface Square extends Shape { // 接口继承其他接口
  sideLength: number;
}
interface PenStroke extends Shape, Square { //继承多个接口
  penWidth: number;
}


/**
 * 混合类型（同时作为函数和对象的接口）
 */
interface Counter {
  (start: number): number;
  interval: number;
  reset(): void;
}



/**
 * 接口继承类
 * 接口继承类相当于接口继承了类的所有成员，包括私有属性private 和受保护的 protected
 */
class Control {
  private state: any;
}

interface SelectableControl extends Control { // 接口继承类， 当前接口只有 Control 的字类能够实现，因为只有其子类能继承到Control类的私有成员和受保护的成员
  select(): void;
}

