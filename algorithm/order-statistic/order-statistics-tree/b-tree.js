/**
 * B树节点类
 * t: 最小度数（每个节点最少t-1个键，最多2t-1个键）
 */
class BTreeNode {
  constructor(t, leaf = false) {
    this.t = t; // 最小度数
    this.leaf = leaf; // 是否为叶子节点
    this.keys = []; // 键数组
    this.children = []; // 子节点数组
    this.size = 0; // 以该节点为根的子树的元素总数（顺序统计用）
  }
}

/**
 * B树类，支持插入和顺序统计（第k小元素查询）
 */
class BTree {
  constructor(t) {
    this.t = t;
    this.root = new BTreeNode(t, true);
  }

  /**
   * 更新节点的size属性
   */
  updateSize(node) {
    if (!node) return 0;
    if (node.leaf) {
      node.size = node.keys.length;
    } else {
      node.size = node.keys.length;
      for (let child of node.children) {
        node.size += this.updateSize(child);
      }
    }
    return node.size;
  }

  /**
   * 插入新键
   */
  insert(key) {
    let root = this.root;
    if (root.keys.length === 2 * this.t - 1) {
      // 根节点已满，需分裂
      let s = new BTreeNode(this.t, false);
      s.children[0] = root;
      this.splitChild(s, 0);
      this.root = s;
      this.insertNonFull(s, key);
    } else {
      this.insertNonFull(root, key);
    }
    this.updateSize(this.root); // 插入后更新size
  }

  /**
   * 在非满节点插入新键
   */
  insertNonFull(node, key) {
    let i = node.keys.length - 1;
    if (node.leaf) {
      // 直接插入到合适位置
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
    } else {
      // 找到要插入的子节点
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) i++;
      }
      this.insertNonFull(node.children[i], key);
    }
  }

  /**
   * 分裂子节点
   */
  splitChild(parent, i) {
    let t = this.t;
    let y = parent.children[i];
    let z = new BTreeNode(t, y.leaf);

    // z获得y的后t-1个键
    z.keys = y.keys.splice(t, t - 1);
    // y保留前t-1个键
    let mid = y.keys.splice(t - 1, 1)[0];
    // 如果不是叶子，z获得y的后t个子节点
    if (!y.leaf) {
      z.children = y.children.splice(t, t);
    }
    // 父节点插入中间键
    parent.keys.splice(i, 0, mid);
    parent.children.splice(i + 1, 0, z);
  }

  /**
   * 顺序统计：查找第k小的元素
   * k从1开始
   */
  select(k, node = this.root) {
    if (!node || k < 1 || k > node.size) return null;
    let i = 0;
    while (i < node.keys.length) {
      let leftSize = node.leaf ? 0 : node.children[i].size;
      if (k <= leftSize) {
        // 在左子树
        return this.select(k, node.children[i]);
      } else if (k === leftSize + 1) {
        // 当前键就是第k小
        return node.keys[i];
      } else {
        // 在右侧
        k -= (leftSize + 1);
        i++;
      }
    }
    // 最右子树
    if (!node.leaf) {
      return this.select(k, node.children[i]);
    }
    return null;
  }
}

// 示例用法
const btree = new BTree(2); // 2阶B树
[10, 20, 5, 6, 12, 30, 7, 17].forEach(x => btree.insert(x));
console.log(btree.select(3)); // 输出第3小的元素