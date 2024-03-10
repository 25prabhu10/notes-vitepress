---
title: Design Principles
description: General guidelines that can guide your class structure and relationships
---

# Design Principles

General guidelines that can guide your class structure and relationships

- No standard catalog of principles
- Varies by domain

Fundamental Principles:

1. **[Encapsulate what varies](#encapsulate-what-varies)**

2. **[Favour composition](#favour-composition)** (over inheritance)

3. **[Loose coupling](#loose-coupling)**

4. **[Program to interfaces](#program-to-interfaces)**

5. **[SOLID Principles](#solid-principles)** (5 principles)

## Encapsulate What Varies

Identify the aspects of your application that vary and separate them from what stays the same

- If we have part of our design that is changing, say with every new requirement, well then we should encapsulate that part away from the rest of the design. Favour composition over inheritance

- **Underlines almost all design patterns** like Strategy, Adapter, Facade, Decorator, Observer, Singleton, etc.

_Example:_

- Pancake menu can be altered at any time without affecting the rest of our code

```csharp
public Pancake orderPancake(string type) {
  Pancake pancake;

  // types will vary over time
  // extract it out using any of the design patterns
  if (type.equals == 'classic') {
    pancake = new ClassicPancake();
  } else if (type.equals == 'blueberry') {
    pancake = new BlueberryPancake();
  } else if (type.equals == 'chocolate chip') {
    pancake = new ChocolateChipPancake();
  } else if (type.equals == 'banana') {
    pancake = new BananaPancake();
  }

  pancake.cook();
  pancake.plate();
  pancake.addButter();

  return pancake;
}

public class SimplePancakeFactory {
  public Pancake createPancake(string type) {
    Pancake pancake = null;

    if (type.equals == 'classic') {
      pancake = new ClassicPancake();
    } else if (type.equals == 'blueberry') {
      pancake = new BlueberryPancake();
    } else if (type.equals == 'chocolate chip') {
      pancake = new ChocolateChipPancake();
    } else if (type.equals == 'banana') {
      pancake = new BananaPancake();
    }

    return pancake;
  }
}
```

## Favour Composition

This principle warrants against overuse of inheritance and suggests composition as a powerful alternative for extending behaviour in our designs

- _HAS-A_ is better than _IS-A_

  - IS-A is an inheritance relationship: Dog is an animal
  - HAS-A is a relationship of composition: Dog has a owner

- Instead of inheriting behaviour, we can compose our objects with new behaviours

- Composition often gives us more flexibility, even allows behaviour changes at runtime

## Loose Coupling

Strive for loosely coupled designs between objects that interact

- Components should be independent, relying on knowledge of other components as little as possible

## Program to Interfaces

Keep our designs high-level and referring where possible to abstractions or interfaces and not concrete implementations

- Where possible, components should use abstract classes or interfaces instead of a specific implementation

- Allows you to better exploit polymorphism

## SOLID Principles

SOLID is mnemonic acronym for:

1. **S** - Single Responsibility Principle (SRP)
2. **O** - Open-Closed Principle (OSP)
3. **L** - Liskov Substitution Principle (LSP)
4. **I** - Interface Segregation Principle (ISP)
5. **D** - Dependency Inversion Principle (DIP)

> They are promoted by Robert C. Martin

SOLID principles are the design principles that enable us to manage most of the software design problems

- The principles are a subset of many principles promoted by Robert C. Martin
- The SOLID acronym was first introduced by Micheal Feathers

They can be used to resolve issues such as:

- Tight or strong coupling of the code with many other modules/applications

- Tight coupling causes time to implement any new requirement, features or any bug fixes and some times it creates unknown issues

- End up with a code which is not testable

- End up with duplication of code

- End up creating new bugs by fixing another bug

They help us to:

- Achieve reduction in complexity of code
- increase readability, extensibility and maintenance
- Reduce error and implement Re-usability
- Achieve better test-ability
- Reduce tight coupling

### Single Responsibility

_"A class should have only one reason to change"_ - Robert C. Martin

- One responsibility per class

- Every module or class should have responsibility over a single part of the functionality over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class

### Open-Closed

_"Software entities should be open for extension, but closed for modification"_ - Robert C. Martin

- **Open to extension** means adding subclasses as needed

- **Closed to modification** avoids tweaking the code to handle new situations

- The design and writing of the code should be done in a way that new functionality should be added with minimum changes in the existing code

- Composition helps in extension

### Liskov Substitution

_"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program"_ - Introduced by Barbara Liskov

- Object of some _Base class_ `S` can be replaced with objects of any _Derived class_ of `S`

- If a program module is using a Base class, then the reference to the Base class can be replaced with a Derived class without affecting the functionality of the program module

- We can also state that Derived types must be substitutable for their base types

- Constrains subclass design

- This helps design good polymorphism

- Designed by contract rather than wholely depending on inheritance

### Interface Segregation

_"Many client-specific interfaces are better than one general-purpose interface"_ - Robert C. Martin

- No client should be forced to depend on methods it dose not use

- Cohesion: How strong are the relationships between an interface's methods?

- Cohesion is a quality of an interface; highly cohesive interfaces have methods related to one another. Low cohesion interfaces have many, unrelated methods

- We should not enforce clients to implement interfaces that they don't use. Instead of creating one big interface we can break down it to smaller interfaces

- Classes depend on the smallest interface

  - The fewest methods and attributes

- Helps design good classes

- Helps write unit test cases

### Dependency Inversion

One should _"depend upon abstractions, not concretions"_

- A direct dependency on a concrete class needs to be inverted to be indirect

- Abstractions should not depend on the details whereas the details should depend on abstractions

- Depend on abstract classes or interfaces

- High-level modules should not depend on low level modules

- Avoid concrete class name dependencies

## DRY Principle

DRY - Don't Repeat Yourself

## GRASP

GRASP - General Responsibility Assignment Software Principles
