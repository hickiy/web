/**
 * 对象的解构赋值 解构对象属性
 * 数组的解构赋值 按照索引位解构数组元素
 * 解构赋值 可以解构原型中的属性  可以解构不可枚举属性
 * rest操作符 只能展开对象自有可枚举属性
 * 结构赋值支持重命名
 */
const arr = ['elemente'];
const obj = { a: 1, b: 2 };
arr.testAttrOfArr = 'testAttrOfArr';
Object.defineProperty(obj, 'testAttrOfObj', {
  value: 'testAttrOfObj',
  enumerable: false,
});
const { toString, testAttrOfObj } = obj;
const { testAttrOfArr, length } = arr;
const [element] = arr;
global.console.log(toString);
global.console.log(testAttrOfObj);
global.console.log(testAttrOfArr, length, element, arr[0], arr['0']);

const { a, b: b1, c = 3 } = obj;

console.log(a, b1, c);

