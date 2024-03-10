# Frontend Questions

[Front-end-Developer-Interview-Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/main)

## JavaScript

1. What version of JavaScript are you using or typescript?

2. How do you debug in JavaScript?

   - debugger statement `console.log` or dev tools

3. How do you build Frontend, which tool you prefer?

   - Gulp, webpack, angular CLI

4. What is linting and what do you use for linting?

5. How to make an API call?

6. `5 + 1 + "2"` answer: `"62"`

7. Difference between `==` and `===`

8. `1 == "1"` answer: `true`

9. `1 === "1"` answer: `false`

10. `1 && 2` answer: `2`

11. `0 && 1` answer: `0`

12. `0 || 1` answer: `1`

13. `1 || 2` answer: `1`

14. `false == '0'` answer: `true`

15. `true === "true"` answer: `false`

16. How does JavaScript event loop works also output of below?

    ```javascript
    function test() {
      console.log('test')
    }

    test()

    setTimeout(() => {
      console.log('hello world')
    }, 0)

    test()
    ```

    - 0 delay doesn't actually mean the callback will fire of after zero MS calling set time what with a delay 0 MS doesn't execute the callback function after the given interval.

    - Execution depends on the number of waiting task in the queue in the example below the message "test" will be returned to the console before the message in the callback gets processed because the delay is the minimum time required for the runtime to process the request but not a guaranteed time.

    - Basically the set timeout needs to wait for all the code for cute messages to complete even though you specified particular time limit for your set timer

    '''bash
    test
    test
    hello world
    '''

17. Output of the above:

    - Followed by question on JavaScript hoisting of car `foo ="Foo"` statement

18. Why would you clone an object? How do you clone an object? Difference between pass by value and pass by reference?

19. What is callback?

20. How do you handle browser compatibility?

    - Polyfills

21. How do you do exception handling in JavaScript?

22. Difference between `null` and `undefined` and `undeclared`

    - `null` is defined as a variable that has been declared but no value exists and is a type of itself
    - `undefined` is a value of a variable and the type of object
    - `undeclared` variables is a variable that has been declared without `var` keyword

23. How to give default value of a function parameter?

    - `var a = a || [default]` or `function (a = [default])`

24. Difference between functions and arrow functions? Examples if well answered

25. What is event bubbling and event delegation?

26. How to reverse a string?

    - `str.split('').reverse().join('');`

27. Difference between `bind`, `call` and `apply`? Examples if well answered

28. How to implement queue and stack in JavaScript?

    - Using jQuery, jQuery validate and jQuery validate Unobtrusive for client-side validation using Data Annotations.

    - Performance improvements: the use of Bundling and `Minification`

29. `console.log(1 > 3 < 2)` --> `true`

    - It interprets from left to right and it tries to cast to same type

    - `1 > 3` is `false`
    - `false < 2` here boolean value `false` is cast to `0` as the other operand is a number
    - Hence it becomes `0 < 2` comparison which is `true`

30. `console.log(5 + "0" === 50)` --> `false`

31. `console.log(typeof((1 + "1")))` --> `string`

    - Numeric literal `1` will be cast to string `"1"`, hence the operation performed is string concatenation

32. `console.log(8/4/2 >= 2/4/8 == 1)` --> `true`

33. The below code will return `undefined`, because:

    - the variable `x` under the function scope is hosted but not initialized

    ```javascript
    var x = 19

    var boy = function () {
      console.log(x)
      var x = 18
    }

    boy()
    ```

34. The below code will return `1undefined`, because:

    - the if condition is evaluated using `eval` so `eval(function f() {})` returns `function f() {}` which is `true`

    - `typeof f` returns `undefined` because if statement code is executed at run time

    ```javascript
    var y = 19

    if (function f() {}) {
      y += typeof f
    }

    console.log(y)
    ```

35. The below code will return `false`, because:

    - In JavaScript all numbers are treated with floating point precision

    - Hence, `0.1 + 0.2` will result in `0.30000000000000004` instead of `0.3`

    - `0.30000000000000004 == 0.3` --> `false`

    ```javascript
    var a = 0.1
    var b = 0.2

    var c = a + b

    console.log(c == 0.3)
    ```

36. The below code will return `false`, because:

    - `"1"` is converted to number type which results in `0`

    ```javascript
    console.log(isNaN('1'))
    ```

37. The below code will return `0`, because:

    - `delete` operation is used to delete properties from an object

    ```javascript
    var output = (function (x) {
      delete x
      return x
    })(0)
    ```

38. What is tree shakeable in Javascript:

    - Tree shaking is a term commonly used within a JavaScript context to describe the **removal of dead code**.

    - It relies on the **import and export statements (ES6)** to detect if code modules are exported and imported for use between JavaScript files.

