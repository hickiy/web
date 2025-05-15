# 最大堆的形式化描述与工作原理

## 形式化描述

最大堆（Max Heap）是一种完全二叉树，满足以下性质：

- 设堆中某个节点的值为 `A[i]`，其左子节点为 `A[2i+1]`，右子节点为 `A[2i+2]`。
- 对于堆中的每个非叶子节点 `i`，都有 `A[i] ≥ A[2i+1]` 且 `A[i] ≥ A[2i+2]`（若子节点存在）。
- 堆的根节点（`A[0]`）是所有元素中的最大值。

## 工作原理

1. **插入操作**  
  新元素插入到堆的末尾，然后通过“上浮”操作（与父节点比较并交换）恢复堆性质。

2. **删除最大值（堆顶）**  
  将堆顶元素与最后一个元素交换，移除末尾元素，然后通过“下沉”操作（与较大的子节点比较并交换）恢复堆性质。

3. **堆化（Heapify）**  
  对一个无序数组自底向上进行下沉操作，将其调整为最大堆。

## 伪代码示例

```text
MAX-HEAPIFY(A, i):
   l = 2i + 1
   r = 2i + 2
   largest = i
   if l < heap_size and A[l] > A[largest]:
      largest = l
   if r < heap_size and A[r] > A[largest]:
      largest = r
   if largest != i:
      swap A[i] and A[largest]
      MAX-HEAPIFY(A, largest)
```
