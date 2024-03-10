---
title: Recursion
description: Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.
---

# Recursion

Recursion is when a function calls itself.

Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem. Such problems can generally be solved by iteration, but this needs to identify and index the smaller instances at programming time.

Lets us look at two approaches to find a key present in one of the boxes (arranged in _Matryoshka Dolls_ manner).

1. First approach uses `while` loop:

   ```python
   def look_for_key(main_box):
       pile = main_box.make_a_pile_to_look_through()
       while pile is not empty:
           box = pile.grab_a_box()
           for item in box:
               if item.is_a_box():
                   pile.append(item)
               elif item.is_a_key():
                   return "Found the key!"
   ```

2. Second way uses _Recursion_:

   ```python
   def look_for_key(box):
       for item in box:
           if item.is_a_box():
               # Recursion!
               look_for_key(item)
           elif item.is_a_key():
               return "Found the key!"
   ```

When a recursive function is written, we need to tell it to stop recursing.
That's why _every recursive function has two parts: the base case, and the recursive case_.

- The recursive case is when the function calls itself.
- The base case is when the function doesn't call itself (stop).

Recursive functions use the _call stack_ to keep track of function calls and function related variables.

```python
# Factorial Function
def factorial(x):
    # Base case
    if x == 1:
        return 1
    # Recursive case
    else:
        return x * factorial(x - 1)
```

- If written incorrectly recursive function results in **infinite loop**.

- Generally recursion is **less efficient than iteration (loops)**.

- Recursive algorithms tend to be **very efficient when traversing tree like data structures**

Using the stack takes up a lot of memory.

