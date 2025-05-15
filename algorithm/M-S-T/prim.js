/**
 * Prim's Algorithm for Minimum Spanning Tree (MST)
 * @param {number} n - Number of vertices
 * @param {Array} edges - Edge list: [u, v, weight]
 * @returns {Array} - MST edges: [u, v, weight]
 */
function prim(n, edges) {
  // Build adjacency list
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  const visited = Array(n).fill(false);
  const mst = [];
  const minHeap = new MinHeap();

  visited[0] = true;
  for (const [v, w] of adj[0]) {
    minHeap.push([w, 0, v]);
  }

  while (mst.length < n - 1 && !minHeap.isEmpty()) {
    const [w, u, v] = minHeap.pop();
    if (visited[v]) continue;
    visited[v] = true;
    mst.push([u, v, w]);
    for (const [to, weight] of adj[v]) {
      if (!visited[to]) {
        minHeap.push([weight, v, to]);
      }
    }
  }

  return mst;
}

// Simple MinHeap implementation for [weight, u, v]
class MinHeap {
  constructor() {
    this.data = [];
  }
  push(item) {
    this.data.push(item);
    this._up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 1) return this.data.pop();
    const top = this.data[0];
    this.data[0] = this.data.pop();
    this._down(0);
    return top;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p][0] <= this.data[i][0]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  _down(i) {
    const n = this.data.length;
    while (true) {
      let min = i, l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.data[l][0] < this.data[min][0]) min = l;
      if (r < n && this.data[r][0] < this.data[min][0]) min = r;
      if (min === i) break;
      [this.data[i], this.data[min]] = [this.data[min], this.data[i]];
      i = min;
    }
  }
}

// Example usage:
const n = 4;
const edges = [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 2],
    [1, 3, 1],
    [2, 3, 2]
];
console.log(prim(n, edges));