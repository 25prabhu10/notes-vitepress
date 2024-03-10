# Key Words

1. **Predicate Functions**: are functions that return a single TRUE or FALSE

2. **Turing Complete**, **Church-Turing Thesis**: Something is "computable" if and only if it can be computed by a **Turing machine**

   - Conditional branching, as a result it should have the ability to jump ("go to")
   - Arbitrary amount of memory (infinite RAM)

3. **Race Condition**: occurs when two or more threads can access shared data and they try to change it at the same time

   - Because the thread scheduling algorithm can swap between threads at any time, you don't know the order in which the threads will attempt to access the shared data

   - Therefore, the result of the change in data is dependent on the thread scheduling algorithm, i.e. both threads are **"racing" to access/change the data**

   - Pure functions can help in avoiding race condition issues

4. Working set overflow: The "working set" is short hand for "parts of memory that the current algorithm is using" and is determined by which parts of memory the CPU just happens to access

5. P95 Latency (P% Latency): The P95 Threshold indicates that 5% of transaction durations are greater than the threshold. For example, if the P95 threshold is 50 milliseconds, then 5% of transactions exceeded that threshold, taking longer than 50 milliseconds

6. Software Rot

7. Use-After-Free (UAF) is a vulnerability related to incorrect use of dynamic memory during program operation

8. Write-what-where Condition: Any condition where the attacker has the ability to write an arbitrary value to an arbitrary location, often as the result of a buffer overflow.

9. Global Offset Table (GOT): is a section of a computer program's (executables and shared libraries) memory used to enable computer program code compiled as an ELF file to run correctly, independent of the memory address where the program's code or data is loaded at runtime.

RAII (Resource acquisition is initialization)

Semantic Versioning:

- Major.Minor.Patch release
- Caret (^): All minor and patches OK (^1.x.x)
- Tilde (~): All patches only (~1.5.x)

## Floating Point Numbers

_IEEE 754_: Floating point number specification

- It is a compression algorithm

| Bits      | Precision           |
| --------- | ------------------- |
| _16 bit_  | Half Precision      |
| _32 bit_  | Single Precision    |
| _64 bit_  | Double Precision    |
| _128 bit_ | Quadruple Precision |
| _256 bit_ | Octuple Precision   |

Floating point numbers in 16 Bit System:

The floating point number's binary representation is split into 3-parts:

1. _Sign (1 Bit)_:

   - Number is Positive or Negative

2. _Exponent (5 Bits)_:

   - Represents a range

   | Exponent (`n`) | Power Range (`2^n`) | Numerical Range |
   | :------------: | :-----------------: | :-------------: |
   |       0        |       [0, 1]        |     [1, 2]      |
   |       1        |       [1, 2]        |     [2, 4]      |
   |       2        |       [2, 3]        |     [4, 8]      |
   |       3        |       [3, 4]        |     [8, 16]     |
   |       4        |       [4, 5]        |    [16, 32]     |

3. _Mantissa (10 Bits)_:

   - `(Number - lower bound) / (upper bound - lower bound)`

Formal that represents a floating point number: **`N = (-1)^sign * 1.mantissa * 2^(exponent - 15)`**

According to IEEE 754 spec:

- `-0` if _`sign=1`_, _`exponent=00000`_, and _`mantissa=0000000000`_

- `INFINITY` if _`exponent=11111`_ and _`mantissa=0000000000`_

  - `-INFINITY` if _`sign=1`_

- `NaN` if _`exponent=11111`_ and _`mantissa=someValue`_

  - There are man `NaN`

- `2^0`: de-normalized number

References:

- [Floating Point Arithmetic](https://en.wikipedia.org/wiki/Floating-point_arithmetic)

- [16 Bit Floats](https://en.wikipedia.org/wiki/Half-precision_floating-point_format)

- [IEEE 754 Spec](https://ieeexplore.ieee.org/document/30711)

- [Fabien Sanglard's awesome blog on the subject](https://fabiensanglard.net/floating_point_visually_explained/)

- [Denormalised Numbers](https://en.wikipedia.org/wiki/Denormal_number)

- [Low Level JavaScript: Github Repo](https://github.com/LowLevelJavaScript/Floating-Point-Implemented-In-JS)
