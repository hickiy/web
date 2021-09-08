// first method
/**
 *
 * @param {Number} n 第几位斐波那契数
 */
function fib1(n) {
  if (typeof n !== 'number' || n < 1) {
    throw new TypeError('fibonacci: argument "n" expect a "number" gt(>) zero');
  }
  if (n === 1 || n === 2) return 1;
  return fib1(n - 1) + fib1(n - 2);
}

// second method
function fib2(n) {
  if (typeof n !== 'number' || n < 1) {
    throw new TypeError('fibonacci: argument "n" expect a "number" gt(>) zero');
  }
  if (n === 1 || n === 2) return 1;
  let first = 1;
  let second = 1;
  let next = first + second;
  for (let i = 3; i < n; i += 1) {
    first = second;
    second = next;
    next = first + second;
  }
  return next;
}

// third method
function fib3(n) {
  const fibCache = [1, 1];
  if (typeof n !== 'number' || n < 1) {
    throw new TypeError('fibonacci: argument "n" expect a "number" gt(>) zero');
  }
  for (let i = fibCache.length; i < n; i += 1) {
    const first = fibCache[i - 2];
    const second = fibCache[i - 1];
    fibCache.push(first + second);
  }
  return fibCache[n - 1];
};

// fourth method
function fib4(n) {
  const fibonacci = {
    [Symbol.iterator]() {
      let pre = 0, cur = 1;
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { done: false, value: cur }
        }
      }
    }
  }
  for (var v of fibonacci) {
    n--
    if (n == 1) {
      return v;
    }
  }
}

// fifth method
function fib5(n) {
  var fibonacci = {
    [Symbol.iterator]: function* () {
      var pre = 0, cur = 1;
      for (; ;) {
        var temp = pre;
        pre = cur;
        cur += temp;
        yield cur;
      }
    }
  }

  for (var v of fibonacci) {
    n--
    if (n == 1)
      return v;
  }
}




// test used time
function tester(method, n) {
  console.time(method.name);
  console.log(`第${n}位斐波那契数是：${method(n)}`);
  console.timeEnd(method.name, '\n');
}

tester(fib1, 40);

tester(fib2, 40);

tester(fib3, 40);

tester(fib4, 40);

tester(fib5, 40);