/**
 * 并查集（Union-Find）数据结构实现
 * 用于处理集合的合并与查询，常用于连通性问题
 */
class UnionFind {
  /**
   * 构造函数，初始化 n 个元素，每个元素自成一个集合
   * @param {number} n - 元素个数
   */
  constructor(n) {
    // parent[i] 表示元素 i 的父节点
    this.parent = Array.from({ length: n }, (_, i) => i);
    // rank[i] 用于记录树的高度，优化合并操作
    this.rank = Array(n).fill(1);
  }

  /**
   * 查找元素 x 所属集合的根节点（带路径压缩优化）
   * @param {number} x
   * @returns {number} 根节点编号
   */
  find(x) {
    if (this.parent[x] !== x) {
      // 路径压缩：递归查找并直接连接到根节点
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /**
   * 合并元素 x 和 y 所在的集合
   * @param {number} x
   * @param {number} y
   * @returns {boolean} 是否合并成功（已在同一集合则返回 false）
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // 已在同一集合

    // 按秩合并：将较小的树合并到较大的树下
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX] += 1;
    }
    return true;
  }

  /**
   * 判断元素 x 和 y 是否属于同一集合
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// 示例用法
const uf = new UnionFind(5);
uf.union(0, 1);
uf.union(1, 2);
console.log(uf.connected(0, 2)); // true
console.log(uf.connected(0, 3)); // false
