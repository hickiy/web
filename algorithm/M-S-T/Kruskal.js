// Kruskal's Algorithm for Minimum Spanning Tree (MST)


/**
 * DisjointSet (Union-Find) data structure for efficient set management.
 * 
 * Supports union and find operations with path compression and union by rank.
 * Commonly used in algorithms like Kruskal's Minimum Spanning Tree.
 * 
 * @class
 * @example
 * const ds = new DisjointSet(5);
 * ds.union(0, 1);
 * ds.union(1, 2);
 * ds.find(2); // returns the representative of the set containing 2
 */
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(u) {
    if (this.parent[u] !== u) {
      this.parent[u] = this.find(this.parent[u]);
    }
    return this.parent[u];
  }

  union(u, v) {
    let pu = this.find(u);
    let pv = this.find(v);
    if (pu === pv) return false;
    if (this.rank[pu] < this.rank[pv]) {
      this.parent[pu] = pv;
    } else if (this.rank[pu] > this.rank[pv]) {
      this.parent[pv] = pu;
    } else {
      this.parent[pv] = pu;
      this.rank[pu]++;
    }
    return true;
  }
}

/**
 * Kruskal's algorithm to find MST
 * @param {number} n - number of vertices
 * @param {Array} edges - [u, v, weight]
 * @returns {Array} - MST edges
 */
function kruskalMST(n, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  const ds = new DisjointSet(n);
  const mst = [];
  for (const [u, v, w] of edges) {
    if (ds.union(u, v)) {
      mst.push([u, v, w]);
      if (mst.length === n - 1) break;
    }
  }
  return mst;
}

// Example usage:
const n = 4; // number of vertices
// 所有无向边的组合应为 C(4,2) = 6 种
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 2, 8],
  [1, 3, 15],
  [2, 3, 4]
];

const mst = kruskalMST(n, edges);
console.log("MST edges:", mst);