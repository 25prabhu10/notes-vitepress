---
title: Searching Algorithms
description: Searching Algorithms
---

# Searching Algorithms

## Linear Search

```java
public class Main {
  public static void main(String[] args) {
    int[] numbers = new int[] { 4, 7, 1, 9, 8, 6, 2, 0 };

    for (int num: numbers) {
      if (num == 8) {
        System.out.println(num);
        break;
      }
    }
  }
}
```

## Simple Search

Performance

- **O(n)**

Implementation:

## Binary Search

- **O(log n)**

Implementation

```python
def binary_search(list, item):
    low = 0
    high = len(list) - 1

    while low <= high:
        mid = (low + high)
        guess = list[mid]
        if guess == item:
            return mid
        elif guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return None
```

::: tip Note
Binary Search only works when the list is in **sorted order**.
:::
