let arr = [170, 45, 75, 90, 180, 24, 2, 66];

/**
 * 基数排序算法（LSD - 最低有效位优先）。
 *
 * 基数排序通过将数字按位分配到不同的桶里来实现排序，首先找到数组中最大的数字
 * 以确定需要比较的位数，然后从最低位开始，对每一位使用计数排序的思想进行排序，
 * 最终得到一个按升序排列的新数组。
 *
 * @param {number[]} arr - 需要排序的数组，其中每个元素均为非负整数。
 * @returns {number[]} 返回一个按升序排列的新数组。
 */
function radixSort(arr) {
  if (arr.length === 0) return arr;
  
  // 找到最大值以确定位数
  const maxNum = Math.max(...arr);
  // 位数：最大值的数字个数
  const maxDigit = Math.floor(Math.log10(maxNum)) + 1;
  
  let mod = 10;
  let dev = 1;
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    // 创建10个桶用于0-9的数字
    let buckets = [...Array(10)].map(() => []);
    
    // 放入相应的桶中，依据当前位的值
    for (let j = 0; j < arr.length; j++) {
      const num = arr[j];
      const digit = Math.floor((num % mod) / dev);
      buckets[digit].push(num);
    }
    
    // 将桶中的数字依次合并回数组
    arr = [].concat(...buckets);
  }
  
  return arr;
}

console.log(radixSort(arr)); // [2, 24, 45, 66, 75, 90, 170, 802]