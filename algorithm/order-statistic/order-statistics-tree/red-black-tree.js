// 红黑树节点定义，包含顺序统计信息 size
class Node {
  constructor(key, color = 'RED', left = null, right = null, parent = null) {
    this.key = key;
    this.color = color; // 'RED' or 'BLACK'
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.size = 1; // 以该节点为根的子树节点数
  }
}

// 红黑树实现，支持顺序统计操作
class OrderStatisticsTree {
  constructor() {
    this.nil = new Node(null, 'BLACK'); // 哨兵节点，简化边界处理
    this.root = this.nil;
  }

  // 左旋操作，保持红黑树性质并更新size
  leftRotate(x) {
    let y = x.right;
    x.right = y.left;
    if (y.left !== this.nil) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === this.nil) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;

    // 更新size
    y.size = x.size;
    x.size = x.left.size + x.right.size + 1;
  }

  // 右旋操作，保持红黑树性质并更新size
  rightRotate(y) {
    let x = y.left;
    y.left = x.right;
    if (x.right !== this.nil) x.right.parent = y;
    x.parent = y.parent;
    if (y.parent === this.nil) {
      this.root = x;
    } else if (y === y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }
    x.right = y;
    y.parent = x;

    // 更新size
    x.size = y.size;
    y.size = y.left.size + y.right.size + 1;
  }

  // 插入新节点，并维护红黑树性质和size
  insert(key) {
    let z = new Node(key);
    z.left = z.right = this.nil;

    let y = this.nil;
    let x = this.root;
    while (x !== this.nil) {
      x.size++; // 插入路径上的节点size递增
      y = x;
      if (z.key < x.key) x = x.left;
      else x = x.right;
    }
    z.parent = y;
    if (y === this.nil) {
      this.root = z;
    } else if (z.key < y.key) {
      y.left = z;
    } else {
      y.right = z;
    }
    z.color = 'RED';
    this.insertFixup(z);
  }

  // 插入修正，保持红黑树性质
  insertFixup(z) {
    while (z.parent.color === 'RED') {
      if (z.parent === z.parent.parent.left) {
        let y = z.parent.parent.right;
        if (y.color === 'RED') {
          z.parent.color = 'BLACK';
          y.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this.leftRotate(z);
          }
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          this.rightRotate(z.parent.parent);
        }
      } else {
        let y = z.parent.parent.left;
        if (y.color === 'RED') {
          z.parent.color = 'BLACK';
          y.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rightRotate(z);
          }
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          this.leftRotate(z.parent.parent);
        }
      }
    }
    this.root.color = 'BLACK';
  }

  // 查找第k小的元素（顺序统计选择）
  select(node, k) {
    // node: 当前子树根节点, k: 第k小
    let leftSize = node.left.size;
    if (k === leftSize + 1) {
      return node;
    } else if (k <= leftSize) {
      return this.select(node.left, k);
    } else {
      return this.select(node.right, k - leftSize - 1);
    }
  }

  // 返回第k小的key
  kthSmallest(k) {
    if (k < 1 || k > this.root.size) return null;
    let node = this.select(this.root, k);
    return node.key;
  }

  // 返回key的排名（比key小的元素个数+1）
  rank(key) {
    let rank = 0;
    let x = this.root;
    while (x !== this.nil) {
      if (key < x.key) {
        x = x.left;
      } else {
        rank += x.left.size + (key === x.key ? 1 : 0);
        if (key === x.key) break;
        x = x.right;
      }
    }
    return rank;
  }
}

// 用法示例
const tree = new OrderStatisticsTree();
tree.insert(5);
tree.insert(2);
tree.insert(8);
tree.insert(6);
tree.insert(1);
console.log(tree.kthSmallest(3)); // 输出第3小的元素