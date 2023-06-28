// 扩展运算符rest
/**
 * 函数形参的合并，函数实参的展开
 * 数组的展开 将数组展开到{}中时 进行枚举操作 展开的是数组对象以索引位为key的属性， 将数组展开到数组中时 进行迭代操作 展开的是数组的元素
 * 对象的展开，枚举操作，展开的是对象的可枚举自有属性
 * rest的合并规则共object.assign函数
 * rest合并后的属性排列顺序 数字Key 在最前 按大小排列  其次是字母 按unicode顺序  其次是symbol属性
 * rest操作符展开结果为{}时 是枚举操作 展开目标引用的属性
 * rest操作符展开结果为[]时 是迭代操作 展开目标引用的数据成员
 */

// 对于存取器属性的rest使用
/**
  * rest运算符对于属性的赋值特点
  * 原始类型是值传递，引用类型是引用传递
  * 对与存取器属性，传递的是get方法获取的值
  */
const a = {
  get n() {
    return '获取属性';
  },
};
Object.defineProperty(a, 'i', {
  value: 1,
  configurable: true,
  writable: true,
  enumerable: false,
});
const b = new Set([1, 2]);
const c = new Map([[0, 1], [1, 2]]);
const d = [3, 4];
const e = {
  name: 'b', ...a, ...b, ...c, ...d,
};
const f = [...b, ...c];
global.console.log(a, b, c, d);
global.console.log(e);
global.console.log(f);
