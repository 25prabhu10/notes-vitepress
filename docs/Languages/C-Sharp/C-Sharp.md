---
title: C Sharp
description: C Sharp is a general-purpose, multi-paradigm programming language
---

# C Sharp

C# (C Sharp) is a general-purpose, multi-paradigm programming language encompassing:

- static typing (strongly-typed): variable types are explicitly declared
- type-safe
- lexically scoped
- imperative
- declarative
- functional
- generic
- object-oriented
- and component-oriented programming disciplines.

C# is primarily a type-safe language, meaning that instances of types can interact only through protocols they define, thereby ensuring each type's internal consistency. For instance, C# prevents you from interacting with a string type as though it were an integer type

::: tip NOTE
C# also allows parts of your code to be dynamically typed via the [dynamic](#dynamic-type) keyword. However, C# remains a predominantly statically typed language
:::

## Compilation

C# has 2-step compilation process:

1. C# source code is compiled into managed code, which is represented in **Intermediate Language (IL)** and is stored in an **assembly** (a DLL or EXE file)

   - **Roslyn compiler** is used by `dotnet` CLI tool
   - _IL_ code statements are like assembly language instructions, which are executed by **.NET's virtual machine**, known as **CLR (Common Language Runtime)**

2. At runtime, CoreCLR (core version) loads the IL code from the assembly, the **just-in-time (JIT)** compiler compiles it into native CPU instructions, and then it is executed by the CPU.

   - Benefit of this 2-step process is that the same _IL_ code can run everywhere (Windows, Linux or macOS)
   - To create the _IL_ we can use any language as source code for example, C#, F#, or Visual Basic.

::: tip NOTE
You can examine and disassemble the contents of an IL assembly with Microsoft's _ildasm_ tool. And with tools such as _ILSpy_, _dotPeek_ (JetBrains), or _Reflector_ (Red Gate), you can go further and decompile the IL to C#. Because IL is higher-level than native machine code, the decompiler can do quite a good job of reconstructing the original C#.
:::

## Introduction

_Example:_ Simple console application

```csharp
using System;

namespace HelloCS
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Hello World!");
    }
  }
}
```

In C# 9 or later we can just write:

```csharp
Console.WriteLine("Hello World!");
```

### Syntax

- Identifiers: `Main`, `name`, ...
- Keywords: `using`, `namespace`, `class`, ...
- Statements: `int i = 10`, `if (i > 5)`, ...
- Literals (data): `52`, ...
- Punctuators: `{,};`, ...
- Operators: `+`, `*`, `==`, ...
- Comments: `//`, `/* ... */`

### Versions

1. C# 1.0: Statically typed object-oriented language

   - Visual Studio .NET 2002 (.NET Framework 1.0/1.1)
   - Classes
   - Structs
   - Interfaces
   - Events
   - Properties
   - Delegates
   - Operators and expressions
   - Statements
   - Attributes

2. C# 2.0:

   - Visual Studio 2005 (.NET Framework 2.0/3.0)
   - Generics
   - Partial types
   - Anonymous methods
   - Nullable value types
   - Iterators
   - Covariance and Contravariance

3. C# 3.0:

   - Visual Studio 2008 (.NET Framework 3.0/3.5)
   - Declarative coding with **Language INtegrated Queries (LINQ)**
   - Auto-implemented properties
   - Anonymous types
   - Query expressions
   - Lambda expressions
   - Expression trees
   - Extension methods
   - Implicitly typed local variables
   - Partial methods
   - Object and collection initializers

4. C# 4.0:

   - Visual Studio 2010 (.NET Framework 4.0)
   - Dynamic bindings (types)
   - Named/optional arguments
   - Generic convariant and contravariant
   - Embedded interop types

5. C# 5.0:

   - Visual Studio 2012 (.NET Framework 4.5)
   - Simplified asynchronous tasks (Asynchronous members)
   - Caller info attributes

6. C# 6.0:

   - Visual Studio 2015 (.NET Framework 4.6 / .NET Core 1.0/1.1)
   - Static imports
   - Exception filters
   - Auto-property initializers
   - Null propagator
   - String interpolation
   - `nameof` operator

   - Expression bodied members: read-only properties

7. C# 7.0:

   - Visual Studio 2017 (.NET Framework 4.7 / .NET Core 2.0)

   - Binary literals and digit separators: storing whole numbers

   - Pattern matching

   - `out` variables

   - Tuples and deconstruction

   - Local functions

   - Expanded expression bodied members

   - Ref locals and returns

   1. C# 7.1:

      - Default literal expressions
      - Inferred tuple element names
      - `async` Main method
      - Pattern matching on generic type parameters

   2. C# 7.2:

      - Leading underscores in numeric literals
      - Non-trailing named arguments
      - `private protected` access modifier
      - Testing `==` and `!=` with tuple types

   3. C# 7.3:

      - .NET Framework 4.8 / .NET Core 2.1/2.2
      - Performance-oriented safe code that improves `ref` variables, pointers, and `stackalloc`

8. C# 8:

   - Visual Studio 2019 (.NET Core 3.0)
   - `Readonly` members
   - Default interface methods
   - Switch expressions
   - Nullable reference types

9. C# 9:

   - Visual Studio 2019 (.NET 5.0)
   - Records
   - Target-typed new
   - Top-level statements (minimal-code console apps)
   - Enhanced pattern matching

10. C# 10:

    - Visual Studio 2022 (.NET 6.0)
    - Global `namespace` imports (global `using` Directives)
    - `using static` directive
    - Constant string literals: Formatting using interpolated strings
    - File-scoped namespaces
    - Required properties: Requiring properties to be set during instantiation
    - Record `structs`
    - Null parameter checks

## Namespaces

Namespaces are used:

- To organize many classes
- To declare your own namespaces, this helps you control the scope of class and method names in larger programming projects. Avoiding name clashes

_Example:_

```csharp
namespace SampleNamespace
{
    class SampleClass
    {
        public void SampleMethod()
        {
            System.Console.WriteLine(
                "SampleMethod inside SampleNamespace");
        }
    }
}

// In C# 10
namespace SampleNamespace;

class AnotherSampleClass
{
    public void AnotherSampleMethod()
    {
        System.Console.WriteLine(
            "SampleMethod inside SampleNamespace");
    }
}
```

_Example:_

```csharp
using System;
using System.Linq;
using System.Reflection;

namespace HelloCS
{
    class Program
    {
        static void Main()
        {
            Assembly? assembly = Assembly.GetEntryAssembly();

            if (assembly == null) return;

            // loop through the assemblies that this app references
            foreach (AssemblyName name in assembly.GetReferencedAssemblies())
            {

              // load the assembly so we can read its details
              Assembly a = Assembly.Load(name);

              // declare a variable to count the number of methods
              int methodCount = 0;

              // loop through all the types in the assembly
              foreach (TypeInfo t in a.DefinedTypes)
              {

                // add up the counts of methods
                methodCount += t.GetMethods().Count();
              }

              // output the count of types and their methods
              Console.WriteLine(
                "{0:N0} types with {1:N0} methods in {2} assembly.",
                arg0: a.DefinedTypes.Count(),
                arg1: methodCount, arg2: name.Name);
            }
        }
    }
}

// Output on Windows
0 types with 0 methods in System.Runtime assembly.
103 types with 1,094 methods in System.Linq assembly.
46 types with 660 methods in System.Console assembly.
```

::: tip Note
`System.Runtime` assembly contains 0 types as it is special because it only contains **type-forwarders** rather than actual types
:::

### Top-Level Statements

Top-level statements enable you to avoid the extra ceremony required by placing your program's entry point in a static method in a class

```csharp
// Program.cs
// C# 9.0
using System;

Console.WriteLine("Hello World!");
```

- Top-level statements are executed in the order they appear in the file
- Top-level statements can **only be used in one source file** in your application
- The compiler generates an error if you use them in more than one file

### Implicit `using` Directives

The .NET 6 SDK also adds a set of implicit `global using` directives:

- A _global `using` directive_ imports a namespace for your whole application instead of a single file

```csharp
// C# 10.0
Console.WriteLine("Hello World!");
```

- Add `<ImplicitUsings>disable</ImplicitUsings>` in the project file to **disable app implicit used** namespaces

Remove an implicit imported namespace:

- We can remove a specific implicit `using` directive
- The following entry in the project file removes `System`

```csharp
<ImplicitUsings>enable</ImplicitUsings>

<ItemGroup>
  <Using Remove="System.Collections" />
</ItemGroup>
```

## Types

- A _type_ defines the structure and behaviour of any data
- A _variable_ is a label that refers to an instance of a specific type
- A _literal_ is a notation that represents a _fixed value_

There are 2 kinds of types in C#:

1. Value Types: They store data directly

   - Built-in Value types:

     - Simple types: types such as numeric, floats, `bool`, and `char`
     - `enum` type
     - `struct` type
     - `nullable` value type
     - `tuple` value type

2. Reference Types: They store references to their data

   - They are also known as _objects_
   - Built-in Reference Types:

     - `string` type
     - `class`, `object` type
     - `interface` type
     - `array` type
     - `delegate` type
     - `dynamic` type

_Unified Type System_:

The fundamental building block in C# is an encapsulated unit of data and functions called a type. C# has a unified type system, where all types ultimately share a common base type and can be treated as an `object`. This means that all types, whether they represent business objects or are primitive types such as `numbers`, share the same basic functionality. For example, an instance of any type can be converted to a string by calling its `ToString` method

Naming conventions:

| Naming convention | Examples                  | Used for                                                  |
| ----------------- | ------------------------- | --------------------------------------------------------- |
| Camel case        | `cost`, `orderDetail`     | Local variables, private fields                           |
| Pascal case       | `String`, `Cost`, `Int32` | Types, non-private fields, and other members like methods |

Get name of the variable using `nameof`:

```csharp
int age = 30;

Console.WriteLine(nameof(age));
```

::: tip NOTE
Reserved keywords can be used as variable name but they have to be prefixed with `@`: `int @int;`, `string @return;`
:::

### Character

`char`: Used to store single character.

- Simple type

- Single quotes is used

  ```csharp
  char letter = 'A';
  char digit = '1';
  ```

- Default value:

  ```csharp
  //
  Console.WriteLine($"default(string) = {default(char)}");
  ```

- Primitive data-type

### Strings

`string`: Used to store multiple character.

- **Strings are immutable**. Use `StringBuilder` for mutable strings.

- Not a primitive data-type

```csharp
// Double quotes
string firstName = "Bob";

// Escape sequences can be used while storing text in a `string`
string fullNameWithTabSeparator = "Bob\tSmith";

// To store file paths or other verbatim strings prefix `@` symbol:
string filePath = @"C:\televisions\sony\bravia.txt";

// Concatenate
string name = "world"
string welcome = "Hello, " + name;
```

- Empty string:

  ```csharp
  string emptyString = string.Empty;
  ```

- Default value:

  ```csharp
  Console.WriteLine($"default(string) = {default(string)}");
  ```

#### Mutable String

Using `System.Text.StringBuilder` we can create mutable strings. The string value can be modified.

- It is memory efficient
- They offer better performance than string objects of type `System.String`, when heavy string manipulation is involved

```csharp
// Create a StringBuilder with max string capacity of 200
StringBuilder sb = new StringBuilder("Optional Initial String", 200);

Console.WriteLine($"Capacity: {sb.Capacity}; Length: {sb.Length}");

// String can be modified
sb[0] = 'P';
```

- Strings can be appended:

  ```csharp
  sb.Append("The quick brown fox ");
  sb.Append("jumps over the lazy dog.");


  // Append line ending
  sb.AppendLine();

  // Append formatted strings
  sb.AppendFormat("He did this {0} times.", jumpCount);

  // Append a set of values
  string[] animals = {"goats", "cats", "pigs"};
  sb.AppendJoin(",", animals);
  ```

- Convert to a single string:

  - `Convert.ToString()` handles `null`, while `object.ToString()` doesn't, and throws a NULL Reference exception

  ```csharp
  sb.ToString();

  Convert.ToString(sb);
  ```

#### String Formatting

- Basic formatting

  ```csharp
  Console.WriteLine("Hello, {0} -  {1}", firstName, secondName);
  ```

- Specifying numerical formatting and other formatting specifiers:

  - General format: `{index[, alignment]:[format]}`
  - Common types: N (Number), G (General), F (Fixed-point), E (Exponential), D (Decimal), P (Percent), X (Hexadecimal), C (Currency in local format)

  ```csharp
  int val1 = 1234;
  decimal val2 = 1234.5678m;

  Console.WriteLine("{0:D}, {0:N}, {0:F}, {0:G}", val1);
  Console.WriteLine("{0:E}, {0:N}, {0:F}, {0:G}", val2);

  // output:
  // 1234, 1,234.00, 1234.00, 1234
  // 1.234568E+003, 1,234.57, 1234.57, 1234,5678
  ```

- Specify precision:

  ```csharp
  // Add a number after the format to specify precision
  Console.WriteLine("{0:D6}, {0:N3}, {0:F1}, {0:G3}", val1);

  // output:
  // 001234, 1,234.000, 1234.0, 1.12E+03
  ```

- Formatting with alignment and spacing:

  ```csharp
  // Format in a column of 5 chars width
  int[] quarters = { 1, 2, 3, 4 };
  Console.WriteLine("{0,5} {1,5} {2,5} {3,5}", quarters[0], quarters[1], quarters[2], quarters[3]);

  // ....1....2....3....4



  // Use local to show currency
  int[] sales = { 100000, 150000, 200000, 225000 };
  Console.WriteLine("{0,12:C0} {1,12:C1} {2,12:C2} {3,12:C0}", sales[0], sales[1], sales[2], sales[3]);

  // $100,000   $150,000.0  $200,000.00   $225,000

  // Use international percentage
  double[] intlMixPct = { .386, .413, .421, .457 };
  Console.WriteLine("{0,12:P0} {1,12:P0} {2,12:P1} {3,12:P2}", intlMixPct[0], intlMixPct[1], intlMixPct[2], intlMixPct[3]);

  // 39%  41%   42.1%   45.70%
  ```

- **String interpolation** using `$`

