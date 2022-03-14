const myReduce = function (fn, intailValue) {
  let i = -1, arr = this, len = arr.length;
  if (!intailValue) {
    intailValue = arr[++i];
  }
  while (++i < len) {
    intailValue = fn(intailValue, arr[i], arr);
  }
  return intailValue;
}

const arr = [1, 2, 3, 4];
arr.reduce = myReduce;

const total = arr.reduce((v, i) => {
  return v + i;
})

console.log(total);