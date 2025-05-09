/**
 * A* (A-star) 算法实现，用于在加权图中寻找起点到终点的最短路径。
 * 该算法结合了Dijkstra算法的路径代价和启发式函数（heuristic）对目标的估计距离。
 * 启发式函数的设计对于算法性能和正确性至关重要。
 */

// 节点类，表示图中的一个点
class Node {
  constructor(id, x, y) {
    this.id = id; // 节点唯一标识
    this.x = x;   // 节点的x坐标（用于启发式函数）
    this.y = y;   // 节点的y坐标
    this.neighbors = []; // 邻居节点及边权重 [{node: Node, weight: Number}]
  }
}

// 启发式函数：估算当前节点到目标节点的距离
// 这里采用欧几里得距离作为启发式函数，适用于平面上的最短路径问题
function heuristic(nodeA, nodeB) {
  // 目标：快速估算nodeA到nodeB的距离，指导A*算法优先探索更有希望的路径
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// A*算法主函数
function aStar(startNode, goalNode) {
  // 用id作为key，避免对象引用问题
  const openSet = [startNode.id];
  const gScore = { [startNode.id]: 0 };
  const fScore = { [startNode.id]: heuristic(startNode, goalNode) };
  const cameFrom = {};

  // 节点id到Node对象的映射
  const nodeMap = {};
  function collect(node) {
    if (!nodeMap[node.id]) {
      nodeMap[node.id] = node;
      for (const { node: neighbor } of node.neighbors) {
        collect(neighbor);
      }
    }
  }
  collect(startNode);

  while (openSet.length > 0) {
    // 选择fScore最小的节点
    openSet.sort((a, b) => (fScore[a] ?? Infinity) - (fScore[b] ?? Infinity));
    const currentId = openSet.shift();
    const current = nodeMap[currentId];

    if (currentId === goalNode.id) {
      // 构造路径
      const path = [];
      let nodeId = currentId;
      while (nodeId) {
        path.unshift(nodeMap[nodeId]);
        nodeId = cameFrom[nodeId];
      }
      return path;
    }

    for (const { node: neighbor, weight } of current.neighbors) {
      const neighborId = neighbor.id;
      const tentative_gScore = (gScore[currentId] ?? Infinity) + weight;
      if (tentative_gScore < (gScore[neighborId] ?? Infinity)) {
        cameFrom[neighborId] = currentId;
        gScore[neighborId] = tentative_gScore;
        fScore[neighborId] = tentative_gScore + heuristic(neighbor, goalNode);
        if (!openSet.includes(neighborId)) {
          openSet.push(neighborId);
        }
      }
    }
  }
  return null;
}

// 示例用法
// 构建节点
const nodeA = new Node('A', 0, 0);
const nodeB = new Node('B', 1, 2);
const nodeC = new Node('C', 2, 2);
const nodeD = new Node('D', 3, 0);

// 构建边
nodeA.neighbors.push({ node: nodeB, weight: 2.2 }, { node: nodeC, weight: 3.0 });
nodeB.neighbors.push({ node: nodeC, weight: 1.0 }, { node: nodeD, weight: 2.5 });
nodeC.neighbors.push({ node: nodeD, weight: 1.2 });

// 执行A*算法
const path = aStar(nodeA, nodeD);
if (path) {
  console.log('最短路径:', path.map(n => n.id).join(' -> '));
} else {
  console.log('未找到路径');
}

/*
详细注释说明：
- 启发式函数（heuristic）用于估算当前节点到目标节点的距离，指导A*算法优先探索更有希望的路径。
- fScore = gScore + heuristic，gScore是实际代价，heuristic是估算代价。
- openSet保存待探索节点，每次选择fScore最小的节点扩展。
- cameFrom用于还原最终路径。
- 算法适用于加权有向或无向图，启发式函数需保证不高估实际距离（即满足一致性/可采纳性）。
*/