---
title: JavaScript Testing
description: JavaScript Testing
---

# JavaScript Testing

For more details checkout [Testing](../../Concepts/Testing/)

## Unit Testing Libraries

Test runners:

- [Jest](#jest)
- [Mocha](#mocha)
- Jasmine

### Mocha

[Mocha](https://mochajs.org/) is a test framework for Node.js programs, featuring:

- Browser support
- Asynchronous testing
- Test coverage reports
- Use of any assertion library
- Really good for Node.js projects
- No Test double library included (use [Sinon](https://sinonjs.org/))
- No assertions library included (use [Chai](#chai))

_Example:_

```javascript
var expect = require("chai").expect;

// test suite
describe("Mocha", function () {
  // test spec (unit test)
  it("should run our tests using Mocha", function () {
    expect(true).to.be.ok;
  });
});
```

TODO: Check mocha's execution context being reset after each test case execution?

### Chai

[Chai](https://www.chaijs.com/) is an _expectation_ or _assertion_ library

- `expect` is used to run BDD style test cases

  ```javascript
  var expect = require("chai").expect;

  expect(true).to.be.true;
  ```

- The above code will not provide any output if the expectation is met

### Jest

Jest is a JavaScript unit testing framework, used by Facebook to test services and React applications

- It is a test runner that lets us access the DOM via [js-dom](https://github.com/jsdom/jsdom)

  - js-dom is a JavaScript implementation of various web standards, for use with [Node.js](./Node.js/Node.js.md)

  - js-dom is only an approximation of how the browser works, it is often good enough for testing React components

- Test runner that:

  - Finds tests
  - Runs tests
  - Determines whether tests pass or fail

- It has an assertion library and mocking library

- Jest looks for filenames ending with `.test.js`

Setup:

- Install it using any package manager:

  ```bash
  npm install --save-dev jest
  ```

- Generate a basic configuration file:

  ```bash
  jest --init
  ```

- Write test cases

- Run test cases

_Example:_

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}

module.exports = sum;

// sum.test.js
const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

#### Tests

- Global `test` or `it` method has 2 required and 1 optional argument: creates a test closure

  - `name`: The name of your test

  - `fn`: The function for your test

  - `timeout`: The timeout for an async function test

```javascript
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// or

it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

- Test fails if error is thrown when running function

  - Assertions throw errors when expectation fails

- No error --> tests pass

  - Empty test passes!

- Run only this test:

  ```javascript
  test.only("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  fit("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  ```

- Skip this test:

  ```javascript
  test.skip("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  xit("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  ```

#### Suite

Suite is a **specific group of related tests**

- In jest each file is test suite

Tests can be grouped together using a `describe` block

- Each test file can have any number of `describe` blocks

```javascript
// describe(name: 'group name', fn: 'function that contains tests')

describe("matching cities to foods", () => {
  test("Vienna <3 veal", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});
```

#### Matchers

"Matchers" let you test values in different ways

- `expect()` returns an "expectation" object, we can call matchers on them

Commonly used matchers:

- Truthiness:

  - `toBeNull` matches only `null`
  - `toBeUndefined` matches only `undefined`
  - `toBeDefined` is the opposite of `toBeUndefined`
  - `toBeTruthy` matches anything that an `if` statement treats as `true`
  - `toBeFalsy` matches anything that an `if` statement treats as `false`

- Numbers:

  - `toBeGreaterThan()`
  - `toBeGreaterThanOrEqual()`
  - `toBeLessThan()`
  - `toBeLessThanOrEqual()`
  - `toBe` and `toEqual` are equivalent for numbers
  - For **floating point** equality, use `toBeCloseTo` instead of `toEqual`, because you don't want a test to depend on a tiny rounding error

- Strings:

  - `toMatch`: check strings against regular expressions

  ```javascript
  test("there is no I in team", () => {
    expect("team").not.toMatch(/I/);
  });

  test('but there is a "stop" in Christoph', () => {
    expect("Christoph").toMatch(/stop/);
  });
  ```

- Arrays and iterables:

  - `toContain`: array or iterable contains a particular item

- Exceptions:

  - `toThrow`: test whether a particular function throws an error when it's called

  ```javascript
  function compileAndroidCode() {
    throw new Error("you are using the wrong JDK");
  }

  test("compiling android goes as expected", () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  });
  ```

#### Mocking

```javascript
const add = jest.fn(() => 3);

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
  expect(add(9, 6)).toBe(3);
});
// test passed

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);
  expect(add).toHaveBeenCalledWith(1, 2);
});
```

- Manually mocking `fetch`:

  ```javascript
  // src/utils/currency.test.js
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    }),
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("finds exchange", async () => {
    const rate = await convert("USD", "CAD");

    expect(rate).toEqual(1.42);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Mocks with failure
  it("returns null when exception", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    const rate = await convert("USD", "CAD");

    expect(rate).toEqual(null);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.exchangeratesapi.io/latest?base=USD",
    );
  });
  ```

- Faking API calls made using `fetch`:

  ```javascript
  // src/utils/currency.js
  async function convert(base, destination) {
    try {
      const result = await fetch(
        `https://api.exchangeratesapi.io/latest?base=${base}`,
      );

      const data = await result.json();

      return data.rates[destination];
    } catch (e) {
      return null;
    }
  }

  export { convert };
  ```
