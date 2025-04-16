# 红黑树的形式化表示

红黑树是一种自平衡二叉查找树，满足以下性质：

1. 每个节点要么是红色，要么是黑色。
2. 根节点是黑色。
3. 每个叶子节点（NIL，空节点）是黑色。
4. 如果一个节点是红色，则其子节点必须是黑色（即红色节点不能有红色子节点）。
5. 从任一节点到其所有后代叶子节点的简单路径上，均包含相同数目的黑色节点。

## 形式化定义（伪代码）

```text
RedBlackTree = (T, root, NIL)
T: 节点集合
每个节点 x 包含:
  x.color ∈ {RED, BLACK}
  x.left, x.right, x.parent ∈ T ∪ {NIL}
  x.key: 可比较的键值

性质:
1. root.color == BLACK
2. NIL.color == BLACK
3. ∀x ∈ T, 若 x.color == RED, 则 x.left.color == BLACK 且 x.right.color == BLACK
4. ∀x ∈ T, 从 x 到所有后代 NIL 的路径上，黑色节点数相同
```