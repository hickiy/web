/*
B树原理简述：
1. B树是多路搜索树，每个节点最多有m个子节点（m为阶数）。
2. 除根节点外，每个节点至少有⌈m/2⌉个子节点。
3. 所有叶子节点都在同一层。
4. 节点内的key有序，子树区间分割。
5. 插入和删除时，节点可能分裂或合并，保证树的平衡性。
*/

export default class BTreeNode {
  constructor(t, leaf = false) {
    this.t = t; // 阶数
    this.leaf = leaf; // 是否为叶子节点
    this.keys = []; // 键数组
    this.children = []; // 子节点数组
  }

  // 在节点内查找key的位置
  findKey(key) {
    let idx = 0;
    while (idx < this.keys.length && this.keys[idx] < key) {
      idx++;
    }
    return idx;
  }
}

class BTree {
  constructor(t = 3) {
    this.t = t; // 阶数
    this.root = new BTreeNode(t, true);
  }

  // 查找操作
  search(key, node = this.root) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }
    if (i < node.keys.length && node.keys[i] === key) {
      return true;
    }
    if (node.leaf) {
      return false;
    }
    return this.search(key, node.children[i]);
  }

  // 插入操作
  insert(key) {
    let root = this.root;
    if (root.keys.length === 2 * this.t - 1) {
      // 根节点已满，需分裂
      let s = new BTreeNode(this.t, false);
      s.children[0] = root;
      this.splitChild(s, 0, root);
      this.root = s;
      this._insertNonFull(s, key);
    } else {
      this._insertNonFull(root, key);
    }
  }

  // 插入到非满节点
  _insertNonFull(node, key) {
    let i = node.keys.length - 1;
    if (node.leaf) {
      // 插入到叶子节点
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      if (node.keys[i + 1] === key) return; // 不插入重复
      node.keys.splice(i + 1, 0, key);
    } else {
      // 插入到内部节点
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i, node.children[i]);
        if (key > node.keys[i]) i++;
      }
      this._insertNonFull(node.children[i], key);
    }
  }

  // 分裂子节点
  splitChild(parent, i, y) {
    let t = this.t;
    let z = new BTreeNode(t, y.leaf);
    // z获得y的后t-1个key
    z.keys = y.keys.splice(t, t - 1);
    // 如果不是叶子，z获得y的后t个子节点
    if (!y.leaf) {
      z.children = y.children.splice(t, t);
    }
    // 父节点插入中间key
    parent.keys.splice(i, 0, y.keys.pop());
    parent.children.splice(i + 1, 0, z);
  }

  // 中序遍历
  inorder(node = this.root, result = []) {
    let i;
    for (i = 0; i < node.keys.length; i++) {
      if (!node.leaf) this.inorder(node.children[i], result);
      result.push(node.keys[i]);
    }
    if (!node.leaf) this.inorder(node.children[i], result);
    return result;
  }
}

// 示例用法
const btree = new BTree(3); // 3阶B树
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

console.log(btree.inorder()); // 输出有序节点
console.log(btree.search(12)); // 输出 true
console.log(btree.search(100)); // 输出 false