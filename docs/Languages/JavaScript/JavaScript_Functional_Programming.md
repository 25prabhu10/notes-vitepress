---
title: Functional programming in JavaScript
description: An open source JavaScript task runner (build system).
---

# Functional programming in JavaScript

Functional programming is a programming paradigm

Main features are:

- **Pure functions**
- **Function composition**
- **Avoiding shared state**
- **Avoiding mutable data**
- **Avoiding side-effects**

JavaScript supports higher-order functions and functions are **first-class citizens**

A function is considered a first-class citizen when it can be **declared as a variable**, sent to functions **as arguments**, and **returned from functions**. This means that functions can do the same things that variables can do

Functions can be declared with `var`, `let`, or `const` keywords the same way variables are declared

## Imperative vs Declarative

Functional programming is a part of a larger programming paradigm: **declarative programming**

Declarative programming is a style of programming where applications are structured in a way that prioritizes describing **what should happen** over defining **how it should happen**

## Functional Concepts

### Immutability

In a functional program, data is immutable

- An **immutable object** is an object that **can't be modified** after it's created

In JavaScript, function **arguments are references** to the actual data. So, if the function changes or mutates the value of the argument, then the original data will also be mutated. This is not functional programming

```javascript
const a = Object.freeze({
  foo: "Hello",
  bar: "world",
  baz: "!",
});

a.foo = "Goodbye";
// Error: Cannot assign to read only property 'foo' of object Object
```

- `Object.freeze()` performs shallow freeze, hence nested objects are mutable

```javascript
const a = Object.freeze({
  foo: { greeting: "Hello" },
  bar: "world",
  baz: "!",
});

a.foo.greeting = "Goodbye";

console.log(`${a.foo.greeting}, ${a.bar}${a.baz}`);
```

- We can recursively freeze the object:

```javascript
const deepFreeze = (object) => {
  // retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
};

const obj2 = {
  internal: {
    a: null,
  },
};

deepFreeze(obj2);

obj2.internal.a = "anotherValue"; // fails silently in non-strict mode
obj2.internal.a; // null
```

