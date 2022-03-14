/**
 * 基础类型运算与转换
 */

/**
 * undefined 与自身和null 相等
 */
// console.log(undefined == null); // true
// console.log(undefined == undefined); // true
// console.log(undefined == 0); // false
// console.log(undefined == false); // false
// console.log(undefined == '') // false


/**
 * null 与自身和undefined 相等
 */
// console.log(undefined == null); // true
// console.log(null == null); // true
// console.log(null == 0); // false
// console.log(null == false); // false
// console.log(null == '') // false

/**
 * infinity 与自身相等
 * -infinity 与自身相等
 *  * 0与-0相等
 * infinity 不等于 -infinity
 * NaN 不等于自身
 */
// console.log(Infinity == Infinity); // true
// console.log(-Infinity == -Infinity); // true
// console.log(0 == -0); // true
// console.log(Infinity == -Infinity); // fasle
// console.log(NaN == NaN); // false


/**
 * 在加法操（+）作中，只要操作数存在字符串，其他操作数均转为string, 不存在字符串则转number
 * 在其他算术运算中，所有的操作数均转为number
 * 在逻辑运算中，所有操作数均转为boolean
 */
// console.log('' == 0); // true
// console.log('1' == 1); // true
// console.log('' == false); // true
// console.log('true' == true); // fasle
// console.log('false' == false); // fasle
// console.log(0 == false); // true
// console.log(1 == true); // true
// console.log(2 == true); // fasle
// console.log(0 || true); // true
// console.log('' || true); // true


/**
 * 总结
 * 特殊类型undefined、null 在全等运算时只与自身相等，其他均不相等
 * 特殊类型undefined、null 在相等运算时它们互相相等，与自身也相等，其他均不相等
 * 基础类型boolean、number、string 在进行全等运算时类型不同则不相等，类型相同情况下，string比对每一个字符的字符串编码，number、boolean 直接比对内存值
 * 基础类型boolean、number、string 在进行相等运算时会进行隐式类型转换，使用包装类Number、Boolean、String进行转换
 * 转换规则如下：
 * 1.字符串转数字，数字字符串(例如 '1')可以直接转换数字，其他转换为NaN
 * 2.字符串转布尔，非空为true
 * 3.数字到字符串，转换为字符串格式数字(例如1 转换为 '1');
 * 4.数字到布尔，非零为true，NaN例外，NaN转换后是false
 * 5.布尔到字符串，true 转为 'true'，false 转为 'false'
 * 6.布尔到数字，true 转为 1， false 转为 0
 * 由于隐式类型转换，规则复杂，语意不明确，不利于代码阅读，容易出错，所以在日常开发中不能使用相等运算来做断言
 * 选择全等运算做为断言具有更高的安全性，也更易于代码理解
 */
