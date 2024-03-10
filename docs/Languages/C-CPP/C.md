---
title: C
description: It is a general-purpose, procedural computer programming language.
---

# C

C is a general-purpose, procedural computer programming language

- C is a strongly-typed, weakly checked language

_Example:_

```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!");
}
```

## A Historical Perspective

- `www.cc4e.com` refers to `cc` command which stands for C Compiler

## Data Types

### Arrays

_Definition:_ Contiguous area of memory consisting of equal-size elements

- Declared with size inside square brackets `[]`

- It can be declared without size, but in this case it must be initialized with items. The size of the array will be equal to the number of items

- If number of items are less than the declared size of an array, the rest of the places will be filled with `0`

- If an array is declared and never initialized then it will contain garbage values

_Example:_

```c
#include <stdio.h>

int main()
{
    int A[5] = {1, 2, 3, 4, 5};
    int B[] = {1, 2, 3};        // SIZE 3
    int C[5] = {1, 2, 3};       // {1,2,3,0,0}
    int D[2];                   // {3213, 234324}

    for (int i = 0; i < 5; i++)
    {
        printf("%d\n", A[i]);
    }
    printf("Completed");

    return 0;
}
```

## Code Styles

```c
// Allman
while (x == y)
{
  func1();
  func2();
}

// Kernighan & Ritchie
while (x == y) {
  func1();
  func2();
}

// GNU
while (x == y)
  {
    func1 ();
    func2 ();
  }

// Whitesmiths
while (x == y)
    {
    func1();
    func2();
    }

// Horstmann
while (x == y)
{
  func1();
  func2();
}

// Haskell style
while (x == y)
  { func1()
  ; func2()
  ;
  }

// Ratliff style
while (x == y) {
    func1();
    func2();
    }

// Lisp style
while (x == y)
  { func1();
    func2(); }
```

## Memory Leaks

```c
#include <stdlib.h>
#include <string.h>


```

## References

- (C - book)[https://flaviocopes.com/book/c/]
