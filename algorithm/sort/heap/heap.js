/**
 * 堆排序算法。
 *
 * 此函数实现了堆排序。首先通过构建最大堆，把数组调整为堆结构，
 * 然后不断将堆顶（数组中最大的元素）与末尾元素交换，再对剩余的堆进行调整，
 * 直至整个数组排序完毕。最后返回一个按升序排列的新数组。
 *
 * @param {number[]} arr - 需要排序的数组，其中每个元素均为数字。
 * @returns {number[]} 返回一个按升序排列的新数组。
 */
function heapSort(arr) {
  // 复制一份数组，避免修改原数组
  let n = arr.length;

  // 构建最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 一个个交换堆顶元素与当前末尾元素，缩小堆的范围
  for (let i = n - 1; i > 0; i--) {
    // 交换堆顶与末尾元素
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // 重新调整堆（忽略已排序的尾部元素）
    heapify(arr, i, 0);
  }

  return arr;
}

/**
 * 辅助函数：将一个数组调整成以i为根节点的堆。
 *
 * @param {number[]} arr - 数组。
 * @param {number} heapSize - 堆的有效大小。
 * @param {number} i - 根节点的索引。
 */
function heapify(arr, heapSize, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // 如果左子节点存在且大于根节点
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  // 如果右子节点存在且大于当前最大节点
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  // 如果最大节点不是根节点，交换并递归调整
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, heapSize, largest);
  }
}

// 测试代码
let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21];
console.log(heapSort(arr)); // [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]