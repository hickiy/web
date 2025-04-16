import djb2Hash from '../../hash/DJB2.js';

// 使用分离链表法（链表）解决冲突的哈希表实现

// 链表节点类
class ListNode {
  constructor(key, value, next = null) {
    this.key = key;       // 键
    this.value = value;   // 值
    this.next = next;     // 指向下一个节点的指针
  }
}

class HashTable {
  constructor(size = 53) {
    // 用固定大小的数组初始化哈希表
    this.buckets = new Array(size);
    this.size = size;
  }

  // 插入或更新键值对
  set(key, value) {
    const index = djb2Hash(key, this.size);
    // 如果该桶没有链表，则创建一个
    if (!this.buckets[index]) {
      this.buckets[index] = new ListNode(key, value);
      return;
    }
    // 遍历链表查找是否存在该键
    let node = this.buckets[index];
    while (node) {
      if (node.key === key) {
        node.value = value; // 如果找到则更新值
        return;
      }
      if (!node.next) break;
      node = node.next;
    }
    // 如果未找到该键，则在链表末尾添加新节点
    node.next = new ListNode(key, value);
  }

  // 根据键获取值
  get(key) {
    const index = djb2Hash(key, this.size);
    let node = this.buckets[index];
    // 遍历该桶的链表
    while (node) {
      if (node.key === key) {
        return node.value; // 找到则返回值
      }
      node = node.next;
    }
    return undefined; // 未找到该键
  }

  // 删除键值对
  remove(key) {
    const index = djb2Hash(key, this.size);
    let node = this.buckets[index];
    let prev = null;
    // 遍历链表查找要删除的节点
    while (node) {
      if (node.key === key) {
        if (prev) {
          prev.next = node.next; // 跳过该节点
        } else {
          this.buckets[index] = node.next; // 删除头节点
        }
        return true; // 删除成功
      }
      prev = node;
      node = node.next;
    }
    return false; // 未找到该键
  }

  // 检查哈希表中是否存在某个键
  has(key) {
    return this.get(key) !== undefined;
  }

  // 获取哈希表中所有的键
  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      let node = bucket;
      while (node) {
        keys.push(node.key);
        node = node.next;
      }
    }
    return keys;
  }

  // 获取哈希表中所有的值
  values() {
    const values = [];
    for (let bucket of this.buckets) {
      let node = bucket;
      while (node) {
        values.push(node.value);
        node = node.next;
      }
    }
    return values;
  }
}

// 示例用法：
const ht = new HashTable();
ht.set('apple', 1);
ht.set('banana', 2);
ht.set('orange', 3);
console.log(ht.get('banana')); // 2
ht.remove('banana');
console.log(ht.has('banana')); // false
console.log(ht.keys()); // ['apple', 'orange']