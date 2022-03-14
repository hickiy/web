Array.prototype.reduce = function (fn, init) {
  if (!Array.isArray(this)) throw new TypeError(this + ': is not an array');
  if (typeof fn !== 'function') throw new TypeError(fn + ': is not a function');
  var len = this.length, index = -1, arr = this;
  if (arguments.length < 2) {
    init = arr[++index]
  }
  while (++index < len) {
    init = fn(init, arr[index], index, arr)
  }
  return init;
}

// let p1 = init => new Promise(resolve => {
//   resolve(init + 1);
// })

// let p2 = init => new Promise(resolve => {
//   resolve(init * 2);
// })

// const arr = [p1, p2];

// const total = arr.reduce((v, i) => {
//   return v.then(i);
// }, Promise.resolve(10));

// total.then(console.log);

// let acc = x => x + x;
// let cheng = x => x * x;

// let pip = (...funcs) => input => funcs.reduce((init, fn) => {
//   return fn(init);
// }, input);

// let fn = pip(acc, cheng);

// console.log(fn(2))