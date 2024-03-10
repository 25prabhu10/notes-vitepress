---
title: Sorting Algorithms
description: Sorting Algorithms
lastmod: 2023-08-15
---

# Sorting Algorithms

1. [Bubble](#bubble-sort): `O(n^2)` (also known as Simple Sort)
2. [Insertion](#insertion-sort): `O(n^2)`
3. [Selection](#selection-sort): `O(n^2)`
4. [Heap Sort]: `O(n log n)`
5. [Merge Sort](#merge-sort): `O(n log n)`
6. [Quick Sort](#quick-sort): `O(n log n)`
7. [Tree Sort]: `O(n log n)`
8. [Shell Sort](#shell-sort): `O(n^(3/2))`
9. [Count Sort](#count-sort): `O(n)`
10. [Bucket/Bin Sort] : `O(n)`
11. [Radix Sort] : `O(n)`

In the above list 1-8 are called **Comparison based Sorts**, And 9-11 are called **Index based Sorts**

- Go to [Overview](#overview)

Criteria For Analysis:

1. Number of Comparisons

2. Number of Swaps

3. Adaptive: Less time to sort an already sorted list. An adaptive sorting algorithm is one that takes advantage of the existing order of the input data to improve its efficiency. If an algorithm is adaptive, it performs fewer comparisons or swaps when dealing with partially sorted data

4. Stability: A sorting algorithm is stable if it maintains the relative order of equal elements in the sorted output as they were in the original input. In other words, if you have two equal elements A and B, and A appears before B in the input, a stable sorting algorithm will ensure that A still appears before B in the sorted output

5. Extra Memory

## Bubble Sort

It is also known as **Simple Sort**

Bubble Sort is a straightforward sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted

**Steps**:

1. Start with an unsorted list of elements

2. Compare the first element with the second element. If the first element is greater than the second element, swap them

3. Move to the next pair of elements (second and third) and repeat step 2

4. Continue this process for all adjacent pairs of elements in the list, comparing and swapping as necessary. After the first pass, the largest element will have "bubbled up" to the end of the list

5. Repeat steps 2-4 for a total of n-1 passes, where n is the number of elements in the list. On each pass, the largest unsorted element will move to the end of the list

6. After completing all passes, the list will be sorted

_Pseudocode_:

```text
procedure bubbleSort(list)
    n = length(list)
    for i from 0 to n - 1
        for j from 0 to n - i - 2
            if list[j] > list[j + 1]
                swap(list[j], list[j + 1])
            end if
        end for
    end for
end procedure
```

_Example:_

Let's say you have an unsorted list: `[5, 2, 9, 1, 5]`

1. Pass 1: `[2, 5, 1, 5, 9]`
2. Pass 2: `[2, 1, 5, 5, 9]`
3. Pass 3: `[1, 2, 5, 5, 9]`

- After three passes, the list is sorted

For an array of size `n` at worst case:

- Number of Passes: `n-1`
- Max Number of Comparisons: `(n * (n - 1)) / 2` --> `O(n^2)`
- Max Number of Swaps: `(n * (n - 1)) / 2` --> `O(n^2)`

Time complexity:

- Best case: **`O(n)`**
- Worst case: **`O(n^2)`**

- By using a flag we can make it Adaptive
- For an Adaptive sort it will perform:

  - Comparisons: `n-1`
  - Swaps: `0`
  - Performance: `O(n)`

- Bubble sort is **Adaptive and Stable**

It can be used to get some number of elements sorted, like **finding the largest (or smallest if desc) number** in 1 pass (the last element)

_Implementations:_

```c
void Bubble_Sort(int A[], int n)
{
    int i, j, temp = 0;
    int flag;                           // For making the sort Adaptive

    for (i = 0; i < n - 1; i++)
    {
        flag = 0;

        for (j = 0; j < n - i - 1; j++)
        {
            if (A[j] > A[j + 1])
            {
                temp = A[j + 1];
                A[j + 1] = A[j];
                A[j] = temp;

                flag = 1;
            }
        }

        if (flag == 0)
            break;
    }
}
```

## Insertion Sort

Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time. It's based on the idea of iteratively inserting elements from the unsorted portion of the array into their correct positions within the sorted portion. This process continues until all elements have been inserted and the entire array becomes sorted

**Steps**:

1. Initial State: The algorithm considers the first element as the initially sorted portion and the remaining elements as the unsorted portion

2. Iterative Insertion: For each element in the unsorted portion, the algorithm compares it to the elements in the sorted portion from right to left. It finds the correct position for the element within the sorted portion by shifting larger elements to the right

3. Insertion: Once the correct position is found, the element is inserted into its place within the sorted portion

4. Repeat: Steps 2 and 3 are repeated for all remaining elements in the unsorted portion until all elements have been inserted into the sorted portion

_Pseudocode_:

```text
function insertionSort(arr):
    n = length(arr)
    for i from 1 to n-1:
        currentElement = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > currentElement:
            arr[j + 1] = arr[j]
            j = j - 1
        arr[j + 1] = currentElement
```

_Example:_

Let's say you have an unsorted list: `[5, 2, 9, 1, 5]`

1. Pass 1: `[2, 5, 9, 1, 5]`
2. Pass 2: `[2, 5, 9, 1, 5]`
3. Pass 3: `[1, 2, 5, 9, 5]`
4. Pass 4: `[1, 2, 5, 5, 9]`

For an array of size `n` at worst case:

- Number of Passes: `n-1`
- Max Number of Comparisons: `(n * (n - 1)) / 2` --> `O(n^2)`
- Max Number of Swaps: `(n * (n - 1)) / 2` --> `O(n^2)`

If the list is already sorted:

- Max Number of Comparisons: `n - 1` --> `O(n)`
- Max Number of Swaps: `0` --> `O(1)`

|                | Bubble Sort | Insertion Sort |             Cases |
| -------------- | ----------: | -------------: | ----------------: |
| Min Comparison |      `O(n)` |         `O(n)` |    Already Sorted |
| Max Comparison |    `O(n^2)` |       `O(n^2)` | Sorted in Reverse |
| Min Swap       |      `O(1)` |         `O(1)` |    Already Sorted |
| Max Swap       |    `O(n^2)` |       `O(n^2)` | Sorted in Reverse |
| Adaptive       |         Yes |            Yes |                   |
| Stable         |         Yes |            Yes |                   |
| Linked List    |           - |            Yes |                   |
| k Passes       |         Yes |             No |                   |

- Insertion Sort is particularly efficient when dealing with small arrays or partially sorted arrays, as the number of comparisons and shifts is relatively small in those cases

- It's an in-place sorting algorithm, meaning it doesn't require additional memory space proportional to the input size for sorting

- Insertion is better for Linked List than Arrays

- By **nature it is Adaptive**
- It is **Stable**

## Selection Sort

Selection sort is an _in-place comparison-based algorithm_ in which the list is divided into two parts, the sorted part at the left end and the unsorted part at the right end. Initially, the sorted part is empty and the unsorted part is the entire list

The smallest element is selected from the unsorted array and swapped with the leftmost element, and that element becomes a part of the sorted array. This process continues moving unsorted array boundary by one element to the right

**Steps**:

1. Initial State: The algorithm starts with the entire array being unsorted and an empty sorted portion

2. Find the Minimum: In each iteration, the algorithm scans the unsorted portion of the array to find the minimum (or maximum) element

3. Swap: Once the minimum (or maximum) element is found, it's swapped with the leftmost element in the unsorted portion. This effectively moves the selected element to the end of the sorted portion

4. Expand Sorted Portion: After the swap, the sorted portion grows by one element, and the unsorted portion shrinks by one element

5. Repeat: Steps 2 to 4 are repeated until the entire array is sorted. The sorted portion gradually expands while the unsorted portion shrinks until there are no more elements left in the unsorted portion

6. Final State: At the end of the process, the array is fully sorted

_Pseudocode_:

```text
function selectionSort(arr):
    n = length(arr)
    for i from 0 to n-2:  // The last element will be in the correct position after n-1 iterations
        minIndex = i
        for j from i+1 to n-1:
            if arr[j] < arr[minIndex]:
                minIndex = j
        if minIndex != i:
            swap(arr[i], arr[minIndex])
```

_Example:_

Let's say you have an unsorted list: `[5, 2, 9, 1, 5]`

1. Pass 1: Find the smallest, which is `1` and swap with left most `5`: `[1, 2, 9, 5, 5]`
2. Pass 2: `[1, 2, 9, 5, 5]`
3. Pass 3: `[1, 2, 5, 9, 5]`
4. Pass 4: `[1, 2, 5, 5, 9]`
5. Pass 5: `[1, 2, 5, 5, 9]`

- Each element is compared in every operation, with number of operations same as the number of elements. With each operation an element is moved to the new array, so one less element to be compared in the next operation. On an average, (1/2)n elements are compared for each operation. Thus, the runtime is **O(n x (1/2)n)**. But constants like _(1/2)_ are ignored in Big O. So the runtime is written as _O(n^2)_.

For an array of size `n` at worst case:

- Number of Passes: `n-1`
- Max Number of Comparisons: `(n * (n - 1)) / 2` --> `O(n^2)`
- Max Number of Swaps: `n-1` --> `O(n)`

- It is **not Stable**: does not guarantee stability. When selecting the minimum (or maximum) element to be placed in its correct position, Selection Sort doesn't consider the relative order of equal elements. As a result, if there are equal elements in the array, their order might change during the sorting process

- Is is **not Adaptive**: Its time complexity remains the same regardless of the input's initial order. It doesn't take advantage of any pre-existing order in the data. It always scans the entire unsorted portion of the array to find the minimum (or maximum) element, regardless of whether the array is partially sorted or not

- We get **smallest (or largest if desc) number after just 1 pass** (the first element)

_Implementations:_

```python
def find_smallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < smallest:
            smallest = arr[i]
            smallest_index = i
    return smallest_index

# Selection Sort
def selection_sort(arr):
    newArr = []
    for i in range(len(arr)):
        smallest = find_smallest(arr)
        newArr.append(arr.pop(smallest))
    return newArr
```

## Quick Sort

- It uses [Divide & Conquer](./Algorithms.md#divide--conquer) technique

- Partitioning procedure

- Not suited for sorted list or reverse sorted list

- _Inductive proofs_

- Randomized Quick Sort

- Selection Exchange Sort
- Partition Exchange Sort

## Merge Sort

Merge Sort is a popular comparison-based sorting algorithm that follows the [Divide & Conquer](./Algorithms.md#divide--conquer) strategy to efficiently sort an array or list of elements. It works by recursively dividing the array into smaller sub-arrays, sorting those sub-arrays, and then merging them back together to create a sorted final array

**Steps**:

1. Divide: The original array is recursively divided into smaller sub-arrays until each sub-array contains only one element or is empty

2. Conquer: The individual elements or small sub-arrays are already sorted by definition. This is the base case of the recursion

3. Merge: The sorted sub-arrays are then merged back together in a way that maintains their order. This merging process combines two sorted arrays into a single sorted array

_Pseudocode_:

```text
function mergeSort(arr):
    if length(arr) <= 1:
        return arr

    mid = length(arr) / 2

    // Divide the array into left and right sub-arrays
    left = arr[0:mid]
    right = arr[mid:end]

    // Recursively sort the left and right sub-arrays
    left = mergeSort(left)
    right = mergeSort(right)

    // Merge the sorted sub-arrays
    sortedArray = merge(left, right)
    return sortedArray

function merge(left, right):
    result = []
    leftIndex = 0
    rightIndex = 0

    while leftIndex < length(left) and rightIndex < length(right):
        if left[leftIndex] <= right[rightIndex]:
            result.append(left[leftIndex])
            leftIndex++
        else:
            result.append(right[rightIndex])
            rightIndex++

    // Add remaining elements from both arrays
    while leftIndex < length(left):
        result.append(left[leftIndex])
        leftIndex++

    while rightIndex < length(right):
        result.append(right[rightIndex])
        rightIndex++

    return result
```

Time complexity:

- Best case: **`O(n log n)`**
- Worst case: **`O(n log n)`**

Merging 2 Sorted Arrays to create a new sorted array

- `O(n log n)`

- It is **Stable**: During the merging step, when two elements are compared and inserted into the merged array, if they are equal, the element from the left sub-array is inserted before the element from the right sub-array. This maintains the relative order of equal elements, making Merge Sort a stable sorting algorithm

- It is **Adaptive**: Although its basic structure doesn't inherently take advantage of partially sorted data, its time complexity remains efficient even when dealing with partially sorted arrays. The reason is that Merge Sort always divides the array into smaller sub-arrays and eventually merges them. This merging process efficiently combines even small sorted sub-arrays into larger sorted sub-arrays. While not as inherently adaptive as algorithms like Insertion Sort, Merge Sort still performs well with partially sorted data due to its divide-and-conquer nature

## Count Sort

- Index based sorting

## Bucket/Bin Sort

## Shell Sort

Uses [Insertion Sort](#insertion-sort)

## Overview

Here's a comparison of the average-case time complexities of various sorting algorithms:

| Algorithm      | Space Complexity | Time Complexity (Worst) | Best                          | Avgerage                                               | Adaptive | Stable           |
| -------------- | ---------------- | ----------------------- | ----------------------------- | ------------------------------------------------------ | -------- | ---------------- |
| Bubble Sort    | `O(1)`           |                         |                               | `O(n^2)`                                               | Yes      | Yes              |
| Selection Sort | `O(1)`           |                         |                               | `O(n^2)`                                               | No       | No               |
| Insertion Sort | `O(1)`           |                         |                               | `O(n^2)`                                               | Yes      | Yes              |
| Merge Sort     | `O(n)`           |                         |                               | `O(n log n)`                                           | Yes      | Yes              |
| Quick Sort     | `O(log n)`       |                         |                               | `O(n log n)`                                           | No       | No (can be made) |
| Heap Sort      | `O(1)`           |                         |                               | `O(n log n)`                                           | No       | No               |
| Counting Sort  | `O(k)`           |                         |                               | `O(n + k)` (`k` = range of input values)               | No       | Yes              |
| Radix Sort     | `O(n + k)`       |                         |                               | `O(nk)` (`k` = number of digits in the maximum number) | No       | Yes              |
| Bucket Sort    | `O(n + k)`       |                         | `O(n)` (uniform distribution) | `O(n^2)`                                               | No       | Yes              |

Space Complexity:

- All `O(1)` are In-place algorithm, hence no additional space is required
- Merge sort: Requires additional space for merging sub-arrays, not in-place
- Quick Sort: Recursive algorithm, requires additional space for the call stack
- Counting Sort: Requires additional space for counting array, where `k` is the range of input values
- Radix Sort: Requires additional space for intermediate arrays, where `k` is the number of digits in the maximum number
- Bucket Sort: Requires additional space for buckets and intermediate arrays, can be high for small ranges
