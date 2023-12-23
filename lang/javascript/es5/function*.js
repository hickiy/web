function* generateFn() {
  try {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  } catch (e) {
    yield e;
  }
}

let g = generateFn();
console.log(g.next());
console.log(g.next());
try {
  // log 没有执行，因为抛出的异常，在generateFn内没有被捕获，直接进入了catch
  console.log(g.throw('error'));
} catch (e) {
  console.log(e); // error
}
console.log('g end \n');

new Promise((res, rej) => {
  function* fn() {
    try {
      yield new Promise((res) => setTimeout(res, 200));
    } catch (e) {
      return e;
    }
  }
  let g2 = fn();
  g2.next().value.then(() => {
    let result = g2.next();
    res(result.value);
  });
  setTimeout(() => {
    let result = g2.throw('error');
    res(result.value);
  }, 100);
}).then((res) => console.log(res));

console.log('g2 end \n');

/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
var cancellable = function (generator) {
  let cancel = null;
  let prom = new Promise((resolve, reject) => {
    let result = generator.next();
    function next() {
      if (result.done) {
        resolve(result.value);
      } else {
        result.value
          .then((res) => {
            try {
              result = generator.next(res);
              next();
            } catch (err) {
              reject(err);
            }
          })
          .catch((err) => {
            try {
              result = generator.throw(new Error(err));
              if (result.done) {
                resolve(err);
              } else {
                next();
              }
            } catch (e) {
              reject(err);
            }
          });
      }
    }
    next();
    cancle = function () {
      try {
        result = generator.throw('Cancelled');
        next();
      } catch (err) {
        reject(err);
      }
    };
  });
  return [cancle, prom];
};
function* g3() {
  try {
    yield new Promise((res) => setTimeout(res, 200));
    yield new Promise((resolve, reject) => reject('Promise Rejected'));
  } catch (e) {
    return e;
  }
  return 'Hi';
}
let [cancel, prom] = cancellable(g3());
prom.then((res) => console.log(res)).catch((err) => console.log(err));
setTimeout(() => {
  cancel();
}, 100);
