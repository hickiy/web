const arr = [1, 2, 3, 4, 5, 5, 5, 5, 5];

function indexOf(arr) {
  let res = [];
  for (let item of arr) {
    res.indexOf(item) == -1 && res.push(item);
  }
  return res;
}

console.log(indexOf(arr));