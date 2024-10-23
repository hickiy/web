// Bellman-Ford 算法
// 列出此算法的核心思路注释
// 1. 初始化
// 2. 对每个边进行 V-1 次松弛操作
// 3. 检查负权重环
// 4. 返回最终结果
// 5. 代码实现
function bellmanFord(graph, start) {
  let distances = {};
  let predecessors = {};

  // 初始化
  for (let vertex in graph) {
    distances[vertex] = Infinity;
    predecessors[vertex] = null;
  }
  distances[start] = 0;

  // 对每个边进行 V-1 次松弛操作
  for (let i = 0; i < Object.keys(graph).length - 1; i++) {
    for (let vertex in graph) {
      for (let neighbor in graph[vertex]) {
        let distance = distances[vertex] + graph[vertex][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          predecessors[neighbor] = vertex;
        }
      }
    }
  }

  // 检查负权重环
  for (let vertex in graph) {
    for (let neighbor in graph[vertex]) {
      if (distances[vertex] + graph[vertex][neighbor] < distances[neighbor]) {
        throw new Error('Graph contains a negative-weight cycle');
      }
    }
  }

  return { distances, predecessors };
}