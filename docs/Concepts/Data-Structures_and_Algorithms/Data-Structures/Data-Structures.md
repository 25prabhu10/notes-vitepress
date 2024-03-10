---
title: Data Structures
description: A data structure is a particular way of organizing data in a computer.
---

# Data Structures

A **data structure is a data organization, management, and storage format** that enables efficient access and modification.

A data structure is a way to store and organize data in order to facilitate access and modifications. No single data structure works well for all purposes, and so it is important to know the strengths and limitations of several of them.

- Data can always be represented in many different ways. However, depending on:

  - what that data is and what you need to do with it,

  - one representation will be a better choice than the others

Data-structures can be envisioned as:

1. Mathematical / Logical models / Abstract data-types (ABTs): Define data and operations but no implementation details. Abstract view.

   - _Example:_ An abstract data-type: _List_

     - Store a given number of elements of a given data-type
     - Write/Modify elements at a position (index)
     - Read elements by position (index)

2. Implementation: Concrete implementation

   - _Example:_ For the above mentioned _List_ ABT, it can be implemented using:

     - Arrays
     - Linked Lists

## Introduction

There are two types of Data structures:

1. Physical: They define how the **data is arranged** in memory

   - [Arrays](./Arrays.md): Fixed length, Can be created in Stack or Heap memory

   - [Linked List](./Linked_List.md): Variable length, Created in Heap memory

   - Matrices

2. Logical: They define how the **data can be utilized**

   - Linear Data Structures:

     - [**Stack**](./Stack.md) (LIFO)
     - [**Queues**](./Queue.md) (FIFO)

   - Non-Linear Data Structures:

     - [**Tress**](./Trees.md)
     - [**Graph**](./Graph.md)

   - Tabular (linear/non-linear):

     - [**Hash Table**](./Hash_Table.md)

## Stack vs Heap

1. _Stack Memory_ is also known as **Static Memory**, as the size is fixed and known during compile time.

2. _Heap Memory_ is known as **Dynamic Memory**, as the size is known only during run time?

- Memory is divided into a small addressable unit known as a _byte_
- Large size memory will be divided into _segments_, usually of _64Kb_

_Stack memory allocation:_

1. The program is copied into the _code section_ of the memory

2. All the variables will have memory allocation in **Stack Frame or Activation Record** of the function which is part of the Stack section of the memory

3. The main function will have the first Stack Frame inside the Stack Memory. The functions called by the main function will occupy the second Stack Frame and hence subsequent function's activation record will be saved as a Stack. Organized memory

4. The Stack Frame of each function will be deleted once the function execution completes

5. The memory allocation and de-allocation is handled, user dose not need to manage it

_Heap memory:_

- Memory stored as a heap (placed haphazardly on top of each other)

- Used as a resource

