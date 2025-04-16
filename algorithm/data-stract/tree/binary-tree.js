// 二叉树节点定义
class TreeNode {
  constructor(value) {
    this.value = value;      // 节点的值
    this.left = null;        // 左子节点
    this.right = null;       // 右子节点
  }
}

// 二叉树定义（不保证顺序，不是二叉搜索树）
class BinaryTree {
  constructor() {
    this.root = null;        // 根节点
  }

  // 新增节点（按层级顺序插入，保证树尽量平衡）
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    // 使用队列进行层序遍历，找到第一个空位插入
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (!node.left) {
        node.left = newNode;
        return;
      } else {
        queue.push(node.left);
      }
      if (!node.right) {
        node.right = newNode;
        return;
      } else {
        queue.push(node.right);
      }
    }
  }

  // 删除节点（删除第一个值等于value的节点）
  delete(value) {
    if (!this.root) return;
    // 层序遍历查找要删除的节点和最后一个节点
    let nodeToDelete = null;
    let lastNode = null;
    let parentOfLast = null;
    let queue = [this.root];

    while (queue.length) {
      const node = queue.shift();
      if (node.value === value) {
        nodeToDelete = node;
      }
      if (node.left) {
        parentOfLast = node;
        lastNode = node.left;
        queue.push(node.left);
      }
      if (node.right) {
        parentOfLast = node;
        lastNode = node.right;
        queue.push(node.right);
      }
    }
    // 没找到要删除的节点
    if (!nodeToDelete) return;
    // 只有一个节点的情况
    if (!lastNode) {
      this.root = null;
      return;
    }

    // 用最后一个节点的值替换要删除的节点
    nodeToDelete.value = lastNode.value;
    // 删除最后一个节点
    if (parentOfLast.right === lastNode) {
      parentOfLast.right = null;
    } else {
      parentOfLast.left = null;
    }
  }
}

// 示例用法
const tree = new BinaryTree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
console.log(JSON.stringify(tree, null, 2));
tree.delete(2);
console.log(JSON.stringify(tree, null, 2));
