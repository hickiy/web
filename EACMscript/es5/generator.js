/**
 * 部署了symbol.iterator接口的对象被称作可迭代对象
 * Array、Set、Map、String、arguments、nodeList、原生部署了迭代接口
 * iterator对象的return方法，用来完结迭代操作
 * iterator对象的throw方法，用来向迭代器内部抛出异常
 * iterator对象的next方法，用来将迭代指针指向下一个元素
 */

function outFunction(prama1, prama2) {
  console.log(prama1);
  console.log(prama2);
  return 'finally';
}

function* generator() {
  return outFunction(yield 'first', yield 'second');
}

const interator = generator();
const a = interator.next()
const b = interator.next(a)
console.log(interator.next(b))
