/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
// switch 流程控制语句
// 条件表达式采用的是 全等运算
// 当条件表达式有一项成立时 如果没有退出关键字
// 则后续的条件表达式会忽略判断 直接执行对应的代码块

switch ('1') {
  case '1': global.console.log('相等运算');
  //  break
  case 1: global.console.log('无break退出语句 则继续执行后续的判断  如果表达式成立  则会继续执行表达式对应的代码块');
  case 1: global.console.log('无break退出语句 则继续执行后续的判断  如果表达式成立  则会继续执行表达式对应的代码块');
}
