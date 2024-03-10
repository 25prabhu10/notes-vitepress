---
title: Tree
description: Tree
---

# Tree

A tree is a widely used abstract data type (ADT) that represents a hierarchical tree structure with a set of connected nodes.

Subcategories:

- [Binary trees](#binary-tree)
- Decision trees
- [Heaps](./Heap.md) (data structures)
- R-tree
- Search trees

## Terminology

1. **Node**: A structure which may contain data and connections to other nodes, sometimes called **edges** or **links**

2. **Child**: Each node in a tree has zero or more **child nodes**

3. **Parent**: A node that has a child

4. **Root**: All nodes have exactly one parent, except the topmost **root node**

5. **Neighbor**: Parent or child

6. **Ancestors**: A node might have many **ancestor nodes**, such as the parent's parent

   - A node reachable by repeated proceeding from child to parent

7. **Descendants**: A node reachable by repeated proceeding from parent to child. Also known as **subchild**

8. **Siblings**: Child nodes with the same parent

9. **Internal node**: Any node of a tree **that has child nodes** (also known as an _inner node_, _inode_ for short, or _branch node_)

10. **External node**: Any node that **does not have child nodes** (also known as an _outer node_, **leaf node**, or _terminal node_)

11. **Degree**: For a given node, its number of children. A leaf has necessarily degree zero.

12. **Degree of tree**: The degree of a tree is the maximum degree of a node in the tree.

13. **Distance**: The number of edges along the shortest path between two nodes

14. **Height**: The height of a node is the length of the longest downward path to a leaf from that node

15. **Depth**: The depth of a node is the length of the path to its root

16. **Levels**: The level of a node is the number of edges along the unique path between it and the root node.

    - This is the same as depth when using zero-based counting.

17. **Width**: The number of nodes in a level

18. **Forest**: A set of one or more disjoint trees.

19. **Breadth**: The number of leaves

20. **Size of a tree**: Number of nodes in the tree

21. **Subtree**: Each non-root node can be treated as the root node of its own subtree

## Binary Tree

A Binary Tree is a tree with degree of node _2_

- Every node can have a maximum 2 children
- It can have **0, 1, or 2 children**

### Number Of Binary Tress

1. For Unnamed Nodes the number of Binary Tress that can be generated using `n` Node is calculated using _Catalan Number_:

   - `T(n) = (2nCn)/(n + 1)`

     - `T(3) = 5`
     - `T(4) = 14`
     - `T(5) = 42`

   - `T(n) = [(i=1) SUMATION n] T(i - 1) * T(n - i)`

   - Number of Binary Tress with Max height containing `n` Node: `2^n-1`

2. For Named Nodes the number of Binary Tress that can be generated using `n` Node is calculated using:

   - `T(n) = ((2nCn)/(n + 1)) * n!`

### Height vs Nodes Of Binary Tree

- For Height `h` the:

  - Min number of Nodes required: `min(n) = h + 1`
  - Max number of Nodes required: `max(n) = 2^(h + 1) - 1` (Sum of G-P Series with `a=1` and `r=2`)

- For `n` Nodes the:

  - Min Height: `min(n) = (log2 (n + 1)) - 1`
  - Max Height: `max(h) = n - 1`

- Relation between Degrees:
  - `deg(0) = deg(2) + 1`

### Strict / Proper / Complete Binary Tree

A Binary Tree is a Strict Binary Tree if every node has either degree 0 or 2. Should not contain nodes with degree 1 (node with 1 child).

### Height vs Nodes

- For Height `h` the:

  - Min number of Nodes required: `min(n) = (2 * h) + 1`
  - Max number of Nodes required: `max(n) = 2^(h + 1) - 1` (Sum of G-P Series with `a=1` and `r=2`)

- For `n` Nodes the:

  - Min Height: `min(h) = (log2 (n + 1)) - 1`
  - Max Height: `max(h) = (n - 1)/2`

- External Binary Nodes to Internal Binary Nodes: `e = i + 1`

### Array Representation

### Linked List Representation

### Full vs Complete Binary Tree

### Strict vs Complete Binary Tree

## Tree Traversal

Tree traversing means visiting all the nodes.

1. Pre-order (VLR):

   - Visit (node)
   - Pre-order (left sub-tree)
   - Pre-order (right sub-tree)

2. In-order (LVR):

   - In-order (left sub-tree)
   - Visit (node)
   - In-order (right sub-tree)

3. Post-order (LRV):

   - Post-order (left sub-tree)
   - Post-order (right sub-tree)
   - Visit (node)

4. Level-Order: Level by Level

Generating Tree if Traversal is provided:

1. If only Pre-order or In-order or Post-order is provided: Not possible to reproduce

2. If only Pre-order and Post-order are provided: Not possible to reproduce

3. If only Pre-order and In-order or Post-order and In-order are provided: It is **possible to reproduce**

## Binary Search Tree (BST)

- No Duplicates
- In-order Traversal will give sorted order
- Number of BST for `n` nodes: `(2nCn)/(n+1)`
- Usually represented using Doubly Linked List
- In-Order traversal is preferred

Drawbacks of Binary Search Tree:

- No control over the height of the BST as it depends on the order of input.

- It can become unbalanced easily

## AVL Tree

Height balanced Binary Search Tress.

It uses balance factor to balance the height:

- balance factor = height of left subtree - height of right subtree
- Balance factor is calculated at each node
- The balance factor must be any one of these: `{ -1, 0 1 }`
- `bf = |hl - hr| <= 1` it is balanced
- If `bf = |hl - hr| > 1` then it is imbalanced

### Rotations At the time on insertion

1. LL - Rotation
2. RR - Rotation
3. LR - Rotation
4. RL - Rotation

### Generating AVL Tree

### Deletion

1. L1 - Rotation --> (LL Rotation)
2. L-1 - Rotation --> (LR Rotation)
3. L0 - Rotation --> (LL or LR Rotation)
4. R1 - Rotation --> (RR Rotation)
5. R-1 - Rotation --> (RL Rotation)
6. R0 - Rotation --> (RR or RL Rotation)

### Height vs Nodes of AVL Tree

- For Height `h` the if `h` starts from 1:

  - Min number of Nodes required: (Fibonacci Series)

    - For 0: 0
    - For 1: 1
    - For >1: `min(n) = min(h - 2) + min(h - 1) + 1`

  - Max number of Nodes required: `max(n) = 2^h - 1` (Sum of G-P Series with `a=1` and `r=2`)

- For `n` Nodes the:

  - Min Height: `min(h) = log2 (n + 1)`
  - Max Height: `max(h) = 1.44 log2 (n + 2)`

- External Binary Nodes to Internal Binary Nodes: `e = i + 1`

## 2 - 3 Trees

- Multiway Search Tree (m-way)
- Degree 3
- Height Balanced Tree (B-tree)
- All leaf nodes at same level
- Every node must have `n/2` children
- No duplicates

- B Trees or B+ Trees
- Used largely in DBMS

### Height vs Nodes Of 2-3 Trees

- For Height `h` the if `h` starts from 1:

  - Min number of Nodes required: `max(n) = 2^(h + 1) - 1`
  - Max number of Nodes required: `max(n) = (3^(h + 1) - 1)/2`

- For `n` Nodes the:

  - Min Height: `min(h) = (log2 (n - 1)) - 1`
  - Max Height: `max(h) = (log3 (2n + 1)) - 1`

- External Binary Nodes to Internal Binary Nodes: `e = i + 1`

## 2 - 3 - 4 Trees

- B-Tree of degree = 4
- Every node must have `n/2 = 4/2 = 2` children
- All leaf at same level

- Can be split as Left biased or Right biased if even number of keys are present

## Red - Black Trees

- Its a height balanced Binary Search Tree
- Every node is either **Red** or **Black**
- Root of a Tree is Black
- NULL is also Black
- Number of Blacks on Paths from Root to leaf are same
- No 2 consecutive Red, Parent and Children of Red are Black
- New Inserted Node is Red
- Height in `log n <= h <= 2 * log n`

- Re-colour if Red-Red conflict where Parent and Uncle are Red
- Do Zig-Zig (LL/RR) or Zig-Zag (LR/RL) Rotation if Red-Red conflict where Parent is Red and Uncle are Black

## N-Array Tree

### Strict N-Array Tree

#### Height vs Nodes Of Strict N-Array Tree

- For Height `h` with degree `m` the:

  - Min number of Nodes required: `min(n) = (m * h) + 1`
  - Max number of Nodes required: `max(n) = (m^(h + 1) - 1)/(m - 1)` (Sum of G-P Series with `a=1` and `r=m`)

- For `n` Nodes with degree `m` the:

  - Min Height: `min(h) = logm [n(m - 1) + 1] - 1`
  - Max Height: `max(h) = (n - 1)/m`

- External Binary Nodes to Internal Binary Nodes with degree `m`: `e = (m - 1)*i + 1`
