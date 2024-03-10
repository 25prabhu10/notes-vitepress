---
title: Queue
description: Queue
---

# Queue

A Queue is an abstract data type that serves as a collection of elements, with two main principal operations:

1. **Enqueue**: Which adds an element to the collection

2. **Dequeue**: Which removes the most recently added element that was not yet removed

**FIFO**: _First-in First-out_ it is the order in which elements are pushed and popped.

- Similar to a real life queue, new element is inserted at the rear end of the queue and an element is only removed at the front end of the queue.

_Queue representation:_ :)

```c
//       |   |--> out
//       | 4 |
//       | 6 |
//       | . |
//       | . |
//       | . |
//       | 9 |
//       | 7 |
// in -->|   |
```

Types of Queues:

- [Simple Queue](#simple-queue)
- [Circular Queue](#circular-queue)
- [Priority Queue](#priority-queue)
- [Double Ended Queue (Deque)](#double-ended-queue-deque)

## Simple Queue

Data:

- Space for storing elements
- **Front pointer**: for deletion
- **Rear pointer**: for Insertion

Operations:

- **Enqueue**: Add an element to the end of the queue
- **Dequeue**: Remove an element from the front of the queue
- **IsEmpty**: Check if the queue is empty
- **Peek**: Get the value of the front of the queue without removing it
- IsFull: Check if the queue is full
- Last: check the last element

The queue can be implemented using:

- [Arrays](#arrays)
- [Linked List](#linked-list)

### Arrays

1. Queues using single pointer:

   - New element will be inserted at the rare: Operation `O(1)`
   - Element will be removed from the front `A[0]` and all the remaining elements will be shifted to one position lower i.e. `A[i] = A[i + 1]`: Operation `O(n)`

   _Example:_

   ```c
   struct Queue
   {
       int size;
       int rear;
       int *A;
   };

   void Display(struct Queue queue)
   {
       int i;

       for (i = 0; i <= queue.rear; i++)
           printf("%d ", queue.A[i]);
   }

   void Enqueue(struct Queue *queue, int x)
   {
       if (queue->rear >= queue->size - 1)
           printf("Stack-overflow!!!");

       queue->rear++;
       queue->A[queue->rear] = x;
   }

   int Dequeue(struct Queue *queue)
   {
       int x, i;

       if (queue->rear < 0)
       {
           printf("Stack-underflow!!!");
           return -1;
       }

       x = queue->A[0];

       for (i = 0; i < queue->rear; i++)
           queue->A[i] = queue->A[i + 1];

       queue->A[i] = 0;
       queue->rear--;

       return x;
   }

   int isEmpty(struct Queue *queue)
   {
       return queue->rear == -1;
   }

   int isFull(struct Queue *queue)
   {
       return queue->rear == queue->size - 1;
   }
   ```

2. Queues using two pointer:

   - New element will be inserted at the rare: Operation `O(1)`
   - An element deletion will remove the first element: Operation `O(1)`

   _Example:_

   ```c
   struct Queue
   {
       int size;
       int front;
       int rear;
       int *A;
   };

   void Display(struct Queue queue)
   {
       int i;

       for (i = queue.front + 1; i <= queue.rear; i++)
           printf("%d \n", queue.A[i]);
   }

   void Enqueue(struct Queue *queue, int x)
   {
       if (queue->rear >= queue->size - 1)
           printf("Stack-overflow!!!");

       queue->rear++;
       queue->A[queue->rear] = x;
   }

   int Dequeue(struct Queue *queue)
   {
       int x;

       if (queue->rear == queue->front)
       {
           printf("Stack-underflow!!!");
           return -1;
       }

       queue->front++;

       x = queue->A[queue->front];
       queue->A[queue->front] = 0;

       return x;
   }

   int isEmpty(struct Queue *queue)
   {
       return queue->rear == queue->front;
   }

   int isFull(struct Queue *queue)
   {
       return queue->rear == queue->size - 1;
   }
   ```

Drawbacks of using Arrays:

- If rare of the Queue is at the last element and front is larger than 0 that means that array has some empty space at the start. So, even though there the array has empty space we cannot add new elements as `rare == size` and new elements are added from the rare.
- Every space in an array is only used once.

Workaround:

- **Resetting Pointers**: While dequeueing if front and rear are same then reset both and make them `-1`. Not always front and rear are equal, hence this method is good only when all elements are deleted.

- **[Circular Queue](#circular-queue)**

### Linked List

### Complexity

Array Based:

- Enqueue and Dequeue: `O(1)`

### Applications

- CPU Scheduling, Disk Scheduling

- Data Synchronization

### Limitations

- After few enqueue and dequeue operations, the size of the queue is reduced

- Only after reset, full size of the queue can be utilized

## Circular Queue

In a circular queue, the last element points to the first element making a circular link.

- Front and rear move in a circular way and array is not circular.

Advantages of Simple Queue:

- Better memory utilization

### CQ Implementation

```c
#include <stdio.h>

#define SIZE 5

int items[SIZE];
int front = -1, rear = -1;

// Check if the queue is full
int isFull() {
  if ((front == rear + 1) || (front == 0 && rear == SIZE - 1)) return 1;
  return 0;
}

// Check if the queue is empty
int isEmpty() {
  if (front == -1) return 1;
  return 0;
}

// Adding an element
void enQueue(int element) {
  if (isFull())
    printf("\n Queue is full!! \n");
  else {
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    items[rear] = element;
    printf("\n Inserted -> %d", element);
  }
}

// Removing an element
int deQueue() {
  int element;
  if (isEmpty()) {
    printf("\n Queue is empty !! \n");
    return (-1);
  } else {
    element = items[front];
    if (front == rear) {
      front = -1;
      rear = -1;
    }
    // Q has only one element, so we reset the
    // queue after dequeing it. ?
    else {
      front = (front + 1) % SIZE;
    }
    printf("\n Deleted element -> %d \n", element);
    return (element);
  }
}

// Display the queue
void display() {
  int i;
  if (isEmpty())
    printf(" \n Empty Queue\n");
  else {
    printf("\n Front -> %d ", front);
    printf("\n Items -> ");
    for (i = front; i != rear; i = (i + 1) % SIZE) {
      printf("%d ", items[i]);
    }
    printf("%d ", items[i]);
    printf("\n Rear -> %d \n", rear);
  }
}

int main() {
  // Fails because front = -1
  deQueue();

  enQueue(1);
  enQueue(2);
  enQueue(3);
  enQueue(4);
  enQueue(5);

  // Fails to enqueue because front == 0 && rear == SIZE - 1
  enQueue(6);

  display();
  deQueue();

  display();

  enQueue(7);
  display();

  // Fails to enqueue because front == rear + 1
  enQueue(8);

  return 0;
}
```

### CQ Complexity

Array Based:

- Enqueue and Dequeue: `O(1)`

### CQ Applications

- CPU scheduling
- Memory management
- Traffic Management

## Double Ended Queue (Deque)

Deque or Double Ended Queue is a type of queue in which insertion and removal of elements can either be performed from the front or the rear.

- It **strictly doesn't follow FIFO**. FIFO can be used
- **Both front and rear** can be **used for insertion and deletion**

| Operation | Queue | DEQueue |
| --------- | ----- | ------- |
| Insert    | rear  | Both    |
| Delete    | front | Both    |

Variants of DEQueue:

1. **Input Restricted**: Insertion can only happen from rear

   |       | Insert | Delete |
   | ----- | ------ | ------ |
   | front | -      | Y      |
   | rear  | Y      | Y      |

2. **Output Restricted**: Deletion can only happen from front

   |       | Insert | Delete |
   | ----- | ------ | ------ |
   | front | Y      | Y      |
   | rear  | Y      | -      |

Implementation:

```c
#include <stdio.h>

#define MAX 10

void addFront(int *, int, int *, int *);
void addRear(int *, int, int *, int *);
int delFront(int *, int *, int *);
int delRear(int *, int *, int *);
void display(int *);
int count(int *);

int main() {
  int arr[MAX];
  int front, rear, i, n;

  front = rear = -1;
  for (i = 0; i < MAX; i++)
    arr[i] = 0;

  addRear(arr, 5, &front, &rear);
  addFront(arr, 12, &front, &rear);
  addRear(arr, 11, &front, &rear);
  addFront(arr, 5, &front, &rear);
  addRear(arr, 6, &front, &rear);
  addFront(arr, 8, &front, &rear);

  printf("\nElements in a deque: ");
  display(arr);

  i = delFront(arr, &front, &rear);
  printf("\nremoved item: %d", i);

  printf("\nElements in a deque after deletion: ");
  display(arr);

  addRear(arr, 16, &front, &rear);
  addRear(arr, 7, &front, &rear);

  printf("\nElements in a deque after addition: ");
  display(arr);

  i = delRear(arr, &front, &rear);
  printf("\nremoved item: %d", i);

  printf("\nElements in a deque after deletion: ");
  display(arr);

  n = count(arr);
  printf("\nTotal number of elements in deque: %d", n);
}

void addFront(int *arr, int item, int *pfront, int *prear) {
  int i, k, c;

  if (*pfront == 0 && *prear == MAX - 1) {
    printf("\nDeque is full.\n");
    return;
  }

  if (*pfront == -1) {
    *pfront = *prear = 0;
    arr[*pfront] = item;
    return;
  }

  if (*prear != MAX - 1) {
    c = count(arr);
    k = *prear + 1;
    for (i = 1; i <= c; i++) {
      arr[k] = arr[k - 1];
      k--;
    }
    arr[k] = item;
    *pfront = k;
    (*prear)++;
  } else {
    (*pfront)--;
    arr[*pfront] = item;
  }
}

void addRear(int *arr, int item, int *pfront, int *prear) {
  int i, k;

  if (*pfront == 0 && *prear == MAX - 1) {
    printf("\nDeque is full.\n");
    return;
  }

  if (*pfront == -1) {
    *prear = *pfront = 0;
    arr[*prear] = item;
    return;
  }

  if (*prear == MAX - 1) {
    k = *pfront - 1;
    for (i = *pfront - 1; i < *prear; i++) {
      k = i;
      if (k == MAX - 1)
        arr[k] = 0;
      else
        arr[k] = arr[i + 1];
    }
    (*prear)--;
    (*pfront)--;
  }
  (*prear)++;
  arr[*prear] = item;
}

int delFront(int *arr, int *pfront, int *prear) {
  int item;

  if (*pfront == -1) {
    printf("\nDeque is empty.\n");
    return 0;
  }

  item = arr[*pfront];
  arr[*pfront] = 0;

  if (*pfront == *prear)
    *pfront = *prear = -1;
  else
    (*pfront)++;

  return item;
}

int delRear(int *arr, int *pfront, int *prear) {
  int item;

  if (*pfront == -1) {
    printf("\nDeque is empty.\n");
    return 0;
  }

  item = arr[*prear];
  arr[*prear] = 0;
  (*prear)--;
  if (*prear == -1)
    *pfront = -1;
  return item;
}

void display(int *arr) {
  int i;

  printf("\n front:  ");
  for (i = 0; i < MAX; i++)
    printf("  %d", arr[i]);
  printf("  :rear");
}

int count(int *arr) {
  int c = 0, i;

  for (i = 0; i < MAX; i++) {
    if (arr[i] != 0)
      c++;
  }
  return c;
}
```

### Deque Complexity

- `O(1)`

### Deque Applications

- In undo operations on software
- To store history in browsers
- For implementing both [stacks](./Stack.md) and [queues](#queue)

## Priority Queue

A priority queue is **a special type of queue** in which each element is associated with a **priority value**.

- Elements are served on the basis of their priority

- That is, **higher priority elements are served first**

- If two elements have the **same priority**, they are served according to their **order in the queue**.

- Assigning Priority Value

1. Limited set of Priorities:

   - Useful in OS

2. Element Priority

   - Two ways:

     - Insert in same order as they come and delete max-priority by search: Operation: Insert - `O(1)`, Delete - `O(n)`

     - Insert in increasing/decreasing order of Priority and Delete last/first element: Operation: Insert - `O(n)`, Delete - `O(1)`

Implementation:

- [Heap](./Heap.md) data structure provides an efficient implementation of priority queues.

```c
#include <stdio.h>

int size = 0;

void swap(int *a, int *b) {
  int temp = *b;
  *b = *a;
  *a = temp;
}

// Function to heapify the tree
void heapify(int array[], int size, int i) {
  if (size == 1) {
    printf("Single element in the heap");
  } else {
    // Find the largest among root, left child and right child
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < size && array[l] > array[largest])
      largest = l;
    if (r < size && array[r] > array[largest])
      largest = r;

    // Swap and continue heapifying if root is not largest
    if (largest != i) {
      swap(&array[i], &array[largest]);
      heapify(array, size, largest);
    }
  }
}

// Function to insert an element into the tree
void insert(int array[], int newNum) {
  if (size == 0) {
    array[0] = newNum;
    size += 1;
  } else {
    array[size] = newNum;
    size += 1;
    for (int i = size / 2 - 1; i >= 0; i--) {
      heapify(array, size, i);
    }
  }
}

// Function to delete an element from the tree
void deleteRoot(int array[], int num) {
  int i;
  for (i = 0; i < size; i++) {
    if (num == array[i])
      break;
  }

  swap(&array[i], &array[size - 1]);
  size -= 1;
  for (int i = size / 2 - 1; i >= 0; i--) {
    heapify(array, size, i);
  }
}

// Print the array
void printArray(int array[], int size) {
  for (int i = 0; i < size; ++i)
    printf("%d ", array[i]);
  printf("\n");
}

// Driver code
int main() {
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

### PQ Complexity

| Operations         | peek   | insert     | delete     |
| ------------------ | ------ | ---------- | ---------- |
| Linked List        | `O(1)` | `O(n)`     | `O(1)`     |
| Binary Heap        | `O(1)` | `O(log n)` | `O(log n)` |
| Binary Search Tree | `O(1)` | `O(log n)` | `O(log n)` |

### PQ Applications

- Dijkstra's Shortest Path algorithm

- Anytime you need to dynamically fetch the 'next best' or 'next worst' element

- Used in Huffman Coding (which is often used for lossless data compression)

- Best First Search (BFS) algorithms such as _A\* search algorithm_ use PQs to continuously grab the next most promising node

- Used by Minimum Spanning Tree (MST) algorithms

- For implementing stack

- For load balancing and interrupt handling in an operating system

## Implementing Queue Using Stack
