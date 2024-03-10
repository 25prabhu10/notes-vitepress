# Metaprogramming

Metaprogramming is a programming technique in which computer programs have **the ability to treat other programs as their data**.

- It means that a program can be designed to read, generate, analyze or transform other programs, and even modify itself while running.

- In some cases, this allows programmers to minimize the number of lines of code to express a solution, in turn reducing development time.

- It also allows programs greater flexibility to efficiently handle new situations without recompilation.

## Macros

Make your own syntax

- Happens during compile-time (before the code runs)

_Example:_ Custom syntax

```javascript
// macro (sweet.js)
syntax hi = function (ctx) {
    return #`console.log('hello, world!')`;
};

// before compile/expansion
hi

// after compile/expansion
console.log("hello, world!");
```

_Example:_ Custom syntax for `then`

```javascript
operator >>= left 1 = (left, right) => {
  return #`${left}.then(${right})`;
};

fetch('/foo.json') >>= resp => { return resp.json() }
                   >>= json => { return processJson(json) }

// Instead of
fetch("/foo.json")
  .then((resp) => {
    return resp.json();
  })
  .then((json) => {
    return processJson(json);
  });
```

## Reflection

_Example:_

```csharp
// Without reflection
Foo foo = new Foo();
foo.PrintHello();

// With reflection
Object foo = Activator.CreateInstance("complete.classPath.and.Foo");
MethodInfo method = foo.GetType().GetMethod("PrintHello");
method.Invoke(foo, null);
```

```javascript
// Without reflection
const foo = new Foo();
foo.hello();

// With reflection
const foo = Reflect.construct(Foo);
const hello = Reflect.get(foo, "hello");
Reflect.apply(hello, foo, []);

// With eval
eval("new Foo().hello()");
```

```python
# Without reflection
obj = Foo()
obj.hello()

# With reflection
obj = globals()["Foo"]()
getattr(obj, "hello")()

# With eval
eval("Foo().hello()")
```

### Introspection

We have read-only access to the structure of a program.

_Example:_ Checking keys of an object

```javascript
const hero = {
  health: 100,
  backpack: ["carrot", "beer"],
  weapon: "sword",
};

const keys = Object.keys(hero);

console.log(keys);
// ['health', 'backpack', 'weapon']
```

### Self-Modification

We can change the structure.

_Example:_ Modifying function at run time

```javascript
function grumpySum(a, b) {
  if (a > 5) {
    grumpySum = () => 0;
  }

  return a + b;
}

console.log(grumpySum(1, 1)); // 2
console.log(grumpySum(10, 1)); // 11
console.log(grumpySum(1, 3)); // 0
console.log(grumpySum(2, 100)); // 0
```

### Intercession

We can redefine the semantics of some language operations.

_Example:_

```javascript
const hero = {
  health: 100,
};

Object.defineProperty(hero, "status", {
  get: function () {
    if (this.health > 50) {
      return "fit like a champ";
    }

    return "badly hurt";
  },
});

console.log(hero);
// { health: 100 }

console.log(hero.status);
// 'fit like a champ'
```
