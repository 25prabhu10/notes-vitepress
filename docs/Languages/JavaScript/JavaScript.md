---
title: JavaScript
description: JavaScript is a lightweight, cross-platform, object-oriented computer programming language :)
---

# JavaScript

JavaScript is a lightweight, cross-platform, object-oriented computer programming language :)

Also JavaScript is a:

- High-Level

- Single-Threaded

- Garbage-Collected

- Interpreted or Just In Time Compiled

- [Prototype-Based Inheritance](#inheritance): Everything in JavaScript is an object. Each object holds a link to its prototype.

  ```javascript
  const Dog = { barks: true }
  const Pug = Object.create(Dog)
  Pug.barks // true
  ```

- Multi-Paradigm: You can use the Declarative Functional or Imperative Object-Oriented approach.

- Dynamic Weakly-Typed (data types become known at runtime)

- With a Non-Blocking Event Loop concurrency model

- Scripting Language (The programs in this language are called scripts)

Browser handles JavaScript, User Events, Render, Paint, Layout, and Reflow all in a single main thread

## Background

JavaScript was created by _Brendan Eich_

It is one of the 3 core elements of the web

1. [HTML](../HTML): The content (Noun)
2. [CSS](../CSS): Presentation of the content (Adjectives)
3. JavaScript: Interactions of the content (Verb)

### JavaScript And ECMAScript

_ECMAScript_ is the official name for JavaScript

- JavaScript means the programming language

- ECMAScript is the name used by the language specification. Therefore, whenever referring to versions of the language, people say ECMAScript (ES6)

- JavaScript is a trademark of Oracle Corporation, Mozilla has acquired a license to use the JavaScript name

> [FreeCodeCamp Article on JavaScript vs ECMAScript](https://www.freecodecamp.org/news/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5/)

### ECMAScript

- It was created to standardize JavaScript

- Browsers use ECMAScript to interpret JavaScript code

- ECMAScript provides the rules, details, and guidelines that a scripting language must contain to be considered part of ECMAScript.

- [The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm) contains the most in-depth, detailed and formalized information about JavaScript. It defines the language

- [TC39](https://github.com/tc39) is the committee for the "Standardization of the general purpose, cross platform, vendor-neutral programming language ECMAScript"

How features get accepted by TC39?

They are "proposed" to the committee by delegates, ideally with community support, and pass through phases:

- Stage 0: to be proposed
- Stage 1: accepted for consideration
- Stage 2: spec almost complete
- Stage 3: waiting for implementation
- Stage 4: accepted!

## JavaScript In HTML

1. JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag:

   - It is usually placed at the end of `body` element
   - Browsers read HTML document line by line and render it

   ```html
   <!doctype html>
   <html>
     <body>
       <p>Before the script...</p>

       <script>
         alert('Hello, world!')
       </script>

       <p>...After the script.</p>
     </body>
   </html>
   ```

2. **External Scripts**: JavaScript code can be written in a separate file and then attach it to HTML with the `src` attribute:

   ```html
   <script src="/path/to/script.js"></script>
   ```

Default behaviour of browser:

- The browser will download the HTML file and start parsing the HTML

- When it gets to the **script tag, browser will stop parsing the HTML** and starts downloading the JavaScript file

- Once the file is downloaded it will execute it and this may take some time

- The parsing of the HTML is stopped till the above steps are completed

- It is a bad user experience as no content is rendered to the user

- This is called **content or render blocking**

To overcome this issue, we can use:

- `async` attribute: This will tell the browser to not stop the HTML parsing and **download the file in the background**. But, once the JavaScript file is downloaded. It will be **executed immediately blocking the HTML rendering**

  - This can be used when you need to execute JavaScript and don't care about render blocking

  ```html
  <script async src="/path/to/script.js"></script>
  ```

- `defer` attribute: This will tell the browser to not stop the HTML parsing and **download the JavaScript file in the background**. Once the JavaScript file is downloaded browser will **wait for HTML parsing to be completed before executing** the file

  ```html
  <script defer src="/path/to/script.js"></script>
  ```

## Syntax

Syntactic principles of JavaScript:

```javascript
// two slashes start single-line comments

var x // declaring a variable

x = 3 + y // assigning a value to the variable `x`

foo(x, y) // calling function `foo` with parameters `x` and `y`

obj.bar(3) // calling method `bar` of object `obj`

// a conditional statement
// is `x` equal to zero?
if (x === 0) {
  x = 123
}

// defining function `baz` with parameters `a` and `b`
function baz(a, b) {
  return a + b
}
```

### Statements and Expressions

JavaScript has two major syntactic categories, **statements** and **expressions**:

- **Statements: do things**. A program is a sequence of statements. Here is an example of a statement, which declares (creates) a variable `foo`:

  ```javascript
  var foo
  ```

- **Expressions: produce values**. They are function arguments, the right side of an assignment, etc. Here's an example of an expression:

  ```javascript
  3 * 7
  // produces the value: 21
  ```

  - An expression is any valid unit of code that resolves to a value

The distinction between statements and expressions is best illustrated by the fact that JavaScript has two different ways to do **if-then-else** either:

- as a _statement_:

  ```javascript
  var x
  if (y >= 0) {
    x = y
  } else {
    x = -y
  }
  ```

- or as an _expression_:

  ```javascript
  var x = y >= 0 ? y : -y
  ```

::: tip NOTE

You can use the latter as a function argument (but not the former):

```javascript
myFunction(y >= 0 ? y : -y)
```

:::

Finally, wherever JavaScript expects a statement, you can also use an expression; for example:

```javascript
foo(7, 1)
```

- The whole line is a statement (a so-called _expression statement_), but the function call `foo(7, 1)` is an expression.

### Semicolons

Semicolons are optional in JavaScript. However, it is recommended to always include them otherwise, JavaScript can guess wrong about the end of a statement.

Semicolons terminate statements, but not blocks. There is one case where you will see a semicolon after a block:

- A function expression is an expression that ends with a block. If such an expression comes last in a statement, it is followed by a semicolon:

```javascript
// pattern: var _ = ___;
var x = 3 * 7

var f = function () {} // function expr. inside var decl.
```

## Variables

Variable is like a container that holds a value (a named storage for data)

```javascript
// variable with a name "age"
// that holds the value 25

let age = 25
```

There are two limitations on variable names in JavaScript:

1. The name must contain only letters, digits, or the symbols `$` and `_`
2. The first character must not be a digit

- The usual variable declaration rules apply here.
- camelCasing is preferred in JavaScript for variables.

### `var`, `let`, and `const`

1. `var`:

   - Can be reassigned
   - **Function scope**
   - **Avoid using it**

2. `let`:

   - Is similar to `var` in most ways, but its scope is limited to the block statement
   - **Block scope**

3. `const`:

   - Read-only, cannot be reassigned a value.
   - **Block scope**
   - We need to assign a value during the declaration of a `const`
   - As convention uppercase letters are used for constant variable name
   - Properties of objects can be reassigned a new value

     ```javascript
     const MY_OBJECT = { key: 'value' }
     MY_OBJECT.key = 'otherValue'
     ```

   - The contents of an array are also not protected

     ```javascript
     const MY_ARRAY = ['HTML', 'CSS']
     MY_ARRAY.push('JAVASCRIPT')

     console.log(MY_ARRAY) // logs ['HTML','CSS','JAVASCRIPT'];
     ```

- A variable declared by `let` or `const` has a so-called _temporal dead zone (TDZ)_

- Undeclared variables:

  ```javascript
  const bar = foo + 1
  // Uncaught ReferenceError: foo is not defined
  ```

::: danger UNDECLARED VARIABLE

If a value is assigned to an undeclared variable, then it will have a global scope even if it is done inside an enclosing function. **Please avoid this**.

```javascript
function app() {
  l = 'global'
}
console.log(l) // l has a global scope
```

:::

### Hoisting

JavaScript **Hoisting** refers to the process whereby the interpreter appears to **move the declaration of functions, variables or classes to the top of their scope**, prior to execution of the code

When JavaScript processes in execution context, it will put all the variables at the top i.e. hoist them to the top of the context

- Hoisting allows functions to be safely used in code before they are declared

- `var` variable that is hoisted is initialized by setting it to `undefined`

_Example:_

```javascript
// example 1
console.log(x === undefined) // true
var x = 3

// example 2
var myVar = 'my value'

;(function () {
  console.log(myVar) // undefined
  var myVar = 'local value'
})()
```

The above examples will be interpreted the same as:

```javascript
// example 1
var x
console.log(x === undefined) // true
x = 3

// example 2
var myVar = 'my value'

;(function () {
  var myVar
  console.log(myVar) // undefined
  myVar = 'local value'
})()
```

- In ES6, `let` and `const` **are hoisted but not initialized**

  ```javascript
  console.log(x) // ReferenceError
  let x = 3
  ```

```javascript
// works in browsers and Node.js (no errors)
function hoist(track) {
  if (track === 'Down With Disease') {
    var action = 'dance'
  } else {
    // eslint error: 'action' is already defined.  (no-redeclare)
    var action = 'skip'
  }

  return action
}
```

## Data Types

Primitives and Objects are the two lowest-level building blocks in JavaScript

Primitives are short-lived in most cases in the call stack, while objects are kept as references in the heap

- To determine the data type use `typeof` operator:

```javascript
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"
```

### Primitive Data Types

Primitives are immutable

There are 7 primitive data types in JavaScript:

1. **Number**: Floating point numbers for both decimals and integers.

   ```javascript
   let n = 123;
   n = 122.345;

   // octal integers: only digits 0 - 7
   octal = 0o; // or `0O`

   // Hexadecimal integers: 0-9 and a-f / A-F
   hex = 0xA; // or `0xa`
   ```

   - `Infinity`: represents the mathematical _Infinity_ **∞**. It is a special value that's greater than any number.

     ```javascript
     //
     console.log(Infinity)
     ```

   - `NAN`: represents a computational error. It is a result of an incorrect or an undefined mathematical operation

     ```javascript
     console.log('not a number' / 2) // NaN, such division is erroneous

     // Result is NaN if somewhere in a mathematical expression NaN is produced
     // except when
     NaN ** 0 // 1
     ```

   - `Number` object: has properties for numerical constants, such as maximum value, not-a-number, and infinity.

     ```javascript
     const biggestNum = Number.MAX_VALUE // ±1.7976931348623157e+308
     const smallestNum = Number.MIN_VALUE // ±5e-324
     const infiniteNum = Number.POSITIVE_INFINITY
     const negInfiniteNum = Number.NEGATIVE_INFINITY
     const notANum = Number.NaN
     ```

2. **String**: Sequence of characters, used for text

   ```javascript
   let str = 'Hello'
   let str2 = 'Single quotes are ok too'
   let phrase = `can embed another ${str}`
   ```

   - `startsWith`: Check if the string starts with the string passed as argument
   - `endsWith`: Check if the string ends with the string passed as argument
   - `includes`: Check if the string passed as argument is present
   - `repeat`: Repeat the string _n_ number of times

3. **Boolean**: Logical data type that can only be `true` or `false`

   ```javascript
   let nameFieldChecked = true // yes, name field is checked
   let ageFieldChecked = false // no, age field is not checked

   let isGreater = 4 > 1 // true
   ```

4. **Null**: It is an assignment value. Empty value assigned by the user. Also means 'non-existent', no value is present

   ```javascript
   let age = null

   typeof null
   // 'object'
   // :-(
   ```

5. **Undefined**: The meaning of `undefined` is "value is not assigned". Default value of a variable until a value is assigned to it (Data type of a variable that has no value assigned to it)

   ```javascript
   let age // undefined

   age = undefined // undefined

   typeof undefined
   // 'undefined'
   ```

6. **BigInt**: Represents numbers larger than (`2^53 - 1`) (that's `9007199254740991`) or less than `-(2^53 - 1)`

   ```javascript
   // the "n" at the end means it's a BigInt
   const hugeNum = 1234567890123456789012345678901234567890n

   typeof hugeNum
   // 'bigint'
   ```

7. **Symbol**: A `symbol` represents a unique identifier

   - Primitive data type (not an object)

   - Immutable

   - Not enumerable

   - Use symbols to create constants and be sure that they are always unique:

     ```javascript
     const COLOR_RED = Symbol('Red')
     const COLOR_ORANGE = Symbol('Orange')

     function getComplement(color) {
       switch (color) {
         case COLOR_RED:
           return COLOR_GREEN
         case COLOR_ORANGE:
           return COLOR_BLUE
         default:
           throw new Exception('Unknown color: ' + color)
       }
     }

     getComplement(COLOR_ORANGE)
     ```

   - Used as object keys, in [Iterators & Generators](#iterators-and-generators)

   - Symbols are often used to add unique property keys to an object that won't collide with keys any other code might add to the object, and which are hidden from any mechanisms other code will typically use to access the object

   - Characteristics of Symbol:

     - `Symbol.for("key")` call will always return the same Symbol for a given value of `"key"`

   ```javascript
   // create symbol via a factory function
   let id = Symbol()

   // id is a symbol with the description "id"
   id = Symbol('id')

   // Every symbol returned by Symbol() is unique
   Symbol('foo') === Symbol('foo') // false

   Symbol.for('foo') === Symbol.for('foo') // true

   Symbol.keyFor(Symbol.for('tokenString'))
   // "tokenString"

   // Symbols are primitive
   typeof Symbol('tokenString')
   // 'symbol'
   ```

### Objects

An object is a data structure that associate **a collection of key-value pairs**, which is similar to a [map](#maps) or hash map in other languages.

- We can say an object is a collection of properties, where each property associates a key to a value.

- Objects are mutable.

```javascript
const obj = {
  Name: 'Value', // one property
}
```

- _Name_ (Key) must be a unique name that looks like a string.
- _Value_ can be anything, a primitive, another object or function.

Everything is an object in JavaScript (well, almost everything), including:

- Arrays, functions, objects, dates, wrappers for numbers, strings, or boolean

- If a value is not a Primitive then it is an Object.

#### Object Creation

1. Object Constructor:

   - Constructor or Prototype is similar to Classes in other languages

   - Create an object using `new Object()`:

     ```javascript
     const obj = new Object()

     // two ways to set properties
     obj.name = 'Clown'
     obj['face'] = '🤡'
     ```

   - Using a constructor function one can customize the way the object is created. By convention the constructor function name is same as the object and is Capitalized. This function is similar to a class in other object-oriented programming languages. New object is created using the `new` keyword before the constructor function.

     ```javascript
     // constructor function
     function Zombie(name) {
       this.name = name || 'Zombie'
       this.reAnimated = Date.now()

       this.eatBrain = function () {
         return `${this.name} is hungry for 🧠`
       }
     }

     const obj = new Zombie('🧟‍♂️ Jeff')

     obj.eatBrain()
     // 🧟‍♂️ Jef is hungry for 🧠
     ```

     - The function `eatBrain` is redefined for every instance of `Zombie`

     - As JavaScript is [prototype](#object-inheritance) based we can avoid this by adding `eatBrain` to the `prototype`

     ```javascript
     function Zombie(name) {
       this.name = name || 'Zombie'
       this.reAnimated = Date.now()
     }

     Zombie.prototype.eatBrain = function () {
       return `${this.name} is hungry for 🧠`
     }

     const obj = new Zombie('🧟‍♂️ Jeff')

     obj.eatBrain()
     // 🧟‍♂️ Jef is hungry for 🧠

     console.log(obj)
     // {name: "🧟‍♂️ Jeff", reAnimated: 1664716920669}

     console.log(Object.getPrototypeOf(obj))
     // {eatBrain: ƒ ()}
     ```

     - From ES6, **[class](#class)** keyword can be used instead of the constructor function

2. Object Literal:

   ```javascript
   const obj = {
     name: 'Clown',
     face: '🤡',
     hello: function () {
       console.log(`hello ${this.name}`)
     },
   }

   console.log(obj.name) // Clown
   console.log(obj['face']) // 🤡
   ```

   - We can add variables into the object directly:

     ```javascript
     const spider = '🕷'
     const legs = 8

     // old way
     const obj = {
       spider: spider,
       legs: legs,
     }

     // new way (shorthand syntax)
     const obj = {
       spider,
       legs,
     }
     ```

   - We can destructure the object into variable:

     ```javascript
     const { spider, legs } = obj

     // new variable names
     const { spider: mySpider, legs: hasLegs } = obj
     ```

   - If there are multiple properties with same name (key), then the right most value will be assigned to the name (key):

     ```javascript
     const obj = {
       spider,
       legs,
       legs: 10,
       legs: 25,
     }

     console.log(obj.legs) // 25
     ```

   - Dynamically add property names by wrapping them in brackets `[]` and place an expression inside and it will compute that value when the object is created.

     ```javascript
     const spider = '🕷'
     const random = () => Math.random().toString(36).slice(-5)

     // shorthand syntax
     const obj = {
       spider,
       [random()]: true, // this name (key) is generated during object creation
     }

     console.log(obj) // { spider: '🕷', da9dl: true }
     ```

   - When a function lives on an object it's called a _method_. We can use getters and setters.

     ```javascript
     const obj = {
       spider,
       makeWeb: function () {
         console.log('Web Created')
       },
     }

     // shorthand syntax
     const obj = {
       spider,
       makeWeb() {
         console.log('Web Created')
       },
     }
     ```

   - `this` inside an object method refers to that object. But if the object method uses arrow function, then `this` refers to the global `this` context.

   - Chaining methods, `return this` in the method you want to chain. This will keep a reference to the same object.

     ```javascript
     const obj = {
       web: '',
       makeWeb() {
         this.web += '🕸🕸🕸'
         return this
       },
     }

     obj.makeWeb().makeWeb().makeWeb()

     console.log(obj.web) // 🕸🕸🕸🕸🕸🕸🕸🕸🕸
     ```

3. `create()` static method on `Object` class:

   - Not used for empty object.

   - It used to inherit properties of existing objects. i.e. Use existing object as a prototype to create a Prototype Chain.

   - If we console log `obj`, we will get an empty object `{}`. But if we console log `obj.dna` we get a result.

   - Here `dna` is like an invisible property on the new object `obj`.

   - This is because `dna` property exists on `obj` objects prototype.

     ```javascript
     const organism = {
       dna: Math.random(),
     }

     const obj = Object.create(organism)

     console.log(obj) // {}
     console.log(obj.dna) // 0.18536405128609768

     // get all the properties on prototype
     console.log(Object.getPrototypeOf(obj)) // { dna: 0.18536405128609768 }
     ```

   - We can add a property to the object using Object Define property. Using this method we can add setters, getters and other advanced options.

     ```javascript
     const obj = Object.create({})

     Object.defineProperty(obj, 'unicorn', {
       get: () => '🦄',
       value: 'value',
       writable: true,
       enumerable: false,
       configurable: true,
     })

     console.log(obj) // {}
     console.log(obj.unicorn) // 🦄

     // defining multiple properties with Object.defineProperties
     Object.defineProperties(obj, {
       firstKey: {
         value: 'first key value',
         writable: true,
       },
       secondKey: {
         value: 'second key value',
         writable: false,
       },
     })
     ```

#### Looping Through Objects

1. Using **For-In** loop, it loops over all of the enumerable properties and the prototypes of the object.

   ```javascript
   const obj = {
     comet: '☄',
     trex: '🦖',
   }

   for (k in obj) {
     console.log(k) // comet, trex
   }
   ```

2. Get the keys or values as an array, then loop through this array using **For** or **For-Each**.

   ```javascript
   const obj = {
     comet: '☄',
     trex: '🦖',
   }

   // loop through keys
   for (k of Object.keys(obj)) {
     console.log(k) // comet, trex
   }

   // loop through values
   for (v of Object.values(obj)) {
     console.log(v) // ☄, 🦖
   }

   // loop through both keys and values at a time
   for (const [k, v] of Object.entries(obj)) {
     console.log(k, v) // comet ☄, trex 🦖
   }
   ```

- You can mutate the key-value of an object even if it's defined as a constant variable.

- Literal syntax is mostly used for object creation.

#### Object References (Object Copying)

- Copying value from one primitive to another, will create a new primitive variable. Thus changing the value of the first variable will not effect the second variable .

  ```javascript
  let a = 'a'
  let b = a

  console.log(a, b) // a a

  a = 'b'

  console.log(a, b) // b a
  ```

- If an object is copied into another object, the second object will simply make a reference to the first object. Thus changing the value of the first object will effect the second object as well.

  ```javascript
  let a = { boo: 'a' }
  let b = a

  console.log(a, b) // { boo: 'a' } { boo: 'a' }

  a.boo = 'bb'

  console.log(a, b) // { boo: 'bb' } { boo: 'bb' }
  ```

- To copy an object without effecting the original object use `Object.assign({}, obj)`. Using this we can only use internal and enumerable properties of the first object i.e. any properties that the first object has inherited higher up in the prototype will not be copied .

  - To check which properties will be copied use `Object.getOwnPropertyNames(obj)`.

  - If the first object were to reference other objects in its properties then those nested objects will be copied as a reference.

  ```javascript
  const hal = {
    name: 'Halloween',
  }

  let a = Object.create(hal)

  a.boo = '🎃'
  a.trick = {
    treat: 'copied as reference!',
  }

  let b = Object.assign({}, a)

  console.log(a) // { boo: '🎃', trick: { treat: 'copied as reference!' } }
  console.log(b) // { boo: '🎃', trick: { treat: 'copied as reference!' } }

  a.boo = 'a'
  a.trick['treat'] = 'only reference!'

  console.log(a) // { boo: 'a', trick: { treat: 'only reference!' } }
  console.log(b) // { boo: '🎃', trick: { treat: 'only reference!' } }

  console.log(Object.getOwnPropertyNames(a)) // [ 'boo', 'trick' ]
  ```

- Alternative way to copy objects is by using the `...` [Spread](#spread-syntax) Syntax, it's more cleaner. It is slightly different from `Object.assign({}, obj)`.

  ```javascript
  a.trick = {
    treat: 'copied as reference!',
  }

  let b = { ...a }
  ```

#### Immutable Objects

Objects by default are mutable, hence the properties of any object can be modified after its creation.

To stop any changes being made to the object after its creation (make it immutable):

1. Use `Object.freeze` method: but it only **dose shallow freeze**

   ```javascript
   // Mutable object
   const supportedLanguages = {
     en: 'English',
     fr: 'French',
   }

   // Immutable object
   const frozenObject = Object.freeze(supportedLanguages)

   frozenObject === supportedLanguages // true
   ```

   - For deep freeze, we can iterate through every property and recursively apply the freeze method:

   ```javascript
   const deepFreeze = (obj) => {
     Object.keys(obj).forEach((prop) => {
       if (typeof obj[prop] === 'object') deepFreeze(obj[prop])
     })
     return Object.freeze(obj)
   }

   deepFreeze(config)
   ```

2. `Object.seal`: We cannot add a new property or delete existing properties. But we can still update the value of existing properties

3. `Object.preventExtensions`: This method prevents new property creation. But you can update and delete existing properties

| Method              | Create | Read | Update | Delete |
| ------------------- | ------ | ---- | ------ | ------ |
| `freeze`            | -      | Y    | -      | -      |
| `seal`              | -      | Y    | Y      | -      |
| `preventExtensions` | -      | Y    | Y      | Y      |

#### Object Inheritance

JavaScript is **Prototype** based language, hence the inheritance is achieved using prototypes.

- The most important difference between class- and prototype-based inheritance is that a class defines a _type_ which can be instantiated at runtime, whereas a **_prototype_ is itself an object instance**

- Prototype based programming is a style that builds the reuse of features (the inheritance) by reusing already existing objects that are extended and not implemented

_Example:_ Prototype based inheritance

```javascript
let parent = { foo: 'foo' }
let child = {}
Object.setPrototypeOf(child, parent)

parent.isPrototypeOf(child) // true

console.log(child.foo) // 'foo'

child.foo = 'bar'

console.log(child.foo) // 'bar'

console.log(parent.foo) // 'foo'

delete child.foo

console.log(child.foo) // 'foo'

parent.foo = 'baz'

console.log(child.foo) // 'baz'
```

- [Prototype vs Class Object-Oriented Programming](https://enlear.academy/prototype-vs-class-the-javascript-split-personality-20d984d2fe2)

Prototype Chain:

- Every JavaScript object has a prototype property, which makes inheritance possible.

- The prototype property of an object is where we put methods and properties that we want other objects to inherit.

- The Constructor's prototype property is NOT the prototype of the constructor itself, it's the prototype of ALL instances that are created through it.

- When, a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototype. This continues until the method is found: _prototype chain_.

Creating an object prototype:

1. Using the function constructor:

   ```javascript
   // FUNCTION CONSTRUCTOR
   var Person = function (name, yearOfBirth, job) {
     this.name = name
     this.yearOfBirth = yearOfBirth
     this.job = job
   }

   Person.prototype.calculateAge = function () {
     console.log(2016 - this.yearOfBirth)
   }

   Person.prototype.lastName = 'smith'

   // CREATE AN OBJECT (INSTANTIATE AN OBJECT)
   var john = new Person('John', 1990, 'teacher')
   console.log(john.calculateAge()) // 26
   ```

2. Using `Object.create`:

   ```javascript
   // Object.create
   var personProto = {
     calculateAge: function () {
       console.log(2016 - this.yearOfBirth)
     },
   }

   var mike = Object.create(personProto)
   mike.name = 'Mike'
   mike.yearOfBirth = 1898
   mike.job = 'jobless'

   var jane = Object.create(personProto, {
     name: { value: 'Jane' },
     yearOfBirth: { value: 1965 },
     job: { value: 'gamer' },
   })
   ```

#### Proxy Object

The `Proxy` object (ES6) enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object

- Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

- [Metaprogramming](../../Concepts/Metaprogramming.md) using `Proxy`

You create a Proxy with two parameters:

- `target`: the original object which you want to proxy

- `handler`: an object that defines which operations will be intercepted and how to redefine intercepted operations.

```javascript
// target
const person = {
  age: 20,
  name: 'everyone',
}

// handler
const handler = {
  get(target, prop, receiver) {
    if (prop === 'name') {
      return target[prop].toUpperCase()
    }

    return Reflect.get(...arguments)
  },
}

const prx = new Proxy(person, handler)

console.log(prx.age) // 25
console.log(prx.name) // EVERYONE
```

## Type Coercion

- String Coercion:

  ```javascript
  // number to string
  String(25) // "25"

  // boolean to string
  true + ' value' // "true value"

  // null to string
  null + ' is no value' // "null is no value"

  // undefined to string
  undefined + ', then define it' // "undefined , then define it"
  ```

  Coercion rules:

  | Value       | Becomes     |
  | ----------- | ----------- |
  | 25          | "25"        |
  | `true`      | "true"      |
  | `null`      | "null"      |
  | `undefined` | "undefined" |

- Numeric Coercion:

  ```javascript
  // adding string to a number
  1 + '2' // "12"

  // other mathematical operations
  // implicitly convert string to number
  2 * '5' // 10
  2 * 'a' // NaN

  Number('12.3') // 12.3
  ;+'12.3' // 12.3

  Number('a') // NaN
  ;+'a' // NaN
  ;('b' + 'a' + +'a' + 'a').toLowerCase()
  // banana
  ;+true // 1
  ;+false // 0

  true + 0 // 1
  false + 7 // 7
  ;+null // 0
  null + 7 // 7
  ;+undefined // NaN
  undefined + 7 // NaN
  ;+[] // 0
  ;-[] // -0
  // result is string
  ;[] + 36 // "36"
  // result is number
  ;[] - 36 // -36
  ;+{} // NaN
  25 + {} // "25[object Object]"
  25 - {} // NaN
  ;[] + {} // "[object Object]"
  ```

  Coercion rules:

  | Value              | Becomes |
  | ------------------ | ------- |
  | "25"               | 25      |
  | "abc"              | NaN     |
  | `true` and `false` | 1 and 0 |
  | `null`             | 0       |
  | `undefined`        | NaN     |

- Boolean Coercion:

  ```javascript
  Boolean(1) // true
  Boolean(0) // false

  Boolean('A') // true
  Boolean(' ') // true
  Boolean('') // false
  // non-empty string is always true in JavaScript

  Boolean(null) // false
  Boolean(undefined) // false
  ```

  Coercion rules:

  | Value                                          | Becomes |
  | ---------------------------------------------- | ------- |
  | `0`, `false`, `''`, `null`, `undefined`, `NaN` | `false` |
  | any other value                                | `true`  |

## Operators

All the basic arithmetic operations can be used along with logical operators.

- `|`: bitwise OR operator
- `&`: bitwise AND operator
- `^`: bitwise XOR operator
- `~`: bitwise NOT operator

  ```javascript
  const a = 5 // 00000000000000000000000000000101
  const b = 3 // 00000000000000000000000000000011

  console.log(a | b) // 00000000000000000000000000000111
  // expected output: 7

  console.log(a & b) // 00000000000000000000000000000001
  // expected output: 1

  console.log(a ^ b) // 00000000000000000000000000000110
  // expected output: 6

  const a = 5 // 00000000000000000000000000000101
  const b = -3 // 11111111111111111111111111111101

  console.log(~a) // 11111111111111111111111111111010
  // expected output: -6

  console.log(~b) // 00000000000000000000000000000010
  // expected output: 2
  ```

- `!`: logical NOT operator
- `&&`: logical AND operator:

  ```javascript
  expr1 && expr2
  ```

  - Logical AND (`&&`) evaluates operands from left to right, returning immediately with the value of the first falsy operand it encounters; if all values are truthy, the value of the last operand is returned.

- `||`: logical OR operator

  ```javascript
  expr1 || expr2
  ```

  - If `expr1` can be converted to `true`, returns `expr1`; else, returns `expr2`.

- `==`: abstract comparison operator. It will **typecast before comparison**.
- `===`: strict equality operator will check equality on both type and value.
- `var x = truthy ? 1 : 2;`: ternary operator

- `??` (nullish coalescing operator): returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand.

  - `??` returns the first _defined_ value
  - `||` returns the first _truthy_ value

  ```javascript
  null ?? 'default string' // "default string"
  undefined ?? 'default string' // "default string"

  0 ?? 25 // 0
  0 || 25 // 25

  '' ?? 'default string' // ""
  '' || 'default string' // "default string"
  ```

- `?.` (optional chaining): enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

  ```javascript
  const adventurer = {
    name: 'Alice',
    cat: {
      name: 'Dinah',
    },
  }

  const dogName = adventurer.dog?.name
  console.log(dogName)
  // expected output: undefined

  console.log(adventurer.someNonExistentMethod?.())
  // expected output: undefined

  obj.val?.prop
  obj.val?.[expr]
  obj.arr?.[index]
  obj.func?.(args)
  ```

::: danger NOTE
Don't use `==` for comparisons
:::

### Operator Precedence

Operator precedence determines how operators are parsed concerning each other.

- Operators with higher precedence become the operands of operators with lower precedence.

### Truthy And Falsy

In JavaScript:

- Truthy values: all NON Falsy values
- Falsy values: `0`, `false`, `''`, `null`, `undefined`, `NaN`

JavaScript will always try to coerce a value into a Boolean when it's encountered inside of a conditional statement.

So:

- `true` is Truthy.

- All Objects are Truthy:

  ```javascript
  console.log(!!{}) // true
  console.log(!![]) // true
  ```

- A string is Truthy, but an empty string is a Falsy:

  ```javascript
  console.log(!!'') // false
  console.log(!!'a') // true
  console.log(!!' ') // true
  ```

- All numbers expect **0** are Truthy i.e. **0** is Falsy:

  ```javascript
  console.log(!!1) // true
  console.log(!!0) // false
  console.log(!!-1) // true
  ```

> For more information check out the links: [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

### Comparisons

String comparison: To see whether a string is greater than another, JavaScript uses the so-called "dictionary" or "lexicographical" order.

In other words, strings are compared letter-by-letter.

```javascript
'Z' > 'A' // true
'Glow' > 'Glee' // true
'Bee' > 'Be' // true
```

Comparisons for `null` and `undefined`:

```javascript
null > 0 // false
null == 0 // false
null >= 0 // true

undefined > 0 // false
undefined < 0 // false
undefined == 0 // false
```

### Spread Syntax

- Spread Properties: Spread properties in object initializers copies own enumerable properties from a provided object onto the newly created object

```javascript
let n = { x, y, ...z }
n // { x: 1, y: 2, a: 3, b: 4 }
```

### Rest Syntax

- Rest parameters convert multiple input parameters into a single array containing all the arguments.

- It uses the same 3 dot notation as spread operator and dose opposite of spread operator.

```javascript
// ES5
function isFullAge5() {
  var argsArr = Array.prototype.slice.call(arguments)

  argsArr.forEach(function (cur) {
    console.log(2016 - cur >= 18)
  })
}

// ES6
const isFullAge6 = (...years) =>
  years.forEach((el) => console.log(2016 - el >= 18))

isFullAge6(1990, 1999, 1960)
```

- Rest Properties: Rest properties collect the remaining own enumerable property keys that are not already picked off by the destructuring pattern. Those keys and their values are copied onto a new object

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }
```

## Functions

Functions are first class objects in JavaScript.

- Every JavaScript function is actually a `Function` object. This can be seen with the code `(function(){}).constructor === Function`, which returns true.

### Function Declaration

To create a function we can use a function declaration.

A **function definition** (also called a **function declaration**, or **function statement**) consists of the `function` keyword, followed by:

- The name of the function

- A list of parameters to the function, enclosed in parentheses and separated by commas

- The JavaScript statements that define the function, enclosed in curly brackets, `{...}`

```javascript
// named function declaration or definition or statement
function makeBread(qty) {
  // qty is the parameter
  const bread = '🍞'.repeat(qty)

  // task or side-effect
  console.log(bread)

  // return value
  return bread
}

// function call
const loaves = makeBread(7) // 7 is the argument passed
```

**Anonymous functions** are functions with no name:

```javascript
;(function () {
  // content
})()

// OR

const temp = function () {
  // anonymous function
  console.log('temp')
}
```

### Function Expression

While the function declaration above is syntactically a statement, functions can also be created by a function expression.

Using function as a value:

```javascript
// function expression
const makeBeer = function (qty) {
  return '🍺'.repeat(qty)
}

const beers = makeBeer(7)
console.log(beers) // 🍺🍺🍺🍺🍺🍺🍺

// name can be provided, so that it can call itself
const factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1)
}
```

_Function Declaration vs Function Expression_:

- Function declaration is [hoisted](#hoisting) while the function expression is not

- Function declaration can be redeclared (can introduce bugs)

- We can use a function before its declaration, but when we have an expression the function is created only when the code is reached in the script.

  ```javascript
  // function declaration
  const bread = makeBread(7)

  function makeBread(qty) {
    return '🍞'.repeat(qty)
  }

  // function expression
  const beers = makeBeer(7) // makeBeer is not defined

  const makeBeer = function (qty) {
    return '🍺'.repeat(qty)
  }
  ```

::: tip
Use function expressions as a best practice, because they are not hoisted and this makes it easier to understand where they belong in the context of an application. Also they are less likely to pollute the global namespace.
:::

### Immediately Invoked Function Expression (IIFE)

By **wrapping an anonymous (or named) function in parentheses**, we can then **call it immediately** by adding parentheses afterwards.

_Example:_

```javascript
// IIFE
(function () {
  const x = 23;
})(); // goofy

(function () {
  const x = 23;
})(); // groovy!

(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

// not an IIFE
function foo() {
  const x = 23;
}();
// Uncaught SyntaxError: Unexpected token ')'

// JavaScript runs the above as
// valid function definition
function foo() {
  const x = 23;
}

();
// Uncaught SyntaxError: Unexpected token ')'

// enclose the above function in `()` to make it an expression
(function foo() {
  const x = 23;
})();
```

- IIFE can be used for scoping in ES5:

  ```javascript
  ;(function () {
    var a = 1
    var b = 2
    console.log(a + b)
  })()
  ```

- Using [ES6 modules](#esm-ecmascript-modules) for scoping:

  ```javascript
  {
    const a = 10
    let b = 25
    console.log(a + b)
  }
  ```

::: tip Note
`var` inside a block scope can be accessed outside the block as it only has function scope
:::

### Parameters and Arguments

Function parameters:

1. The arguments of a function are maintained in an array-like object. Within a function, you can address the arguments passed to it using the `arguments` key-word

   ```javascript
   function myConcat(separator) {
     var result = '' // initialize list
     var i

     // iterate through arguments
     for (i = 1; i < arguments.length; i++) {
       result += arguments[i] + separator
     }

     return result
   }

   // returns "red, orange, blue, "
   myConcat(', ', 'red', 'orange', 'blue')

   // returns "elephant; giraffe; lion; cheetah; "
   myConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah')

   // returns "sage. basil. oregano. pepper. parsley. "
   myConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley')
   ```

2. Positional Parameters: All the arguments must be passed and in the right order:

   ```javascript
   // positional parameters
   function makeBreakfast(main, side, drink) {
     console.log(arguments)
     return `Breakfast includes ${main}, ${side}, ${drink}.`
   }

   console.log(makeBreakfast('🥞', '🥓', '🥛'))

   // arguments === [] --> ["🥞", "🥓", "🥛"]
   // Breakfast includes 🥞, 🥓, 🥛
   ```

3. Default Parameters: In JavaScript, parameters of functions default to undefined. Hence, we can provide some default value when value for that parameter is not passed

   - Pre-ECMAScript 2015, we had to check manually if a parameter is undefined and assign it a default value:

     ```javascript
     function multiply(a, b) {
       b = typeof b !== 'undefined' ? b : 1

       return a * b
     }

     multiply(5) // 5
     ```

   - With ES6, the nex syntax can be used to set default values:

     ```javascript
     function multiply(a, b = 1) {
       return a * b
     }

     multiply(5) // 5
     ```

4. Named Parameters: Here the argument is a single object that can contain multiple values.

   - We can destructure the object or use it directly inside the function body
   - Order of the arguments doesn't matter

   ```javascript
   // named parameters
   function makeBreakfast(opts) {
     const { main, side, drink } = opts
     console.log(arguments)
     return `Breakfast includes ${main}, ${side}, ${drink}.`
   }

   console.log(makeBreakfast({ side: '🥓', main: '🥞', drink: '🥛' }))

   // arguments === [{}] --> [{ side: "🥞", main: "🥓", drink: "🥛" }]
   // Breakfast includes 🥞, 🥓, 🥛
   ```

5. Rest Parameters: A single parameter is preceded by three dots `...args`.

   - This allows us to use multiple positioned arguments and then access them as an array inside the function body.

   ```javascript
   // rest parameters
   function makeBreakfast(...args) {
     console.log(arguments)
     return `Breakfast includes ${args.join(' ')}.`
   }

   console.log(makeBreakfast('🥞', '🥓', '🥛'))

   // arguments === [] --> ["🥞", "🥓", "🥛"]
   // Breakfast includes 🥞, 🥓, 🥛
   ```

#### Parameters vs Arguments

Parameters are the variable inputs that are used in the function definition.

While Arguments are the actual value or expressions used when calling the function.

### Arrow Functions

An arrow function expression has a shorter syntax compared to function expressions.

- It does not have its own `this`, `arguments`, `super`, `new.target`
- `this` is picked up from surroundings (lexical)
- Arrow functions are _always anonymous_
- Array functions are _function expressions_

Arrow function syntax:

```javascript
function app(input) {
  return output
}

// above function as an arrow function
const app = (input) => output

const makeWine = (qty) => '🍷'.replace(qty)

const makeWine = (qty) => {
  return '🍷'.replace(qty)
}
```

They don't have their own `this` object.

```javascript
// ES5 Arrow 'this' example
function Dog() {
  var self = this
  this.breed = 'Wolf 🐺'

  setTimeout(function () {
    console.log(this.breed) // undefined
    console.log(self.breed) // Wolf 🐺
  }, 0)
}

// With Arrow Function
function Dog() {
  this.breed = 'Wolf 🐺'

  setTimeout(() => {
    console.log(this.breed)
  }, 0)
}

Dog()
```

> ES6 [in depth Arrow Functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/) - Mozilla

::: tip NOTE
If a function doesn't have a `return` statement, it will return `undefined`
:::

### Pure Functions

Pure functions are those functions that depend only on their input parameters and only mutate variables that are within its local scope and it should also not produce any side effects.

Pure functions always produce the same output given the same input

- They are easier to test.
- Easier to understand in general.
- They help in composing your applications as a collection of Higher Order Functions.

```javascript
let x = 0

// impure function
const impure = () => {
  x++
  return x ** 2
}

// pure functions
const pure = (x) => x ** 2
```

### Higher Order Functions

JavaScript supports first-class functions, i.e. functions can be passed as arguments to other functions or use functions as the return value from a function.

```javascript
let haveFun = () => console.log("fun!");

// setTimeout takes a function as a parameter
setTimeout(haveFun, 50);
setTimeout(() => console.log("fun!"), 50);


// example
const app() = (input) => output;

function cool(app) {
    app();
}

cool(() => console.log('sweet'));
```

#### Closures

A closure is **the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)**

Closure is just a function within a function where inner function references a variable that was declared in the scope of the outer function and returns the inner function.

- An inner function has always access to the variables and parameters of its outer function, even after the outer function has returned.

- Whenever we define a function it will create a lexical environment. Anything inside of curly braces is it's own lexical environment:

  ```javascript
  // lexical env a
  const outer = () => {
    // lexical env b
    const inner = () => {
      // lexical env c
    }
  }
  ```

_Example:_

```javascript
function useCat() {
  let name = 'baby kitten'

  return [() => `Meow ${name}`, (newName) => (name = newName)]
}

const [meow, setName] = useCat()

console.log(meow()) // Meow baby kitten
setName('frank')
console.log(meow()) // Meow frank
```

```javascript
function outer() {
  const fish = '🐠'
  let count = 0

  function inner() {
    count++
    return `${count} ${fish}`
  }

  return inner
}

const fun = outer()

console.log(fun()) // 1 🐠
console.log(fun()) // 2 🐠
console.log(fun()) // 3 🐠
```

- Closure can be used to create objects with public and private parts:

```javascript
// using a closure we will expose an object
// as part of a public API that manages its
// private parts
let fruitsCollection = (() => {
  // private
  let objects = []

  // public
  return {
    addObject: (object) => {
      objects.push(object)
    },
    removeObject: (object) => {
      let index = objects.indexOf(object)
      if (index >= 0) {
        objects.splice(index, 1)
      }
    },
    getObjects: () => JSON.parse(JSON.stringify(objects)),
  }
})() // notice the execution

fruitsCollection.addObject('apple')
fruitsCollection.addObject('orange')
fruitsCollection.addObject('banana')

// prints: ["apple", "orange", "banana"]
console.log(fruitsCollection.getObjects())

fruitsCollection.removeObject('apple')

// prints: ["orange", "banana"]
console.log(fruitsCollection.getObjects())
```

- Closure is similar to a class from a conceptual standpoint:

```javascript
class Outer {
  constructor(public fish = "🐠", public count = 0) {}

  inner() {
    this.count++;
    return `${this.count} ${this.fish}`;
  }
}

const instance = new Outer();

console.log(instance.inner()); // 1 🐠
console.log(instance.inner()); // 2 🐠
console.log(instance.inner()); // 3 🐠
```

### Function Binding (Bind, Call, And Apply)

- Bind: "Call me later!"
- Apply: Execute me right now; accepts this + array
- Call: Execute me right now; this + individual parameters

```javascript
var john = {
  name: 'John',
  age: 26,
  job: 'teacher',
  presentation: function (style, timeOfDay) {
    if (style === 'formal') {
      console.log(
        "I'm " + this.name + ' of age ' + this.age + '. Good ' + timeOfDay,
      )
    } else if (style === 'casual') {
      console.log(
        'Whats up? ' +
          this.name +
          'here, of age ' +
          this.age +
          '. Good ' +
          timeOfDay,
      )
    }
  },
}

john.presentation('formal', 'morning')

var emily = {
  name: 'Emily',
  age: 35,
  job: 'designer',
}

// CALL
john.presentation.call(emily, 'casual', 'evening')

// APPLY
john.presentation.apply(emily, ['formal', 'night'])

// BIND - PRESET AN ARGUMENT
var johnFormal = john.presentation.bind(john, 'formal')

johnFormal('morning')
johnFormal('evening')
```

_Example:_

```javascript
var years = [1990, 1965, 1937, 2005, 1998]

function arrayCalc(arr, fn) {
  var arrRes = []
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]))
  }
  return arrRes
}

function calculateAge(el) {
  return 2016 - el
}

function isFullAge(limit, el) {
  return el >= limit
}

var ages = arrayCalc(years, calculateAge)

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20))

console.log(ages)
console.log(fullJapan)
```

## Iterators and Generators

[Iterators](#iterators) and [Generators](#generator-function) bring the concept of iteration directly into the core language and provide a mechanism for customizing the behaviour of `for...of` loops

### Iterators

_Iterator_ is an object which defines a sequence and potentially a return value upon its termination

An iterator is any **object which implements the Iterator protocol** by having a `next()` method that returns an object with two properties:

- `value`: The next value in the iteration sequence

- `done`: This is `true` if the last value in the sequence has already been consumed. If `value` is present alongside `done`, it is the iterator's return value

_Example:_

```javascript
// iterator
function nameIterator(names) {
  let nextIndex = 0

  return {
    next: function () {
      return nextIndex < names.length
        ? { value: names[nextIndex++], done: false }
        : { done: true }
    },
  }
}

// iterator an array of names
const namesArr = ['Aragorn', 'Legolas', 'Gimli']

const namesItr = nameIterator(namesArr)

console.log(namesItr.next()) // {value: "Aragorn", done: false}
console.log(namesItr.next()) // {value: "Legolas", done: false}
console.log(namesItr.next()) // {value: "Gimli", done: false}
console.log(namesItr.next()) // {done: true}
```

- Use `Symbol.iterator` as key to enable `for..of`

- The downside is that now it's **impossible to have two `for..of` loops running** over the object **simultaneously** (very rare): they'll share the iteration state

  ```javascript
  function range(start = 0, end = Infinity, step = 1) {
    return {
      [Symbol.iterator]() {
        return this
      },

      next() {
        if (start < end) {
          start = start + step
          return { value: start, done: false }
        }

        return { value: end, done: true }
      },
    }
  }

  for (let num of range(0, 10)) {
    console.log(num) // 1 2 3 4 5 6 7 8 9 10
  }
  ```

- Calling an iterator manually:

  ```javascript
  let str = 'Hello'

  // for (let char of str) console.log(char);

  // does the same as for..of
  let iterator = str[Symbol.iterator]()

  while (true) {
    let result = iterator.next()
    if (result.done) break
    console.log(result.value) // outputs characters one by one
  }
  ```

### Generator Function

The `function*` declaration (`function` keyword followed by an asterisk) defines a _generator function_, which returns a **Generator object**

- Generators can return ("yield") multiple values, one after another, on-demand

Syntax:

```javascript
function* name(param0) {
  statements
}

function* name(param0, param1) {
  statements
}

function* name(param0, param1, /* … ,*/ paramN) {
  statements
}
```

_Example:_

```javascript
function* generator(i) {
  yield i
  yield i + 10
}

const gen = generator(10)

console.log(gen.next())
// {value: 10, done: false}

console.log(gen.next())
// {value: 20, done: false}

console.log(gen.next())
// {value: undefined, done: true}
```

```javascript
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0

  for (let i = start; i < end; i += step) {
    iterationCount++
    yield i
  }

  return iterationCount
}
```

- Provide input to the Generator function

```javascript
function* showNext() {
  yield 1
  yield 2

  const customOutput = yield 'enter custom output'
  yield customOutput

  return 100
}

console.log(showNext.next())
// {value: 2, done: false}

console.log(showNext.next())
// {value: "enter custom output", done: false}

console.log(showNext.next(52))
// {value: 52, done: false}

// or

console.log(showNext.next())
// {value: undefined, done: false}

console.log(showNext.next())
// {value: 100, done: true}
```

::: warning NOTE
Generator functions **do not have arrow function** counterparts.
:::

### Iterables

An object is _iterable_ if it defines its iteration behaviour (implement the `Symbol.iterator` method), such as what values are looped over in a `for...of` construct

- Generators are iterable:

```javascript
function* generateSequence() {
  yield 1
  yield 2
  yield 3
  // return 3; // this will be ignored during iteration
}

let generator = generateSequence()

for (let value of generator) {
  console.log(value) // 1, 2, 3
}
```

## Exception Handling

You can throw exceptions using the `throw` statement and handle them using the `try...catch` statements.

### `throw` Statement

Use the `throw` statement to throw an exception:

```javascript
throw expression

throw 'Error2' // String type
throw 42 // Number type
throw true // Boolean type
throw {
  toString: function () {
    return "I'm an object!"
  },
}
```

### `try...catch` Statement

The `try...catch` statement marks a block of statements to try, and specifies one or more responses should an exception be thrown.

```javascript
try {
  throw 'myException' // generates an exception
} catch (err) {
  // statements to handle any exceptions
  logMyErrors(err) // pass exception object to error handler
}
```

### `finally` Block

The finally block contains statements to be executed after the try and catch blocks execute.

- `finally` block will execute whether or not an exception is thrown.

```javascript
openMyFile()
try {
  writeMyFile(theData) // This may throw an error
} catch (e) {
  handleError(e) // If an error occurred, handle it
} finally {
  closeMyFile() // Always close the resource
}
```

## Template Literals

Template literals are _string literals_ with **support for interpolation and multiple lines**

Put strings inside back ticks (tilda) and use `${}` to put the variables, function calls, and expressions

- This is alternative to the old string formatting

```javascript
let year = 1996

function calcAge(year) {
  return 2018 - year
}

// ES5
console.log(
  'I was born in the year ' + year + ' and my age is ' + calcAge(year),
)

//ES6
console.log(`I was born in the year ${year} and my age is ${calcAge(year)}`)
```

- Line terminators in template literals are always _LF_ (`\n`)

Common ways of terminating lines are:

- **Line feed** (LF, `\n`, _U+000A_): used by _Unix_ (incl. current macOS)
- **Carriage return** (CR, `\r`, _U+000D_): used by the old _Mac OS_
- **CRLF** (`\r\n`): used by _Windows_

```javascript
const str = `BEFORE
AFTER`

// On all OS
console.log(str === 'BEFORE\nAFTER') // true
```

### Tagged Template Literals

_Tagged template literals_: are function calls whose **parameters are provided via template literals**

```javascript
tagFunction`Hello ${firstName} ${lastName}!`

// is equivalent to
tagFunction(['Hello ', ' ', '!'], firstName, lastName)
```

- Tagged template literals allow you to implement custom embedded sub-languages (which are sometimes called _domain-specific languages_) with little effort, because JavaScript does much of the parsing for you.

_Example:_

```javascript
function myTag(strings, personExp, ageExp) {
  const str0 = strings[0] // "That "
  const str1 = strings[1] // " is a "
  const str2 = strings[2] // "."

  const ageStr = ageExp > 99 ? 'centenarian' : 'youngster'

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`
}

const person = 'Mike'
const age = 28

const output = myTag`That ${person} is a ${age}.`

console.log(output)
// That Mike is a youngster.
```

## Array

An array is an ordered list of values that you refer to with a name and an index

```javascript
// Using Array constructor
let arr = new Array(element0, element1, ..., elementN)
let arr = Array(element0, element1, ..., elementN)

// Using array literal or array initializer
let arr = [element0, element1, ..., elementN]
```

- Accessing array elements:

  ```javascript
  const arr = [1, 2, 3]

  arr[0] // 1

  // Using `at()`
  arr.at(0) // 1
  arr.at(-1) // 3 (get last element)

  arr[10] // undeclared
  arr.at(10) // undefined
  ```

- An array with non-zero length, but without any items:

  ```javascript
  // This...
  let arr = new Array(arrayLength)

  // ...results in the same array as this
  let arr = Array(arrayLength)

  // This has exactly the same effect
  let arr = []
  arr.length = arrayLength
  ```

- Copy an array:

  ```javascript
  // Method 1
  const newData = []
  for (let i = 0; i < data.length; i++) {
    newData.push(data[i])
  }

  // Method 2
  const newData = Array.from(data)

  // Method 3
  const newData = data.slice()

  // Method 4
  const newData = [...data]

  // Method 5
  const newData = data.map((x) => x)
  ```

- Converting Node lists to Arrays:

  - ES5

  ```javascript
  const boxes = document.querySelectorAll('.box')

  var boxesArr5 = Array.prototype.slice.call(boxes)

  boxesArr5.forEach(function (cur) {
    cur.style.backgroundColor = 'dodgerblue'
  })
  ```

  - ES6

  ```javascript
  Array.from(boxes).forEach((cur) => (cur.style.backgroundColor = 'dodgerblue'))
  ```

### Typed Arrays

JavaScript typed arrays are array-like objects that provide a mechanism for reading and writing raw binary data in memory buffers.

## Class

In JavaScript (ES6+) `class` is not a language feature, it's _syntactic obscurantism_.

- ES5 class type functionality using Object Constructor:

  ```javascript
  var Person5 = function (name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
  }

  Person5.prototype.calcAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth
    console.log(age)
  }

  var john = new Person5('John', 1996, 'teacher')
  ```

- ES6 added class syntax:

  ```javascript
  class Person6 {
    constructor(name, yearOfBirth, job) {
      this.name = name
      this.yearOfBirth = yearOfBirth
      this.job = job
    }

    calcAge() {
      let age = new Date().getFullYear() - this.yearOfBirth
      console.log(age)
    }
  }
  const emily = new Person6('Emily', 1994, 'teacher')
  ```

ES5 and ES6 versions:

```javascript
// ES5
var Car = /** @class */ (function () {
  function Car(seats, color) {
    if (seats === void 0) {
      seats = 36
    }

    this.seats = seats
    this.color = color
  }

  Car.prototype.printCar = function () {
    console.log(this.seats + this.color)
  }

  return Car
})()

var newCar = new Car(25, 'Red')
```

```javascript
// ES6
class Car {
  constructor(seats = 36, color) {
    this.seats = seats
    this.color = color
  }

  printCar() {
    console.log(this.seats + this.color)
  }
}

const newCar = new Car(25, 'Red')
```

- Static methods can be also be created. Static methods are those methods that cannot be inherited.

```javascript
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
  }

  calcAge() {
    let age = new Date().getFullYear() - this.yearOfBirth
    console.log(age)
  }

  static greeting() {
    console.log('Hey There!')
  }
}

const emily = new Person5('Emily', 1994, 'teacher')

Person6.greeting()
```

- Access modifiers in Classes

::: warning NOTE
Classes are not hoisted.
:::

### Inheritance

Is same as [Object Inheritance](#object-inheritance)

ES5

```javascript
var Person5 = function (name, yearOfBirth, job) {
  this.name = name
  this.yearOfBirth = yearOfBirth
  this.job = job
}

Person5.prototype.calcAge = function () {
  var age = new Date().getFullYear() - this.yearOfBirth
  console.log(age)
}

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job)
  this.olympicGames = olympicGames
  this.medals = medals
}

Athlete5.prototype = Object.create(Person5.prototype)

Athlete5.prototype.wonMedal = function () {
  this.medals++
  console.log(this.medals)
}

var johnAthlete5 = new Athlete5('John', 1996, 'teacher', 3, 10)
```

ES6

```javascript
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
  }

  calcAge() {
    let age = new Date().getFullYear() - this.yearOfBirth
    console.log(age)
  }
}

class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job)
    this.olympicGames = olympicGames
    this.medals = medals
  }

  wonMedal() {
    this.medals++
    console.log(this.medals)
  }
}

const emilyAthlete6 = new Athlete6('Emily', 1994, 'Runner', 10, 25)
```

## Keyed Collections

Collections of data which are indexed by a key

### Maps

A Map object (ES6) is a simple **key-value map** and can iterate its elements in insertion order

- Data structure to map values to values
- Anything can be a key (even _object_, _function_)
- Maps are enumerable

_Example:_

```javascript
const question = new Map()

question.set(
  'question',
  'What is the official name of the latest major JavaScript version?',
)
question.set(1, 'ES5')
question.set(2, 'ES2015')
question.set('correct', 2)
question.set(true, 'Correct Answer :D')
question.set(false, 'Wrong, please try again!')

question.get('correct') // 2

question.size // 6

question.forEach((value, key) =>
  console.log(`This is ${key}, and it's set to ${value}`),
)

// loop through key-value pairs
for (let [key, value] of question.entries()) {
  // of question) {
  if (typeof key === 'number') {
    console.log(`This is ${key}, and it's set to ${value}`)
  }
}

// loop through keys or values
question.keys()
question.values()

question.clear()

question.size // 0
```

- Create an array of key-value pairs:

  ```javascript
  const keyValArr = Array.from(question)

  const valuesArr = Array.from(question.values())
  ```

### Sets

`Set` objects are **collections of unique values**

- A value in a `Set` may only occur once; it is **unique** in the Set's collection.

```javascript
let mySet = new Set()
mySet.add(1)
mySet.add('foo')

mySet.has(1) // true

mySet.delete('foo')

mySet.size // 2

for (let item of mySet) {
  console.log(item) // 1
}

// Set object performs shallow comparison
// to determine duplicate values
mySet = new Set()

mySet.add({ name: 'A Set' })
mySet.add({ name: 'A Set' })

// because
// { name: "A Set" } !== { name: "A Set" }
mySet.size // 2

const person = { name: 'Bilbo' }

mySet.add(person)
mySet.add(person)

// because
// person === person
mySet.size // 3 not 4
```

Converting between Array and Set:

- `Set` objects store unique values-so any duplicate elements from an Array are deleted when converting!

```javascript
Array.from(mySet)
;[...mySet2]

mySet2 = new Set([1, 2, 3, 4])
```

## Asynchronous Programming

Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

- Tasks such as HTTP requests, file selection, etc. do not finish immediately
- [Synchronous vs Asynchronous JavaScript – Call Stack, Promises, and More](https://www.freecodecamp.org/news/synchronous-vs-asynchronous-in-javascript/)

Using `setTimeout()` to cause a delay in function execution:

```javascript
const second = () => {
  setTimeout(() => {
    console.log('Second')
  }, 2000)
}

const first = () => {
  console.log('Hey There')
  second()
  console.log('The End')
}

first()
```

The expected result of the above code is:

```javascript
Hey There

// 2 SECONDS DELAY
Second

The End
```

But the actual output is:

```javascript
Hey There

The End

// 2 SECONDS DELAY
Second
```

This is because the `setTimeout()` function creates a Asynchronous call stack

Key aspects of Asynchronous functions are:

- Allow asynchronous functions to run in the background
- Callbacks are passed that run once the function has finished its work
- Move on immediately: Non-blocking code

### The Event Loop

JavaScript has a runtime model based on an **event loop**, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks

WEB API's are part of JavaScript Runtime but leave outside of the JavaScript engine. Like the DOM events, `setTimeout()`, `XMLHttpRequest()` etc.

- Event loop monitors the Message Queue and Execution Stack so that the first callback function can be pushed into the Execution Stack if the Execution Stack is empty

- All callback wait in WEB API's till the event happens and then they move to the Message Queue, where they wait for their turn to be pushed into the Execution Stack

The call stack?

- JavaScript is single threaded runtime, hence has only one call stack. That means it can only do one thing at a time

- [The Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

### Asynchronous Function Calls

```javascript
function getRecipe() {
  setTimeout(() => {
    const recipeID = [523, 883, 432, 978]
    console.log(recipeID)

    setTimeout(
      (id) => {
        const recipe = { title: 'French Tomato Pasta', publisher: 'Jones' }
        console.log(`${id}: ${recipe.title}`)

        setTimeout(
          (publisher) => {
            const recipe2 = { title: 'Italian Pizza', publisher: 'Jones' }
            console.log(recipe2)
          },
          1500,
          recipe.publisher,
        )
      },
      1500,
      recipeID[2],
    )
  }, 1500)
}

getRecipe()
```

This way of calling Asynchronous Functions where each asynchronous function is inside another asynchronous function causing a **Call Back Hell**.

### Promise

A `Promise` is an object representing the eventual completion or failure of an asynchronous operation

Promise is:

- An object that keeps track about whether a certain event has happened already or not
- Determines what happens after the event has happened
- Implements the concept of a future value that is expected

Promise States:

1. **pending**: initial state, neither _fulfilled_ nor _rejected_

2. **fulfilled**: meaning that the operation was completed successfully

   - A promise is _fulfilled_ if `promise.then(f)` will call `f` "as soon as possible"

3. **rejected**: meaning that the operation failed.

   - A promise is _rejected_ if `promise.then(undefined, r)` will call `r` "as soon as possible"

- If the promise is fulfilled or rejected, the corresponding handler is called

- A promise is said to be **settled** if it is either _fulfilled_ or _rejected_, but not _pending_

- `Promise()` constructor:

  ```javascript
  new Promise(executor)
  ```

  - `executor`: A function to be executed by the constructor. It receives two functions as parameters: `resolutionFunc` and `rejectionFunc`

- Creating a Promise:

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 300)
})
```

Promise Methods:

- `.then()`: takes up to 2 arguments; the 1st argument is a callback function for the **fulfilled** case of the promise, and the second argument is a callback function for the **rejected** case

  ```javascript
  const promise = new Promise((resolve, reject) =>
      resolve('I am a resolved promise');
  );

  promise.then(ful => console.log('Resolved: ' + ful), rej => console.log(rej));
  // 'Resolved: I am a resolved promise'
  ```

  - Handling a rejected promise in each `.then()` has consequences further down the promise chain

  - Instead of handling rejected promise in `.then()`, we need to throw an error and handle the error in `.catch()` method

- `.catch()`: argument is a callback function for the **rejected** case or any errors thrown

_Example:_

```javascript
const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([145, 365, 394, 987])
  }, 1500)
})

const getRecipe = (recID) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      (ID) => {
        const recipe = { title: 'French Tomato Pasta', publisher: 'Jones' }
        resolve(`${ID}: ${recipe.title}`)
      },
      1500,
      recID,
    )
  })
}

const getRelated = (publisher) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      (pub) => {
        const recipe2 = { title: 'Italian Pizza', publisher: 'Jones' }
        resolve(`${pub}: ${recipe2.title}`)
      },
      1500,
      publisher,
    )
  })
}

getIDs
  .then((IDs) => {
    console.log(IDs)
    return getRecipe(IDs[2])
  })
  .then((recipe) => {
    console.log(recipe)
    return getRelated('Jonas')
  })
  .then((pub) => console.log(pub))
  .catch((error) => console.log(error))
```

- Resolve multiple promises:

```javascript
// These 2 calls don't depend on each other
// so getProducts has to wait until getUser
// call has finished
const user = await getUser()
const products = await getProducts()

// Concurrent calls
// errors not handled properly here
const [user, products] = await Promise.all([getUser(), getProducts()])

// Better error handling
const results = await Promise.allSettled([getUser(), getProducts()])

// [
//   {status: "fulfilled", value: ... },
//   {status: "rejected", reason: Error }
// ]
```

- Example implementation of Promise class:

```javascript
class MyPromise {
  constructor(cb) {
    const resolve = (value) => {
      setTimeout(() => this._then?.(value), 0)
    }

    const reject = (value) => {
      setTimeout(() => this._catch?.(value), 0)
    }

    cb(resolve, reject)
  }

  _wrap(cb, resolve, reject) {
    return (value) => {
      try {
        const output = cb(value)
        resolve(output)
      } catch (err) {
        reject(err)
      }
    }
  }

  then(cb) {
    return new MyPromise((resolve, reject) => {
      console.log('binding then')
      this._then = this._wrap(cb, resolve, reject)
    })
  }

  catch(cb) {
    return new MyPromise((resolve, reject) => {
      console.log('binding catch')
      this._catch = this._wrap(cb, resolve, reject)
    })
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 300)
})
```

-[What is Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261#.aa7ubggsy)

### Async/Await

Its new feature provided by ES8.

```javascript
const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([145, 365, 394, 987])
  }, 1500)
})

const getRecipe = (recID) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      (ID) => {
        const recipe = { title: 'French Tomato Pasta', publisher: 'Jones' }
        resolve(`${ID}: ${recipe.title}`)
      },
      1500,
      recID,
    )
  })
}

const getRelated = (publisher) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      (pub) => {
        const recipe2 = { title: 'Italian Pizza', publisher: 'Jones' }
        resolve(`${pub}: ${recipe2.title}`)
      },
      1500,
      publisher,
    )
  })
}

async function getRecipeAW() {
  const IDs = await getIDs
  console.log(IDs)

  const recipe = await getRecipe(IDs[2])
  console.log(recipe)

  const related = await getRelated('Jonas')
  console.log(related)
}

getRecipeAW()
```

## AJAX (Asynchronous JavaScript And XML)

We can use any of the Web APIs to perform AJAX calls

AJAX APIs and libraries:

- [XMLHttpRequest](#xmlhttprequest)
- [Fetch API](#fetch-api)
- [Axios](./Libraries/Axios.md)
- [jQuery](./jQuery/jQuery.md)
- Node HTTP

### XMLHttpRequest

`XMLHttpRequest` (XHR) objects are used to **interact with servers**

- You can retrieve data from a URL without having to do a full page refresh

`readyState` values:

- `0`: request not initialized
- `1`: server connection established
- `2`: request received
- `3`: processing request
- `4`: request finished and response is ready

_Example:_

```javascript
const getData = () => {
  const xhr = new XMLHttpRequest()

  // create a request
  xhr.open('GET', 'https://forkify-api.herokuapp.com/api/search?q=pizza')

  // parse json to javascript object
  xhr.responseType = 'json'

  // optional, used for spinners/loaders
  xhr.onprogress = function () {
    console.log(this.readyState)
    // console.log(xhr.readyState);
  }

  // // old way
  // xhr.onreadystatechange = function () {
  //   if (this.status === 200 && this.readyState === 4) {
  //     console.log(this.responseText);
  //   }
  // };

  // save the response
  xhr.onload = () => {
    // if (this.status === 200) {
    // }

    console.log(xhr.response)
  }

  // handle errors
  xhr.onerror = () => {
    console.log('Something went wrong...')
  }

  // send the request
  xhr.send()
}
```

### Fetch API

The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used [XMLHttpRequest](#xmlhttprequest), but the new API provides a more powerful and flexible feature set.

```javascript
// init is optional
fetch(resource, init)
```

- An object containing any custom settings that you want to apply to the request. Options such as:

  - `method`
  - `headers`
  - `body`
  - `mode`: `cors`, `no-cors`, or `same-origin`
  - `credentials`
  - `cache`
  - `redirect`
  - `referrer`
  - `referrerPolicy`
  - `integrity`
  - `signal`

- The `fetch()` returns a promise that resolves with a Response object not a JSON response. Hence, the JSON body content is extracted from Response object using `json()` method, which returns a second promise that resolves with the result of paring the response body text as JSON

- GET request

```javascript
async function getTodo(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    )
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

getTodo(1)
getTodo(5)
```

Using Async and Await:

```javascript
async function getTodo(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    )
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

getTodo(1)
getTodo(5)
```

- Set header values:

```javascript
const response = await fetch('https://example.com/api', {
  headers: {
    Authorization: 'Basic {token}',
  },
})
```

- GET with CORS:

```javascript
const response = await fetch('https://example.com/api', {
  mode: 'cors',
})
```

- POST request:

```javascript
const response = await fetch('https://example.com/api', {
  method: 'post',
  body: formData,
})

// JSON data
const response = await fetch('https://example.com/api', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
})
```

- The [Promise](#promise) returned from `fetch()` **won't reject on HTTP error status** even if the response is an HTTP `404` or `500`

```javascript
try {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  )

  if (!response.ok) {
    throw new Error('Network response was not OK')
  }

  const data = await response.json()
  console.log(data)
} catch (error) {
  console.log(error)
}
```

- `fetch()` **won't send cross-origin cookies** unless you set the credentials `init` option

## Events

**Event Bubbling**:

- When an element has lots of child elements that we are interested in.

- When we want an event handler attached to an element that is not yet in the DOM when the page is loaded.

**Event delegation** is a technique of delegating events to a single common ancestor

- JavaScript event listeners fire not only on a single DOM element but also on all its descendants

- Due to _event bubbling_, **events "bubble" up the DOM tree** by executing any handlers progressively on each ancestor element up to the root that may be listening to it

## ESM (ECMAScript Modules)

Modules allow us to divide the code-base into small units that can be developed and tested independently

Advantages:

- This makes it easier to maintain the code-base
- Code reuse across different projects
- Encapsulation (information hiding)
- Managing dependencies

::: tip NOTE
It is important to clarify the distinction between a **module** and a **module system**

We can define **a module as the actual unit of software**, while a module system is the syntax and the tooling that allows us to define modules and to use them within our projects
:::

ESM is the official standard format for JavaScript. [Module System in Node.js](./Node.js/Node.js.md#module-system-in-javascript-and-nodejs)

- JavaScript modules rely on the [`import`](#import) and [`export`](#export) statements

- Module file is always executed in **strict mode**

- Modules only work with the **HTTP(s) protocol**

- Checkout [Node.js modules](./Node.js/Node.js.md#modules) for more details

JavaScript Modules:

- Each module is a piece of code that is executed once it is loaded
- Modules are singletons. Even if a module is imported multiple times, only a single "instance" of it exists.

Use the `type="module"` attribute of `script` tag to let browsers know that the file is a JavaScript module

- `script` tag will automatically `defer` if `type="module"`

::: warning NOTE
A web-page opened via the `file://` protocol **cannot use `import` / `export`**
:::

### Export

Export a function, variable, or class from any file

Types of export:

- Named export:

  - Export multiple items

  ```javascript
  // person.js

  // in-line individual export
  export const name = 'Jesse'
  export const age = 40

  // export all at once
  const name = 'Jesse'
  const age = 40

  export { name, age }
  ```

- Default export:

  - **Only one default export** in a file

  ```javascript
  // person.js
  const person = {
    name: 'Jesse',
    age: 40,

    getInfo: () => `Name: ${this.name}, Age: ${this.age}`,
  }

  export default person
  ```

### Import

Import modules into a file

There are 2 ways Based on if they are named exports or default exports:

- Import from named exports:

  ```javascript
  import { name, age } from './person.js'

  // or imports the module as an object
  import * as person from './person.js'

  // rename named imports:
  import { name as personName, age } from './person.js'
  ```

- Import from default exports:

  ```javascript
  import person from './person.js'
  ```

### Module Pattern

Module pattern using [IIFE](#immediately-invoked-function-expression-iife):

```javascript
var budgetController = (function () {
  var x = 23
  var add = function (a) {
    return x + a
  }

  return {
    publicTest: function (b) {
      console.log(add(b))
    },
  }
})()

budgetController.x // undefined
budgetController.add() // uncaught TypeError: budgetController.add is not a function

budgetController.publicTest(25) // 49
```

## Local Storage

**`localStorage`** API stores information as a key-value pair inside the browser. This data persists even after the page is reloaded.

You can set, retrieve, and delete an item:

- `setItem(key, value)`: store key/value pair
- `getItem(key)`: get the value by key
- `removeItem(key)`: remove the key with its value
- `clear()`: delete everything
- `key(index)`: get the key number index
- `length`: the number of stored items
- Use `Object.keys` to get all keys
- We access keys as object properties, in that case `storage` event isn't triggered

_Example:_

```javascript
// set item
localStorage.setItem('id', '123')

// show all items
console.log(localStorage)
```

The main features of `localStorage` are:

- **Shared between all tabs and windows from the same origin**
- The **data does not expire**. It remains after the browser restart and even OS reboot

Limitations:

- Both `key` and `value` **must be strings**
- The **limit is 5mb+**, depends on the browser
- They **do not expire**
- The data is bound to the origin (domain/port/protocol)

::: tip NOTE

_localStorage_ can only store strings and numbers, so always convert arrays and objects to JSON string like `JSON.stringify(value)` and use `JSON.parse(stringifiedValue)` to read the object or array back

:::

### Session Storage

Properties and methods are the same as `localStorage`, but it's much more limited:

- The sessionStorage exists only within the current browser tab

  - Another tab with the same page will have a different storage
  - But it is shared between iframes in the same tab (assuming they come from the same origin)

- The data survives page refresh, but not closing/opening the tab

```javascript
sessionStorage.setItem('test', 1)
```

### Storage Event

When the data gets updated in `localStorage` or `sessionStorage`, storage event triggers, with properties:

- `key`: the key that was changed (null if .clear() is called)
- `oldValue`: the old value (null if the key is newly added)
- `newValue`: the new value (null if the key is removed)
- `url`: the url of the document where the update happened
- `storageArea`: either localStorage or sessionStorage object where the update happened

```javascript
// triggers on updates made to the same storage from other documents
window.onstorage = (event) => {
  // can also use window.addEventListener('storage', event => {
  if (event.key != 'now') return
  alert(event.key + ':' + event.newValue + ' at ' + event.url)
}

localStorage.setItem('now', Date.now())
```

## Date And Time

The `Intl` object is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting.

- It is Localized
- Performant
- Pluralized

Handling date and time using browser-native `Intl` (International) object:

- Number formatting:

  ```javascript
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  let num = formatter.format(1_555_123_123)
  // '1.6B'
  ```

- Currency formatting:

  ```javascript
  const gasPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
  })

  gasPrice.format(5.259)
  // $5.259

  const hanDecimalRMBInChina = new Intl.NumberFormat('zh-CN-u-nu-hanidec', {
    style: 'currency',
    currency: 'CNY',
  })

  hanDecimalRMBInChina.format(1314.25)
  // ￥ 一,三一四.二五
  ```

- Date and time formatting:

  ```javascript
  const msPerDay = 24 * 60 * 60 * 1000

  // July 17, 2014 00:00:00 UTC.
  const july172014 = new Date(msPerDay * (44 * 365 + 11 + 197))

  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }
  const americanDateTime = new Intl.DateTimeFormat('en-US', options).format

  americanDateTime(july172014)
  // 07/16/14, 5:00 PM PDT
  ```

- Relative time and date:

  ```javascript
  const str = `in ${num} days`

  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: auto,
  })

  rtf.format(-1, 'day') // "yesterday"
  rtf.format(-3, 'day') // "3 days ago"
  rtf.format(2, 'hour') // "in 2 hours"
  ```

## Behind The Scenes

JavaScript Engine executes the JavaScript code:

**CODE** --> **Parser** --> _Abstract Syntax Tree_ --> **CONVERSION TO MACHINE CODE** --> _Machine Code_ --> **CODE RUNS**

### Execution Context

A box, a container, or a wrapper which stores variables and in which a piece of code is evaluated and executed.

The default execution context is the _Global Execution Context_

- Code that is not inside any function will be in _Global Execution Context_

- Associated with the _Global Object_

- In the browser, the **window object** is the _Global Object_

```javascript
lastName === window.lastName // true
```

Each execution context has:

1. Variable Object (VO): variable and function declarations
2. Scope Chain
3. `this` variable

Execution context is created in two phases:

1. Creation Phase

   - Creation of the Variable Object (VO)
   - Creation of the Scope Chain
   - Determine value of the `this` variable

2. Execution Phase

   - The code of the function that generated the current context is ran line by line.

#### Creation Phase

- The argument object is created, containing all the arguments that were passed into the function.

- Now Hosting happens, the below are the steps of hoisting:

  - Code is scanned for function declarations: for each function, a property is created in the variable object, pointing to the function.

  - Code is scanned for variable declarations: for each variable, a property is created in the variable object, and set to undefined.

#### Scoping Chain

Scoping defines where a certain variable can be accessed.

- Each new function creates a scope: the space/environment, in which the variables it defines are accessible.

- Lexical scoping: a function that is lexically within another function gets access to the scope of the outer function.

JavaScript only has function scoping.

- Anything inside a curly braces is block and will have block scope

```javascript
// GLOBAL SCOPE
var a = 'Hello!'
first()

// FIRST FUNCTION'S SCOPE (LOCAL SCOPE)
function first() {
  var b = 'Hi!'
  second()

  // SECOND FUNCTION'S SCOPE (LOCAL SCOPE)
  function second() {
    var c = 'Hey!'
    console.log(a + b + c)
  }
}
```

#### `this` Variable

- Regular function call: the `this` keyword points at the global object, (the window object, in the browser).

- Method Call: the `this` variable points to the object that is calling the method.

The `this` keyword is not assigned a value until a function where it is defined is actually called.

```javascript
// Window is the default `this`
console.log(this) // window

// `this` inside a function that is called within the global object
// will be the window (in case of browser)
calculateAge(1985)

function calculateAge(year) {
  console.log(2016 - year)
  console.log(this) // window
}

// `this` inside an object is the object itself
var john = {
  name: 'John',
  yearOfBirth: 1990,
  calculateAge: function () {
    console.log(this) // `john` object
    console.log(this.yearOfBirth) // 1990
    console.log(this.yearOfBirth) // 1990

    function innerFunction() {
      console.log(this) // `this` is `window` object now as inner-function is not a method rather a regular function
    }
    innerFunction()
  },
}

john.calculateAge() // 26

// Method borrowing
var mike = {
  name: 'Mike',
  yearOfBirth: 1984,
}

mike.calculateAge = john.calculateAge
mike.calculateAge() // 32
```

## Versions

### ES2016

1. `Array.prototype.includes()` checks if an Array contains a given value:

   ```javascript
   let b = [1, 'a']

   b.includes(1)
   // true;
   b.includes(3)
   // false;
   ```

2. Exponentiation Operator:

   ```javascript
   let cubed = 2 ** 3
   // same as: 2 * 2 * 2

   let b = 3
   b **= 3
   // same as: b = b * b * b;
   ```

### ES2017

1. Async Functions (`async` / `await`): let us use synchronous-looking syntax to write asynchronous code.

2. `Object.values()` returns an Array with the values of all enumerable string-keyed properties of a given object.

   ```javascript
   let c = { a: 'a', b: [2, 5], d: { e: 300 } }

   Object.values(c)
   // ['a', [2, 5], { e: 300 }]
   ```

3. `Object.entries()` returns an Array with the key-value pairs of all enumerable string-keyed properties of a given object. Each pair is encoded as a two-element Array.

   ```javascript
   let c = { a: 'a', b: [2, 5], d: { e: 300 } }

   Object.values(c)
   // [["a", "a"], ["b", [2, 5]], [d, { e: 300 }]];
   ```

4. String padding: The string methods `.padStart()` and `.padEnd()` insert padding text until the receivers are long enough:

   ```javascript
   '7'.padStart(3, '0')
   // '007'

   'yes'.padEnd(6, '!')
   // 'yes!!!'
   ```

### ES2018

1. Asynchronous iteration

2. Object [Rest](#rest-syntax)/[Spread](#spread-syntax) Properties

3. `Promise.prototype.finally()`

### ES2019

### ES2020

New Features:

1. Dynamic Imports: Lazily import modules during runtime.

   ```javascript
   async function loadHugeLibrary() {
     const lib = await import('huge')
   }

   // lazy load on button click
   btn.onclick = loadHugeLibrary
   ```

2. Optional Chaining: Calling a deeply nested object property without throwing any error if parent property is undefined. By using an Elvis operator `?`. It is similar to the **lodash** `_.get()` function.

   ```javascript
   const user = {}

   // no errors! even though these props don't exist
   user?.shopping?.list?.['🍉']
   ```

3. Nullish Coalescing: Setting a default value for a property when its undefined. The old way is to use a logical or `||`, but this will set the default value if the variable is a 0, empty string, null, or undefined. This might be problematic. The new `??` way, will assign default value if it's null or undefined.

   ```javascript
   const duration = 0

   // old way to set default value as 400
   const animationTime = duration || 400

   // new and better way to set default value
   const animationTime = duration ?? 400
   ```

4. `BIGINT`: New primitive data type. This will represent numbers beyond **9007199254740991** (`console.log(Number.MAX_SAFE_INTEGER)`) which is 64 bits. To create a BIGINT postfix a regular integer with `n` or use the `BigInt(number)` constructor.

   ```javascript
   const largestNum = BigInt(Number.MAX_SAFE_INTEGER)

   Number.MAX_SAFE_INTEGER
   // 9007199254740991

   const utterlyMassiveInt = largestNum ** 23n
   // ... 155009387199006145641646091
   ```

5. Lazy Loading Images built-in browser.

   ```html
   <img loading="lazy" />
   ```

## To Read

1. Primitive Wrapper Objects
2. Higher Order Functions
3. getter and setter
4. WeakMap and WeakSet
5. Web Components
6. Web AuthN
7. Worker Threads

## Document Object Model (DOM)

The Document Object Model (DOM) is a cross-platform, **language-independent convention** for representing and interacting with objects in HTML, XHTML and XML documents.

The Document Object Model (DOM) is **the data representation of** the objects that comprise the structure and content of **a document on the web**

- DOM is structured representation of an HTML document

- The DOM is used to connect web pages to scripts like JavaScript

- For each HTML element, there is an object in the DOM that can be accessed and interacted with

- Objects in the DOM tree may be addressed and manipulated

DOM Objects:

- `document`: Contains the whole HTML

- `window`: Represents a window containing a DOM document

  - Main JavaScript object root, aka the **global object**

  ```javascript
  window.document === document // true

  window === document.defaultView // true

  window.window === window // true

  // global this
  this === window // true

  // all these point refer to window
  // object
  top
  parent
  self
  globalThis
  ```

### Accessing DOM

- `document.querySelector()`
- `document.getElementById()`
- `document.getElementsByClassName()`

- `Element.className`: Gets and sets the value of the class attribute of the specified element

- `Element.classList`: A read-only property that returns a live `DOMTokenList` collection of the class attributes of the element

  ```javascript
  const div = document.createElement('div')
  div.className = 'foo'

  // our starting state: <div class="foo"></div>
  console.log(div.outerHTML)

  // use the classList API to remove and add classes
  div.classList.remove('foo')
  div.classList.add('anotherclass')

  // <div class="anotherclass"></div>
  console.log(div.outerHTML)

  // if visible is set remove it, otherwise add it
  div.classList.toggle('visible')

  // add/remove visible, depending on test conditional, i less than 10
  div.classList.toggle('visible', i < 10)

  console.log(div.classList.contains('foo'))

  // add or remove multiple classes
  div.classList.add('foo', 'bar', 'baz')
  div.classList.remove('foo', 'bar', 'baz')

  // add or remove multiple classes using spread syntax
  const cls = ['foo', 'bar']
  div.classList.add(...cls)
  div.classList.remove(...cls)

  // replace class "foo" with class "bar"
  div.classList.replace('foo', 'bar')
  ```

### DOM Elements

- Add DOM Elements:

  ```javascript
  // replaces existing content inside <main>
  document.querySelector('main').innerHTML = `<h1>Hello, World!</h1>`

  // create an element and add it to <main> content
  const headEl = document.createElement('h1')

  headEl.classList.add('header')
  headEl.setAttribute('id', 'mainHeader')

  document.querySelector('main').prepend(headEl)
  document.querySelector('main').append(headEl)
  ```

## Service Worker

It is a JavaScript file that gets registered with the browser

- Stays registered with the browser even when offline
- Can load content even with no connection

- They cannot directly access the [DOM](#document-object-model-dom)
- Programmable network proxy
- Terminated when not being used
- make use of [promises](#promise)
- Require HTTPS unless on `localhost`

Use cases:

- Caching assets and API calls
- Push notification (Push & Notification API)
- Background data syc/preload
- Used on PWA

### Lifecycle & Events

Register --> Install --> Activate

- Triggers `install` event
- Triggers `activate` event
- Message events & functional events such as `fetch`, `push` & `sync`

## Polyfill

A polyfill is a piece of code that provides a fallback if a certain feature doesn't exist within that browser's JavaScript engine

- Polyfills check to see if the function they implement exists, and then we only write our fallback implementation if we have to

_Example:_

```javascript
// polyfill Array `forEach`
if (Array.prototype.forEach != undefined) {
  Array.prototype.forEach = function (callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function!')
    }

    const len = this.length

    for (let i = 0; i < len; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}
```

- [core-js](https://github.com/zloirock/core-js): Modular standard library for JavaScript
- [caniuse.com](http://caniuse.com): per-feature tables of support
- [HTML5 Please: Look up HTML5, CSS3, etc features](https://html5please.com/)

## Do You Know

- JavaScript did not have exception handling until ECMAScript 3, which explains why the language so often automatically converts values and so often fails silently: it initially couldn't throw exceptions

- JavaScript is said to be written in 10 days

> "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors." - [Jeff Atwood](https://blog.codinghorror.com/) ([@codinghorror](https://twitter.com/codinghorror))

## Snippets

```javascript
// using clsx library
clsx("base", undefined, ["more", "classes"], {
  "bg-red": hasError,
  "pointer-events-none": !isEnabled,
  "font-semibold": isTitle,
  "font-normal": !isTitle,
});

// utility
cx(
  "base",
  undefined,
  ["more", "classes"],
  hasError && "bg-red",
  isEnabled || "pointer-events-none",
  isTitle ? "font-semibold" : "font-normal"
);

type Cx = (...a: Array<undefined | null | string | boolean>) => string;

import { compose, join, filter, isBoolean, isNil, flatten } from "lodash/fp";

const cx: Cx = (...args) =>
  compose(join(" "), filter(isBoolean), filter(isNil), flatten)(args);

// or

const cx: Cx = (...args) =>
  args
    .flat()
    .filter((x) => x !== null && x !== undefined && typeof x !== "boolean")
    .join(" ");
```

## References

- [MDN (Mozilla) JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- [The Modern JavaScript Tutorial](https://javascript.info)

- [Speaking JavaScript: An In-Depth Guide for Programmers](http://speakingjs.com)

- [Impatient JS](https://exploringjs.com/impatient-js/)

- [Simplified JavaScript Jargon](https://jargon.js.org)

- [caniuse.com](http://caniuse.com): per-feature tables of support

- [Unleash JS](https://github.com/Unleash/unleash): Unleash is the open source feature toggle service