## HTML

1. What is label used for and how to connect label and input?

   - label for
   - input id

2. How to insert an image on page?

3. What is the element tag for text field, element tag for drop-down?

4. Semantic elements (input, table, form ...) vs non-semantic elements (div, span)?

   - Semantic elements Non-Semantic elements
   - they have meaning they don't have meaning
   - they describe how the content within them is supposed to behave | they can contain anything
   - they have specific attributes for their structure 'class' attribute can be used to work with their structure

5. How to include CSS and JavaScript and where to include those in a page?

6. What's wrong with below HTML, how can you improve it:

   ```html
   <h1>Welcome</h1>
   <div>TODO application</div>
   <img src="smile.jpg" />
   <h3>TODO List</h3>
   <form>
     <label>title</label>
     <input type="text" name="title" />
     <button>Add</button>
     <button>Add</button>
     <button>Cancel</button>
   </form>
   ```

7. How to link a new page? How to open a page in new window? Are there any security issues associated with opening the page in a new window and how to prevent that?

## CSS

1. What is CSS display properties? What is display type of `div` or `span`?

2. Difference between display block and display inline and how to set the width of inline elements?

3. How to center align a block level element on page?

4. What are different types of positions difference between absolute, relative and static?

5. What are different types of units?

6. What is a responsive design?

7. How do you style for different screens sizes?

   - media queries or JavaScript

8. Have you used CSS preprocessor or post processor?

9. How do you link CSS?

10. How to avoid naming conflict in CSS?

    - use BEM (Block Element Modifier) or style components or CSS modules

11. Difference between class and ID selector?

12. What is CSS specificity of selectors which selected types has higher specificity?

13. What is difference between margin padding and border?

14. What is difference between content Box vs border box?

15. Exercise: I have three elements on a page with their specific heights and these elements are not covering full page result of this there is an extra space below third element I want second element to take that extra space on the page how can I achieve that need to give this exercise on `JSfidler` and `codepen`

## Frameworks

1. Please explain SPA? and why would you use it instead of the MVC application for example

   - Rich user interface
   - Avoid unnecessary page reload
   - Requires APIs for communication
   - More complex
   - More Security expertise

2. Installing NPM packages?

3. Have you done any Frontend testing? What do you use

   - JS:

     - Jasmine:
       - Behavioural Driven Development (BDD)
       - Dose not require DOM
       - Frontend and Backend
     - MochaJS:
       - Frontend and Backend
     - JEST:
       - NodeJS, React, Angular, VueJS and other Babel based projects
       - Very fast and highly performant
     - Karma

   - Functional: Selenium
   - Cross-browser: LambdaTest
   - CSS: [Needle](https://needle.readthedocs.io/en/latest/)

4. What is Test-Driven Development (TDD)?

   - Testing methodology
   - check: Is the code valid?
   - Steps:
     - Add a test
     - Execute the tests
     - Fail, Make changes to the code
     - Execute the tests
     - Pass, Add a test
   - Catch bugs or errors very quickly
   - Faster feedback

## React

1. How much React experience do you have?
1. How would you build a form using React?
1. How do you style React Components?
1. How much Hooks have you used (give example)?
1. How do you test React components?

## Angular 10

1. How to use TypeScript to write Angular applications.
2. All about directives and components, including the creation of custom directives/components.
3. How data binding works?
4. What Pipes are and how to use them?
5. How to access the Web (eg. RESTful servers)?
6. What dependency injection is and how to use it?
7. How to use Modules in Angular?
8. How to optimize your (bigger) Angular Application?
9. Controller
10. Events
11. Services
12. Filters
13. Validations

14. Angular CLI commands for creating app, Components, Services, Modules?

    - App: `ng new`
    - `ng serve`
    - Component: `ng generate component`
    - Service: `ng generate service`
    - Module: `ng generate module`

15. Angular 12 routing (All about routing and handling navigation.)
16. Inter-Component Communication (Parent, Child) - `@Input`, `@Output`, `Event Emitter`, etc
17. Unit Testing of Type-Script code using Jasmine / karma framework
18. What is NGRx/redux in angular slash react and why are we using it what are the advantages of NCRx/redux?

    - RxJS is a library for composing asynchronous and callback-based code in a functional, reactive style using Observables. Many APIs such as HttpClient produce and consume RxJS Observables and also uses operators for processing observables.

19. How do you structure your angular project?
20. Why we use reducers and components and what should we put in each and why?
21. Please explain the state management in single page application using NGRx/redux

22. what is the difference between angular JS and angular?

    - [Comparison](https://github.com/sudheerj/angular-interview-questions#what-is-angular-framework)

23. What are directives?

    - Directives add behaviour to an existing DOM element or an existing component instance.
