# 哈希表的冲突解决方法形式化描述

## 1. 链接地址法（拉链法）

- 哈希表每个槽位存储一个链表（或其他结构）。
- 插入元素时，计算哈希值 $h(key)$，将元素插入到对应槽位的链表头部或尾部。
- 查找/删除时，先定位槽位，再在链表中顺序查找。

**公式：**
$$
\text{槽位索引} = h(key)
$$

**伪代码：**
```pseudo
function insert(key, value):
  index = h(key)
  table[index].append((key, value))

function search(key):
  index = h(key)
  for (k, v) in table[index]:
    if k == key:
      return v
  return NOT_FOUND
```

---

## 2. 线性探查法（Linear Probing）

- 给定哈希函数 $h(key)$ 和表长 $m$。
- 插入时，若槽位 $h(key)$ 被占用，则依次检查 $(h(key) + i) \bmod m$，$i=0,1,2,\ldots$，直到找到空槽。
- 查找/删除时，按同样顺序探查，直到找到目标或遇到空槽。

**公式：**
$$
\text{槽位索引}_i = (h(key) + i) \bmod m
$$

**伪代码：**
```pseudo
function insert(key, value):
  for i = 0 to m-1:
    index = (h(key) + i) mod m
    if table[index] is empty:
      table[index] = (key, value)
      return

function search(key):
  for i = 0 to m-1:
    index = (h(key) + i) mod m
    if table[index] is empty:
      return NOT_FOUND
    if table[index].key == key:
      return table[index].value
  return NOT_FOUND
```

---

## 3. 二次探查法（Quadratic Probing）

- 给定哈希函数 $h(key)$ 和表长 $m$。
- 插入时，若槽位 $h(key)$ 被占用，则依次检查 $(h(key) + c_1 i + c_2 i^2) \bmod m$，$i=0,1,2,\ldots$，$c_1, c_2$为常数。
- 查找/删除时，按同样顺序探查。

**公式：**
$$
\text{槽位索引}_i = (h(key) + c_1 i + c_2 i^2) \bmod m
$$

**伪代码：**
```pseudo
function insert(key, value):
  for i = 0 to m-1:
    index = (h(key) + c1 * i + c2 * i * i) mod m
    if table[index] is empty:
      table[index] = (key, value)
      return

function search(key):
  for i = 0 to m-1:
    index = (h(key) + c1 * i + c2 * i * i) mod m
    if table[index] is empty:
      return NOT_FOUND
    if table[index].key == key:
      return table[index].value
  return NOT_FOUND
```

---

## 4. 双重哈希法（Double Hashing）

- 给定两个哈希函数 $h_1(key)$ 和 $h_2(key)$，表长 $m$。
- 插入时，若槽位 $h_1(key)$ 被占用，则依次检查 $(h_1(key) + i \cdot h_2(key)) \bmod m$，$i=0,1,2,\ldots$。
- 查找/删除时，按同样顺序探查。

**公式：**
$$
\text{槽位索引}_i = (h_1(key) + i \cdot h_2(key)) \bmod m
$$

**伪代码：**
```pseudo
function insert(key, value):
  for i = 0 to m-1:
    index = (h1(key) + i * h2(key)) mod m
    if table[index] is empty:
      table[index] = (key, value)
      return

function search(key):
  for i = 0 to m-1:
    index = (h1(key) + i * h2(key)) mod m
    if table[index] is empty:
      return NOT_FOUND
    if table[index].key == key:
      return table[index].value
  return NOT_FOUND
```
