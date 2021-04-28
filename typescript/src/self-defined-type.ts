
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
    age?: number, // 可选的参数
    [index: string]: number, // 字符串索引签名相当与告诉typescript 字符类型的索引（key）对应的值必须是number类型
    [index: number]: any, // 数字索引签名相当于告诉typescirpt 数字类型的索引（key）对应的返回值是any类型
  }

/**
 * 函数接口
 * 声明函数的参数类型以及返回值类型，对于参数名称没有限制，只限制对应位置的参数的类型是否一致
 */
interface searchFunc{
    (source: string, subString: string): boolean // 括号内定义传入的参数类型 ， 括号外定义返回值的类型
  }

  /**
   * 类的接口
   */
  interface ClockInterface {
    currentTime: Date; // 声明类必须有一个属性 currentTime
    setTime(d: Date) :void; // 声明类必须有一个方法 setTime
}

/**
 * 构造函数接口
 * 构造函数接口不能直接用于定义类
 * 类中的实例部分的类型验证是由类的接口来定义校验的
 * 类的构造函数最为类的静态部分要单独验证
 */
interface ClockConstructor {
  new (hour: number, minute: number); 
}


class Clock implements ClockInterface { // 定义一个类使用类的接口
  constructor (h: number, m: number) { }
  currentTime: Date;
  setTime(){}
}

/**
 * 单独验证类的构造函数的例子
 * @param constructor 将类整体作为传统构造函数的模式传递给createClock作为参数，类型为ClockConstructor
 * @param h 类调用时传递给构造函数的参数
 * @param m  类调用时传递给构造函数的参数
 */
function createClock(constructor: ClockConstructor, h: number, m: number):ClockInterface{
  return new constructor(h, m)
}
createClock(Clock, 100, 100) // 此时Cloce以ES5构造函数的形式传入，以ClockConstructor接口进行验证，相当于对类的constructor进行了验证

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
let square1 = {} as PenStroke; // 类型断言 as写法， 这里可以直接赋值一个字面量对象定义属性而后修改属性，使用类型断言赋值一个不符合接口类型定义的字面量空对象给他，目的是为了 后续进行属性定义
let square2 = <PenStroke>{}; // 类型断言 尖括号写法
square1.color = "blue";  // 定义属性
square1.sideLength = 10; // 定义属性
square1.penWidth = 100 // 定义属性


/**
 * 混合类型（同时作为函数和对象的接口）
 */
interface Counter {
  (start: number): number;
  interval: number;
  reset(): void;
}

function getCounter(): Counter { // 这了声明返回值符合Counter接口
  let counter = function (start: number) { return start } as Counter;
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
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

class Button extends Control implements SelectableControl { // Control的字类Button可以实现 SelectableControl接口
  select() { }
}

class ButtonText implements SelectableControl { // ButtonText 类无法实现 SelectableControl接口 因为其不存在私有属性state
  select() { }
}