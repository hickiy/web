function removeDuplicate(arr) {
  let res = [];
  while (arr.length > 0) {
    const item = arr.shift();
    if (res.indexOf(item) == -1) {
      res.push(item);
    }
  }
  return res;
}

const arr = [1,2,3,4,5,5,5,5,5];

console.log(removeDuplicate(arr));

