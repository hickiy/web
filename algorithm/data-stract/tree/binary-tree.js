// 定义二叉树节点类
class TreeNode {
  constructor(value) {
    this.value = value;   // 节点的值
    this.left = null;     // 左子节点
    this.right = null;    // 右子节点
  }
}

// 定义二叉搜索树类
class BinarySearchTree {
  constructor() {
    this.root = null; // 树的根节点
  }

  // 插入新值
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) { // 如果树为空，新节点作为根节点
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) { // 插入到左子树
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else { // 插入到右子树
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // 查找指定值是否存在
  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true; // 找到返回true
      current = value < current.value ? current.left : current.right; // 向左或右子树查找
    }
    return false; // 未找到返回false
  }

  // 中序遍历，返回有序数组
  inOrderTraversal(node = this.root, result = []) {
    if (!node) return result;
    this.inOrderTraversal(node.left, result); // 递归遍历左子树
    result.push(node.value);                  // 访问当前节点
    this.inOrderTraversal(node.right, result);// 递归遍历右子树
    return result;
  }

  /**
   * 删除二叉搜索树中的指定值
   * @param {number} value 
   */
  delete(value) {
    this.root = this._deleteNode(this.root, value);
  }

  // 递归删除节点的辅助函数
  _deleteNode(node, value) {
    if (!node) return null; // 节点不存在，返回null
    if (value < node.value) {
      node.left = this._deleteNode(node.left, value); // 在左子树递归删除
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value); // 在右子树递归删除
    } else {
      // 找到要删除的节点
      if (!node.left && !node.right) {
        // 叶子节点，直接删除
        return null;
      } else if (!node.left) {
        // 只有右子树，用右子节点替换
        return node.right;
      } else if (!node.right) {
        // 只有左子树，用左子节点替换
        return node.left;
      } else {
        // 有两个子节点
        // 找到右子树的最小节点（中序后继）
        let minNode = node.right;
        while (minNode.left) {
          minNode = minNode.left;
        }
        node.value = minNode.value; // 用最小节点值替换当前节点
        node.right = this._deleteNode(node.right, minNode.value); // 删除右子树中的最小节点
      }
    }
    return node; // 返回当前节点
  }
}

// 示例用法
const bst = new BinarySearchTree();
bst.insert(10);    // 插入10
bst.insert(5);     // 插入5
bst.insert(15);    // 插入15
bst.insert(12);    // 插入12
bst.insert(18);    // 插入18
console.log(bst.inOrderTraversal()); // [5, 10, 12, 15, 18]