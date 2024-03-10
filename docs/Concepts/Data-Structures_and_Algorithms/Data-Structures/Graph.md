---
title: Graph
description: A collection of nodes that have data and are connected to other nodes
---

# Graph

A collection of nodes that have data and are connected to other nodes

A graph is a data structure (V, E) that consists of:

- A collection of vertices (V) or Nodes
- A collection of edges (E), represented as ordered pairs of vertices (u,v)

## Graph Terminology

- **Adjacency**: A vertex is said to be adjacent to another vertex if there is an edge connecting them

- **Path**: A sequence of edges that allows you to go from vertex A to vertex B is called a path

- **Directed Graph**: A graph in which an edge (u,v) doesn't necessarily mean that there is an edge (v, u) as well. The edges in such a graph are represented by arrows to show the direction of the edge

- Undirected graph
- Neighbor

## Graph Representation

Graphs are commonly represented in 2 ways:

1. Adjacency Matrix: An adjacency matrix is a 2D array of `V x V` vertices. Each row and column represent a vertex

   - If the value of any element `a[i][j]` is `1`, it represents that there is an edge connecting vertex `i` and vertex `j`

   - Edge lookup(checking if an edge exists between vertex A and vertex B) is extremely fast. You can check if node `i` is adjacent to node `j` in **`O(1)` steps**

   - **Requires more `O(n²)` space**

   - Getting all adjacent nodes to node `i` takes `O(n)` steps

   ```javascript
   // |   | 1 | 2 | 3 | 4 |
   // |---|---|---|---|---|
   // | 1 | 0 | 1 | 1 | 0 |
   // | 2 | 0 | 0 | 1 | 1 |
   // | 3 | 0 | 0 | 0 | 0 |
   // | 4 | 0 | 0 | 1 | 0 |
   const adjacencyMatrix = [
     [false, true, true, false],
     [false, false, true, true],
     [false, false, false, false],
     [false, false, true, false],
   ];
   ```

2. **Adjacency List**: An adjacency list represents a graph as an array of linked lists

   - The index of the array represents a vertex and each element in its linked list represents the other vertices that form an edge with the vertex

   - An adjacency list is efficient in terms of storage **(consumes `O(n+e)` space)** because we only need to store the values for the edges

   - You can check if node `i` is adjacent to node `j` in `O(n)` (but it is also possible in `O(1)` depending on the implementation)

   - Getting all nodes adjacent to node `i` takes `O(1)` steps

   ```javascript
   // 1 -> [2, 3]
   // 2 -> [3, 4]
   // 3 -> []
   // 4 -> [3]
   const adjacencyList = new Map();

   adjacencyList.set(1, new Set([2, 3]));
   adjacencyList.set(2, new Set([3, 4]));
   adjacencyList.set(3, new Set());
   adjacencyList.set(4, new Set([3]));
   ```

## Traversal Algorithms

1. Breath first search (BFS): The graph is first explored in depth and then in breadth

   - Using Queue

   - Best for finding all possible routes, then use it to find the most efficient

   ```javascript
   // using queue
   const bfs = (startNode) => {
     const visited = new Set();
     const queue = [];

     queue.push(startNode);
     visited.add(startNode);

     while (queue.length > 0) {
       const currentNode = queue.shift();
       // visit(currentNode);

       for (let neighbour of adjacencyList.get(currentNode)) {
         if (!visited.has(neighbour)) {
           queue.push(neighbour);
           visited.add(neighbour);
         }
       }
     }
   };
   ```

2. Depth first search (DFS): The graph is first explored in breadth and then in depth

   - Using Stack

   - Fastest way to find a route

   ```javascript
   // using recursion (call stack)
   const visited = new Set();

   const dfs = (node) => {
     // visit(node);
     visited.add(node);

     for (let neighbour of adjacencyList.get(node)) {
       if (!visited.has(neighbour)) {
         dfs(neighbour);
       }
     }
   };
   ```

- Both `O(v+e)` hence `O(n)`

- Refere: [BFS and DFS in JavaScript](https://betterprogramming.pub/basic-interview-data-structures-in-javascript-graphs-3f9118aeb078)

## Dijkstra's Algorithm

```javascript
const dijkstra = (startNode, stopNode) => {
  const distances = new Map();
  const previous = new Map();

  const remaining = createPriorityQueue((n) => distances.get(n));

  for (let node of adjacencyList.keys()) {
    distances.set(node, Number.MAX_VALUE);
    remaining.insert(node);
  }

  distances.set(startNode, 0);

  while (!remaining.isEmpty()) {
    const n = remaining.extractMin();

    for (let neighbour of adjacencyList.get(n)) {
      const newPathLength =
        distances.get(n) + edgeWeights.get(n).get(neighbour);
      const oldPathLength = distances.get(neighbour);

      if (newPathLength < oldPathLength) {
        distances.set(neighbour, newPathLength);
        previous.set(neighbour, n);
      }
    }
  }

  return { distance: distances.get(stopNode), path: previous };
};
```

## Connected and Disconnected

A graph is called **connected** if there is a path between any pair of nodes, otherwise it is called **disconnected**. If it is disconnected it means that it contains some sort of isolated nodes

## Performance

- `n`: number of nodes
- `e`: number of edges

Time: `O(e)`
Space: `O(n)`

or

- `n`: number of nodes
- `n^2`: number of edges

Time: `O(n^2)`
Space: `O(n)`
