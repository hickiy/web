import MinHeap from "../../data-stract/min-heap/index.js";

/**
 * 使用最小堆找第 k 大的数
 * 算法思路：
 * 1. 用一个大小为 k 的最小堆来记录当前最大的 k 个数。
 * 2. 遍历数组中的每个元素，如果堆的大小不足 k，则直接加入堆。
 * 3. 当堆满之后，如果当前元素比堆顶（最小堆中最小的数）大，
 *    那么替换堆顶，并调整堆，保证堆中存储的是当前 k 个最大数。
 * 4. 遍历完以后，堆顶即为数组的第 k 大数。
 *
 * @param {number[]} arr - 输入数组
 * @param {number} k - 要找的顺序统计量的序号（第 k 大的数）
 * @returns {number|null} 第 k 大的数或者 null（当 k 不合法时）
 */
function findKthLargest(arr, k) {
  if (k < 1 || k > arr.length) {
    return null;
  }
  const minHeap = new MinHeap();

  for (let num of arr) {
    // 如果堆中元素个数少于 k，则直接入堆
    if (minHeap.size() < k) {
      minHeap.push(num);
    } else if (num > minHeap.peek()) {
      // 如果当前元素比最小堆堆顶大，则替换堆顶
      minHeap.pop();
      minHeap.push(num);
    }
  }
  // 堆顶即为第 k 大的数（因为堆中保存的是 k 个最大数，堆顶为其中最小的数）
  return minHeap.peek();
}

// 测试示例：
let array = [7, 10, 4, 3, 20, 15];

console.log("数组:", array);
console.log("第 3 大的数:", findKthLargest(array, 3)); // 输出应为 10