/**
 * 顺序统计树（Order-Statistic Tree）
 */
export default class OrderStatisticTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.size = 1; // 以该节点为根的子树节点数
  }

  // 插入节点时，递归更新size
  insert(value) {
    if (value > this.value) {
      if (!this.right) this.right = new OrderStatisticTree(value);
      else this.right.insert(value);
    } else {
      if (!this.left) this.left = new OrderStatisticTree(value);
      else this.left.insert(value);
    }
    this.size = 1 + (this.left ? this.left.size : 0) + (this.right ? this.right.size : 0);
  }

  // 查询第k小的元素（k从1开始）
  select(k) {
    const leftSize = this.left ? this.left.size : 0;
    if (k === leftSize + 1) return this.value;
    if (k <= leftSize) return this.left.select(k);
    return this.right.select(k - leftSize - 1);
  }

  // 查询某个值的排名（比它小的元素个数+1）
  rank(value) {
    if (value === this.value) {
      return (this.left ? this.left.size : 0) + 1;
    }
    if (value < this.value) {
      return this.left ? this.left.rank(value) : 0;
    }
    const leftSize = this.left ? this.left.size : 0;
    return leftSize + 1 + (this.right ? this.right.rank(value) : 0);
  }
}

// 示例用法
const ost = new OrderStatisticTree(10);
ost.insert(5);
ost.insert(15);
ost.insert(4);
ost.insert(6);
ost.insert(14);
ost.insert(16);

console.log('第3小的元素:', ost.select(3)); // 输出6
console.log('元素14的排名:', ost.rank(14)); // 输出5