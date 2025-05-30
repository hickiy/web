/**
 * 最大堆实现类
 * 最大堆中，每个节点的值都大于或等于其子节点的值
 */
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