- Using libraries such as [immutable.js - Immutable collections](https://github.com/immutable-js/immutable-js)

#### Objects

```javascript
function rateColor(color, rating) {
  color.rating = rating;
  return color;
}

console.log(rateColor(color_lawn, 5).rating); // 5
console.log(color_lawn.rating); // 5
```

In the above example, the value of the rating of the original `color_lawn` gets mutated.

```javascript
const rateColor = function (color, rating) {
  return Object.assign({}, color, { rating: rating });
};

console.log(rateColor(color_lawn, 5).rating); // 5
console.log(color_lawn.rating); // 0
```

In the above example, the value of the rating of the original `color_lawn` remains unaffected and we get a new object with the updated contents.

This is done with the help of `Object.assign`, which creates a new copy of the original object with all the new changes. Thus, keeping the original data unchanged.

#### Arrays

Arrays behave similarly to objects when passed as an argument to a function. Hence, changing the argument values directly should be avoided.

JavaScript provides functional Array methods that help in keep the original data unchanged.

- `Array.push` is not an immutable function. Instead we can use `Array.concat`:

  ```javascript
  const addColor = function (colorName, colors) {
    colors.push(colorName);
    return colors;
  };

  console.log(addColor("Glam Green", list).length); // 4
  console.log(list.length); // 4
  ```

  ```javascript
  const addColor = (title, array) => array.concat({ title });

  console.log(addColor("Glam Green", list).length); // 4
  console.log(list.length); // 3
  ```

### Pure Function

A pure function is a function that returns a value that's computed based on its arguments.

- Pure functions take at least one argument and **always return a value or another function**

- They **do not cause side effects**, set global variables, or change anything about application state

- They treat their **arguments as immutable data**

A pure function is a function which:

- Given the same inputs, always returns the same output (hence easy to test), and
- Has no side-effects

Example:

```javascript
const frederick = {
  name: "Frederick Douglass",
  canRead: false,
  canWrite: false,
};

// not a pure function
function selfEducate() {
  frederick.canRead = true;
  frederick.canWrite = true;
  return frederick;
}

selfEducate();
console.log(frederick);

// {name: "Frederick Douglass", canRead: true, canWrite: true}
```

In the above example, `selfEducate` function is not a pure function, as it dose not take any arguments, it dose not return a value or a function, and it also changes the variable outside of its scope

```javascript
const frederick = {
  name: "Frederick Douglass",
  canRead: false,
  canWrite: false,
};

const selfEducate = (person) => ({
  ...person,
  canRead: true,
  canWrite: true,
});

console.log(selfEducate(frederick));
console.log(frederick);

// {name: "Frederick Douglass", canRead: true, canWrite: true}
// {name: "Frederick Douglass", canRead: false, canWrite: false}
```

In the above example, `selfEducate` function is a pure function, as it takes an argument, returns a new object using the new _spread operator_ (`...`) without chaining the original data

> `non-determinism = parallel processing + mutable state` - Martin Odersky (creator of Scala)

### Function Composition

Function composition is the process of combining two or more functions in order to produce a new function or perform some computation

- For example, the composition `f . g` (the dot means "composed with") is equivalent to `f(g(x))` in JavaScript

Composition is putting two or more different things together, and getting the same "kind" of thing - a combination of the inputs - as a result.

```javascript
const both = compose(civilianHours, appendAMPM);

both(new Date());

const compose =
  (...fns) =>
  (arg) =>
    fns.reduce((composed, f) => f(composed), arg);
```

### Data Transformations

In functional programming even though data is immutable, data can be transformed from one to another, by producing transformed copies of the original data.

### Recursion

[Recursion](../../Concepts/Data-Structures_and_Algorithms/Algorithms/Recursion.md) is a technique that involves creating functions that recall themselves.

```javascript
const countdown = (value, fn) => {
  fn(value);
  return value > 0 ? countdown(value - 1, fn) : value;
};

countdown(10, (value) => console.log(value));
```

### Higher-Order Functions

They can take functions in as arguments or return functions or both

- [Closure](#closure)

```javascript

```

## Closure

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)

- A closure may be described as a combination of a function and the lexical environment in which it was declared

  - The lexical environment consists of any local variables in the function's scope when the function is created

- You have a closure when a function accesses variables defined outside of it

```javascript
function closuredFunc() {
  // variables declared here
  // are available to the closure

  function closure() {
    // some logic
  }
}
```

_Example:_ this code snippet contains a closure:

```javascript
function makeCounter() {
  var privateCounter = 0;

  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
}

var counter1 = makeCounter();
var counter2 = makeCounter();

counter1.value(); // returns 0
counter1.increment(); // adds 1
counter1.increment(); // adds 1
counter1.value(); // returns 2
counter1.decrement(); //subtracts 1
counter1.value(); // returns 1
counter2.value(); // returns 0
```

> Please check [Closure](https://whatthefuck.is/closure) for more info

- Structural sharing

## Currying

**Currying**: A function that will return a new function until it receives all it's arguments

_Example:_

```javascript
// curried function
function babyAnimals(name) {
  return function (otherName) {
    return `i love ${name} and ${otherName}`;
  };
}

const babyKoala = babyAnimals("koalas");

babyKoala("elephants"); // 'i love koalas and elephants'
babyKoala("flamingos"); // 'i love koalas and flamingos'
babyKoala("axolotls"); // 'i love koalas and axolotls'
```

> Currying refers to the process of transforming a function with multiple arity into the same function with less arity. The curried effect is achieved by binding some of the arguments to the first function invoke, so that those values are fixed for the next invocation
>
> In mathematics and computer science, currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument. For example, currying a function

## Reference

- [Functional JavaScript](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
