---
title: Heap (data-structure)
description: A complete Binary Tree
---

# Heap (data-structure)

A heap is a specialized [tree](./Trees.md)-based data structure which is essentially an almost complete Binary Tree that satisfies the **heap property** described below:

- In a _min heap_, if `P` is a parent node of `C`, then the key (the value) of P is less than or equal to the key of `C`.

- In a _max heap_, the key of `P` is greater than or equal to the key of `C`

In other words, where any given node is:

- **always greater than its child node/s** and the key of the root node is the largest among all other nodes. This property is also called **max heap property**

- **always smaller than the child node/s** and the key of the root node is the smallest among all other nodes. This property is also called **min heap property**

- Duplicates are allowed

- In-place replacement

- We can only delete root node

## Operations

**Heapify**: is the process of creating a heap data structure from a binary tree.

- It is used to create a _Min-Heap_ or a _Max-Heap_.

1. Create a binary tree from an array

2. Start from the first index of non-leaf node whose index is given by `n/2 - 1`

3. Set current element `i` as `largest`

4. The index of left child is given by `2i + 1` and the right child is given by `2i + 2`

   - If `leftChild` is greater than `currentElement` (i.e. element at ith index), set `leftChildIndex` as largest

   - If `rightChild` is greater than element in `largest`, set `rightChildIndex` as largest

5. Swap `largest` with `currentElement`

6. Repeat steps 2-6 until the subtrees are also heapified.

## Implementation

Array:

- `Arr[(index - 1) / 2]`: Returns the parent node
- `Arr[(2 * index) + 1]`: Returns the left child node
- `Arr[(2 * index) + 2]`: Returns the right child node

Node:

```c
#include <stdio.h>

int size = 0;

void swap(int *a, int *b)
{
  int temp = *b;
  *b = *a;
  *a = temp;
}

void heapify(int array[], int size, int i)
{
  if (size == 1)
  {
    printf("Single element in the heap");
  }
  else
  {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < size && array[l] > array[largest])
      largest = l;
    if (r < size && array[r] > array[largest])
      largest = r;
    if (largest != i)
    {
      swap(&array[i], &array[largest]);
      heapify(array, size, largest);
    }
  }
}

void insert(int array[], int newNum)
{
  if (size == 0)
  {
    array[0] = newNum;
    size += 1;
  }
  else
  {
    array[size] = newNum;
    size += 1;
    for (int i = size / 2 - 1; i >= 0; i--)
    {
      heapify(array, size, i);
    }
  }
}

void deleteRoot(int array[], int num)
{
  int i;
  for (i = 0; i < size; i++)
  {
    if (num == array[i])
      break;
  }

  swap(&array[i], &array[size - 1]);
  size -= 1;
  for (int i = size / 2 - 1; i >= 0; i--)
  {
    heapify(array, size, i);
  }
}

void printArray(int array[], int size)
{
  for (int i = 0; i < size; ++i)
    printf("%d ", array[i]);
  printf("\n");
}

int main()
{
  int array[10];

  insert(array, 3);
  insert(array, 4);
  insert(array, 9);
  insert(array, 5);
  insert(array, 2);

  printf("Max-Heap array: ");
  printArray(array, size);

  deleteRoot(array, 4);

  printf("After deleting an element: ");

  printArray(array, size);
}
```

## Applications

- Heap is used while implementing a [priority queue](./Queue.md#priority-queue)

- Dijkstra's Shortest Path algorithm

- [Heap Sort](../Algorithms/Sorting_Algorithms.md#heap-sort)
