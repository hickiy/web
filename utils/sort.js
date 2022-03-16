let arr = [1, 3, 5, 79, 0, -0, 2, 88, 66, 37, 21]

// 冒泡排序
Object.defineProperty(arr, 'sort', {
  value: function (fn) {
    let arr = this, len = arr.length;
    for (var j = 0; j < len - 1; j++) {
      for (var i = 0; i <= len - 1 - j; i++) {
        if (fn(arr[i], arr[i + 1]) > 0) {
          let t = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = t;
        }
      }
    }
    return arr;
  },
  writable: true,
})


// 选择排序
Object.defineProperty(arr, 'sort', {
  value: function (fn) {
    let arr = this, len = arr.length;
    for (var j = 0; j < len - 1; j++) {
      let minimum = j;
      for (var i = j + 1; i < len; i++) {
        if (fn(arr[minimum], arr[i]) > 0) {
          minimum = i;
        }
      }
      let temp = arr[j];
      arr[j] = arr[minimum];
      arr[minimum] = temp;
    }
    return arr;
  },
  writable: true,
})

// 插入排序
Object.defineProperty(arr, 'sort', {
  value: function (fn) {
    let arr = this, len = arr.length;
    for (var j = 1; j < len; j++) {
      for (var i = 0; i < j; i++) {
        if (fn(arr[i] ,arr[j]) > 0) {
          let t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
        }
      }
    }
    return arr;
  },
  writable: true,
})

console.log(arr.sort((a, b) => {
  return b - a;
}));