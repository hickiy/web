let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]

// 冒泡排序函数
/**
 * 使用冒泡排序算法对数组进行升序排序。
 *
 * 算法步骤：
 * 1. 获取数组长度。
 * 2. 外层循环控制需要比较的轮数，每一轮将最大的未排序元素移动到数组末尾。
 * 3. 内层循环依次比较数组中的相邻元素，若前一个元素大于后一个元素则交换它们的位置。
 * 4. 重复以上过程，直到整个数组均排序完成。
 *
 * @param {number[]} arr - 待排序的数字数组。
 * @returns {number[]} 排序后的数组。
 */
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log(bubbleSort(arr)); // 输出: [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]