/*
红黑树原理简述：
1. 每个节点要么是红色，要么是黑色。
2. 根节点是黑色。
3. 每个叶子节点（NIL）是黑色。
4. 如果一个节点是红色，则它的两个子节点都是黑色。
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

插入时，先按二叉搜索树插入新节点（红色），再通过旋转和变色修正红黑树性质。
旋转操作用于调整树的结构，变色操作用于调整节点颜色，保证红黑树的平衡性和性质不被破坏。
*/

// 红黑树的颜色常量
const RED = true;
const BLACK = false;

// 节点类，包含值、颜色、左右子节点、父节点
class Node {
  constructor(value, color = RED, left = null, right = null, parent = null) {
    this.value = value;   // 节点值
    this.color = color;   // 节点颜色（红或黑）
    this.left = left;     // 左子节点
    this.right = right;   // 右子节点
    this.parent = parent; // 父节点
  }
}

// 红黑树类
export default class RedBlackTree {
  constructor() {
    this.root = null; // 根节点
  }

  /**
   * 左旋操作
   * 以x为支点，将x的右子节点y旋转到x的上方
   * 保证红黑树的平衡性
   */
  leftRotate(x) {
    const y = x.right; // y为x的右子节点
    x.right = y.left;  // y的左子树变为x的右子树
    if (y.left) y.left.parent = x; // 更新y左子树的父节点
    y.parent = x.parent; // y的父节点变为x的父节点
    if (!x.parent) {
      this.root = y; // 如果x是根节点，y成为新的根节点
    } else if (x === x.parent.left) {
      x.parent.left = y; // x是左子节点，y替换x
    } else {
      x.parent.right = y; // x是右子节点，y替换x
    }
    y.left = x; // x成为y的左子节点
    x.parent = y; // 更新x的父节点
  }

  /**
   * 右旋操作
   * 以y为支点，将y的左子节点x旋转到y的上方
   * 保证红黑树的平衡性
   */
  rightRotate(y) {
    const x = y.left; // x为y的左子节点
    y.left = x.right; // x的右子树变为y的左子树
    if (x.right) x.right.parent = y; // 更新x右子树的父节点
    x.parent = y.parent; // x的父节点变为y的父节点
    if (!y.parent) {
      this.root = x; // 如果y是根节点，x成为新的根节点
    } else if (y === y.parent.right) {
      y.parent.right = x; // y是右子节点，x替换y
    } else {
      y.parent.left = x; // y是左子节点，x替换y
    }
    x.right = y; // y成为x的右子节点
    y.parent = x; // 更新y的父节点
  }

  /**
   * 插入操作
   * 先按二叉搜索树插入节点，然后通过insertFixup修正红黑树性质
   */
  insert(value) {
    let node = new Node(value); // 新建节点，默认红色
    let y = null; // y为插入位置的父节点
    let x = this.root; // 从根节点开始查找插入位置

    // 查找插入位置
    while (x) {
      y = x;
      if (value < x.value) {
        x = x.left;
      } else if (value > x.value) {
        x = x.right;
      } else {
        // 已存在相同值，直接返回
        return;
      }
    }
    node.parent = y; // 设置新节点的父节点
    if (!y) {
      this.root = node; // 树为空，新节点为根节点
    } else if (value < y.value) {
      y.left = node; // 插入到左子树
    } else {
      y.right = node; // 插入到右子树
    }

    node.color = RED; // 新插入节点必须为红色
    this.insertFixup(node); // 修正红黑树性质
  }

  /**
   * 插入修正操作
   * 保证插入后红黑树的五条性质不被破坏
   */
  insertFixup(z) {
    // 当父节点为红色时，可能破坏红黑树性质，需要修正
    while (z.parent && z.parent.color === RED) {
      // 父节点是祖父节点的左子节点
      if (z.parent === z.parent.parent.left) {
        let y = z.parent.parent.right; // 叔叔节点
        if (y && y.color === RED) {
          // 情况1：叔叔节点为红色
          // 变色，继续向上修正
          z.parent.color = BLACK;
          y.color = BLACK;
          z.parent.parent.color = RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            // 情况2：叔叔为黑色，且z为右子节点
            // 先左旋转
            z = z.parent;
            this.leftRotate(z);
          }
          // 情况3：叔叔为黑色，且z为左子节点
          // 右旋转并变色
          z.parent.color = BLACK;
          z.parent.parent.color = RED;
          this.rightRotate(z.parent.parent);
        }
      } else {
        // 父节点是祖父节点的右子节点，对称处理
        let y = z.parent.parent.left; // 叔叔节点
        if (y && y.color === RED) {
          // 情况1：叔叔节点为红色
          z.parent.color = BLACK;
          y.color = BLACK;
          z.parent.parent.color = RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            // 情况2：叔叔为黑色，且z为左子节点
            z = z.parent;
            this.rightRotate(z);
          }
          // 情况3：叔叔为黑色，且z为右子节点
          z.parent.color = BLACK;
          z.parent.parent.color = RED;
          this.leftRotate(z.parent.parent);
        }
      }
    }
    // 根节点始终为黑色
    this.root.color = BLACK;
  }

  /**
   * 查找操作
   * 判断值是否存在于红黑树中
   */
  search(value) {
    let x = this.root;
    while (x) {
      if (value < x.value) {
        x = x.left;
      } else if (value > x.value) {
        x = x.right;
      } else {
        return true; // 找到
      }
    }
    return false; // 未找到
  }

  /**
   * 中序遍历
   * 返回有序的节点信息（值和颜色）
   */
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push({ value: node.value, color: node.color ? 'RED' : 'BLACK' });
      this.inorder(node.right, result);
    }
    return result;
  }
}

// 示例用法
const tree = new RedBlackTree();
tree.insert(10);
tree.insert(20);
tree.insert(15);
console.log(tree.inorder()); // 输出有序的节点信息
console.log(tree.search(15)); // 输出 true


