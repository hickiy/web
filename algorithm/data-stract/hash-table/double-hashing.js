/**
 * HashTable implementation using open addressing with double hashing (二次hash).
 * 支持基本的 set, get, delete 操作。
 */

class HashTable {
  constructor(size = 101) {
    this.size = size; // 哈希表容量，建议为质数
    this.table = new Array(size);
    this.count = 0;
  }

  // 主哈希函数
  _hash1(key) {
    let hash = 0;
    const strKey = String(key);
    for (let i = 0; i < strKey.length; i++) {
      hash = (31 * hash + strKey.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  // 二次哈希函数，必须保证返回值不为0
  _hash2(key) {
    let hash = 0;
    const strKey = String(key);
    for (let i = 0; i < strKey.length; i++) {
      hash = (37 * hash + strKey.charCodeAt(i)) % this.size;
    }
    // 保证步长不为0
    return (hash % (this.size - 1)) + 1;
  }

  // 插入或更新键值对
  set(key, value) {
    if (this.count >= this.size * 0.7) {
      throw new Error('HashTable is full or load factor too high.');
    }
    let idx = this._hash1(key);
    const step = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const probeIdx = (idx + i * step) % this.size;
      const entry = this.table[probeIdx];
      if (!entry || entry.deleted || entry.key === key) {
        this.table[probeIdx] = { key, value, deleted: false };
        if (!entry || entry.deleted) this.count++;
        return;
      }
    }
    throw new Error('HashTable is full.');
  }

  // 获取键对应的值
  get(key) {
    let idx = this._hash1(key);
    const step = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const probeIdx = (idx + i * step) % this.size;
      const entry = this.table[probeIdx];
      if (!entry) return undefined;
      if (!entry.deleted && entry.key === key) {
        return entry.value;
      }
    }
    return undefined;
  }

  // 删除键值对
  delete(key) {
    let idx = this._hash1(key);
    const step = this._hash2(key);

    for (let i = 0; i < this.size; i++) {
      const probeIdx = (idx + i * step) % this.size;
      const entry = this.table[probeIdx];
      if (!entry) return false;
      if (!entry.deleted && entry.key === key) {
        entry.deleted = true;
        this.count--;
        return true;
      }
    }
    return false;
  }
}

// 示例用法
const ht = new HashTable();
ht.set('foo', 123);
ht.set('bar', 456);
console.log(ht.get('foo')); // 123
ht.delete('foo');
console.log(ht.get('foo')); // undefined
