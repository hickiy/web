/**
 * 二叉搜索树（Binary Search Tree, BST）节点类
 */
class TreeNode {
  /**
   * @param {number} value 节点存储的值
   */
  constructor(value) {
    this.value = value;     // 节点的值
    this.left = null;       // 左子节点
    this.right = null;      // 右子节点
  }
}

/**
 * 二叉搜索树类
 */
class BinarySearchTree {
  constructor() {
    this.root = null; // 树的根节点
  }

  /**
   * 插入一个新值到二叉搜索树
   * @param {number} value 要插入的值
   */
  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      // 如果树为空，新节点作为根节点
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        // 插入到左子树
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        // 插入到右子树
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  /**
   * 查找树中是否存在某个值
   * @param {number} value 要查找的值
   * @returns {boolean} 是否找到
   */
  search(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) {
        return true; // 找到
      } else if (value < current.value) {
        current = current.left; // 去左子树查找
      } else {
        current = current.right; // 去右子树查找
      }
    }
    return false; // 没找到
  }

  /**
   * 删除树中的某个值
   * @param {number} value 要删除的值
   */
  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  /**
   * 递归辅助函数：删除节点
   * @param {TreeNode} node 当前节点
   * @param {number} value 要删除的值
   * @returns {TreeNode} 删除后的子树根节点
   */
  _removeNode(node, value) {
    if (node === null) return null;
    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    } else {
      // 找到要删除的节点
      if (node.left === null && node.right === null) {
        // 叶子节点，直接删除
        return null;
      }
      if (node.left === null) {
        // 只有右子树
        return node.right;
      }
      if (node.right === null) {
        // 只有左子树
        return node.left;
      }
      // 有两个子节点，找到右子树最小节点替换
      let minNode = this._findMinNode(node.right);
      node.value = minNode.value;
      node.right = this._removeNode(node.right, minNode.value);
      return node;
    }
  }

  /**
   * 查找以node为根的子树中的最小节点
   * @param {TreeNode} node
   * @returns {TreeNode}
   */
  _findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /**
   * 中序遍历（递归），返回有序数组
   * @returns {number[]}
   */
  inorder() {
    const result = [];
    this._inorderHelper(this.root, result);
    return result;
  }

  /**
   * 中序遍历辅助函数
   * @param {TreeNode} node
   * @param {number[]} result
   */
  _inorderHelper(node, result) {
    if (node !== null) {
      this._inorderHelper(node.left, result);
      result.push(node.value);
      this._inorderHelper(node.right, result);
    }
  }
}

// 示例用法
const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(4);
console.log(bst.inorder()); // [3, 4, 5, 7]
bst.remove(3);
console.log(bst.inorder()); // [4, 5, 7]
console.log(bst.search(7)); // true
console.log(bst.search(3)); // false