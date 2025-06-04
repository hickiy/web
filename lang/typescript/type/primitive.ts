let naem:string = 'jiejie' // string类型
let age:number = 18 // number类型
let isMan:boolean = true //布尔类型
let sb:symbol = Symbol('111') // symbol类型


let u:undefined = undefined // undefined类型只有一个值
let n:null = null // null类型只有一个值


let somebody:any = 1 // any类型相当于无类型，可以赋予任何类型的值


function fn1():void {} // void 表示没有返回值
// 变量是void类型时 表示不存在 只有undefined和null能赋值给void类型的变量, void类型只能赋值给any类型


function fn2( msg:string ) :never {throw new Error(msg);} // 表示此函数无法执行完毕（存在无法到达的终点）返回一个never类型的值
function fn3() :never {while(true){}} // 此函数无限循环没有终点
// never类型类似与undefined 和null 是所有类型的子类型，可以赋值给任意类型， 其他类型则不能赋值给never类型，never类型只能通过函数调用结果获得