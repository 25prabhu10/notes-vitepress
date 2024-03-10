---
title: Linked List
description: Linked List
---

# Linked List

A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations (unlike arrays) instead, each element points to the next using pointers.

![singly-linked-list](./singly-linked-list.svg)

Linked list is a linear collection of data elements, whose order is not given by their physical placement in memory. Instead, each element points to the next.

- They are used when the **size of elements is not known or may increase**.

- As the memory location of each element is not known beforehand, it is very difficult to find the element. To find an element we need to start from the first element, get the address of the next element and so on, till the element is found.

- Access time is linear (random access, is not feasible)

Advantages of arrays:

- Collection of same data-types

- All elements of array are stored in the contiguous memory locations

- Random Access `O(1)`: Array is a random access data structure. Any element of array can be accessed in just one statement

- Easy to implement algorithms

Problems with arrays:

- Fixed size

- Elements must of same data type

- Insertion and deletion operations are costly as elements are shifted one position ahead or back

- _C_ doesn't perform any array index bound checking. For an array of size n we can write to n+5th element with getting error (based on compiler) and also if we access elements from outside of array boundaries, we get garbage value (based on compiler we get error).

To overcome the issues with arrays, we can use Linked list.

Types of Linked List:

- [Singly Linked List](#singly-linked-list)
- [Circular Linked List](#circular-linked-list)
- [Doubly Linked List](#doubly-linked-list)

## Singly Linked List

Singly Linked List contain nodes which have two parts:

1. Data field(s): Data of any data-type

2. Link (pointer): An address field (usually named next) of type pointer. It will store the address of next node.

### Operations

- **Traversal**: access each element of the linked list
- **Insertion**: adds a new element to the linked list
- **Deletion**: removes the existing elements
- **Search**: find a node in the linked list
- **Sort**: sort the nodes of the linked list

### Creating Linked List

1. Create the first node with some data and an empty link, which is set to either `NULL` or `0` (0 is an invalid address) (created in Heap).

2. Create a pointer called head (you can call it anything) which will store the address of the first node (created in Stack). This also can be interpreted as the name of the Linked list as it is the only identity of the Linked list we keep track of.

3. Create the next node in the same way as Step-1 and link the first node to this new node

4. Continue this process to create a Linked list of n elements.

In C/C++ `struct` is used to create a node (class can be used in C++). A `struct` that contains pointer of its own type is called Self referential structure.

```c
struct Node
{
    int data;
    struct Node *next;
};

```

C++:

```cpp
// struct can also be used
class Node
{
public:
    int data;
    Node *next;
};
```

Python:

```python
# Node class
class Node:

    def __init__(self, data):
        self.data = data
        self.next = None

# Linked list class
class LinkedList:

    def __init__(self):
        self.head = None
```

C#:

```csharp
class LinkedList {
    Node head;

    class Node {
        int data;
        Node next;

        Node(int d) { data = d; }
    }
}
```

JavaScript:

```javascript
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
```

Create Linked List:

```c
struct Node
{
    int data;
    struct Node *next;
} *head = NULL;

void create_linked_list(int A[], int n)
{
    int i;
    struct Node *temp, *last;

    head = (struct Node *)malloc(sizeof(struct Node));
    head->data = A[0];
    head->next = NULL;

    last = head;

    for (i = 1; i < n; i++)
    {
        temp = (struct Node *)malloc(sizeof(struct Node));
        temp->data = A[i];
        temp->next = NULL;
        last->next = temp;
        last = temp;
    }
}

int main()
{
    int A[] = {10, 11, 15, 15, 20, 20, 20, 25};

    create_linked_list(A, 8);

    return 0;
}
```

Print Linked List:

```c
void print_list()   //  pass head if head is not global
{
    struct Node *n = head;

    while (n != NULL)
    {
        printf("%d ", n->data);
        n = n->next;
    }
}
```

Recursive:

```c
void print_list_recursive(struct Node *n)
{
    if (n != NULL)
    {
        printf("%d", n->data);
        print_list_recursive(n->next);
    }
}

print_list_recursive(head);
```

## Circular Linked List

A Linked List where the address of the last node consists of the address of the first node.

- The last element is linked to the first element. This forms a circular loop.

### Traverse CLL

```c
void print_list()
{
    struct Node *n = head;

    do
    {
        printf("%d ", n->data);
        n = n->next;

    }while (n != head);
}
```

Recursive:

```c
void print_list_recursive(struct Node *n)
{
    static int flag = 0;

    if (n != head || flag == 0)
    {
        flag = 1;

        printf("%d", n->data);
        print_list_recursive(n->next);
    }

    flag = 0;
}

print_list_recursive(head);
```

## Doubly Linked List

A Doubly Linked List is a linked data structure that consists of a set of sequentially linked records called nodes.

- Each node contains two fields, called links, that are references to the previous and to the next node in the sequence of nodes.

- The two node links allow traversal of the list in either direction.

```c
struct Node
{
    struct Node *prev;
    int data;
    struct Node *next;
};
```

JavaScript:

```javascript
class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}
```

## Performance

Time Complexity:

| Operation     |     Array      |  Linked List   |
| ------------- | :------------: | :------------: |
| Access        |   **`O(1)`**   |     `O(n)`     |
| Insert first  |     `O(n)`     |   **`O(1)`**   |
| Insert middle |     `O(n)`     |     `O(n)`     |
| Insert last   |   **`O(1)`**   |     `O(n)`     |
| Linear Search |     `O(n)`     |     `O(n)`     |
| Binary Search | **`O(log n)`** | `O(n x log n)` |
| Deletion      |     `O(n)`     |   **`O(1)`**   |

- Insertion Sort
- Merge Sort

Space Complexity:

- `O(n)`

## Issues

- Segmentation faults
- Memory leaks
