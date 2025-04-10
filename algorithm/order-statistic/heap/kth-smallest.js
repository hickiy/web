import MaxHeap from "../../data-stract/max-heap/index.js";
/**
 * 使用最大堆找第 k 小的数
 * 算法思路：
 * 1. 用一个大小为 k 的最大堆来记录当前最小的 k 个数。
 * 2. 遍历数组中的每个元素，如果堆的大小不足 k，则直接加入堆。
 * 3. 当堆满之后，如果当前元素比堆顶（最大堆中最大的数）小，
 *    那么替换堆顶，并调整堆，保证堆中存储的是当前 k 个最小数。
 * 4. 遍历完以后，堆顶即为数组的第 k 小数。
 *
 * @param {number[]} arr - 输入数组
 * @param {number} k - 要找的顺序统计量的序号（第 k 小的数）
 * @returns {number|null} 第 k 小的数或者 null（当 k 不合法时）
 */
function findKthSmallest(arr, k) {
  if (k < 1 || k > arr.length) {
    return null;
  }
  const maxHeap = new MaxHeap();

  for (let num of arr) {
    // 如果堆中元素个数少于 k，则直接入堆
    if (maxHeap.size() < k) {
      maxHeap.push(num);
    } else if (num < maxHeap.peek()) {
      // 如果当前元素比最大堆堆顶小，则替换堆顶（移除最大值，插入当前数）
      maxHeap.pop();
      maxHeap.push(num);
    }
  }
  // 堆顶即为第 k 小的数（因为堆中保存的是 k 个最小数，堆顶为其中最大的数）
  return maxHeap.peek();
}

// 测试示例：
let array = [7, 10, 4, 3, 20, 15];

console.log("数组:", array);
console.log("第 3 小的数:", findKthSmallest(array, 3)); // 输出应为 7