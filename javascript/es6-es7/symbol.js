// Symbol
// symbol是javascript的第七种数据类型(基础类型)
// smybol通过调用函数Symbol生成，其类似与字符串属于基础类型，故Symbol函数不能使用new操作符调用
// Symbol函数调用时可以传递一个描述符用来描述当前smybol，如果参数是引用类型则调用toString方法转化为基础类型
console.log(Symbol({}), Symbol(true), Symbol(1), Symbol(['element', {}]));
// symbol 不能当作操作数进行数学运算 否则会报错
// console.log(Symbol('numeber') + 1, `${Symbol('numeber')}`, Symbol('numeber') + false); // 报错 Cannot convert a Symbol value to a number
// symbol 可以进行逻辑运算
console.log(!Symbol(true));
// symbol 可以显示抓换为string boolean
console.log(Symbol('tostring').toString(), String(Symbol('String'))); // 返回symbol描述符
console.log(Boolean(Symbol('boolean'))); // 返回true
// symbol 不可以转化为number
// console.log(Number(Symbol('number'))); // 报错 Cannot convert a Symbol value to a number
// symbol 类型检测时返回的时symbol类型
console.log(typeof Symbol('instanceOf'), Object.prototype.toString.call(Symbol('instanceOf')));
// symbol 使用JSON.stringify操作时, 处于对象中直接被忽略，处于数组中转换为null占位
console.log(JSON.stringify({ sym: Symbol('inObject') }), JSON.stringify([Symbol('inArray')]));
// symbol 作为key使用定义属性时，不能使用.运算符，在对象种使用symbol作为key也必须放在[]种
// 因为.运算符后面key以及对象属性总是默认解释为字符串，而不是变量名所指向的symbol
const keyOfSymbol = Symbol('key');
const a = { [keyOfSymbol]: 'a' };
const b = {};
b[keyOfSymbol] = 'b';
console.log(a[keyOfSymbol], b[keyOfSymbol]);

// 常用例子
const colorRed = Symbol('red');
const colorGreen = Symbol('green');
function getComplement(color) {
  switch (color) {
    case colorRed:
      return colorGreen;
    case colorGreen:
      return colorRed;
    default:
      throw new Error('Undefined color');
  }
}
console.log(getComplement(colorRed));

class MySearch {
  constructor(value) {
    this.value = value;
  }

  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
console.log('foobar'.search(new MySearch('f')));
