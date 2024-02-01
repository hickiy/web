// Dijkstra 算法
// 列出此算法的核心思路注释
// 1. 找到距离起点最近的节点
// 2. 更新其邻居节点的距离
// 3. 重复这个过程，直到所有节点都被处理过
// 4. 计算最终路径
// 5. 返回最终结果
// 6. 代码实现
function dijkstra(graph, start) {
  let distances = {};
  let visited = {};
  let predecessors = {};

  // 初始化
  for (let vertex in graph) {
    distances[vertex] = Infinity;
    predecessors[vertex] = null;
  }
  distances[start] = 0;

  while (true) {
    let shortestDistance = Infinity;
    let shortestVertex = null;

    // 找到未访问的节点中距离最短的节点
    for (let vertex in distances) {
      if (distances[vertex] < shortestDistance && !visited[vertex]) {
        shortestDistance = distances[vertex];
        shortestVertex = vertex;
      }
    }

    // 如果没有找到节点，说明所有节点都已访问
    if (shortestVertex === null) {
      break;
    }

    // 标记节点为已访问
    visited[shortestVertex] = true;

    // 更新邻居节点的距离
    for (let neighbor in graph[shortestVertex]) {
      let distance = shortestDistance + graph[shortestVertex][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        predecessors[neighbor] = shortestVertex;
      }
    }
  }

  return { distances, predecessors };
}