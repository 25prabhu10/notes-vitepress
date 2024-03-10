---
title: C++
description: It is a general-purpose computer programming language created as an extension of the C
---

# C++

Main function can be used without `return` statement. It by default includes `return 0`

- Think operators as functions like: `cout << "Hello" << endl;` as `cout.print("Hello).print(endl);`

## Compiling and Linking

- C++ programs consist of **source files** and **headers**.

  - Source files and headers are usually text files, but need not be.

- Much of the text in C++ source and header files represents **declarations**

  - The declarations establish the existence of **entities** such as functions, namespaces, objects, templates, types, and values

- C++ has no specific rules about which declarations must go into source files and which must go into headers

- For a function, we typically:

  - `declare` it in a header, and...
  - `define` it in a corresponding source file

- However, for a function that's inline, `constexpr`, or `consteval`, then:
  - `define` it in a header file

Steps:

1. Pre-processor: Initial stage. They copy and paste all the code from the header file.

   - Header files (they don't get compiled)

2. Compilation: Compiler transforms to machine code.

   - Solution Configuration: Rules and configurations to build the project
   - Solution Platforms: Platform that is being targeted

   - Only CPP files are complied not Header files
   - Every CPP file is complied individually into a respective Object file

   - Liker: Stitches all these Object file into an executable file
   - Compiler compiles a CPP file if it only contains function declaration without and definition and is used inside that file.
   - CPP files are called Translation Units (Files have no meaning to CPP Compiler)

   - Use `-E` to Pre-process output

Headers and Namespaces:

- Pre-processor statements:

  - `#pragma once`: Include only once

- Namespace:

  ```cpp
  // sum.h
  #pragma once

  namespace customSum {
      int sum(int a, int b);
  }

  // sum.cpp
  namespace customSum {
      int sum(int a, int b)
      {
        return a + b;
      }
  }


  // Main file
  #include "sum.h"

  int main()
  {
      cout << customSum::sum(10, 20);

      return 0;
  }
  ```

Dynamic type using `auto`

Maps are like JavaScript objects.

## Arrays

```cpp
#include <iostream>
#include <stdio.h>

using namespace std;

int main()
{
    int A[5] = {1, 5, 5};

    for (int i = 0; i < 5; i++)
    {
        cout << A[i] << endl;
    }

    // FOR EACH LOOP
    for (int x : A)
    {
        cout << x << endl;
    }

    cout << sizeof(int) << endl;
    cout << sizeof(A) << endl;
    printf("Completed");

    return 0;
}
```

- Size of an array can be dynamically provided, but during declaration the items cannot be initialized.

```cpp
int main()
{
    int n;
    cout << "Enter size";
    cin >> n;
    int A[n];

    return 0;
}
```

::: warning NOTE
Only in new C compiler dynamic size declaration is available.
:::

## Header Files

- Mathematical Programming
- Logical Programming

## Visual Studio

- New project --> Empty Project

## Virtual Functions

- Dynamic Dispatch
- V Table

Pure Virtual Functions are similar to Interface or Abstract Class.
