// 泛型
/**
 * 使用<T> 这种形式表示泛型
 */

 // 泛型函数
 function rangeType <T>(arg: T):T { // 将泛型当作参数传递给函数
    return arg;
 }


// 泛型接口1
interface GenericIdentityFn1 { // 在接口内使用泛型
    <T>(arg: T): T;            // 这种情况下 由类型推断自动推断泛型是哪个类型
}

// 泛型接口2
interface GenericIdentityFn2 <T> { // 将泛型当作参数爨地给接口
    (arg: T): T;                   // 这种情况下使用此接口需要显示传递一个类型表面泛型的类型
}

function identity<T>(arg: T): T {
    return arg;
}
let myIdentity1: GenericIdentityFn1 = identity;  // 推断泛型类型
let myIdentity2: GenericIdentityFn2<number> = identity; // 显示声明泛型类型


// 泛型类
class Machine <T> {  // 定义泛型类
    name: T;
    add: (x:T,y:T) => T
}

let machine1 = new Machine<number>() // 生成实例时  显示指定泛型的类型

machine1.name = 1;  // 赋值时必须匹配所指定的类型
machine1.add = (x, y) => x * y ;  // 赋值时必须匹配所指定的类型


// 泛型约束
interface rangeTypeInterface { // 定义一个接口
    x: number,
    y: number
}

function rangeTypeFn1<T extends rangeTypeInterface>(arg: T): T{ // 泛型继承此接口
    return arg
}
rangeTypeFn1({x: 1, y: 2}) // 传递的参数必须符合泛型所继承的接口的约束


// 类类型的泛型
class Card {     // 定义类
    nameed: string = '桌子'
}
class Box extends Card {
    height:number
    constructor(name: string = '盒子') {
        super()
        this.nameed = name
    }
}
function createTable<T extends Card>(c: {new (): T}):T { //泛型继承类
    return new c()
}

console.log(createTable(Box).nameed)