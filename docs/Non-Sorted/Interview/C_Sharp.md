# C Sharp

OOPs:

1. What is Object-Oriented Programming?

2. What are the main features of OOPs? Can you please briefly explain them?

   - **Encapsulation**: Data hiding and Data binding
   - **Polymorphism**: Multiple forms, Compile and runtime polymorphism
   - **Inheritance**:
   - **Abstraction**:

3. What are the **SOLID** Principles?

   - S - **Single Responsibility Principle**: Each and every class in your project should have one, and only one responsibility.

   - O - **Open Closed Principle**: Entities in your software system should be open for extension, but closed for modification.

   - L - **Liskov Substitution Principle**: Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.

   - I - **Interface Segregation Principle**: Clients should not have to implement interfaces that they don't use.

   - D - **Dependency Inversion Principle**: High level modules should not depend on lower level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

4. How Design Principles are different from Design Patterns?

   - Principles are best practices to follow to allow scalable architecture and software craftmanship.

   - Design patterns are techniques about how to do the design and architect your code

5. What is Inversion of Control (IoC)?

   - Inversion of Control is a principle in software engineering which transfers the control of objects or portions of a program to a container or framework.

6. What is is Loose Coupling?

   - Is achieved by means of a design that promotes single-responsibility and separation of concerns.

   - A loosely-coupled class can be consumed and tested independently of other classes.

   - If the only knowledge that class A has about class B, is what class B has exposed through its interface, then class A and class B are said to be loosely coupled.

   - The _Interfaces_ are a powerful tool to use for loose coupling or decoupling.

## Important C# topics

1. What is C# and .NET Framework?

   - The .Net framework is a software development platform developed by Microsoft. The framework was meant to create applications, which would run on the Windows Platform. The first version of the .Net framework was released in the year 2002.

   - C# is an elegant and type-safe object-oriented language that enables developers to build a variety of secure and robust applications that run on the .NET Framework.

2. The components of .NET Framework , CTS (Common Type System), and CLS (Common Language Specification),

3. The purpose of the Main method in Console application.

4. Data types and their purpose?

5. C# keywords and identifiers.

6. Decision making using `if-else`, `switch` and looping using `for`, `while`, `do..while` and `foreach` loop.

7. What is meant by pass by value and pass by reference? How can we pass arguments as reference in C#?

   - `out`, `ref`, `params`, `in`

8. Arrays in C#, Array initialization syntax, Arrays as parameters and arguments or return values of a method.

9. `enums` and `System.Enum` type.

10. `struct` and `class`.

11. value types and reference types.
12. optional and named argument.
13. null, nullable types and the use of ?? operator.
14. a class, object, and new keyword.
15. constructors, `this` keyword, `static` keyword and access modifiers.
16. encapsulation using properties (backing field) and auto-implemented properties.
17. read-only fields and `const` fields.
18. sealed and partial classes.
19. Inheritance: base keyword, sealed classes and using access modifiers.
20. polymorphism: compile time and runtime polymorphism using overloading and overriding with virtual and override keywords.
21. `System.Object`, `ToString()` and other methods.
22. Interfaces: Interface types vs. abstract base classes.
23. how to obtain interface reference and using as and a keyword for checking and type casting purposes.
24. Implicit and explicit implementations of interfaces.
25. `IEnumerable` and `IEnumerator` interface and the use of `foreach` and in keywords.
26. how to iterator over `IEnumerable<T>` using yield keyword.
27. `ICloneable` and `IComparable` interfaces.
28. Exception Handling: `try..catch` block, `System.Extension` base `class`, Important properties of the Exception class, `System.System.Exception`, `System.Application.Exception`.
29. Collection and Generics.
30. Delegates and Lambda expressions, Generic Delegates, Anonymous Methods.
31. operator overloading.
32. Indexers.
33. Extension methods and Anonymous types.
34. Garbage Collection, `System.GC` type, `IDisposable` interface and Dispose method.
35. multi-threading, `async` and `await` keywords.
36. File I/O and object serialization.
37. Implicit-Type variables.
38. Auto implemented properties.
39. Delegates.
40. Lambda expressions.
41. Popular data structures in C#?

    - Array
    - ArrayList
    - `List<T>`
    - Hashtable
    - Dictionary
    - SortedList

    - [Fundamental Data Structures and Algorithms in C#](https://dev.to/adavidoaiei/fundamental-data-structures-and-algorithms-in-c-4ocf)

42. What is CLR?
43. Does C# support multiple inheritance?

- No

## LINQ

1. Have you used Language Integrated Query (LINQ)? Explain what is LINQ? Why is it required?

   - LINQ is the collection of standard query operators which provides query facilities into.NET framework language like C#, VB.NET.

   - It bridges the gap between the world of data and the world of objects.

2. List some LINQ operators that you have used?

   - Projection Operators: `Select`, `SelectMany`
   - Filtering: `Where`, `OfType`
   - Grouping: `GroupBy`, `ToLookup`
   - Sorting: `OrderBy`, `OrderByDescending`, `ThenBy`, `ThenByDescending`

3. LINQ extension methods?

   - add methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type.

   - are static functions of a static class.

   - These methods can be invoked just like instance method syntax.
   - These methods are useful when we can not want to modify the class. Consider:

4. Explain how LINQ is useful than Stored Procedures?

   - Debugging: It is difficult to debug a stored procedure but as LINQ is part of.NET, visual studios debugger can be used to debug the queries

   - Deployment: For stored procedure, additional script should be provided but with LINQ everything gets compiled into single DLL hence deployment becomes easy

   - Type Safety: LINQ is type safe, so queries errors are type checked at compile time
