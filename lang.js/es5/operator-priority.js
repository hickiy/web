/**
 * 表达式的计算顺序
 * 1. 优先级，优先级高的先计算
 * 2. 结合性，优先级相同时，根据结合性计算
 * 3. 求值顺序，永远是从左到右
 */

// 优先级最高的是分组（） 优先级19
var a = 1 + 2 * 3; // 7
console.log(a);
var b = (1 + 2) * 3; // 9
console.log(b);


function Foo() {
  console.log('Foo');
}
Foo.sayName = function () {
  console.log('sayName');
}

/**
 * 优先级中比较特殊的运算符
 */

// 不带参数列表的new运算符的 优先级是17
new Foo; // Foo  
new Foo.sayName; // sayName 
// 这里.运算符的优先级是18，比new高，所以它们等价于 new (Foo.sayName)

// 带参数列表的new运算符的优先级是18
new Foo(); // Foo
new Foo.sayName(); // sayName
// 这里结性比较特殊，它应该怎样执行呢，有三可能
// 1、 (new Foo).sayName()  // 输出 undefined is not a function
// 2、 new (Foo.sayName)()  // 输出 sayName
// 3、 new (Foo.sayName()) // 输出 undefined is not a constructor
// 这里new会与表达式中的()结合, 组成一个带参数列表的new运算符
// 所以它等价于 new (Foo.sayName)()


/**
 * 结合性比较特殊的运算符
 */

// 不带参数的new运算符
 new new Array; // 右结合，等价于 new (new Array)，当然这里没有实际意义
// 带参数的new运算符
new Array()[0]; // 结合性是 n/a，这里的new会与表达中()结合，组成一个带参数列表的new运算符, 等价于 (new Array())[0]

// = 赋值运算符
var a = b = 1; // 右结合，等价于 var a = (b = 1)

// 三元运算符
var a = 1, b = 2, c = 3;
var d = a ? b : c ? a : b; // 右结合，等价于 var d = a ? b : (c ? a : b)

// ** 指数运算符
var a = 2, b = 3, c = 4;
var d = a ** b ** c; // 右结合，等价于 var d = a ** (b ** c)

// 大部分一元运算符都是右结合
// 后自增自减运算符除外 它们结合性是 n/a