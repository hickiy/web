function all(args) {
  const result = [];
  var len, counts;
  len = counts = args.length;
  return new Promise((resolve, reject) => {
    for (var i = 0; i < len; i++) {
      function work(i) {
        if (args[i] instanceof Promise) {
          args[i].then(res => {
            result[i] = res;
            if (--counts == 0) {
              resolve(result);
            }
          }).catch(reject)
        } else {
          result[i] = args[i];
          if (--counts == 0) {
            resolve(result);
          }
        }
      }
      work(i);
    }
  })
}

all([Promise.resolve('success'), 2, 3]).then(res => console.log(res)).catch(err => console.log(err));