- Programs cannot directly access Heap memory, to access it we use [Pointers](./C-Cpp_Concepts.md#pointers)

- Memory allocation and de-allocation in Heap must be handled by the user

- If the allocated memory is not released, then it will keep occupying space even when it is not needed. Then eventually the memory will be full and it will cause loss of memory (memory leak)

## Common Data Structure Operations

| Data Structure     |   Access    |   Search    |  Insertion  |  Deletion   |   Access    |   Search    |  Insertion  |  Deletion   | Space Complexity |
| ------------------ | :---------: | :---------: | :---------: | :---------: | :---------: | :---------: | :---------: | :---------: | :--------------: |
| Array              |   `Θ(1)`    |   `Θ(n)`    |   `Θ(n)`    |   `Θ(n)`    |   `O(1)`    |   `O(n)`    |   `O(n)`    |   `O(n)`    |      `O(n)`      |
| Stack              |   `Θ(n)`    |   `Θ(n)`    |   `Θ(1)`    |   `Θ(1)`    |   `O(n)`    |   `O(n)`    |   `O(1)`    |   `O(1)`    |      `O(n)`      |
| Queue              |   `Θ(n)`    |   `Θ(n)`    |   `Θ(1)`    |   `Θ(1)`    |   `O(n)`    |   `O(n)`    |   `O(1)`    |   `O(1)`    |      `O(n)`      |
| Singly-Linked List |   `Θ(n)`    |   `Θ(n)`    |   `Θ(1)`    |   `Θ(1)`    |   `O(n)`    |   `O(n)`    |   `O(1)`    |   `O(1)`    |      `O(n)`      |
| Doubly-Linked List |   `Θ(n)`    |   `Θ(n)`    |   `Θ(1)`    |   `Θ(1)`    |   `O(n)`    |   `O(n)`    |   `O(1)`    |   `O(1)`    |      `O(n)`      |
| Skip List          | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` |   `O(n)`    |   `O(n)`    |   `O(n)`    |   `O(n)`    |  `O(n log(n))`   |
| Hash Table         |    `N/A`    |   `Θ(1)`    |   `Θ(1)`    |   `Θ(1)`    |    `N/A`    |   `O(n)`    |   `O(n)`    |   `O(n)`    |      `O(n)`      |
| Binary Search Tree | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` |   `O(n)`    |   `O(n)`    |   `O(n)`    |   `O(n)`    |      `O(n)`      |
| Cartesian Tree     |    `N/A`    | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` |    `N/A`    |   `O(n)`    |   `O(n)`    |   `O(n)`    |      `O(n)`      |
| B-Tree             | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `O(log(n))` | `O(log(n))` | `O(log(n))` | `O(log(n))` |      `O(n)`      |
| Red-Black Tree     | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `O(log(n))` | `O(log(n))` | `O(log(n))` | `O(log(n))` |      `O(n)`      |
| Splay Tree         |    `N/A`    | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` |    `N/A`    | `O(log(n))` | `O(log(n))` | `O(log(n))` |      `O(n)`      |
| AVL Tree           | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `O(log(n))` | `O(log(n))` | `O(log(n))` | `O(log(n))` |      `O(n)`      |
| KD Tree            | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` | `Θ(log(n))` |   `O(n)`    |   `O(n)`    |   `O(n)`    |   `O(n)`    |      `O(n)`      |

Array Sorting Algorithms:

| Algorithm      |     Best      |     Average      |      Worst       | Space Complexity |
| -------------- | :-----------: | :--------------: | :--------------: | :--------------: |
| Quicksort      | `Ω(n log(n))` |  `Θ(n log(n))`   |     `O(n^2)`     |   `O(log(n))`    |
| Mergesort      | `Ω(n log(n))` |  `Θ(n log(n))`   |  `O(n log(n))`   |      `O(n)`      |
| Timsort        |    `Ω(n)`     |  `Θ(n log(n))`   |  `O(n log(n))`   |      `O(n)`      |
| Heapsort       | `Ω(n log(n))` |  `Θ(n log(n))`   |  `O(n log(n))`   |      `O(1)`      |
| Bubble Sort    |    `Ω(n)`     |     `Θ(n^2)`     |     `O(n^2)`     |      `O(1)`      |
| Insertion Sort |    `Ω(n)`     |     `Θ(n^2)`     |     `O(n^2)`     |      `O(1)`      |
| Selection Sort |   `Ω(n^2)`    |     `Θ(n^2)`     |     `O(n^2)`     |      `O(1)`      |
| Tree Sort      | `Ω(n log(n))` |  `Θ(n log(n))`   |     `O(n^2)`     |      `O(n)`      |
| Shell Sort     | `Ω(n log(n))` | `Θ(n(log(n))^2)` | `O(n(log(n))^2)` |      `O(1)`      |
| Bucket Sort    |   `Ω(n+k)`    |     `Θ(n+k)`     |     `O(n^2)`     |      `O(n)`      |
| Radix Sort     |    `Ω(nk)`    |     `Θ(nk)`      |     `O(nk)`      |     `O(n+k)`     |
| Counting Sort  |   `Ω(n+k)`    |     `Θ(n+k)`     |     `O(n+k)`     |      `O(k)`      |
| Cubesort       |    `Ω(n)`     |  `Θ(n log(n))`   |  `O(n log(n))`   |      `O(n)`      |

## References

1. [Udemy - Data Structures](https://tcsglobal.udemy.com/course/datastructurescncpp/learn/lecture/13319372#overview)

2. [Coursera - Data Structures](https://www.coursera.org/learn/data-structures)

3. [Udemy - Data Structures and Algorithms](https://tcsglobal.udemy.com/course/learn-data-structure-algorithms-with-java-interview/learn/lecture/13778082#overview)

4. [Topcoder - The importance of algorithms](https://www.topcoder.com/community/competitive-programming/tutorials/the-importance-of-algorithms/)