```csharp
string welcome = $"Hello, {firstName}";

Console.WriteLine($"This car costs {price:C2}, Age: {25 + 30} with {{{odometer}}} KMs");

// This car costs ₹400.00, Age: 55 with {10} KMs
```

#### String Operations

[Stings best practices](https://docs.microsoft.com/en-us/dotnet/standard/base-types/best-practices-strings):

- Use `StringComparison.Ordinal` or `StringComparison.OrdinalIgnoreCase` for comparisons as your safe default for culture-agnostic string matching.

- Use string operations that are based on `StringComparison.CurrentCulture` when you display output to the user.

- Use the `String.Compare` and `String.CompareTo` methods to sort strings, not to check for equality.

- Use the `String.ToUpperInvariant` method instead of the `String.ToLowerInvariant` method when you normalize strings for comparison.

All these methods do not modify the original string, some of them return a new modified string:

- `string.Compare(str1, str2)`: Compare will perform an ordinal comparison and return:

  - `< 0`: if first string comes before second in sort order
  - `0`: if first and second strings are same position in sort order
  - `> 0`: if first string comes after second in sort order

- `str1.Equals(str2)`: returns `true` if strings are equal

- `str1.Replace(oldChars, newChars)`: returns a new string with characters replaced

- `Remove(int startIndex)`: removes characters from the string from the `startIndex` position to the end of the string and returns that new string.

- `Remove(int startIndex, int count)`: removes a specified number of characters from the string from the starting index position. With the count parameter we decide how many characters we want to delete

- `Insert(int startIndex, string value)`: inserts the value into the string from the `startIndex` position and returns a modified string

- `SubString(2)`: is used to get the substring from the string, starting from the specified index

- `ToLower()`: convert the string to lowercase

- `ToUpper()`: convert the string to uppercase

- `Trim()`: trim all leading and trailing white space from the string

- `IndexOf("Ab")`: get the first occurrence of the string or character inside the string else return `-1`

- `LastIndexOf("Ab")`: get the last occurrence of the string or character inside the string else return `-1`

- `Contains("for")`: returns true if a string contains the value, otherwise, it returns false

- `StartsWith("bad")`: returns true if a string starts with the value, otherwise, it returns false

- `EndsWith("bad")`: returns true if a string ends with the value, otherwise, it returns false

- `string.Concat(str1, str2, ...)`: concatenate strings

- `string.Join(delimiter, str)`: concatenate strings separated by a delimiter

- `string.IsNullOrWhiteSpace`: returns true if the string is either null or is blank or contain just white space else returns false

- `string.Format("My name is {0}", name)`: insert object or variable value inside any string

### Numbers

Numbers can be Natural / Whole number (+ve), Integers (-ve), and Real numbers (floats):

- `byte`, `sbyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`

  ```csharp
  // numbers from 0 to 127
  byte bits = 8;

  // unsigned integer means positive whole number or 0
  uint naturalNumber = 23;

  // integer means negative or positive whole number or 0
  int integerNumber = -23;
  ```

- `float`:

  - It is mostly used in graphics libraries (high demands for processing power)

    ```csharp
    // float means single-precision floating point
    // f/F suffix makes it a float literal
    // if f/F is missing compiler will throw error
    // 7-digit precision
    float realNumber = 2.3F;
    ```

- `double`:

  - It is mostly used for real world values (expect money calculations)

    ```csharp
    // double means double-precision floating point
    // it dose not need any suffix
    // 15-digit precision
    double anotherRealNumber = 2.3; // double literal
    ```

- `decimal`:

  - It is mostly used in financial applications (high level of accuracy)
  - No (less) round-off errors

    ```csharp
    // more precision floating point
    // m/M suffix makes it a decimal literal
    // 28-29 decimal digits
    double anotherRealNumber = 2.3M; // decimal literal
    ```

- Default value:

  ```csharp
  // 0 for all number data-types
  Console.WriteLine(default(byte));
  Console.WriteLine(default(int));
  Console.WriteLine(default(float));
  ```

- Binary literals can be specified with the `0b` prefix:

  ```csharp
  int binaryNotation = 0b1010;
  ```

- Hexadecimal literals can be specified with the `0x` prefix:

  ```csharp
  int hexadecimalNotation = 0x001E;
  ```

- `_` (underscore) can be used as digit separator (C# 7.0)
- These are called digit separators and are ignored by the compiler

  ```csharp
  int decimalNotation = 2_000_000;
  int binaryNotation = 0b_0001_1110_1000_0100_1000_0000;
  int hexadecimalNotation = 0x_001E_8480;

  // All have the same value
  ```

| C#        | CLR              | Singed | Size in bits                    | Inclusive Range                                         | Suffix |
| --------- | ---------------- | ------ | ------------------------------- | ------------------------------------------------------- | ------ |
| `byte`    | `System.Byte`    | No     | 8                               | 0 to 255                                                |        |
| `sbyte`   | `System.SByte`   | Yes    | 8                               | −128 to 127                                             |        |
| `ushort`  | `System.UInt16`  | No     | 16                              | 0 to 65,535                                             |        |
| `short`   | `System.Int16`   | Yes    | 16                              | −32,768 to 32,767                                       |        |
| `uint`    | `System.UInt32`  | No     | 32                              | 0 to 4,294,967,295                                      | 1U     |
| `int`     | `System.Int32`   | Yes    | 32                              | −2,147,483,648 to 2,147,483,647                         |        |
| `ulong`   | `System.UInt64`  | No     | 64                              | 0 to 18,446,744,073,709,551,615                         | 1UL    |
| `long`    | `System.Int64`   | Yes    | 64                              | −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 | 1L     |
| `float`   | `System.Single`  | 32     | 23 bits (~7 decimal digits)     | 1.5×10^45 to 3.4×1038                                   | 1F     |
| `double`  | `System.Double`  | 64     | 52 bits (~15 decimal digits)    | 5.0×10^324 to 1.7×10308                                 | 1D     |
| `decimal` | `System.Decimal` | 128    | 96 bits (~28-29 decimal digits) | 1.0 x 10^28 to 7.9228 x 1028                            | 1M     |

- If numbers in different types are added then C# will perform implicit type casting

- Use `checked` block to raise exceptions when overflow happens during any arithmetic operation.

  ```csharp
  int result = checked(a + b) + c;

  checked
  {
      int r1 = a + b;
      int r2 = r1 - (int) c;
  }
  ```

- `unchecked` can be used to ignore any statement in a `checked` block

- The compiler can put all the operations of that project under `checked` without explicitly using the keyword in the source code by adding through Visual Studio or to the below settings under `<PropertyGroup>` inside `.csproj` file:

  ```xml
  <CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>
  ```

- All numbers are primitive data-types

::: danger NOTE
**Do not use equality comparator with double variables** they will not be equal
:::

### Booleans

Storing `true` or `false`:

```csharp
bool happy = true;
bool sad = false;

// False
Console.WriteLine(default(bool));
```

In C# numbers are not considered as Booleans, like `0` as `false` and reset as `true`

So, the below code will not work:

```csharp
// Will throw error: Cannot implicitly convert to bool
if(something)

// This will work
if(something != 0)
```

- Primitive data-type

### Object Type

Special type named `object` that can store any data.

Every type in C# directly or indirectly derives from the `object` class type, and `object` is the ultimate base class of all types.

- The code will be messier
- Possibly poor performance due to [boxing and unboxing operations](#boxing-and-unboxing-operations)

```csharp
// storing a double in an object
object height = 1.88;

// storing a string in an object
object name = "Amir";

// gives compile error!
int length1 = name.Length;

// tell compiler it is a string (unboxing)
int length2 = ((string)name).Length;

// store different data later
// previously it was string
// now it is int
name = 25;
```

- Base class of all C# types
- Generics are used instead of object

- Not a primitive data-type

### Dynamic Type

Special type named `dynamic` (C# 4.0) can store any data, even more than `object`

- Poor performance
- It dose implicit type conversion when using the methods of the stored value.

```csharp
// storing a string in a dynamic object
// string has a Length property
dynamic something = "Ahmed";

// it has Length property
something.Length
```

- The data type can be changed after definition
- It is not present in CLR and hence will be converted to `object` during runtime

- Run time errors, no compile time errors

### Anonymous Types

Anonymous types provide a convenient way to encapsulate a set of read-only properties into a single object without having to explicitly define a type first.

- The type name is generated by the compiler and is not available at the source code level
- The type of each property is inferred by the compiler

- Use the `new` operator, but don't specify a typename
- Use `{}` to initialize properties
- Use name-value pair within initializers to declare the property name

```csharp
var temp = new { Color = "Red", Price = 40M };
```

### Constants

Constants are immutable values which are known at compile time and do not change during runtime

```csharp
const double PI = 3.14159265359;
const int WeekDays = 7;
const string HomePlanet = "Earth";
```

### Inferring Type

Using `var` we can declare local variables whose data-type is determined later.

For inferring it checks if the literal is suffice with:

- `L`: infers `long`
- `UL`: infers `ulong`
- `M`: infers `decimal`
- `D`: infers `double`
- `F`: infers `float`

It will have the same properties of the inferred data-type

- Data-type cannot be changed after definition

### Type Casting

- Changing an expression from one data type to another.

  ```csharp
  // it will not round up or down, just discards the decimal places
  decimal myDecimal = 123.987M;
  int myInt = (int)myDecimal;

  // 123
  ```

- When a big value is cast into smaller one, C# will automatically wrap the value around.

  ```csharp
  int myDecimal = 365;
  byte myInt = (byte)myDecimal;
  // myInt will become 109 instead of 365, as byte can only hold up to 256
  // it rolls over from 256 to 109
  ```

::: tip NOTE
To get wrapped value. Open calculator, switch to Scientific mode, and calculate 365 _Mod_ 256
:::

- **+** (plus) operator when used between a _string_ and any _other type_, it converts the **other type** to **string**.

### Parsing

For parsing `int` data from `string` use `int.TryParse()`:

- `int.TryParse("A", out int age)`: will assign 0 if anything but digits are passed
- It is more efficient
- It returns `true` if parsing was successful

  ```csharp
  if (Int32.TryParse(numStr1, out targetNum)) {
      Console.WriteLine($"{targetNum}");
  }
  ```

- `int.Parse("A")`: will throw `FormatException` if anything but digits are passed, `try-catch` block is required to catch any exceptions
- `Convert.ToInt32("A")`: will throw `FormatException` and `OverflowException` if anything but digits are passed

- Other parsing options:

  ```csharp
  string numStr2 = "2.00";
  string numStr3 = "3,000";
  string numStr4 = "3,000.00";

  // Use Parse to try a floating point number
  // This only works if the decimal value is 0
  targetNum = int.Parse(numStr2, NumberStyles.Float);
  Console.WriteLine($"{targetNum}");

  // Use Parse to try a number with thousands marker
  targetNum = int.Parse(numStr3, NumberStyles.AllowThousands);
  Console.WriteLine($"{targetNum}");

  // Use Parse to try a number with thousands marker AND decimal
  targetNum = int.Parse(numStr4, NumberStyles.AllowThousands | NumberStyles.Float);
  Console.WriteLine($"{targetNum}");

  // Output:
  // 2
  // 3000
  // 3000

  // This works with other types too, like bool
  Console.WriteLine($"{bool.Parse("True")}");

  // Or floating point numbers
  Console.WriteLine($"{float.Parse("1.235"):F2}");

  // Output:
  // True
  // 1.24
  ```

### Boxing and Unboxing Operations

Values of value types are treated as objects by performing _boxing_ and _unboxing operations_.

- Boxing is the process of converting a value type to the type `object` or to any interface type implemented by this value type.

- Unboxing extracts the value type from the object

- Boxing is implicit; unboxing is explicit.

```csharp
int i = 123;
object o = i;    // Boxing
int j = (int)o;  // Unboxing
```

- When a value of a value type is assigned to an `object` reference, a "box" is allocated to hold the value. That box is an instance of a reference type, and the value is copied into that box.

- When an `object` reference is cast to a value type, a check is made that the referenced object is a box of the correct value type. If the check succeeds, the value in the box is copied to the value type.

### Default Value

All primitive types except `string` are **value types**.

- Default value can be set:

  ```csharp
  // 0
  int number = default;

  // 0
  float digit = default;
  ```

### Nullable Types

By default value types are non nullable. To make them nullable use `?`

- `int a = 0`: `a` is not nullable, so `a` cannot set to `null`, `a = null` will generate compiler error

- `int? b = 0`: `b` is nullable `int`, so `b = null` is valid

A _nullable value type_ `T?` represents all values of its underlying value type `T` and an additional `null` value. For example, you can assign any of the following three values to a `bool?` variable: `true`, `false`, or `null`.

- Nullable types bridge the differences between C# types and Database types

- For example, in a database table the `age` column can contain numeric values or can be empty (null), if this column is mapped to a non-nullable value type it will throw error

Nullable reference types are available beginning with C# 8.0:

- Reference types are nullable by default

#### Null-Coalescing operator `??` and `??=`

If you want to assign a value of a nullable value type to a non-nullable value type variable, you might need to specify the value to be assigned in place of `null`.

The null-coalescing operator `??` returns the value of its left-hand operand if it isn't `null`; otherwise, it evaluates the right-hand operand and returns its result.

- The `??` operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.

```csharp
int? TicketsOnSale = null;

int AvailableTickets;

if (TicketsOnSale == null)
{
    AvailableTickets = 0;
}
else
{
    // Will throw error as nullable type cannot be implicitly converted to non-nullable
    // AvailableTickets = TicketsOnSale;

    // Returns a non-nullable value
    AvailableTickets = TicketsOnSale.Value;

    // Or explicitly cast it
    AvailableTickets = (int)TicketsOnSale;
}

// The above can be written as
AvailableTickets = TicketsOnSale ?? 0;
```

The null-coalescing assignment operator `??=` (C# 8.0) assigns the value of its right-hand operand to its left-hand operand only if the left-hand operand evaluates to `null`.

- The `??=` operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.

```csharp
if (variable is null)
{
    variable = expression;
}

// The above can be written as
variable ??= expression;
```

_Example:_

```csharp
List<int> numbers = null;
int? a = null;

// create a new list is numbers is null
(numbers ??= new List<int>()).Add(5);
Console.WriteLine(string.Join(" ", numbers));  // output: 5

// if a is null, it returns 0 and it also assigns 0 to a
numbers.Add(a ??= 0);
Console.WriteLine(string.Join(" ", numbers));  // output: 5 0
Console.WriteLine(a);  // output: 0
```

::: tip NOTE
The operators `??` and `??=` cannot be overloaded.
:::

### Tuples

The tuple (C# 7.0) feature provides concise syntax to group multiple data elements in a lightweight data structure.

- Tuple values are **mutable**
- They are the recommended way to return multiple values from a function

```csharp
// <type> <variable name>
(int X, int Y) point = (10, 5);
Console.WriteLine($"X: {point.X}, Y: {point.Y}");

// Mutable
point.X = 500;

// Using var we can specific names in the initializer
var point = (X: 10, Y: 5);

// Tuple members from variables
int x = 10, y = 5;
var point = (x, y);
point.x;
```

- Tuple member names can be ignored, and the default names such as `Item1`, `Item2` ... can be used:

  ```csharp
  (int, int) point = (10, 5);

  Console.WriteLine($"X: {point.Item1}, Y: {point.Item2}");
  ```

- Deconstructing tuples:

  ```csharp
  (int x, int y) = point1;

  // x and y already exist
  (x, y) = point2;
  ```

- Function returning a Tuple (multiple values):

  ```csharp
  static (int, int) PlusTimes(int a, int b) {
    return (a+b, a*b);
  }

  (int sum, int multiple) result = PlusTimes(10, 5);
  ```

### Arrays

Multiple variables of the same type can be stored in an array data structure.

- To store elements of any type in an array, we can specify `object` as its type.

```csharp
type[] arrayName;

class TestArraysClass
{
    static void Main()
    {
        // Declare a single-dimensional array of 5 integers.
        int[] array1 = new int[5];

        // Declare and set array element values.
        int[] array2 = new int[] { 1, 3, 5, 7, 9 };

        // Alternative syntax.
        int[] array3 = { 1, 2, 3, 4, 5, 6 };

        // Declare a two dimensional array.
        int[,] multiDimensionalArray1 = new int[2, 3];

        // Declare and set array element values.
        int[,] multiDimensionalArray2 = { { 1, 2, 3 }, { 4, 5, 6 } };

        // Declare a jagged array.
        int[][] jaggedArray = new int[6][];

        // Set the values of the first array in the jagged array structure.
        jaggedArray[0] = new int[4] { 1, 2, 3, 4 };
    }
}
```

### Enum

An enumeration type (or `enum` type) is a value type defined by a set of named constants of the underlying integral numeric type.

If a program uses set of integral numbers, consider replacing them with enums, which makes the program more:

- Readable
- Maintainable

- The member names must be distinct

```csharp
enum Season
{
    // names of enum members
    Spring,
    Summer,
    Autumn,
    Winter
}
```

- By default, the associated constant values of enum members are of type `int`

- They start with 0 and increase by 1 following the definition text order.

- We can explicitly specify any integral numeric type as an underlying type of an enum type.

```csharp
enum ErrorCode : ushort
{
    None = 0,
    Unknown = 1,
    ConnectionLost = 100,
    OutlierReading = 200
}
```

- Methods cannot be defined inside an enum, but we can create extension methods

#### Enumeration types as bit flags

If you want an enumeration type to represent a combination of choices, define enum members for those choices such that an individual choice is a bit field (associated values are of the powers of two)

- To indicate that an enumeration type declares bit fields, apply the `Flags` attribute to it

```csharp
[Flags]
public enum Days
{
    None      = 0b_0000_0000,  // 0
    Monday    = 0b_0000_0001,  // 1
    Tuesday   = 0b_0000_0010,  // 2
    Wednesday = 0b_0000_0100,  // 4
    Thursday  = 0b_0000_1000,  // 8
    Friday    = 0b_0001_0000,  // 16
    Saturday  = 0b_0010_0000,  // 32
    Sunday    = 0b_0100_0000,  // 64
    Weekend   = Saturday | Sunday
}

public class FlagsEnumExample
{
    public static void Main()
    {
        Days meetingDays = Days.Monday | Days.Wednesday | Days.Friday;
        Console.WriteLine(meetingDays);
        // Output:
        // Monday, Wednesday, Friday

        Days workingFromHomeDays = Days.Thursday | Days.Friday;
        Console.WriteLine($"Join a meeting by phone on {meetingDays & workingFromHomeDays}");
        // Output:
        // Join a meeting by phone on Friday

        bool isMeetingOnTuesday = (meetingDays & Days.Tuesday) == Days.Tuesday;
        Console.WriteLine($"Is there a meeting on Tuesday: {isMeetingOnTuesday}");
        // Output:
        // Is there a meeting on Tuesday: False

        var a = (Days)37;
        Console.WriteLine(a);
        // Output:
        // Monday, Wednesday, Saturday
    }
}
```

### Delegate

A Delegate is a type safe function pointer

- A delegate type represents references to methods with a particular parameter list and return type.

- The `delegate` keyword is used to define a delegate

- Delegate can be associated with any method with a compatible signature and return type.

- Methods don't have to match the delegate type exactly. Variance (Covariance and Contravariance) can provide flexibility for matching a delegate type with a method signature.

- Delegates allow methods to be passed as parameters
- Delegates can be used to define callback methods
- Lambda expressions are a more concise way of writing inline code blocks. Lambda expressions (in certain contexts) are compiled to delegate types

- Delegates are analogous to function types provided by functional languages.

They're also similar to the concept of function pointers found in some other languages. Unlike function pointers, delegates are object-oriented and type-safe.

_Example:_

```csharp
// Create a delegate
public delegate void Delg(string message);

// Create a method for a delegate.
public static void Hello(string strMessage)
{
    Console.WriteLine(strMessage);
}

// Using delegate
public static void Main()
{
    // Create an instance of the delegate and pass the name of the function
    // that needs to be referenced
    Delg handler = new Delg(Hello);

    // OR

    // Instantiate the delegate
    Delg handler = Hello;

    // Call the delegate
    handler("Hello from the other side");
}
```

#### Multicast Delegate

A multicast delegate is a delegate that has reference to more than one function. When you invoke a multicast delegate, all the functions the delegate is pointing to, are invoked

There are 2 approaches to create a multicast delegate:

1. `+` or `+=` to register a method with the delegate
2. `-` or `-=` to un-register a method with the delegate

A multicast delegate, invokes the methods in the invocation list, in the same order in which they are added.

- **Multicast delegate makes implementation of observer design pattern (publish/subscribe pattern)** very simple.

```csharp
public class MethodClass
{
    public void Method1(string message) { }
    public void Method2(string message) { }
}


var obj = new MethodClass();

Del d1 = obj.Method1;
Del d2 = obj.Method2;
Del d3 = DelegateMethod;

// Both types of assignment are valid.
Del allMethodsDelegate = d1 + d2;
allMethodsDelegate += d3;


// remove Method1
allMethodsDelegate -= d1;

// copy AllMethodsDelegate while removing d2
Del oneMethodDelegate = allMethodsDelegate - d2;


// Get the invocation list
int invocationCount = d1.GetInvocationList().GetLength(0);
```

- If the delegate has a return type other than void and if the delegate is a multicast delegate, only the value of the last invoked method will be returned.

### Records

- Records (C# 9) as a reference type (instead of classes)
- Record structs (C# 10) as value types

- Records are distinct from classes in that record types **use value-based equality**
- Create record types with **immutable properties** by using positional parameters or standard property syntax
- Positional properties are **immutable** in a `record class` and a `readonly record struct`. They're _mutable_ in a `record struct`

```csharp
// reference type (`class` keyword is optional)
public record Person(string FirstName, string LastName);

// same as above
public record Person
{
    public string FirstName { get; init; } = default!;
    public string LastName { get; init; } = default!;
};

// add other properties
public record DailyTemperature(double HighTemp, double LowTemp)
{
    public double Mean => (HighTemp + LowTemp) / 2.0;
}


// value type (record struct)
public readonly record struct Point(double X, double Y, double Z);
```

_Example:_

```csharp
Person person = new("Nancy", "Davolio");

Console.WriteLine(person);
// output: Person { FirstName = Nancy, LastName = Davolio }

Person newPerson = new("Nancy", "Davolio");

Console.WriteLine(person == newPerson); // true
Console.WriteLine(ReferenceEquals(person, newPerson)); // false
```

### `with` Expression

A `with` expression (C# 9) produces a copy of its operand with the specified properties and fields modified:

- A left-hand operand of a `with` expression (C# 9) must be of a [record type](#records)
- From C# 10, it can also be of a [structure type](#structure) or an [anonymous type](#anonymous-types)

```csharp
public record Point(int X, int Y);
public record NamedPoint(string Name, int X, int Y) : Point(X, Y);

public static void Main()
{
    Point p1 = new NamedPoint("A", 0, 0);
    Point p2 = p1 with { X = 5, Y = 3 };

    Console.WriteLine(p2 is NamedPoint);  // output: True
    Console.WriteLine(p2);  // output: NamedPoint { X = 5, Y = 3, Name = A }
}
```

## Conditional

- Run a set of statements only if certain condition is met
- They create branches

### If Else

- It is used to execute certain statements only when the **conditions** that are set up **true**.

  ```csharp
  // if someValue is 24 then execute statement-1 else execute statement-2
  if (someValue == 24)
  {
      // statement-1
  }
  else if (someValue > 100)
  {
      // statement-2
  }
  else
  {
      // statement-3
  }
  ```

### Ternary Operator

Can be used as a concise way to write if else statement:

```csharp
{
  // condition ? true_statement : false_statement
  var name = age > 18 ? "old" : "new";

  // The expression --> a ? b : c ? d : e
  // is evaluated   --> a ? b : (c ? d : e)
  // not as         --> (a ? b : c) ? d : e
}
```

- Conditional operator cannot be overloaded

### Switch

- `default:` case is optional

```csharp
switch (someValue)
{
  case 1:
      Console.WriteLine("Hello, {0}");
      break;
  case 2:
      Console.WriteLine("Hello, {0}");
      break;
  default:
      break;
}
```

- Control cannot fall through from one case label ('case 2:') (Error CS0163)

  ```csharp
  switch (someValue)
  {
    // This will throw error as case 1 is missing break;
    case 1:
        Console.WriteLine("Hello, {0}");
    case 2:
        Console.WriteLine("Hello, {0}");
    default:
        break;
  }
  ```

- This is valid:

  ```csharp
  switch (someValue)
  {
    // If case 1 or case 2 is matched the statement will execute
    case 1:
    case 2:
        Console.WriteLine("Hello, {0}");
        break;
    default:
        break;
  }
  ```

## Loops

They help to run a set of statements repeatedly based on some conditions

### for

- for loop is used when the number of **iterations** are **known**.

  ```csharp
  // initialization; condition; iteration
  for (int i = 0; i < length; i++) {
    // statements
  }
  ```

### While

- while loop is used when the number of **iterations** are **unknown**.

  ```csharp
  // check the condition first
  while (x > 5) {
    // statements
  }
  ```

### do-while

- do-while executes statements **at least once** and afterwards it behaves like _while_ loop.

  ```csharp
  // execute at least once
  do {
    // statements
  } while (x > 5); // now check condition
  ```

### foreach

- Iterate through an array
- runs as long as there is content in the array

```csharp
int[] collection = { 1, 2, 3 };

foreach (var item in collection)
{
    Console.WriteLine(item);
}
```

### Break And Continue

```csharp
while (x > 5) {
  // statements

  if (x == 3)
  {
    break;
  }
}
```

```csharp
while (x > 5) {
  // statements

  if (x == 3)
  {
    continue;
  }

  // some statements
}
```

## Functions

Functions are known as Methods in context of OOP.

- A method is a code block that contains a series of statements. A program causes the statements to be executed by calling the method and specifying any required method arguments.

- In C#, every executed instruction is performed in the context of a method.

- The `Main` method is the entry point for every C# application and it is called by the CLR when the program is started.

_Syntax:_

```csharp
// <Access Specifier> <Return Type> <Method Name>(Parameter List)
public void Main(string[] args)
{
  // Method Body
  Console.WriteLine("Hello, World");
}
```

- Access Specifier: It determines the visibility of a variable or a method from another class

- Return Type: A method may return a value. The return type is the data type of that value. If the method is not returning any values, then the return type is `void`

- Method Name: It is a unique identifier and it is case sensitive. It cannot be same as any other identifier declared in the class

- Parameter List (optional): Enclosed between parentheses, the parameters are used to pass and receive data from a method. The parameter list refers to the type, order, and number of parameters of a method. Parameters are optional.

- Method Body: This contains the set of instructions needed to be complete the required activity

A method signature is a unique identification of a method for the C# compiler:

- Method name
- The type and kind (value, reference, or output) of each of its formal parameters
- Method signature does not include the return type.

```csharp
DoSomething(int, int)
```

### Parameters

- Functions can have two types of parameters: required and optional.

- Function call will fail if required arguments are not passed during function call

- Optional parameters have a default value. The method that has optional parameters could be called without those arguments. If we provide the values as arguments for optional parameters then the default values will be overridden.

- **Optional parameters must appear after all required parameters** (Error CS1737):

  ```csharp
  public void Print(int sum, string name = "SUM")
  {
    Console.WriteLine(name + sum);
  }
  ```

- `OptionalAttribute` can also be used to specify a parameter as optional

  ```csharp
  public void Print(int sum, [Optional] string name)
  {
    Console.WriteLine(sum);
  }
  ```

- Call with named argument (C# 4.0), arguments can be passed out of order

  ```csharp
  Print(name: "ADD", sum: 230);

  // error CS8323: Named argument 'name' is used out-of-position but is followed by an unnamed argument
  Print(name: "ADD", 230);
  ```

- `params`: a method parameter that takes a variable number of arguments. The parameter type must be a single dimensional array

  - It makes the parameter optional
  - It must be the last parameter

  ```csharp
  public class Algebra
  {
    public int Sum(params int[] numbers)
    {
      int total = 0;

      foreach (int num in numbers)
      {
        total += num;
      }

      return total;
    }
  }

  private static void Main(string[] args)
  {
    Algebra alg = new Algebra();

    alg.Sum(1, 2, 3, 4, 5);
  }
  ```

### Pass By Reference

When primitive data-types are passed as arguments to a method, the argument value gets copied. So changes made to the value inside the method will not reflect in the original variable.

- If the argument needs to be modified in the function, it needs to be passed by reference

Arguments can be passed by reference using parameter modifiers:

- `ref`: Keyword indicates that a value is passed by reference.

  - Variables passed as `ref` arguments must be initialized before being passed in a method call.
  - **Arguments can be modified**

- `out`: Keyword causes arguments to be passed by reference.

  - Variables passed as `out` arguments don't have to be initialized before being passed in a method call.
  - **Arguments must be modified**: Value must be assigned before the method returns
  - Enables a function to return multiple values (old way). [Tuples](#tuples) are recommended for this.
  - Cannot be used on the first argument of an extension method

- `in`: Keyword causes arguments to be passed by reference but ensures the argument is not modified.

  - Variables passed as `in` arguments must be initialized before being passed in a method call.
  - **Arguments cannot be modified**
  - C# 7.2+

  ```csharp
  public static void ChangeRef(ref int numberRef)
  {
      numberRef = 25;
      Console.WriteLine($"Inside the ChangeRef method the numberRef is {numberRef}");
  }

  public static void ChangeOut(out int numberOut)
  {
      // numberOut must be assigned with a value before the function returns
      numberOut = 60;
      Console.WriteLine($"Inside the ChangeOut method the numberOut is {numberOut}");
  }

  static void Main(string[] args)
  {
      int numberRef = 15;

      Console.WriteLine($"Before calling the ChangeRef method the numberRef is {numberRef}");
      ChangeRef(ref numberRef);
      Console.WriteLine($"After calling the ChangeRef method the numberRef is {numberRef}");


      // No need to declare numberOut before calling the method
      Console.WriteLine("Before calling the ChangeOut method the numberOut is unassigned");
      ChangeOut(out int numberOut);
      Console.WriteLine($"After calling the ChangeOut method the numberOut is {numberOut}");
  }
  ```

Function overloading:

- The `in`, `ref`, `out`, and `params` keywords are not considered part of the method signature for the purpose of overload resolution:

  ```csharp
  class CS0663_Example
  {
      // Compiler error CS0663: "Cannot define overloaded
      // methods that differ only on ref and out".
      public void SampleMethod(out int i) { }
      public void SampleMethod(ref int i) { }
  }
  ```

For reference types `ref` can be used:

```csharp
public static void ChangeColor(Pen pen)
{
    pen.Color = Color.Green;
    Console.WriteLine($"Inside the ChangeColor method the color is {pen.Color}");
}

public static void CreateNewObjectWithoutRef(Pen pen)
{
    pen = new Pen(Color.Red);
    Console.WriteLine($"Inside the CreateNewObjectWithoutRef method the color of new pen object is {pen.Color}");
}

public static void CreateNewObjectWithRef(ref Pen pen)
{
    pen = new Pen(Color.Yellow);
    Console.WriteLine($"Inside the CreateNewObjectWithRef method the color of new pen object is {pen.Color}");
}

static void Main(string[] args)
{
    Pen pen = new Pen(Color.Blue);

    Console.WriteLine($"Before ChangeColor method: {pen.Color}");
    ChangeColor(pen);
    Console.WriteLine($"After the ChangeColor method: {pen.Color}");

    Console.WriteLine($"Before CreateNewObjectWithoutRef method: {pen.Color}");
    CreateNewObjectWithoutRef(pen);
    Console.WriteLine($"After CreateNewObjectWithoutRef method: {pen.Color}");

    Console.WriteLine($"Before CreateNewObjectWithRef method: {pen.Color}");
    CreateNewObjectWithRef(ref pen);
    Console.WriteLine($"After CreateNewObjectWithRef method: {pen.Color}");
}
```

The `in`, `ref`, and `out` keywords can't be used for the following kinds of methods:

- Async methods, defined using `async` modifier
- Iterator methods, which include a `yield return` or `yield break` statement

### Partial Methods

A partial class or struct may contain a partial method.

- The definition: One part of the class contains the signature of the method.
- The implementation: An implementation can be defined in the same part or another part.

- If the implementation is not supplied, then the method and all calls to the method are removed at compile time.
- Implementation may be required depending on method signature.

A partial method isn't required to have an implementation in the following cases:

- It doesn't have any accessibility modifiers (including the default `private`).
- It returns `void`.
- It doesn't have any `out` parameters.
- It doesn't have any of the following modifiers `virtual`, `override`, `sealed`, `new`, or `extern`.

_Example:_

```csharp
// Definition in file1.cs
partial void OnNameChanged();

// Implementation in file2.cs
partial void OnNameChanged()
{
  // method body
}
```

## Class

A `class` type defines a data structure that contains data members (fields) and function members (methods, properties, and others).

Class types support single inheritance and polymorphism, mechanisms whereby derived classes can extend and specialize base classes.

- A class is a blue print of an Object

It has code and data:

- Properties (data): member variables
- It has actions/abilities: member functions or methods

_Example:_

```csharp
// <Access Specifier> class <Class Name>
public class Counter
{
  private int _count;

  public int GetNextValue()
  {
    _count += 1;
    return _count;
  }
}
```

The `new` operator is used to create new instances of a class

```csharp
static void Main()
{
  var c1 = new Counter();
  var c2 = new Counter();

  Console.Write(c1.GetNextValue());
  Console.Write(c1.GetNextValue());
  Console.Write(c1.GetNextValue());

  Console.Write(c2.GetNextValue());

  Console.Write(c1.GetNextValue());
}

// OUTPUT:
// 1 2 3 1 4
```

- In C#, every class implicitly inherits from the base `Object` class. Because of this inheritance, every class, both built-in and the user created inherit the `ToString` method from the `Object` class.

  - `ToString` should return a string representation of the object that is suitable for display.
  - It's good idea to override this method and generate your own string representation of your class

  ```csharp
  public class Car
  {
    public string Name { get; set; }

    public override string ToString() {
      return $"{Name} is name property of class Car"
    }
  }
  ```

New way to instantiate objects (C# 9: Target-Typed):

```csharp
XmlDocument xml3 = new();

// old way
XmlDocument xml3 = new XmlDocument();
```

### Reference Types

Any type defined with the `class` keyword will be a _reference type_, meaning that a variable of that type will not contain the data that makes up an instance of the type; instead, it can contain a _reference_ to an instance of the type.

- In C# classes are all reference-types

```csharp
Counter c1 = new Counter();
Counter c2 = c1;

Console.Write(c1.GetNextValue());
Console.Write(c1.GetNextValue());
Console.Write(c1.GetNextValue());

Console.Write(c2.GetNextValue());

Console.Write(c1.GetNextValue());

// OUTPUT
// 1 2 3 4 5
```

- Only one instance is created here and both `c1` and `c2` refer to this same instance

- `object.ReferenceEquals(instance1, instance2)` or `==` operator: can be used to check if both objects refer the same instance

Reference types can contain `null`, makes it hard to know whether it's safe to attempt to perform an action with that variable

- C# 8.0 added _nullable references_ to make a distinction between references that may be null, and ones that must not be
- This feature is disabled by default

- `#nullable`: allows fine-grained control of the nullable annotation context

```csharp
string? mayBeNull = null;

if (mayBeNull != null)
{
    // Allowed because we can only get here if mayBeNull is not null
    Console.WriteLine(mayBeNull.Length);
}

// Allowed because it checks for null and handles it
Console.WriteLine(mayBeNull?.Length ?? 0);

// The compiler will warn about this in an enabled nullable warning context
Console.WriteLine(mayBeNull.Length);
```

### Access Modifiers (Accessibility)

Classes offer a mechanism for _encapsulation_ through access modifiers

- The accessibility level controls whether they can be used from other code in your assembly or other assemblies.

There are 4 types and 2 combined types:

1. `public`: The type or member can be accessed by any other code in the same assembly or another assembly that references it. The accessibility level of public members of a type is controlled by the accessibility level of the type itself

   - Method or class member can be accessed by any other code within your program

   ```csharp
   public class Car
   {
     public string name = "Jeep";
     public int seats = 4;
   }

   class Program
   {
     static void Main(string[] args)
     {
       Car myCar = new Car();
       Console.WriteLine(myCar.name); // This is Ok.
     }
   }
   ```

2. `private`: Types or members that implement private access modifiers are accessible only inside the same `class` or `struct`. As a result, we can't access them outside the `class` or `struct` they are created

   - Method or class member can be accessed by any other code within your program

   ```csharp
   public class Car
   {
     string name = "Jeep";
     private int seats = 4;
   }

   class Program
   {
     static void Main(string[] args)
     {
       Car myCar = new Car();
       Console.WriteLine(myCar.name); // Error. We can't access the number variable because
       // it has the private access modifier and its only accessible in the Car class
     }
   }
   ```

3. `protected`: The type or member can be accessed only by code in the same `class`, or in a `class` that is derived from that `class`.

   - Method or class member can only be accessed by code within the class definition itself

   ```csharp
   public class Car
   {
       public string name;
       protected int seats;
   }

   public class Jeep : Car
   {
     void Print()
     {
       Console.WriteLine(seats);
       Console.WriteLine(name);
     }
   }

   class Program
   {
     static void Main(string[] args)
     {
       Car myCar = new Car();
       Console.WriteLine(myCar.seats); // Error. The number variable is inaccessible due to its protection level.
       // The Program class doesn't derive from the Car
     }
   }
   ```

4. `internal`: The type or member can be accessed by any code in the same assembly, but not from another assembly. In other words, `internal` types or members can be accessed from code that is part of the same compilation

   ```csharp
   // First project (ASSEMBLY)
   public class Car
   {
       string name;
       internal int seats;
   }

   public class Jeep
   {
       void Print()
       {
         Car myCar = new Car();
         Console.WriteLine(myCar.seats);
         Console.WriteLine(myCar.name);
       }
   }

   // Second project (ASSEMBLY)
   class Program
   {
     static void Main(string[] args)
     {
       Car myCar = new Car();
       Console.WriteLine(myCar.seats); // Error. The number variable is inaccessible due to its protection level.
       // The Program class in second project can't access the internal members from another project
     }
   }
   ```

5. `protected internal`: The type or member can be accessed by any code in the assembly in which it's declared, or from within a derived `class` in another assembly.

   ```csharp
   //First Project (ASSEMBLY)
   public class NumberClassInFirstProject
   {
       protected internal int number = 10; //we can access this variable inside this class
   }
   class ProgramInFirstProject
   {
       void Print()
       {
           NumberClassInFirstProject num = new NumberClassInFirstProject();
           Console.WriteLine(num.number); // This is OK. Anywhere in this project (assembly) we can access the number variable.
       }
   }
   //Second project (ASSEMBLY)
   class Program: NumberClassInFirstProject //Inheritance
   {
       void Print()
       {
           Console.WriteLine(number); //This is OK as well. The class Program derives from the NumberClassInFirstProject clas.
       }
   }
   ```

6. `private protected`: The type or member can be accessed by types derived from the class that are declared within its containing assembly.

Summary:

| Caller's location                      | `public` | `protected internal` | `protected` | `internal` | `private protected` | `private` |
| -------------------------------------- | :------: | :------------------: | :---------: | :--------: | :-----------------: | :-------: |
| Within the class                       |   yes    |         yes          |     yes     |    yes     |         yes         |    yes    |
| Derived class (same assembly)          |   yes    |         yes          |     yes     |    yes     |         yes         |     -     |
| Non-Derived class (same assembly)      |   yes    |         yes          |      -      |    yes     |          -          |     -     |
| Derived class (different assembly)     |   yes    |         yes          |     yes     |     -      |          -          |     -     |
| Non-Derived class (different assembly) |   yes    |          -           |      -      |     -      |          -          |     -     |

Defaults:

- By default classes, interfaces, records, and structs declared directly within a namespace can be either `public` or `internal`. **`internal` is default** if no access modifier is specified.

- Class and struct members, including nested classes and structs, have `private` access by default.

- Interface members are `public` by default.

- Struct members, including nested classes and structs, can be declared `public`, `internal`, or `private`.

- Class members, including nested classes and structs, can be `public`, `protected internal`, `protected`, `internal`, `private protected`, or `private`.

::: tip NOTE
Types or members with `internal` access specifier can be made available to other assemblies using `[assembly: InternalsVisibleTo("name")]`
:::

### Static

The `static` modifier keyword lets us declare that a member is not associated with any particular instance of the `class` this member is known as static member.

- The static member belongs to the itself rather than to a specific object.

Non-static class can contain static:

- Methods
- Fields
- Properties
- Events

_Example:_

```csharp
public class Counter
{
    private int _count;
    private static int _totalCount;

    public int GetNextValue()
    {
        _count += 1;
        _totalCount += 1;
        return _count;
    }

    public static int TotalCount => _totalCount;
}

Console.WriteLine(Counter.TotalCount);
```

- `_totalCount` keeps track of count across all the class instances

- The code that is declared static can only access other static members
- Static methods can be overloaded but not overridden, because they belong to the class, and not to any instance of the class.
- A `const` field behaves like `static`, as it belongs to the type, not to instances of the type

  - Because of this we cannot use `static const`
  - A `const` field can be accessed the same way `static` fields are accessed: `ClassName.MemberName`

- C# does not support static local variables (that is, variables that are declared in method scope).

Class defined as `static` can only contain static members. You cannot create instances of static classes

The following list provides the main features of a static class:

- Contains only static members

- Cannot be instantiated

- Is sealed (cannot be inherited)

- Cannot contain Instance Constructors

### Members

A class, struct or record can declare various kinds of members such as:

- Fields
- Constants
- Properties
- Methods
- Constructors
- Events
- Finalizers
- Indexers
- Operators
- Nested Types

### Fields

Fields are a kind of variable, but unlike local variable, whose scope and lifetime is determined by its containing method, a field is tied to its containing type.

- Use fields only for variables that have private or protected accessibility.

| `readonly`                                                | `const`                                        |
| --------------------------------------------------------- | ---------------------------------------------- |
| Runtime constant                                          | Compile time constant                          |
| Value of `readonly` field can be changed                  | Value of the `const` field can not be changed  |
| Value can be assigned in declaration and constructor part | Value can be only assigned in declaration part |
| Can be used with `static` modifiers                       | Cannot be used with `static` modifiers         |
| Value can be different for different objects              | Value is same for all objects                  |

### Properties

A property is a member that provides a flexible mechanism to read, write, or compute the value of a private field

- Properties can be used as if they are public data members, but they are actually special methods called accessors
- Marking class fields public and exposing to the external world is bad, as we will not have control over what gets assigned and returned. Properties help us to over come this issue

Property accessors:

- `get`: property accessor is used to return the property value
- `set`: property accessor is used to assign a new value
- `init`: (C# 9) property accessor is used to assign a new value only during object construction

- The `value` keyword is used to define the value being assigned by the `set` or `init` accessor.

Properties can be:

- _Read-write_: if they have both `get` and `set` accessor
- _Read-only_: if they have a `get` accessor but no `set` accessor. The value of the Property can be set in the constructor.
- _Write-only_: if they have a `set` accessor, but no `get` accessor

_Example:_

```csharp
public class Car
{
  private string _name;

  // This is called a Property with a "backing field"
  public string Name
  {
    get
    {
      return _name;
    }

    set
    {
      _name = value;
    }
  }

  // Without a "backing field"
  public string Name
  {
    get
    {
      return Name;
    }

    set
    {
      Name = value;
    }
  }
}
```

- A shorthand way to write a Property is using `=>` operator to create "expression-bodied" properties:

  ```csharp
  private string _name;

  public string Name {
    get => _name;
    set => _name = value;
  }
  ```

- Auto (properties) setter and getter: The above code can be written as (syntactic sugar provided by C# 3.0 compiler)

  ```csharp
  public class Car
  {
    public string Name { get; set; }
  }
  ```

- Create a "computed property" from other fields (setter is not needed):

  ```csharp
  public class Car
  {
    public string Description {
      get => $"{Name} made by {CompanyName}";
    }
  }
  ```

- _Example:_

  ```csharp
  public class Car
  {
    public string Name {
      get { return Name; }
      set {
        if (string.IsNullOrEmpty(value)) {
          throw new ArgumentException("Name cannot be empty");
        }

        Name = value;
      }
    }
  }
  ```

### Indexers

Indexers allow instances of a class or struct to be indexed just like arrays

- The indexed value can be set or retrieved without explicitly specifying a type or instance member.

- Indexers resemble properties except that their accessors take parameters.

- The `this` keyword is used to define the indexer
- The `value` keyword is used to define the value being assigned by the set accessor.

- Indexers do not have to be indexed by an integer value; it is up to you how to define the specific look-up mechanism.

- Indexers can be overloaded

- Indexers can have more than one formal parameter

```csharp
// Indexer declaration
public int this[int index]
{
    // get and set accessors
}

class SampleCollection<T>
{
   // Declare an array to store the data elements.
   private T[] arr = new T[100];

   // Define the indexer to allow client code to use [] notation.
   public T this[int i]
   {
      get { return arr[i]; }
      set { arr[i] = value; }
   }
}

class Program
{
   static void Main()
   {
      var stringCollection = new SampleCollection<string>();
      stringCollection[0] = "Hello, World";
      Console.WriteLine(stringCollection[0]);
   }
}
// The example displays the following output:
//       Hello, World.
```

### Constructor and Destructor (Finalizers)

A constructor is a special method of the class or struct which gets automatically invoked whenever a class or struct is created.

- A class or struct may have multiple constructors that take different arguments.

- Constructors enable the programmer to set default values, limit instantiation, and other instructions

- Constructor of a class must have the **same name as the class name** in which it resides.

- A constructor doesn't have any return type, not even void.

#### Types of Constructors

- Default Constructor: It is a parameterless constructor

  - Unless the class is static, classes without constructors are given a public parameterless constructor by the C# compiler in order to enable class instantiation.

  ```csharp
  class Geek {

    int num;
    string name;

    // this would be invoked while the
    // object of that class created.
    public Geek()
    {
      Console.WriteLine("Constructor Called");
    }
  }

  var geek = new Geek();

  // OUTPUT:
  // "Constructor Called"
  ```

- Parameterized Constructor: A constructor having at least one parameter

  ```csharp
  class Geek {

    int num;

    public Geek(int num)
    {
      this.num = num;
    }
  }
  ```

- Copy Constructor: This constructor creates an object by copying variables from another object.

  - Its main use is to initialize a new instance to the values of an existing instance.

  ```csharp
  class Geek {

    int num;

    // Instance constructor
    public Geek(int num)
    {
      this.num = num;
    }

    // Copy constructor
    public Geek(Geek g)
    {
      this.num = g.num;
    }
  }

  public static void Main()
  {

      // Create a new Geeks object.
      Geeks g1 = new Geeks(2018);

      // here is g1 details is copied to g2.
      Geeks g2 = new Geeks(g1);
  }
  ```

- Private Constructor: A constructor with private access modifier

  - It is generally used in classes that contain static members only
  - If the class only contains private constructors, then instances of this class cannot be created
  - It is the implementation of a singleton class pattern

  ```csharp
  class NLog
  {
      // Private Constructor:
      // The declaration of the empty constructor prevents the automatic generation of a parameterless constructor.
      private NLog() { }

      public static double e = Math.E;  //2.71828...
  }
  ```

- Static Constructor: A static constructor is used to initialize any static data, or to perform a particular action that needs to be performed only once

  - It is called automatically before the first instance is created or any static members are referenced.

  - There can be **only one static constructor**

  - **Cannot be a parameterized** constructor

  ```csharp
  class SimpleClass
  {
      // Static variable that must be initialized at run time.
      static readonly long baseline;

      // Static constructor is called at most one time, before any
      // instance constructor is invoked or member is accessed.
      static SimpleClass()
      {
          baseline = DateTime.Now.Ticks;
      }
  }
  ```

Constructor **Execution order for Parent-Child**:

1. Child Initializers (includes Static Constructors, fields)
2. Parent Initializers (includes Static Constructors, fields)
3. Parent Constructors
4. Child Constructors

#### Destructor (Finalizers)

Destructors (Finalizers) are used to perform any necessary final clean-up when a class instance is being collected by the garbage collector.

- Finalizers cannot be defined in structs. They are only used with classes.
- A class can only have one finalizer.
- Finalizers cannot be inherited or overloaded.
- Finalizers cannot be called. They are invoked automatically.
- A finalizer does not take modifiers or have parameters.

```csharp
class Car
{
    ~Car()  // finalizer
    {
        // cleanup statements...
    }
}
```

### Object Oriented Programming

C# is an object-oriented programming language.

The four basic principles of object-oriented programming are:

- Abstraction
- Encapsulation
- [Inheritance](#inheritance)
- [Polymorphism](#polymorphism)

Checkout [Object Oriented Programming](../../Concepts/Programming_Paradigms/Object-Oriented_Programming.md)

#### Inheritance

Inheritance allows you to define a child class that reuses (inherits), extends, or modifies the behaviours of a parent class.

- Base Class: The class whose members are inherited
- Derived Class: The class that inherits the members of the base class

Inheritance applies only to classes and interfaces, not structs, delegates and enums

**C# and .NET support single inheritance only**: a class can only inherit from a single class.

- However, inheritance is transitive (multi-level inheritance)
- C# supports multiple interface inheritance
- Multiple class inheritance problem is called as Diamond problem

Not all members of a base class are inherited:

- _Static constructors_, which initialize the static data of a class.

- _Instance constructors_, which you call to create a new instance of the class. Each class must define its own constructors.

- _Finalizers_, which are called by the runtime's garbage collector to destroy instances of a class.

##### Method Hiding

Derived classes can hide the inherited members by providing an alternate implementation:

- If the derived class has a method of same signature as the parent then the derived class method hides the base class method. To make the hiding explicit add the `new` keyword: `public new void PrintFullName()`

#### Polymorphism

Two distinct aspects of Polymorphism are:

- It allows you to invoke derived class methods through a base class reference during runtime
- Derived classes can override Base class methods

##### Method Overriding

It is the ability to redefine the implementation of a method in a Derived class that inherits from a Base Class.

When a method is overridden, the name and the parameters stay the same, but the implementation that gets called depends on the type of the object that's calling it.

Overriding is known as runtime (or dynamic) polymorphism because the type of the calling object is not known until runtime, and therefore the method implementation that runs is determined at runtime.

Base class can mark its methods that can be overridden, there are two types:

- Base class members must be marked as `virtual` for them to be overridden. Can be overridden.

- If the Base class members are marked as `abstract`, those members must be overridden by the derived class. Must be overridden.

##### Method Overriding vs Method Hiding

In method overriding a base class reference variable pointing to a child class object, will invoke the overridden method in the Child class

```csharp
public class BaseClass
{
  public virtual void Print()
  {
    Console.WriteLine("Base Class Print Method");
  }
}

public class DerivedClass : BaseClass
{
  public override void Print()
  {
    Console.WriteLine("Child Class Print Method");
  }
}

public class Program
{
  public static void Main()
  {
    BaseClass B = new DerivedClass();

    B.Print();
    // "Child Class Print Method"
  }
}
```

In method hiding a base class reference variable pointing to a child class object, will invoke the hidden method in the Base class

```csharp
public class BaseClass
{
  public virtual void Print()
  {
    Console.WriteLine("Base Class Print Method");
  }
}

public class DerivedClass : BaseClass
{
  public new void Print()
  {
    Console.WriteLine("Child Class Print Method");
  }
}

public class Program
{
  public static void Main()
  {
    BaseClass B = new DerivedClass();

    B.Print();
    // "Base Class Print Method"
  }
}
```

##### Method Overloading

It is the ability to have multiple methods within the same class with the same name, but with different parameters or different parameter order (signature).

Overloading is known as compile-time (or static) polymorphism because each of the different overloaded methods is resolved when the application is compiled.

### Sealed Class

### Abstract Class

An abstract class is an **incomplete class** and hence **cannot be instantiated**

- The `abstract` keyword is used to create an abstract class
- An abstract class can **only be used as base class**
- An abstract class **cannot be sealed**
- An abstract class _may contain abstract members_
- A **non-abstract class** derived from an abstract class **must provide implementations for all inherited abstract members**

Abstract class vs Interface:

-

### Partial Classes

It is possible to split the definition of a `class`, a `struct`, an `interface` or a method over two or more source files.

Each source file contains a section of the type or method definition, and all parts are combined when the application is compiled

_Example:_

```csharp
public partial class Employee
{
    public void DoWork()
    {
    }
}

public partial class Employee
{
    public void GoToLunch()
    {
    }
}
```

- Any members that are declared in a partial definition are available to all the other parts of the partial class

- All the parts must use the `partial` keyword
- All the parts must be available at compile time to form the final type
- All the parts must have the same accessibility (such as `public`, `private`,...)

- If any part is declared `abstract`, then the whole type is considered `abstract`
- If any part is declared `sealed`, then the whole type is considered `sealed`
- If any part declares a base type, then the whole type inherits that class.

- All partial-type definitions meant to be parts of the same type must be defined in the same assembly and the same module (.exe or .dll file)

## Structure

A structure type (or `struct` type) is a value type that can encapsulate data and related functionality.

Structure is a way to write custom value-type using the keyword `struct`

A `struct` type is similar to a `class` type in that it represents a structure with data members and function members. However, unlike classes, structs are value types and don't typically require heap allocation.

Struct types don't support user-specified inheritance, and all struct types implicitly inherit from type object.

- A struct can have most of the same features as a class; it can contain methods, fields, properties, constructors, and any of the other member types supported by classes, and we can use the same accessibility keywords, such as `public` and `internal`.

  ```csharp
  public struct Point
  {
      private double _x;
      private double _y;
      public Point(double x, double y)
      {
          _x = x;
          _y = y;
      }

      public double X => _x;
      public double Y => _y;
  }
  ```

- C# does not automatically support `==` for a `struct`
- If `==` is implemented then, `!=`, `Equals`, and `GetHashCode` must be implemented

  ```csharp
  public static bool operator ==(Point p1, Point p2)
  {
      return p1.X == p2.X && p1.Y == p2.Y;
  }

  public static bool operator !=(Point p1, Point p2)
  {
      return p1.X != p2.X || p1.Y != p2.Y;
  }

  public override bool Equals(object obj)
  {
      return obj is Point p2 && this.X == p2.X && this.Y == p2.Y;
  }

  public override int GetHashCode()
  {
      return (X, Y).GetHashCode();
  }
  ```

- `GetHashCode`: returns an `int` that in some sense represents the value of the type.

  - Useful when using hash tables
  - `GetHashCode` must fulfil 2 requirements:

    1. It should return the same value if called n number of times when its own value dose not change
    2. Two instances that have equal values according to their `Equals` methods, they must return the same hash code

  - The default implementation of `GetHashCOde` for reference types meets only 1st requirement

  - The default implementation of `GetHashCOde` for value types meet both requirement, but use reflection (which is slow). So, they are implemented by the user

::: tip NOTE
Structure should be used if the **instance size is under 16 bytes**
:::

### Class vs Struct

| `class`                                                                                                              | `struct`                                                    |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Reference type                                                                                                       | Value type                                                  |
| Stored on the Heap                                                                                                   | Stored on Stack                                             |
| Only the reference variable is destroyed after the scope is lost. The Object is later destroyed by garbage collector | Value type is destroyed immediately after the scope is lost |
| Destructor is present                                                                                                | Destructor is not present                                   |
| Can have parameter less constructor                                                                                  | Cannot have parameter less constructor                      |
| Supports Inheritance                                                                                                 | Dose not support Inheritance. Structs are sealed types      |
| Can inherit from an interface                                                                                        | Can inherit from an interface                               |

### Immutability

C# 7.2. it is possible to declare a `struct` as readonly (immutable) by adding the `readonly` keyword.

Read-only struct:

```csharp
public readonly struct Point
{
    public Point(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double X { get; }
    public double Y { get; }
    public double DistanceFromOrigin()
    {
        return Math.Sqrt(X * X + Y * Y);
    }
}
```

`readonly` keyword has two effects:

- C# compiler prevents modification either from outside or from within. Compiler will produce error is any fields are declared and if settable auto property is defined

- Optimization can be made by the compiler with the usage of `readonly`

## Interface

An `interface` type defines a contract as a named set of public members

- Just like classes, interfaces also contain properties, methods, delegates, or events.

- But only declarations and no implementations. Beginning with C# 8.0 we can define an implementation when you declare a member of an interface (usually a default implementation)

- Interface members are `public` by default. (C# 8.0 members can have access modifiers)

- Interface cannot contain instance data such as fields, auto-implemented properties, or property-like events.

- A `class` or `struct` that implements an `interface` must provide implementations of the interface's members.

- An `interface` may inherit from multiple base interfaces, and a `class` or `struct` may implement multiple interfaces.

- Interfaces can inherit from other interfaces. A class or struct that inherits from this interface must provide implementation for all interface members in the entire interface inheritance chain

- Instances of an interface cannot be created.

- An interface reference variable can point to a derived class object

- Interface Naming Convention: Interface names are prefixed with _capital I_

```csharp
interface IEquatable<T>
{
    bool Equals(T obj);
}
```

### Explicit Interface Implementation

- If a class implements two interfaces that contain a member with the same signature, then implementing that member on the class will cause both interfaces to use that member as their implementation.

- An explicit interface implementation doesn't have an access modifier since it isn't accessible as a member of the type it's defined in

```csharp
public interface IControl
{
    void Paint();
}
public interface ISurface
{
    void Paint();
}
public class SampleClass : IControl, ISurface
{
    // Both ISurface.Paint and IControl.Paint call this method.
    public void Paint()
    {
        Console.WriteLine("Paint method in SampleClass");
    }
}

// Usage
SampleClass sample = new SampleClass();
IControl control = sample;
ISurface surface = sample;

// The following lines all call the same method.
sample.Paint();
control.Paint();
surface.Paint();

// Output:
// Paint method in SampleClass
// Paint method in SampleClass
// Paint method in SampleClass
```

Explicit implementation:

```csharp
public class SampleClass : IControl, ISurface
{
    void IControl.Paint()
    {
        System.Console.WriteLine("IControl.Paint");
    }
    void ISurface.Paint()
    {
        System.Console.WriteLine("ISurface.Paint");
    }
}

// Usage
SampleClass sample = new SampleClass();
IControl control = sample;
ISurface surface = sample;

// The following lines all call the same method.
//sample.Paint(); // Compiler error.
control.Paint();  // Calls IControl.Paint on SampleClass.
surface.Paint();  // Calls ISurface.Paint on SampleClass.

// Output:
// IControl.Paint
// ISurface.Paint
```

## Attributes

Attributes provide a powerful method of associating metadata, or declarative information, with code (assemblies, types, methods, properties, and so forth). After an attribute is associated with a program entity, the attribute can be queried at run time by using a technique called [reflection](#reflection).

An attribute is a class that inherits from `System.Attribute` base class

Attributes have the following properties:

- Attributes add metadata to your program
- one or more attributes can be applied
- Attributes can accept arguments

There are several Pre-defined Attributes provided by .NET such as:

- `Obsolete`: Marks types and type members outdated
- `WebMethod`: To expose a method as an XML Web service method
- `Serializable`: Indicates that a class can be serialized

```csharp
[Serializable]
public class SampleClass
{
    // Objects of this type can be serialized.
}
```

Attribute Targets:

The target of an attribute is the entity which the attribute applies to (such as a class, method, or an entire assembly)

- By default, an attribute applies to the element that follows it
- To explicitly identify, whether an attribute is applied to a method, or to its parameter, or to its return value:

  ```csharp
  [target : attribute-list]
  ```

| Target value | Applies to                                                             |
| ------------ | ---------------------------------------------------------------------- |
| `assembly`   | Entire assembly                                                        |
| `module`     | Current assembly module                                                |
| `field`      | Field in a class or a struct                                           |
| `event`      | Event                                                                  |
| `method`     | Method or `get` and `set` property accessors                           |
| `param`      | Method parameters or `set` property accessor parameters                |
| `property`   | Property                                                               |
| `return`     | Return value of a method, property indexer, or `get` property accessor |
| `type`       | Struct, class, interface, enum, or delegate                            |

_Example:_

```csharp
// default: applies to method
[ValidatedContract]
int Method1() { return 0; }

// applies to method
[method: ValidatedContract]
int Method2() { return 0; }

// applies to parameter
int Method3([ValidatedContract] string contract) { return 0; }

// applies to return value
[return: ValidatedContract]
int Method4() { return 0; }
```

### Custom Attribute

Create a class that derives directly or indirectly from `System.Attribute`

```csharp
[System.AttributeUsage(System.AttributeTargets.Class |
                       System.AttributeTargets.Struct,
                       AllowMultiple = true)  // multiuse attribute
]
public class AuthorAttribute : System.Attribute
{
    private string name;
    public double version;

    public AuthorAttribute(string name)
    {
        this.name = name;
        version = 1.0;
    }
}


// Usage
[Author("P. Ackerman", version = 1.1)]
[Author("R. Koch", version = 1.2)]
class SampleClass
{
    // P. Ackerman's code goes here...
}
```

- `AuthorAttribute` is the attribute's name, `Attribute` suffix can be omitted from the name while using the attribute
- `name` is a positional parameter
- Any public read-write fields or properties are named parameters (in this case, `version`)
- Using `AttributeUsage` attribute we can specify the valid use cases, here this attribute is valid only on class and struct declarations
- `AllowMultiple` can make a custom attribute single-use or multiuse

## Reflection

Reflection provides objects (of type Type) that describe assemblies, modules, and types.

- Reflection is the ability of inspecting an assemblies metadata at runtime

You can use reflection to:

- Dynamically create an instance of a type

  - Late binding can be achieved by using reflection. We can use reflection to dynamically create an instance of a type, about which we don't have any information at compile time. So, reflection enables us to use code that is not available at compile time.

- Bind the type to an existing object
- Get the type from an existing object and invoke its methods
- Access its fields and properties.

Reflection enables to access attributes

- The classes that give access to the metadata of a running program are in the `System.Reflection` namespace.

_Example:_

```csharp
// Using Reflection to get information of an Assembly:
Assembly info = typeof(int).Assembly;
Console.WriteLine(info);

// Initialise t as typeof string
Type t = typeof(string);
Console.WriteLine("Name : {0}", t.Name);
```

::: tip NOTE
The C# keywords `protected` and `internal` have no meaning in Intermediate Language (IL) and are not used in the reflection APIs. The corresponding terms in IL are _Family_ and _Assembly_. To identify an `internal` method using reflection, use the `IsAssembly` property. To identify a `protected internal` method, use the `IsFamilyOrAssembly`.
:::

### Late Binding or Dynamic Binding

_Example:_

```csharp
private static void Main()
{
  Assembly executingAssembly = Assembly.GetExecutingAssembly();

  Type customerType = executingAssembly.GetType("Something.Customer");

  object customerInstance = Activator.CreateInstance(customerType);

  MethodInfo getFullNameMethod = customerType.GetMethod("GetFullName");

  string[] parameters = new string[2];

  parameters[0] = "Something";
  parameters[1] = "Tech";

  string fullName = (string)getFullNameMethod.Invoke(customerInstance, parameters);
}
```

## Exception Handling

An exception is an unforeseen error that occurs when a program is running

An exception is actually a class that derives from `System.Exception` class

- This class has several useful properties:

  - `Message`: Gets a message that describes that current exception

  - `StackTrace`: Provides the call stack to the line number in the method where the exception occurred

Don't catch an exception unless you can handle it and leave the application in a known state.

- If you catch `System.Exception`, re-throw it using the throw keyword at the end of the catch block.

### Try-Catch Block

Exception handling uses the `try`, `catch`, and `finally` keywords to try actions that may not succeed, to handle failures when you decide that it's reasonable to do so, and to clean up resources afterward

- A `try` block without a `catch` or `finally` block causes a compiler error.

- `finally`: block run when control leaves a `try` statement.

  - The transfer of control can occur as a result of normal execution, of execution of a `break`, `continue`, `goto`, or `return` statement, or of propagation of an exception out of the `try` statement.

_Syntax:_

```csharp
try
{
  // expressions that could cause an exception
}
catch (SomeSpecificException ex)
{
  // handle exception
}
finally
{
  // executed regardless of if an exception is thrown
  // use to release resources
}
```

Catch specific exceptions:

```csharp
public static void Main()
{
    try
    {
        // expressions that could cause an exception
    }
    catch (DivideByZeroException ex)
    {
        Console.Write("Cannot divide by zero. Please try again.");
    }
    catch (InvalidOperationException ex)
    {
        Console.Write("Not a valid number. Please try again.");
    }
    catch (FormatException ex)
    {
        Console.Write("Not a valid number. Please try again.");
    }
    catch(Exception ex)
    {
        Console.Write("Any exception that previous catch blocks didn't handle.");
    }
}
```

A `catch` block can specify the type of exception to catch.

- The type specification is called an _exception filter_
- The exception type should be derived from `Exception`
- The catch blocks are evaluated from top to bottom in your code, but only one catch block is executed for each exception that is thrown.

### Create Exception

Exceptions are created by using the `throw` keyword

Throw exceptions when:

- The method can't complete its defined functionality:

  ```csharp
  static void CopyObject(SampleClass original)
  {
      _ = original ?? throw new ArgumentException("Parameter cannot be null", nameof(original));
  }
  ```

- An inappropriate call to an object is made, based on the object state:

  ```csharp
  public class ProgramLog
  {
      FileStream logFile = null!;
      public void OpenLog(FileInfo fileName, FileMode mode) { }

      public void WriteLog()
      {
          if (!logFile.CanWrite)
          {
              throw new InvalidOperationException("Logfile cannot be read-only");
          }
          // Else write data to the log and return.
      }
  }
  ```

- When an argument to a method causes an exception:

  ```csharp
  static int GetValueFromArray(int[] array, int index)
  {
      try
      {
          return array[index];
      }
      catch (IndexOutOfRangeException ex)
      {
          throw new ArgumentException("Index is out of range", nameof(index), ex);
      }
  }
  ```

Create custom Exception filter class:

- Derive from `Exception` class
- The derived classes should define at least 4 constructors:

  - one parameterless constructor
  - one that sets the message property
  - one that sets both the Message and InnerException properties
  - one constructor that is used to serialize the exception.

- New exception classes should be serializable.

```csharp
[Serializable]
public class InvalidDepartmentException : Exception
{
    public InvalidDepartmentException() : base() { }
    public InvalidDepartmentException(string message) : base(message) { }
    public InvalidDepartmentException(string message, Exception inner) : base(message, inner) { }

    // A constructor is needed for serialization when an
    // exception propagates from a remoting server to the client.
    protected InvalidDepartmentException(System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}
```

Re-throwing an exception:

```csharp
try
{
    return Value[0];
}
catch (NullReferenceException e)
{
    throw;
}
```

## Pre-Processing Directives

C# doesn't have a full pre-processing stage like C, it has limited pre-processor directives.

### Compilation Symbols

`#define`: directive that lets you define a _compilation symbol_.

- These symbols are commonly used in conjunction with the `#if` directive to compile code in different ways for different situations.

  ```csharp
  #if DEBUG
      Console.WriteLine("Starting work");
  #endif
      DoWork();
  #if DEBUG
      Console.WriteLine("Finished work");
  #endif
  ```

- They can be defined in Visual Studio or by defining values in `<DefineConstants>` element of any `<PropertyGroup>`

There is another (better) way to handle which code to run during which mode of compilation, that is using an attribute defined by .NET class library called `ConditionalAttribute`

```csharp
[System.Diagnostics.Conditional("DEBUG")]
static void ShowDebugInfo(object o)
{
    Console.WriteLine(o);
}
```

### Region

`#region` and `#endregion` define a region inside the code that can be collapsed by the editor. They can be nested.

The compiler ignores these and throws error if a `#region` dose not have a corresponding `#endregion` directive.

### Others

- `#errors` and `#warnings` can be used to throw errors and warnings during compilation if certain criteria is met.

  ```csharp
  #if NETSTANDARD
    #error .NET Standard is not a supported target for this source file
  #endif
  ```

- `#line`: specifics the line number at which the actual error occurred

  ```csharp
  #line 123 "Foo.cs"
      intt x;
  ```

- `#pragma`: provides 2 features:

  - Disable selected compiler warnings
  - And also override the checksum values the compiler puts into the `.pdb` file

  ```csharp
  #pragma warning disable CS0168
      int a;
  ```

- `#nullable`: allows fine-grained control of the nullable annotation context

## Generics

Generic (C# 2.0) is a class which allows the user to define classes and methods with the placeholder

- Generics allow us to design classes and methods decoupled from the data types

By using a generic type parameter `T`, we can write a single class that other client code can use without incurring the cost or risk of runtime casts or boxing operations:

```csharp
// Declare the generic class.
public class GenericList<T>
{
    public void Add(T input) { }
}


class TestGenericList
{
    private class ExampleClass { }
    static void Main()
    {
        // Declare a list of type int.
        GenericList<int> list1 = new GenericList<int>();
        list1.Add(1);

        // Declare a list of type string.
        GenericList<string> list2 = new GenericList<string>();
        list2.Add("");

        // Declare a list of type ExampleClass.
        GenericList<ExampleClass> list3 = new GenericList<ExampleClass>();
        list3.Add(new ExampleClass());
    }
}
```

- Generic classes are extensively used by collection classes available in `System.Collections.Generic` namespace
- We can create generic interfaces, classes, methods, events, and delegates.

They provide:

- Reusability
- Type safety
- Efficiency

## Generic Collections

Generic collections allow users to create strongly typed collections that provide better type safety and performance than non-generic strongly typed collections.

### List Collection

Represents a strongly typed list of objects that can be accessed by index.

- Provides methods to search, sort, and manipulate lists.
- Unlike arrays, lists can grow in size automatically

```csharp
using System.Collections.Generic;

// Simple business object. A PartId is used to identify the type of part
// but the part name can change.
public class Part : IEquatable<Part>
{
    public string PartName { get; set; }

    public int PartId { get; set; }

    public override string ToString()
    {
        return "ID: " + PartId + "   Name: " + PartName;
    }
    public override bool Equals(object obj)
    {
        if (obj == null) return false;
        Part objAsPart = obj as Part;
        if (objAsPart == null) return false;
        else return Equals(objAsPart);
    }
    public override int GetHashCode()
    {
        return PartId;
    }
    public bool Equals(Part other)
    {
        if (other == null) return false;
        return (this.PartId.Equals(other.PartId));
    }
// Should also override == and != operators.
}


// Create a list of parts.
List<Part> parts = new List<Part>();

// Add parts to the list.
parts.Add(new Part() { PartName = "crank arm", PartId = 1234 });
parts.Add(new Part() { PartName = "chain ring", PartId = 1334 });
parts.Add(new Part() { PartName = "regular seat", PartId = 1434 });
parts.Add(new Part() { PartName = "banana seat", PartId = 1444 });
parts.Add(new Part() { PartName = "cassette", PartId = 1534 });
parts.Add(new Part() { PartName = "shift lever", PartId = 1634 });

parts.Count;
// 6

// Write out the parts in the list. This will call the overridden ToString method
// in the Part class.
foreach (Part aPart in parts)
{
    Console.WriteLine(aPart);
}

/*
ID: 1234   Name: crank arm
ID: 1334   Name: chain ring
ID: 1434   Name: regular seat
ID: 1444   Name: banana seat
ID: 1534   Name: cassette
ID: 1634   Name: shift lever
*/

// Check the list for part #1734. This calls the IEquatable.Equals method
// of the Part class, which checks the PartId for equality.
bool doseItContain = parts.Contains(new Part { PartId = 1734, PartName = "" }));
// Contains("1734"): False

// Determines whether the list contains elements that match the conditions defined
// by the specified predicate
bool doseItContain = parts.Exists(cust => cust.PartName.StartsWith("b"));
// True

// Insert a new item at position 2.
parts.Insert(2, new Part() { PartName = "brake lever", PartId = 1834 });

parts[3];
// 1434

// This will remove part 1534 even though the PartName is different,
// because the Equals method only checks PartId for equality.
parts.Remove(new Part() { PartId = 1534, PartName = "cogs" });

// This will remove the part at index 3.
parts.RemoveAt(3);

// Concat 2 lists
parts.AddRange(new List<Part>{});

// Get range of elements between indexes
parts.GetRange(2, 4);
```

- Sort, reverse a list of simple types

  ```csharp
  List<int> numbers = new List<int> { 1, 8, 7, 5, 2 };
  numbers.Sort();

  numbers.Reverse();
  ```

- To use `Sort`, `Reverse` on collection of complex type we need to implement `IComparable` interface that tells .NET on what bases to sort the items

  - The `CompareTo()` can return:

    - `> 0`: The current instance is greater than the object being compared with
    - `< 0`: The current instance is less than the object being compared with
    - `0`: The current instance is equal to the object being compared with

  ```csharp
  // public class Temperature : IComparable<Temperature>
  public class Temperature : IComparable
  {
      // The temperature value
      protected double temperatureF;

      // public int CompareTo(Temperature obj)
      public int CompareTo(object obj) {
          if (obj == null) return 1;

          Temperature otherTemperature = obj as Temperature;

          if (otherTemperature != null)
              return this.temperatureF.CompareTo(otherTemperature.temperatureF);
          else
            throw new ArgumentException("Object is not a Temperature");
      }

      public double Fahrenheit
      {
          get
          {
              return this.temperatureF;
          }
          set
          {
              this.temperatureF = value;
          }
      }

      public double Celsius
      {
          get
          {
              return (this.temperatureF - 32) * (5.0/9);
          }
          set
          {
              this.temperatureF = (value * 9.0/5) + 32;
          }
      }
  }
  ```

- Write custom `Sort` functionality by implementing `IComparer` interface

  - Exposes a method that compares two objects

  ```csharp
  using System.Collections;

  public class Example
  {
    public class ReverserClass : IComparer
    {
        // Call CaseInsensitiveComparer.Compare with the parameters reversed.
        int IComparer.Compare(Object x, Object y)
        {
            return ((new CaseInsensitiveComparer()).Compare(y, x));
        }
    }

    public static void Main()
    {
        // Initialize a string array.
        string[] words = { "The", "quick", "brown", "fox", "jumps", "over",
                          "the", "lazy", "dog" };

        // Display the array values.
        Console.WriteLine("The array initially contains the following values:" );
        PrintIndexAndValues(words);

        // Sort the array values using the default comparer.
        Array.Sort(words);
        Console.WriteLine("After sorting with the default comparer:" );
        PrintIndexAndValues(words);

        // Sort the array values using the reverse case-insensitive comparer.
        Array.Sort(words, new ReverserClass());
        Console.WriteLine("After sorting with the reverse case-insensitive comparer:");
        PrintIndexAndValues(words);
    }

    public static void PrintIndexAndValues(IEnumerable list)
    {
        int i = 0;
        foreach (var item in list )
          Console.WriteLine($"   [{i++}]:  {item}");

        Console.WriteLine();
    }
  }
  // The example displays the following output:
  //       The array initially contains the following values:
  //          [0]:  The
  //          [1]:  quick
  //          [2]:  brown
  //          [3]:  fox
  //          [4]:  jumps
  //          [5]:  over
  //          [6]:  the
  //          [7]:  lazy
  //          [8]:  dog
  //
  //       After sorting with the default comparer:
  //          [0]:  brown
  //          [1]:  dog
  //          [2]:  fox
  //          [3]:  jumps
  //          [4]:  lazy
  //          [5]:  over
  //          [6]:  quick
  //          [7]:  the
  //          [8]:  The
  //
  //       After sorting with the reverse case-insensitive comparer:
  //          [0]:  the
  //          [1]:  The
  //          [2]:  quick
  //          [3]:  over
  //          [4]:  lazy
  //          [5]:  jumps
  //          [6]:  fox
  //          [7]:  dog
  //          [8]:  brown
  ```

- One of the overloads of the `Sort()` method in `List` class expects `Comparison` delegate to be passed as an argument:

  ```csharp
  using System.Collections.Generic;

  public class Example
  {
      private static int CompareDinosByLength(string x, string y)
      {
          if (x == null)
          {
              if (y == null)
              {
                  // If x is null and y is null, they're
                  // equal.
                  return 0;
              }
              else
              {
                  // If x is null and y is not null, y
                  // is greater.
                  return -1;
              }
          }
          else
          {
              // If x is not null...
              //
              if (y == null)
                  // ...and y is null, x is greater.
              {
                  return 1;
              }
              else
              {
                  // ...and y is not null, compare the
                  // lengths of the two strings.
                  //
                  int retval = x.Length.CompareTo(y.Length);

                  if (retval != 0)
                  {
                      // If the strings are not of equal length,
                      // the longer string is greater.
                      //
                      return retval;
                  }
                  else
                  {
                      // If the strings are of equal length,
                      // sort them with ordinary string comparison.
                      //
                      return x.CompareTo(y);
                  }
              }
          }
      }

      public static void Main()
      {
          List<string> dinosaurs = new List<string>();
          dinosaurs.Add("Pachycephalosaurus");
          dinosaurs.Add("Amargasaurus");
          dinosaurs.Add("");
          dinosaurs.Add(null);
          dinosaurs.Add("Mamenchisaurus");
          dinosaurs.Add("Deinonychus");
          Display(dinosaurs);

          Console.WriteLine("\nSort with generic Comparison<string> delegate:");
          dinosaurs.Sort(CompareDinosByLength);
          Display(dinosaurs);
      }

      private static void Display(List<string> list)
      {
          Console.WriteLine();
          foreach( string s in list )
          {
              if (s == null)
                  Console.WriteLine("(null)");
              else
                  Console.WriteLine("\"{0}\"", s);
          }
      }
  }

  /* This code example produces the following output:

  "Pachycephalosaurus"
  "Amargasaurus"
  ""
  (null)
  "Mamenchisaurus"
  "Deinonychus"

  Sort with generic Comparison<string> delegate:

  (null)
  ""
  "Deinonychus"
  "Amargasaurus"
  "Mamenchisaurus"
  "Pachycephalosaurus"
  */
  ```

### Dictionary

A dictionary represents a collection of keys and values.

- Dictionary class is present in `System.Collections.Generic` namespace

- When creating a dictionary, we need to specify the type for key and value

- Dictionary provides fast lookups for values using keys

- **Keys in the dictionary must be unique**

- Get the number of key/value pairs contained in that dictionary using `Count` property

- Clear the dictionary using `Clear()` instance method

- LINQ can be used on a dictionary

```csharp
// Create a new dictionary of strings, with string keys.
//
Dictionary<string, string> openWith =
    new Dictionary<string, string>();

// Add some elements to the dictionary. There are no
// duplicate keys, but some of the values are duplicates.
openWith.Add("txt", "notepad.exe");
openWith.Add("bmp", "paint.exe");
openWith.Add("dib", "paint.exe");
openWith.Add("rtf", "wordpad.exe");

// The Add method throws an exception if the new key is
// already in the dictionary.
try
{
    openWith.Add("txt", "winword.exe");
}
catch (ArgumentException)
{
    Console.WriteLine("An element with Key = \"txt\" already exists.");
}

// The Item property is another name for the indexer, so you
// can omit its name when accessing elements.
Console.WriteLine("For key = \"rtf\", value = {0}.",
    openWith["rtf"]);

// The indexer can be used to change the value associated
// with a key.
openWith["rtf"] = "winword.exe";
Console.WriteLine("For key = \"rtf\", value = {0}.",
    openWith["rtf"]);

// If a key does not exist, setting the indexer for that key
// adds a new key/value pair.
openWith["doc"] = "winword.exe";

// The indexer throws an exception if the requested key is
// not in the dictionary.
try
{
    Console.WriteLine("For key = \"tif\", value = {0}.",
        openWith["tif"]);
}
catch (KeyNotFoundException)
{
    Console.WriteLine("Key = \"tif\" is not found.");
}

// When a program often has to try keys that turn out not to
// be in the dictionary, TryGetValue can be a more efficient
// way to retrieve values.
string value = "";
if (openWith.TryGetValue("tif", out value))
{
    Console.WriteLine("For key = \"tif\", value = {0}.", value);
}
else
{
    Console.WriteLine("Key = \"tif\" is not found.");
}

// ContainsKey can be used to test keys before inserting
// them.
if (!openWith.ContainsKey("ht"))
{
    openWith.Add("ht", "hypertrm.exe");
    Console.WriteLine("Value added for key = \"ht\": {0}",
        openWith["ht"]);
}

// When you use foreach to enumerate dictionary elements,
// the elements are retrieved as KeyValuePair objects.
Console.WriteLine();
foreach( KeyValuePair<string, string> kvp in openWith )
{
    Console.WriteLine("Key = {0}, Value = {1}",
        kvp.Key, kvp.Value);
}

// To get the values alone, use the Values property.
Dictionary<string, string>.ValueCollection valueColl =
    openWith.Values;

// The elements of the ValueCollection are strongly typed
// with the type that was specified for dictionary values.
Console.WriteLine();
foreach( string s in valueColl )
{
    Console.WriteLine("Value = {0}", s);
}

// To get the keys alone, use the Keys property.
Dictionary<string, string>.KeyCollection keyColl =
    openWith.Keys;

// The elements of the KeyCollection are strongly typed
// with the type that was specified for dictionary keys.
Console.WriteLine();
foreach( string s in keyColl )
{
    Console.WriteLine("Key = {0}", s);
}

// Use the Remove method to remove a key/value pair.
Console.WriteLine("\nRemove(\"doc\")");
openWith.Remove("doc");

if (!openWith.ContainsKey("doc"))
{
    Console.WriteLine("Key \"doc\" is not found.");
}

/* This code example produces the following output:

An element with Key = "txt" already exists.
For key = "rtf", value = wordpad.exe.
For key = "rtf", value = winword.exe.
Key = "tif" is not found.
Key = "tif" is not found.
Value added for key = "ht": hypertrm.exe

Key = txt, Value = notepad.exe
Key = bmp, Value = paint.exe
Key = dib, Value = paint.exe
Key = rtf, Value = winword.exe
Key = doc, Value = winword.exe
Key = ht, Value = hypertrm.exe

Value = notepad.exe
Value = paint.exe
Value = paint.exe
Value = winword.exe
Value = winword.exe
Value = hypertrm.exe

Key = txt
Key = bmp
Key = dib
Key = rtf
Key = doc
Key = ht

Remove("doc")
Key "doc" is not found.
*/
```

- Convert an array or list into dictionary:

  ```csharp
  Customer[] customer = new Customer[3];

  // 3 customers are added to the array

  // To convert an array to dictionary
  // provide the key and value
  Dictionary<int, Customer> dict = customer.ToDictionary(cust => cust.ID, cust => cust);
  ```

### Queue

Represents a first-in, first-out (FIFO) collection of objects.

- This class implements a generic queue as a circular array

- Queues and stacks are useful when you need temporary storage for information; that is, when you might want to discard an element after retrieving its value.

- Objects stored in a `Queue<T>` are inserted at one end and removed from the other.

- `Queue<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

The 3 main operations performed on a `Queue<T>`:

- `Enqueue` adds an element to the end of the `Queue<T>`.

- `Dequeue` removes the oldest element from the start of the `Queue<T>`.

- `Peek` peek returns the oldest element that is at the start of the `Queue<T>` but does not remove it from the `Queue<T>`.

_Example:_

```csharp
Queue<string> numbers = new Queue<string>();
numbers.Enqueue("one");
numbers.Enqueue("two");
numbers.Enqueue("three");
numbers.Enqueue("four");
numbers.Enqueue("five");

// A queue can be enumerated without disturbing its contents.
foreach( string number in numbers )
{
    Console.WriteLine(number);
}

/* This code example produces the following output:

one
two
three
four
five
*/

numbers.Dequeue()
//  'one'

numbers.Peek()
// Peek at next item to dequeue: two


// Create a copy of the queue, using the ToArray method and the
// constructor that accepts an IEnumerable<T>.
Queue<string> queueCopy = new Queue<string>(numbers.ToArray());


// Create an array twice the size of the queue and copy the
// elements of the queue, starting at the middle of the
// array.
string[] array2 = new string[numbers.Count * 2];
numbers.CopyTo(array2, numbers.Count);

// Create a second queue, using the constructor that accepts an
// IEnumerable(Of T).
Queue<string> queueCopy2 = new Queue<string>(array2);

// Contents of the second copy, with duplicates and nulls
foreach( string number in queueCopy2 )
{
    Console.WriteLine(number);
}


queueCopy.Contains("four")
// True

queueCopy.Clear();

queueCopy.Count
// 0
```

### Stack

Stack is a generic LIFO (Last In First Out) collection class.

- To insert an item at the top of the stack, use `Push()` method

- To remove and return the item that is present at the top of the stack, use `Pop()` method

## Asynchronous Programming

Using `Task` present in `System.Threading`:

- Instead of `void` return `Task`

- If some value is returned then return Task with that type, `string` will be written as `Task<string>`

- Methods that are async then append Async to the name of the function

- `Task.Run` makes methods async

  ```csharp
  public async Task DoSomethingAsync()
  {
    var data = await Task.Run(() => RunAndReturnSomething());
  }
  ```

- You can combine all async calls and wait for all of them to resolve. Parallel async:

  ```csharp
  public async Task DoSomethingAsync(List<string> input)
  {
    List<Task<string>> tasks = new List<Task<string>>();

    foreach (string item in input)
    {
      tasks.Add(Task.Run(() => RunAndReturnSomething(item)));
    }

    var data = await Task.WhenAll(tasks);
  }
  ```

- Get the progress of tasks using `IProgress`:

  ```csharp
  public class ProgressReportModel {
    public int PercentageComplete { get; set; }
    public List<string> ResultList { get; set; }
  }

  public async Task DoSomethingAsync(IProgress<ProgressReportModel> progress, List<string> input)
  {
    List<Task<string>> tasks = new List<Task<string>>();
    List<string> output = new List<string>();

    ProgressReportModel report = new ProgressReportModel();

    foreach (string item in input)
    {
      string result = await Task.Run(() => RunAndReturnSomething(item));
      output.Add(result);

      report.ResultList = output;
      report.PercentageComplete = (output.Count * 100) / input.Count;

      progress.Report(report);
    }
  }
  ```

### Multithreading

What is a Process:

- Process is what the operating system uses to facilitate the execution of a program by providing the resources required. Each process has a unique process Id associated with it
- Memory pages
- Each memory has its own memory space, one process cannot corrupt the memory space of another process

What is Thread:

- Thread is a light weight process. A process has at least one thread which is commonly called as _main thread_ which actually executes the application code. A single process can have multiple threads
- It is an unit of execution within a process
- Processor registers, Program counters, Stack pointers
- Threads within a process share memory address space, enables threads to communicate
- CPU uses Scheduler and Context Switch, PCB (Process Control Block)
- Context switching are costly, Fiber or Coroutines can be used to lower context switching costs but increase complexity

Advantages:

- To make efficient use of processor time while waiting for I/O operations to complete

- To split large, CPU-bound tasks to be processed simultaneously on a machine that has multiple processors/cores

Disadvantages:

- On a single processor/core machine threading can affect performance negatively as there is overhead involved with context-switching

- Have to write more lines of code to accomplish the same task

- Multithreaded applications are difficult to write, understand, debug and maintain

`Thread` class: Creates and controls a thread, sets its priority, and gets its status.

- Start a thread by supplying a delegate that represents the method the thread is to execute in its class constructor
- Call `Start()` to begin execution

```csharp
Public void btnTimeConsumingWork_Click()
{
  // create thread
  Thread workerThread = new Thread(DoTimeConsumingWork);

  // Start the execution
  workerThread.Start();
}
```

The `Thread` constructor can take either:

- If the method has no arguments, you pass a `ThreadStart` delegate to the constructor:

  ```csharp
  public delegate void ThreadStart()
  ```

- If the method has an argument, you pass a `ParameterizedThreadStart` delegate to the constructor:

  ```csharp
  public delegate void ParameterizedThreadStart(object obj)
  ```

  - This is not type safe as parameters need to be `object`
  - To pass data to the `Thread` function in a type safe manner, encapsulate the thread function and the data it needs in a helper class and use the `ThreadStart` delegate to execute the thread function

- Retrieve data from `Thread` function using callback method

_Example:_

```csharp
using System;
using System.Threading;

// Simple threading scenario:  Start a static method running
// on a second thread.
public class ThreadExample {
    // The ThreadProc method is called when the thread starts.
    // It loops ten times, writing to the console and yielding
    // the rest of its time slice each time, and then ends.
    public static void ThreadProc() {
        for (int i = 0; i < 10; i++) {
            Console.WriteLine("ThreadProc: {0}", i);
            // Yield the rest of the time slice.
            Thread.Sleep(0);
        }
    }

    public static void Main() {
        Console.WriteLine("Main thread: Start a second thread.");
        // The constructor for the Thread class requires a ThreadStart
        // delegate that represents the method to be executed on the
        // thread.  C# simplifies the creation of this delegate.
        Thread t = new Thread(new ThreadStart(ThreadProc));

        // Start ThreadProc.  Note that on a uniprocessor, the new
        // thread does not get any processor time until the main thread
        // is preempted or yields.  Uncomment the Thread.Sleep that
        // follows t.Start() to see the difference.
        t.Start();
        //Thread.Sleep(0);

        for (int i = 0; i < 4; i++) {
            Console.WriteLine("Main thread: Do some work.");
            Thread.Sleep(0);
        }

        Console.WriteLine("Main thread: Call Join(), to wait until ThreadProc ends.");
        t.Join();
        Console.WriteLine("Main thread: ThreadProc.Join has returned.  Press Enter to end program.");
        Console.ReadLine();
    }
}
```

- `Thread.Join`: Blocks the calling thread until the thread represented by this instance terminates, while continuing to perform standard COM and `SendMessage` pumping.

  - Join is particularly useful when we need to wait and collect result from a thread execution or if we need to do some clean-up after the thread has completed

- `IsAlive`: Gets a value indicating the execution status of the current thread.

Protecting shared resources:

- The output or behaviour of the program can become inconsistent if the shared resources are not protected from concurrent access in multithreaded program

- Using `Interlocked.Increment()` method: increments a specified variable and stores the result, as an atomic operation

  ```csharp
  public void AddOneMillion()
  {
    for (int i = 1; i <= 100000; i++)
    {
      Interlocked.Increment(ref Total);
    }
  }
  ```

- `lock` statement: a mechanism that synchronizes access to objects

  ```csharp
  object _lockObject = new object();

  lock(_lockObject)
  {
    Total++;
  }
  ```

  - less performant than `Interlocked`
  - `lock` is the shortcut for `Monitor.Entry` with try and finally

    ```csharp
    Monitor.Enter(_lockObject);

    try
    {
      Total++;
    }
    finally
    {
      Monitor.Exit(_lockObject);
    }
    ```

#### Deadlocks

Resolving Deadlocks:

- Acquiring locks in a specific defined order
- Mutex class
- `Monitor.TryEnter()` method

## Yield

When you use the `yield` contextual keyword in a statement, you indicate that the method, operator, or `get` accessor in which it appears is an iterator.

- It returns an object that implements the `IEnumerable<T>` interface
- It helps to do stateful iteration.

```csharp
yield return <expression>;
yield break;
```

_Example:_

```csharp
public class PowersOf2
{
    static void Main()
    {
        // Display powers of 2 up to the exponent of 8:
        foreach (int i in Power(2, 8))
        {
            Console.Write("{0} ", i);
        }
    }

    public static System.Collections.Generic.IEnumerable<int> Power(int number, int exponent)
    {
        int result = 1;

        for (int i = 0; i < exponent; i++)
        {
            result = result * number;
            yield return result;
        }
    }

    // Output: 2 4 8 16 32 64 128 256
}


// Example 2:
public void Consumer()
{
    foreach(int i in Integers())
    {
        Console.WriteLine(i.ToString());
    }
}

public IEnumerable<int> Integers()
{
    yield return 1;
    yield return 2;
    yield return 4;
    yield return 8;
    yield return 16;
    yield return 16777216;
}
```

## Built-In Classes

Commonly used built-in classes

### Console Class

- `Console.Write("text")`: Prints and keeps cursor on the same line
- `Console.WriteLine("text")`: Prints and puts cursor on the next line
- `Console.Read()`: Takes a single input of type string and it returns the ASCII value of that input
- `Console.ReadLine()`: Takes a string or integer input and returns it as the output value
- `Console.ReadKey()`: Takes a single input of type string and it returns the Key info

- Change console colour:

```csharp
// clear the console so that the colours are applied to the whole console
Console.Clear()
Console.ForegroundColor = ConsoleColor.Red;
Console.BackgroundColor = ConsoleColor.DarkGreen;
```

### DateTime

- Working with date and time

  ```csharp
  // 10/18/2021 11:43:01 PM
  DateTime dateTime = DateTime.Now;
  ```

- New in C# 10.0:

  - `DateOnly`:

    ```csharp
    // 10/18/2021
    DateOnly dateOnly = DateOnly.FromDateTime(DateTime.Now);
    ```

  - `TimeOnly`:

    ```csharp
    // 11:45 PM
    TimeOnly timeOnly = TimeOnly.FromDateTime(DateTime.Now);
    ```

## Code Style

[Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)

- `Microsoft.CodeAnalysis.NetAnalyzers`: Analyser for code quality and style issues (VS 2019, .NET 5+)
- `Microsoft.CodeAnalysis.FxCopAnalyzers`: Old no longer maintained analyser

Steps in .NET 5+:

1. Enable analyser:

   ```xml
   <PropertyGroup>
     <EnableNETAnalyzers>true</EnableNETAnalyzers>
   </PropertyGroup>
   ```

2. Set analysis mode:

   ```xml
   <PropertyGroup>
     <AnalysisMode>Recommended</AnalysisMode>
   </PropertyGroup>

   <!-- OR -->

   <PropertyGroup>
     <AnalysisMode>All</AnalysisMode>
   </PropertyGroup>

   <!-- OR -->

   <PropertyGroup>
     <AnalysisMode>Recommended</AnalysisMode>
     <AnalysisModeGlobalization>None</AnalysisModeGlobalization>
     <AnalysisModeSecurity>All</AnalysisModeSecurity>
   </PropertyGroup>
   ```

3. Set analysis level:

   ```xml
   <PropertyGroup>
     <AnalysisLevel>5.0-recommended</AnalysisLevel>
   </PropertyGroup>
   ```

4. Control individual rule, add in `.editorconfig`:

   ```javascript
   // Disable rule CA1303
   dotnet_diagnostic.CA1303.severity = None;

   // set it to warning
   dotnet_diagnostic.CA1303.severity = Silent;
   ```

## References

- Coding standard: [dofactory webpage](https://www.dofactory.com/csharp-coding-standards)

### Best Practices

Usefulness:

- Standards and conventions
- Consistent look to code
- Understand code quickly (by assumptions made based on previous experience)
- Facilitate copying, changing, and maintaining the code

Project Setup:

- UI Layer --> Business Logic Layer --> Data Layer

Class:

- Pascal Case naming convention
- Add XML documentation

### Useful Libraries

- `BenchmarkDotNet`: Powerful .NET library for benchmarking

- `Entity Framework` (write using this):

  - `Dapper` (read using this): A simple object mapper for .Net

- `Newtonsoft.Json`: Popular high-performance JSON framework for .NET

- `xUnit.net`: Unit testing tool for the .NET Framework

- `Fluent Assertions`: Assertion framework

  - `Shouldly`

- `AutoMapper`: A convention-based object-object mapper in .NET.

- `Moq`: The most popular and friendly mocking framework for .NET

  - `NSubstitute`: A friendly substitute for .NET mocking libraries
  - `FakeItEasy`: The easy mocking library for .NET

- `FluentValidation`: A popular .NET validation library for building strongly-typed validation rules.

- `Autofac`: is an addictive Inversion of Control container

  - `Scrutor`: Assembly scanning and decoration extensions for Microsoft.Extensions.DependencyInjection. (Alternative to `autofac` register by convention)

- `Polly`: Resilience and transient-fault-handling library that allows developers to express policies such as Retry, Circuit Breaker, Timeout, Bulkhead Isolation, and Fallback in a fluent and thread-safe manner.

- `Serilog`: Structured data Logging system (`log4NET`: old)
- `Seq`: Machine data for humans

- `AutoFixture`: Automate non-relevant Test Fixture Setup
- `Bogus`: A simple fake data generator for C#, F#, and VB.NET. Based on and ported from the famed `faker.js`

- `Noda Time`: A better date and time API for .NET

- `MediatR`: Simple, unambitious mediator implementation in .NET

  - `Brighter`: Command Processor & Dispatcher implementation with support for task queues that can be used as a lightweight library.

- `refit`: The automatic type-safe REST library

  - `RestSharp`: REST API client library for .NET

- `Quartz.NET`: Open-source job scheduling system for .NET
- `Hangfire`: Perform background processing. No Windows Service or separate process required

- `SharpZibLib`: Working with **Zip**, **GZip**, **Tar** and **BZip2**

- `FluentEmail`: All in one email sender

  - `MailKit`: For **IMAP**, **POP3**, and **SMTP**
  - `Papercut-SMTP`: The simple Desktop Email Server. Test email system in local

- `Html Agility Pack (HAP)`: HTML parser (web scraper) written in C# to read/write DOM and supports plain XPATH or XSLT.

- `EPPlus`: Excel spreadsheets

- `MassTransit`: Distributed application framework
