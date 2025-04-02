const arr = [1, 2, 3, 4, 5, 5, 5, 5, 5];

function filter(arr) {
  return arr.filter((i, index) => arr.indexOf(i, index + 1) == -1);
}

console.log(filter(arr));