- Rewrite the code to use loop instead, to save space.
- Or use something called [_tail recursion_](#types-of-recursion). Which is only supported by some languages.

> Quote by Leigh CaldWell on [Stack Overflow](http://stackoverflow.com/a/72694/139117)

::: warning NOTE
**Excessive Recursion**: When a recursive function calls itself multiple times for the same parameters.
:::

## Tracing Tree of Recursive Function

- Ascending Phase

  - Loops only has ascending phase

- Descending Phase

- Time complexity: _O(n)_
- Recurrence Relation:
  - Induction method or successive substitution method

Global vs Static Variable:

- They behave in the same way such as they are initialized once and the only case where they have default value as 0.

- Global variable has global (that file) scope.

- Static variable are scoped where they are initialized

## Types of recursion

1. **Tail Recursion**: When the function calls itself and there are no operations performed after the function call. No operation will be performed during descending phase, not even doing something to the result of the function like `func(n-1) + n`.

   _Example:_

   ```c
   void func(int n)
   {
   if (n > 0)
   {
       printf("%d\n", n);
       func(n - 1); // NO OTHER OPERATION IS PERFORMED AFTER FUNCTION CALL
   }
   }

   func(3);

   // OUTPUT:
   // 3
   // 2
   // 1
   ```

   The above recursion can be written as loop:

   ```c
   void func(int n)
   {
   while (n > 0)
   {
       printf("%d\n", n);
       n--;
   }
   }

   func(3);

   // OUTPUT:
   // 3
   // 2
   // 1
   ```

   | Type             | Time Complexity | Space Complexity                                                           |
   | ---------------- | --------------- | -------------------------------------------------------------------------- |
   | Tail Recursion   | `O(n)`          | `O(n)` - Creates a new function activation record for each recursion       |
   | Loop (while/for) | `O(n)`          | `O(1)` - Only one activation record of the function that contains the loop |

   From the above table we can see that space complexity of Tail recursion is higher than loops, hence we can use loops instead of Tail recursion.

   > Some compilers convert tail recursion into loops during compilation

2. **Head Recursion**: When the function calls itself and there are no operations performed before the function call. No operation will be performed during ascending phase.

   _Example:_

   ```c
   void func(int n)
   {
   if (n > 0)
   {
       func(n - 1); // NO OTHER OPERATION IS PERFORMED BEFORE FUNCTION CALL
       printf("%d\n", n);
   }
   }

   func(3);

   // OUTPUT:
   // 1
   // 2
   // 3
   ```

   The above recursion can be written as loop (but it will be a bit different):

   ```c
   void func(int n)
   {
   int i = 1;

   while (i <= n)
   {
       printf("%d\n", i);
       i++;
   }
   }

   func(3);

   // OUTPUT:
   // 1
   // 2
   // 3
   ```

   | Type             | Time Complexity | Space Complexity                                                           |
   | ---------------- | --------------- | -------------------------------------------------------------------------- |
   | Head Recursion   | `O(n)`          | `O(n)` - Creates a new function activation record for each recursion       |
   | Loop (while/for) | `O(n)`          | `O(1)` - Only one activation record of the function that contains the loop |

   From the above table we can see that space complexity of Head recursion is higher than loops, hence we can use loops instead of Head recursion.

3. **Tree Recursion**: When the function is calling itself more than one time.

   _Example:_

   ```c
   void recursion_3_tree(int n)
   {
       if (n > 0)
       {
           printf("%d\n", n);
           recursion_3_tree(n - 1);
           recursion_3_tree(n - 1);
       }
   }

   recursion_3_tree(3);

   // OUTPUT:
   // 3
   // 2
   // 1
   // 1
   // 2
   // 1
   // 1
   ```

   | Type           | Time Complexity                                      | Space Complexity                                                         |
   | -------------- | ---------------------------------------------------- | ------------------------------------------------------------------------ |
   | Tree Recursion | O(2^n) - Sum of terms in Geometry Progression Series | O(n) - Creates and deletes function activation record for each recursion |

   - It seems to have Time Complexity of _O(m^n)_, where _n_ is the size of data and _m_ is the number of time the function calls itself.

4. **Indirect Recursion**: When function A calls function B and function B in turn calls function A. It is a cyclic recursion.

   _Example:_

   ```c
   void funcB(int n);

   void funcA(int n)
   {
       if (n > 0)
       {
           printf("%d\n", n);
           funcB(n - 1);
       }
   }

   void funcB(int n)
   {
       if (n > 1)
       {
           printf("%d\n", n);
           funcA(n / 2);
       }
   }

   funcA(20);

   // OUTPUT:
   // 20
   // 19
   // 9
   // 8
   // 4
   // 3
   // 1
   ```

5. **Nested Recursion**: When a function calls itself and passes itself as parameter. A recursive call is taking recursive call as a parameter.

   _Example:_

   ```c
   int func(int n)
   {
       if (n > 100)
       {
           printf("%d\n", n);
           return n - 10;
       }

       else
           func(func(n + 11));

       return 0;
   }

   func(95);

   // OUTPUT:
   // 106
   // 107
   // 108
   // 109
   // 110
   // 111
   // 101
   ```

::: tip REFERENCES
[Tracing Recursive Code](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/Trace.html)
:::

## Use Cases

1. Sum of first _n_ natural numbers:

   - _Using recursion:_ O(n)

     ```c
     int sum_of_first_n_numbers(int n)
     {
         if (n == 1)
             return 1;
         else
             return n + sum_of_first_n_numbers(n - 1);
     }

     printf("%d\n", sum_of_first_n_numbers(10));

     // OUTPUT:
     // 55
     ```

   - _Using equation:_ This method is better than recursion in terms of both time and space complexity. It only has to evaluate one statement. `O(1)`

     ```c
     int sum_of_first_n_numbers(int n)
     {
         return n * (n + 1) / 2;
     }

     printf("%d\n", sum_of_first_n_numbers(10));

     // OUTPUT:
     // 55
     ```

   - _Using loop:_ This method is better than recursion but not better than equation. O(n)

     ```c
     int sum_of_first_n_numbers(int n)
     {
         int i, s = 0;

         for (i = 1; i <= n; i++)
             s += i;

         return s;
     }

     printf("%d\n", sum_of_first_n_numbers(10));

     // OUTPUT:
     // 55
     ```

2. Factorial of a number:

   - _Using recursion:_

     ```c
     int factorial(int n)
     {
         if (n == 0)
             return 1;

         return n * factorial(n - 1);
     }

     printf("%d", factorial(5));

     // OUTPUT:
     // 120
     ```

   - _Using loop:_

     ```c
     int factorial(int n)
     {
         int i, fact = 1;

         for (i = 1; i <= n; i++)
             fact *= i;

         return fact;
     }

     printf("%d", factorial(5));

     // OUTPUT:
     // 120
     ```

3. Power or Exponent (m^n):

   - _Using recursion:_ O(n)

     ```c
     int power_of_m_times_n(int m, int n)
     {
         if (n == 0)
             return 1;

         return m * power_of_m_times_n(m, n - 1);
     }

     printf("%d", power_of_m_times_n(2, 10));

     // OUTPUT:
     // 1024
     ```

   - _Recursion Version-2_: Faster

     ```c
     int power_of_m_times_n(int m, int n)
     {
         if (n == 0)
             return 1;

         if (n % 2 == 0)
             return power_of_m_times_n(m * m, n / 2);

         return m * power_of_m_times_n(m * m, (n - 1) / 2);
     }

     printf("%d", power_of_m_times_n(2, 10));

     // OUTPUT:
     // 1024
     ```

   - _Using loop:_ O(n)

     ```c
     int power_of_m_times_n(int m, int n)

     {
     int i, power = 1;

         for (i = 0; i < n; i++)
             power *= m;

         return power;

     }

     printf("%d", power_of_m_times_n(2, 10));

     // OUTPUT:
     // 1024
     ```

   - _Using loop Version-2:_ O(log2 n)

     ```c
     int power_of_m_times_n(int m, int n)

     {
     int i, power = 1;

         for (i = 0; i < n; i++)
             power *= m;

         return power;

     }

     printf("%d", power_of_m_times_n(2, 10));

     // OUTPUT:
     // 1024
     ```

4. Taylor Series: Finding value of `e^x`

   - Using recursion: O(n^2)

     ```c
     int power(int x, int n)
     {
         if (n == 0)
             return 1;

         else if (n % 2 == 0)
             return power(x * x, n / 2);

         return x * power(x * x, (n - 1) / 2);
     }

     int factorial(int n)
     {
         if (n == 0)
             return 1;

         return n * factorial(n - 1);
     }

     double taylor_series(int x, int n)
     {
         static double temp = 0;

         if (n == 0)
             return 1;

         temp = (double)power(x, n) / (double)factorial(n);

         return temp + taylor_series(x, n - 1);
     }

     // ALTERNATE METHOD
     double e(int x, int n)
     {
         static double p = 1, f = 1;
         double r;

         if (n == 0)
             return 1;

         r = e(x, n - 1);
         p = p * x;
         f = f * n;

         return r + (p / f);
     }

     printf("%lf", taylor_series(2, 4));
     printf("%lf", e(2, 4));

     // OUTPUT:
     // 7.000000
     ```

   - Taylor Series using Horner's Rule: O(n)

     ```c
     // USING LOOPS
     double e(double x, double n)
     {
     double s = 1;

     for (; n > 0; n--)
         s = 1 + (x / n) * s;

     return s;
     }

     // USING RECURSION
     double e(double x, double n)
     {
     static double s = 1;

     if (n == 0)
     return s;

     s = 1 + (x / n) * s;

     return e(x, n - 1);

     }

     printf("%lf\n", e(4, 100));

     // OUTPUT:
     // 7.000000
     ```

5. Fibonacci Series:

   - Using recursion: O(2^n)

     ```c
     int fibonacci_series(int n)
     {
         if (n < 2)
             return n;

         return fibonacci_series(n - 2) + fibonacci_series(n - 1);
     }

     printf("%d", fibonacci_series(7));

     // OUTPUT:
     // 13
     ```

   - Using recursion memoization: Storing the results of the function call so that they can be utilized again when we need the same call, avoiding excessive calls. O(n)

     ```c
     int cache[10] = {[0 ... 9] = -1};

     int fibonacci_series(int n)
     {
         if (n < 2)
         {
             cache[n] = n;
             return n;
         }

         else
         {
             if (cache[n - 2] == -1)
                 cache[n - 2] = fibonacci_series(n - 2);

             if (cache[n - 1] == -1)
                 cache[n - 1] = fibonacci_series(n - 1);
         }

         cache[n] = cache[n - 2] + cache[n - 1];

         return cache[n];
     }

     printf("%d", fibonacci_series(7));

     // OUTPUT:
     // 13
     ```

   - Using loops: O(n)

     ```c
     void fibonacci_series(int n)
     {
         int x = 0, y = 1;

         for (; n >= 0; n--)
         {
             printf("%d ", x);
             x = x + y;
             y = x - y;
         }
     }

     fibonacci_series(7);

     // OUTPUT:
     // 0 1 1 2 3 5 8 13
     ```

6. Combination Formula - `nCr = n!/r!(n-r)!`: A combination is a selection of items from a set that has distinct members, such that the order of selection does not matter. A combination is a mathematical technique that determines the number of possible arrangements in a collection of items where the order of the selection does not matter. In combinations, you can select the items in any order.

   - Using recursion: Pascal's triangle

     ```c
     int combinations(int n, int r)
     {
         if (r == 0 || r == n)
             return 1;

         return combinations(n - 1, r - 1) + combinations(n - 1, r);
     }

     printf("%d", combinations(3, 2));

     // OUTPUT:
     // 3
     ```

   - Using recursion version-2:

     ```c
     int factorial(int x)
     {
         if (x == 0)
             return 1;

         return x * factorial(x - 1);
     }

     int combinations(int n, int r)
     {
         return factorial(n) / (factorial(r) * factorial(n - r));
     }

     printf("%d", combinations(3, 2));

     // OUTPUT:
     // 3
     ```

7. Tower of Hanoi:

   - Using recursion: O(2^n)

     ```c
     void TOH(int n, int A, int B, int C)
     {
         if (n > 0)
         {
             TOH(n - 1, A, C, B);
             printf("from %d to %d\n", A, C);
             TOH(n - 1, B, A, C);
         }
     }

     TOH(3, 1, 2, 3);

     // OUTPUT:
     // from 1 to 3
     // from 1 to 2
     // from 3 to 2
     // from 1 to 3
     // from 2 to 1
     // from 2 to 3
     // from 1 to 3
     ```

8. Node.js traversing filesystem:

   ```javascript
   const fs = require("fs");
   const { join } = require("path");

   const traverse = (dir) => {
     const subFolders = fs.statSync(dir).isDirectory() && fs.readdirSync(dir);

     if (subFolders) {
       console.log("👟👟👟 Traversing ", dir);

       subFolders.forEach((path) => {
         const fullPath = join(dir, path);

         traverse(fullPath); // recursive function call
       });
     }
   };

   traverse(process.cwd());
   ```
