# 最小堆的形式化描述与工作原理

## 形式化描述

最小堆（Min-Heap）是一种完全二叉树，满足以下性质：

- **结构性质**：是一棵完全二叉树（Complete Binary Tree）。
- **堆序性质**：对于任意非叶子节点 `i`，都有 `A[i] ≤ A[2i+1]` 和 `A[i] ≤ A[2i+2]`，即父节点的值小于等于其子节点的值。

通常，最小堆用数组实现，根节点下标为 0。

## 工作原理

### 插入操作

1. 将新元素插入到堆的末尾。
2. 通过“上浮”操作（heapify-up），将新元素与父节点比较并交换，直到堆序性质恢复。

### 删除最小值（堆顶）

1. 取出根节点（最小值）。
2. 用最后一个元素替换根节点。
3. 通过“下沉”操作（heapify-down），将新根与子节点比较并交换，直到堆序性质恢复。

### 伪代码示例

```text
Insert(x):
  heap.append(x)
  i = heap.size - 1
  while i > 0 and heap[parent(i)] > heap[i]:
    swap(heap[parent(i)], heap[i])
    i = parent(i)

ExtractMin():
  min = heap[0]
  heap[0] = heap[heap.size - 1]
  heap.pop()
  heapifyDown(0)
  return min
```
