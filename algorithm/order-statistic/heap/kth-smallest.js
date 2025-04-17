class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // 获取堆的父节点索引
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // 获取左子节点索引
  leftChildIndex(index) {
    return 2 * index + 1;
  }

  // 获取右子节点索引
  rightChildIndex(index) {
    return 2 * index + 2;
  }

  // 交换堆中两个位置的元素
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 向堆中添加一个值，并保持最大堆属性
  push(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  // 上滤：将新加入的元素上移，直到满足最大堆性质
  heapifyUp(index) {
    let parent = this.parentIndex(index);
    while (index > 0 && this.heap[index] > this.heap[parent]) {
      this.swap(index, parent);
      index = parent;
      parent = this.parentIndex(index);
    }
  }

  // 删除并返回堆顶元素，同时保持最大堆性质
  pop() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown(0);
    }
    return max;
  }

  // 下滤：将堆顶元素下移，直到满足最大堆性质
  heapifyDown(index) {
    const length = this.heap.length;
    while (true) {
      let largest = index;
      const left = this.leftChildIndex(index);
      const right = this.rightChildIndex(index);
      if (left < length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      if (right < length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }
      if (largest === index) break;
      this.swap(index, largest);
      index = largest;
    }
  }

  // 返回堆顶元素，不删除
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // 返回堆中元素的数量
  size() {
    return this.heap.length;
  }
}

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