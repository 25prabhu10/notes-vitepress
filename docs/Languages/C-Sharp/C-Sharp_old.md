# Interfaces

- An interface is like a class, except that it only describes members. The implementation for those members comes from types that implement the interface.

## Function Members

1. Properties:

   - Properties are function members that encapsulate a piece of an object's state, such as a button's color or a label's text.

2. Methods

   - Are traditional functions.

3. Events

   - Events are function members that simplify acting on object state changes.

> Functions can be treated as values through the use of **delegates**, C# allows functions to be passed as values to and from other functions.

- And when calling a method with multiple out parameters, you can discard ones you're uninterested in with the underscore character:

  ```csharp
  SomeBigMethod (out _, out _, out _, out int x, out _, out _, out _);
  Console.WriteLine (x);
  ```

### Enumerations

```csharp
public enum Directions
{
 East = 1,
 West,
 North,
 South
}
// method 1
int direction = (int)Directions.North;
Console.WriteLine($"Direction: { direction }");
// method 2
Enum.TryParse("West", out Directions parsedDirections);
Console.WriteLine((int)parsedDirections);
```

- By default, the **1st** item has value "**0**", and the **next** has **1** and so on...

### Methods

- Access modifiers
- Return type
- Parameters
  - Call-by-value: `static void PrintNumber(int[] numbers){...}`
    - The original value remains unaffected.
  - Call-by-reference: `static void PrintNumber(params int[] numbers){...}`
    - The original value changes.

---

title: C# and Angular
description: C# and Angular interview questions.

---

## Object Orientated Paradigm

### Encapsulation

- Encapsulation means creating a boundary around an object, to separate its external (public) behaviour from its internal (private) implementation details.

## Class

- **Methods** are what an _object_ **does** (object's behaviour). **Fields** are what the _object_ **knows**.

  > _Objects_ are stored in computer's memory in **heap**.

- Class can be split up into different files by using **partial** keyword in the same _namespace_.

  File1.cs

  ```csharp
  namespace Pets {
      partial class Cat {
          public void Purr() {
              // statements
          }
      }
  }
  ```

  File2.cs

  ```csharp
  namespace Pets {
      partial class Cat {
          public void Meow() {
              // statements
          }
      }
  }
  ```

### static

- The **static** modifier makes an **item non-instantiable**.

- If **static** is applied to a **class** then that class **cannot be instantiated** using the _new_ keyword.

- If **static** is applied to a **var, method or property** of class then they can be **accessed without creating object** of the class, just use _className.propertyName_, _className.methodName_.

- **static class** [^task] must have **all** of it's **methods** to be **static** too.

  > _static method_ can only access other _static items_. and instance of a _non-static class_ cannot use its _static members_.

### Type Casting

- Changing an expression from one data type to another.

  ```csharp
  decimal myDecimal = 10;
  int myInt = (int)myDecimal;
  ```

- When a big value is cast into smaller one, C# will automatically wrap the value around.

  ```csharp
  int myDecimal = 365;
  byte myInt = (byte)myDecimal;
  // myInt will become 109 instead of 365, as byte can only hold upto 256
  ```

  > Note: To get wrapped value. Open calculator, switch to Scientific mode, and calculate 365 _Mod_ 256

- **+** (plus) operator when used between a _string_ and any _other type_, it converts the **other type** to **string**.

---

## Loops

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

---

## Conditional

### if/else

- It is used to execute certain statements only when the **conditions** that are set up **true**.

  ```csharp
  // if someValue is 24 then execute statement-1 else execute statement-2
  if (someValue == 24){
      // statement-1
  } else {
      // statement-2
  }
  ```

  > Note: When **conditional operators** (<, ==,...) are used to test two _variables_ or _values_, it's called performing a **conditional test**.

[^task]: _Learn about static constructor_
