---
title: Object-Oriented Programming (OOP)
description: Object-oriented programming is a programming paradigm based on the concept of "objects"
---

# Object-Oriented Programming (OOP)

Object-oriented programming is a programming paradigm based on the concept of "[objects](#objects)", which can contain data and code: data in the form of fields, and code, in the form of procedures

Other programming paradigms:

- Logic Programming Language: Prolog
- Functional Programming Language: Haskell

To solve a problem:

- Analysis: Understand the problem
- Design: Plan your solution
- Programming: Build the solution

## Objects

Objects are instances of a [class](#classes). Objects are instantiated from Classes

- Attributes, properties, characteristics, state, fields, variables

All objects have:

- Identity: Olivia's coffee mug
- Attributes: colour, size, fullness
- behaviours: `fill()`, `empty()`, `clean()`

Objects are often referred to as Nouns:

- Things, People, Places, Ideas, Concepts

- Can "The" be placed in front of it: "The mug", "The bank account", "The time"

- Not verbs: "The texting", or "The ringing" as they describe the behaviour of an object, not the object itself

## Classes

Class is the code template for creating program [Objects](#objects)

- A Class can be used to create multiple objects
- A Class itself is not an Object

Class Components:

- Name (type): What is it? --> RoundCookie, Car

- Attributes (properties, data): What describes it? -->weight, colour, icing

- behaviour (operations): What can it do? --> `decorate()`, `consume()`

### Methods

A program procedure that can return a value

- Methods are functions that are defined as part of a class

- They can only access data known to it's object

## Fundamental Ideas

There are 4 fundamental ideas in OOP:

1. [Abstraction](#abstraction)
2. [Encapsulation](#encapsulation)
3. [Inheritance](#inheritance)
4. [Polymorphism](#polymorphism)

### Abstraction

Abstraction refers to only showing essential details and keep everything else hidden

- Modelling the relevant attributes and interactions of entities as classes to define an abstract representation of a system

- Interface and Implementation:

  - The interface refers to the way sections of code can communicate with one another. This typically is done through methods that each class can access
  - The implementation of these methods, or how these methods are coded, should be hidden

  - If classes are entangled, then one change creates a ripple effect that causes many more changes
  - Creating an interface through which classes can interact ensures that each piece can be individually developed
  - Abstraction allows the program to be worked on incrementally and prevents it from becoming entangled and complex
  - Determine specific points of contact that can act as an interface between classes, and only worry about the implementation when coding it

- Focus on essential qualities of something rather than one specific example

- Understanding the idea

- Discard what's unimportant

### Encapsulation

Encapsulation refers to bundling data with methods that can operate on that data within a class. Essentially, it is the idea of hiding data within a class, preventing anything outside that class from directly interacting with it

- Hiding the internal state and functionality of an object and only allowing access through a public set of functions.

- Keeps the programmer in control of access to data
- Prevents the program from ending up in any strange or unwanted states

- Containing the elements of an object, not just keep them together, but also protect them

- We bundle an object's attributes or data along with the methods that operate on that data within the same unit or the same class

- Restricting access to some of the object's components

- Black Box Testing: Closing off the inner workings of the cookie jar and only revealing specific inputs and outputs. You don't need to know how the 'request cookie' method is implemented under the hood to use it

- It's not about being secretive. It's about reducing dependencies between different parts of the application.

- Changes in one place won't cause a domino effect and require multiple changes elsewhere

### Inheritance

Inheritance is the principle that allows classes to derive from other classes

- Ability to create new abstractions based on existing abstractions.

- Base new object or class on an existing one
- Inherit the existing attributes and methods
- Great form of code reuse

- Superclass (Parent class) (Base class) --> Inherited by --> Subclass (Child class) (Derived class)

- Multiple Inheritance: Inherit from multiple Base classes (can get confusing). C++, Python

- Single Inheritance: Inherit from single Super class. Java, C#, Swift, Ruby

### Polymorphism

Polymorphism describes methods that are able to take on many forms.

- Ability to implement inherited properties or methods in different ways across multiple abstractions.

Polymorphism means having many forms

There are multiple form of polymorphism:

- Dynamic Polymorphism: Uses the same interface for methods on different types of objects

  - Occurs during the runtime of the program
  - Describes when a method signature is in both a subclass and a superclass
  - The methods share the same name but have different implementation
  - Overriding methods
  - Inherit from the same abstract class with same methods
  - Inheritance, abstract classes, and interfaces are all possible implementations of polymorphism

- Static (Compile-Time) Polymorphism: Uses method overloading:

  - Occurs during compile-time rather than during runtime
  - This refers to when multiple methods with the same name but different arguments are defined in the same class
  - This can done through method overloading. Despite the methods having the same name, their signatures are different due to their different arguments
  - Ways to differentiate methods of the same name:
    - Different number of parameters
    - Different types of parameters
    - Different order of parameters
  - Method overloading can cause trouble of you do not keep straight which parameters you need for which implementation. Calling the wrong method because not realizing different arguments types were passed
  - Implements multiple methods with the same name, but different parameters

## Unified Modeling Language (UML)

Standardized notation for diagrams to visualize object-oriented systems.

Class Diagram:

- Name
- Attributes
- behaviours

Structural diagrams:

- Class diagram
- Component diagram
- Deployment diagram
- Object diagram
- Package diagram
- Profile diagram

behavioural diagrams:

- Use case diagram
- Activity diagram
- State machine diagram
- Sequence diagram
- Communication diagram
- Interaction overview diagram
- Timing diagram

UML Tools: Things to consider:

- Commercial or open source
- Support platforms
- Diagram drawing capabilities
- Code generation capabilities

5-Step approach:

1. Gathering requirements to figure out what our application needs to do.

2. Describe the application. Build a narrative in plain, conversational language for how people will use it.

3. Identifying the most important objects, which is the starting point for identifying actual classes.

4. Describe the interactions between them, understanding each object's responsibilities, the behaviours they need to have, and when they interact with other objects.

5. And finally, create a class diagram, which serves as the main output from the five-step process.
