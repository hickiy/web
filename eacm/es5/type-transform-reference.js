/* 引用类型运算过程与转换 */

/* Date */
/**
 * toString方法返回时间对象的ios字符串格式表示（Mon Jun 08 2020 15:43:39 GMT+0800 (GMT+08:00)）
 * valueOf方法返回时间戳（格林威治时间）
 * toJSON方法返回服务器字符串格式表示（2020-06-08T07:43:39.325Z）
 */
/* Function */
/**
 * toString方法返回包含函数源代码字符串表示（function () {}）
 * valueOf方法返回一个包含函数名称的函数字符串（[Function: fn]）
 */
/* Object */
/**
 * toString方法返回对象字符串表示（[object Object]）
 * valueOf返回对象自身
 */
/* Array */
/**
 * toString方法返回空串（""）
 * valueOf返回数组自身
 */
const date = new Date();
const fn = function () { console.log('1111'); };
const obj = { a: 1 };
const arr = ['aa'];

function toOriginal(o) {
  global.console.log(Object.prototype.toString.call(o));
  global.console.log(o.toString && o.toString());
  global.console.log(o.valueOf && o.valueOf());
  global.console.log(o.toJSON && o.toJSON());
  global.console.log(o);
  global.console.log(1 + o);
  global.console.log(1 - o);
  global.console.log('\n');
}
toOriginal(date);
toOriginal(fn);
toOriginal(obj);
toOriginal(arr);

/**
 * 在逻辑运算中，引用类型转boolean都转换为true
 * 在全等运算中，如果都为引用类型则比较引用地址，如果类不同则不相等
 * 在相等运算中，如果都为引用类型则比较引用地址，否则操作数都转换为Number类型进行比较
 * 在加法运算中，引用类型向基础类型转换以期望值为Stirng方式进行转换
 * 在其他算术运算中，引用类型向基础类型转换以期望值为Number的方式进行转换
 * 规则如下：
 * 期望是String的地方 会调用对象的toString方法，如果返回的值还是一个引用类型，则继续调用这个值的toString方法，直到返回基础类型
 * 如果不存在toString方法，则调用valueof方法，如果返回的值还是一个引用类型，则继续调用其toStrung方法，直到返回基础类型
 * 期望是Number的地方 会调用对象的valueOf方法，如果返回一个引用类型的值，则继续调用这个值的toString方法，直到返回基础类型
 * 如果不存在valueOf方法，则调用toString方法，如果返回的值还是一个引用类型，则继续调用其toStrung方法，直到返回基础类型
 */
