/**
 * set所有成员不重复 重复的判断是===运算  NaN例外 在set中NaN与自身相等
 * set实例基础方法 add（增加） 、delet（删除） 、has（是否存在） 、clear（清空）
 * set实例属性 zize（set的实例的大小）
 * set类部署了interator接口 可使用keys 、 values、 entries 获取迭代器  也可使用forEach 直接迭代
 * set由于存在interator接口 所以可直接使用for of循环
 * set展开到{..set}中是进行枚举操作，由于set类原生不具有任何可枚举的自有属性，所以相当于展开一个空对象{}
 * set展开到[...set]中是进行迭代操作，展开的是set包含的数据成员
 */
const set = new Set([1, 2]);
const keys = Object.keys(set);
const obj = { ...set };
global.console.log(keys, obj);
const arr = [...set];
global.console.log(arr);
/**
 * weakSet 类与Set 类相似，但是weakSet的成员只能是对象
 * weakSet 对成员的引用都是弱引用，不计入gc引用机制
 * weakSet 通常用来存储Dom对象，防止Dom从页面移除时 导致的内存泄露
 * weakSet 由于保存的时弱引用对象，随时可能被gc 所以其不可迭代(不具备迭代接口，Set原生具有迭代接口)
 */
