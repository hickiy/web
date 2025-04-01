let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]

// 插入排序算法函数
/**
 * 使用插入排序算法对数组进行排序。
 *
 * 算法步骤：
 * 1. 从数组的第二个元素开始（假定第一个元素为已排序部分）。
 * 2. 保存当前元素（temp），并在已排序部分中查找其正确位置。
 * 3. 向右移动已排序部分中大于 temp 的元素，为 temp 腾出空间。
 * 4. 将 temp 插入到正确位置中。
 * 5. 重复以上过程，直到整个数组有序。
 *
 * @param {number[]} arr - 需要排序的数字数组。
 * @returns {number[]} 排序后的数组。
 */
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let temp = arr[i]
    while (j > 0 && temp < arr[j - 1]) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp
  }
  return arr
}

console.log(insertSort(arr)); // 输出排序后的数组: [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]
