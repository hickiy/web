/**
 * 二分查找树
 */
class Tree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value > this.value) {
      if (!this.right) this.right = new Tree(value);
      else this.right.insert(value);
    } else if (!this.left) this.left = new Tree(value);
    else this.left.insert(value);
  }

  contains(value) {
    if (value === this.value) return true;
    if (value < this.value) {
      if (!this.left) return false;
      return this.left.contains(value);
    }
    if (!this.right) return false;
    return this.right.contains(value);
  }

  depthTraverse(cb) {
    if (this.left) {
      this.left.depthTraverse(cb);
    }
    if (this.right) {
      this.right.depthTraverse(cb);
    }
    cb(this.value);
  }
  breadthTraverse(cb) {
    const quequ = [this];
    while (quequ.length) {
      const root = quequ.shift();
      cb(root.value);
      if (root.left) {
        quequ.push(root.left);
      } else if (root.right) {
        quequ.push(root.right);
      }
    }
  }

  getMinValue() {
    return this.left ? this.left.getMinValue() : this.value;
  }

  gitMaxValue() {
    return this.right ? this.right.gitMaxValue() : this.value;
  }
}

const tree = new Tree(10);

tree.insert(5);
tree.insert(15);
tree.insert(4);
tree.insert(6);
tree.insert(14);
tree.insert(16);
global.console.log(tree);
tree.depthTraverse(console.log);
