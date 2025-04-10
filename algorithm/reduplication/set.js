const arr = [1, 2, 3, 4, 5, 5, 5, 5, 5];

function set(arr) {
  return Array.from(new Set(arr));
}

console.log(set(arr));