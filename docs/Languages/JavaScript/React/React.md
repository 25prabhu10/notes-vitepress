---
title: React.js
description: A JavaScript library for building user interfaces
lastmod: 2023-08-26
---

# React.js

A JavaScript library for building user interfaces. Developed by Facebook and released in 2013.

It is used to build components that represent logical reusable parts of the UI.

Why React?

- It's composable
- It's declarative (What should be done? Instead of How should it be done?)

- React works primarily in the View layer
- React applications run faster than applications written in plain JavaScript
- Reusable (and clearer) Web Components

React allows you to write maintainable and performant code by using the concept of components. Components allow you to focus on describing the UI you want, rather than focusing on the details of how the UI actually gets inserted in the page

## Setting up a React Project

Before we can begin, we'll need [Node.js and npm](https://nodejs.org/en/).

Make sure [Node.js](https://nodejs.org/en/) is installed, if not then install it. It will by default install node package manager - [npm](https://www.npmjs.com/), if not installed then install it. If you prefer [Yarn](https://classic.yarnpkg.com/lang/en/) use that.

- Run the below commands to make sure `Node.js` and `npm` or `yarn` are installed:

  ```bash
  node -v
  npm -v
  yarn -v
  ```

To create a basic React project we need the `React` library and also `ReactDOM` library because _React_ only creates views, to render these views we need a library that will handle DOM manipulations. _ReactDOM_ library dose this for us.

- **React** is the **library for creating views**
- **ReactDOM** is the **library used to render the UI in the browser**

We write React code using [JSX](#javascript-xml-jsx) which is a syntax extension of JavaScript.

- As browsers can only parse JavaScript syntax, we need a tool or a library which will transform our JSX code into JavaScript
- [Babel](#babel) is the library which we will use to do the transformation of JSX to JavaScript

### Ways To Setup React Project

We can either:

1. Use CDN links to get the JS files of these two libraries and add them as script tags in `index.html` file. Add your react code inside a script tag with type attribute set to `text/babel`:

   ```html
   <!-- ... other HTML ... -->

   <!-- Load React. -->
   <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
   <script
     src="https://unpkg.com/react@18/umd/react.development.js"
     crossorigin
   ></script>
   <script
     src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
     crossorigin
   ></script>

   <script src="https://unpkg.com/babel-standalone/babel.min.js"></script>

   <script type="text/babel">
     // JSX code here. Or link to separate JavaScript file that contains JSX.
   </script>
   ```

2. Or create a local development environment and manage project dependencies. Follow steps mentioned in [React Project Setup From Scratch](#react-project-setup-from-scratch)

3. Or use boilerplate generators, such as:

   - [create-react-app](https://create-react-app.dev/) application to generate the boilerplate. It is recommended by the official react guide.

     ```bash
     npx create-react-app my-app
     cd my-app
     npm start
     ```

   - [Vite.js](https://vitejs.dev/guide/) is an opinionated built tool, it supports react template.

     ```bash
     # npm 6.x
     npm create vite@latest my-app --template react

     # npm 7+, extra double-dash is needed:
     npm create vite@latest my-app -- --template react

     # yarn
     yarn create vite my-app --template react

     # pnpm
     pnpm create vite my-app -- --template react
     ```

### React Project Setup From Scratch

The most basic development workflow should allow us to:

- Write _JSX_ and transform it into JavaScript on the fly
- Write code in a modular pattern
- Manage dependencies
- Bundle JavaScript files and use source maps for debugging
- Use _Sass_, _less_ or _CSS-in-JS_

Steps to create a base React project without using any boilerplate tools:

1. Create an empty directory and give it the project name like `my-app`. Move inside this newly create project directory:

   ```bash
   cd my-app
   ```

2. Initialize your project with `npm init` or `yarn init` and also initialize _git_ as well with `git init`

3. A `package.json` file will be created after you complete _step-3_.

   - The `package.json` is a standard `npm` manifest file that records important metadata about a project, such a name, description, information about the author, etc. It lets the developer specify dependencies (that should be downloaded and installed) and define script tasks.
   - `Yarn` also uses the same file

4. Create `.gitignore` file at the root of the project to exclude all the files and directories that should not be committed, such as `/node_modules`, `/dist` directory:

   ```gitignore
   # dependencies
   /node_modules

   # testing
   /coverage

   # production
   /build
   /dist
   ```

5. Create a `public` directory which will contain all the static assets, such as the main `index.html` file, images, `manifest.json`, `robots.txt` and other static files

6. Create an `index.html` file inside the `public` directory. This is an empty HTML page that the browser loads, which react will utilize to render your app. An example of HTML markup of `index.html` is show below:

   ```html
   <!-- sourced from https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html -->
   <!doctype html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <meta
         name="viewport"
         content="width=device-width, initial-scale=1, shrink-to-fit=no"
       />
       <title>React Starter</title>
     </head>

     <body>
       <div id="root"></div>
       <noscript> You need to enable JavaScript to run this app. </noscript>
       <script src="../dist/bundle.js"></script>
     </body>
   </html>
   ```

7. Create a source directory called `src`, which will containing all the user written content such as JavaScript modules, CSS files, Templates etc.

8. Now you need a **module packager or build tool**, which will orchestrate JSX transformation, file minification and concatenation, module/dependency bundling or any other tasks. Tools such as [Grunt](https://gruntjs.com/), [gulp.js](https://gulpjs.com/), [webpack](https://webpack.js.org/), [PARCEL](https://parceljs.org/), [rollup.js](https://rollupjs.org/), [Snowpack](https://www.snowpack.dev/) can be used

9. We will use webpack (v5) and for more info on how webpack works check out this [Link](../Tools/Webpack/Webpack.md)

   - Install it as project development dependency:

     ```bash
     npm install webpack webpack-cli --save-dev
     ```

   - Now create webpack configuration file at the root of the project called `webpack.config.js`

10. Install [`babel`](#babel) and its dependencies as dev dependency:

    ```bash
    npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
    ```

    - Add the below settings inside `webpack.config.js` file:

      ```javascript
      {
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ];
        }
      }
      ```

    - Create `babel.config.json` or `.babelrc` configuration file and add:

      ```json
      {
        "presets": ["@babel/preset-env", "@babel/preset-react"]
      }
      ```

11. Install `react` and `react-dom` as regular dependencies:

    ```bash
    npm install --save react react-dom
    ```

12. Now all the basic setup is done and you can proceed with working on the project.

::: tip NOTE
If you are using a boilerplate generator such as create-react-app, you don't need to worry about the initial setup. You can just start working on the project which has been scaffolded.
:::

### React Project Structure

There a several ways to structure a project, here is one structure:

```bash
my-app
├── package.json
├── README.md
└── src
    ├── components
    │   ├── App
    │   │   ├── App.js
    │   │   └── index.js
    │   ├── Header
    │   │   ├── Header.js
    │   │   └── index.js
    │   └── Widget
    │       ├── index.js
    │       ├── use-stuff.hook.js
    │       ├── WidgetChild.js
    │       ├── Widget.constants.js
    │       ├── Widget.helpers.js
    │       └── Widget.js
    ├── constants.js
    ├── helpers
    │   ├── animation.helpers.js
    │   └── auth.helpers.js
    ├── hooks
    └── utils.js
```

### Babel

Babel is a free and open-source JavaScript transpiler that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript that can be run by older JavaScript engines.

- Babel is required to convert the React [JSX](#javascript-xml-jsx) syntax to JavaScript syntax that most of the browsers can interpret.

- Babel looks for the JSX/JavaScript code in the HTML file where the script tag contains `type=text/babel`.

```html
<!-- React Library & React DOM -->
<script src="https://unpkg.com/react/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
  // JSX code here. Or link to separate JavaScript file that contains JSX.
</script>
```

## Introduction

A simple web page will consist of an HTML file like `index.html`, this file will contain references to stylesheets or inline-styles and references to JavaScript file files or in-line JavaScript code.

Similarly, a simple React application will have all these three thing. Just that instead of the normal JavaScript code React uses an extended version of JavaScript called [JSX](#javascript-xml-jsx). In the below example inside the script tag with type `text/babel` is the React code.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello, World!</title>
  </head>
  <body>
    <div id="root"></div>

    <!-- React Library & React DOM -->
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
      // JSX code here. Or link to separate JavaScript file that contains JSX.

      // REACT COMPONENT
      function Welcome() {
        return <h1>Hello, World!</h1>;
      }

      // RENDER THE REACT COMPONENT
      ReactDOM.render(<Welcome />, document.getElementById("root"));
    </script>
  </body>
</html>
```

In the above example we have used HTML like element `<h1>` inside a JavaScript function which should cause an error, but you will not get any errors in the browser and the we will see the result in the browser.

This is because React uses an extended version JavaScript called [JSX](#javascript-xml-jsx). This new JSX syntax allows us to use HTML like tags inside JavaScript code.

### Virtual DOM

When we use React, we usually don't deal with DOM elements directly. Instead, we create elements for a **"Virtual DOM"**.

Virtual DOM is an **in-memory**, **lightweight representation of the DOM**.

- These elements are really nothing but JSON objects. They represent the underlying DOM structure but don't carry any of the weight of actual DOM elements.

- React converts these virtual elements into real DOM elements as necessary. This process of finding the minimum number of changes that must be made in order to make the virtual DOM tree and the actual DOM tree identical is called **reconciliation**.

- A Diffing algorithm is used to identify these changes.

  - This algorithm is very fast and efficient
  - It makes few assumptions:

    - Two elements of different types will produce different trees
    - When we have a list of child elements which often changes, we should provide an unique "key" as a prop

- React uses Virtual DOM, as direct DOM manipulation is a slow and performant task.

### JavaScript XML (JSX)

JSX stands for JavaScript XML. It is an **extension to the JavaScript language syntax.**

- **React uses JSX** instead of vanilla JavaScript to provide a concise syntax for creating complex DOM trees with attributes.

- JSX combines JavaScript and XML, to extend JavaScript that allows us to define React elements using a tag-based syntax directly within our JavaScript code. Using HTML inside JavaScript Code.

- JSX allows nested components

  ```jsx
  <TodoList>
    <Todo />
    <Todo />
    <Todo />
  </TodoList>
  ```

- Since `class` is a reserved word in JavaScript, `className` is used to define the class attribute instead:

  ```jsx
  <h1 className="aliens">Hello, World!</h1>
  ```

- JavaScript expressions are wrapped in curly braces and indicate where variables will be evaluated and their resulting values returned.

  ```jsx
  <h1>{title}</h1>
  ```

- JavaScript code is evaluated inside the curly braces:

  ```jsx
  <h1>{"Hello, " + title}</h1>
  <h2>{author.toUpperCase()}</h2>
  <p>{5 + 10}</p>
  ```

## React Element

A React elements look similar to the HTML elements and describe how React should render the actual DOM element.

- Create a React element which represents `h1` using `React.createElement`:

  ```javascript
  React.createElement("h1", { id: "recipe-0" }, "Baked Salmon");
  ```

  - JSX is used for creating React element which look similar to HTML. This JSX code will be converted into the above mentioned `React.createElement`

  ```jsx
  <h1 id="recipe-0">Baked Salmon</h1>
  ```

- React will create the actual DOM elements based on the above code:

  ```html
  <h1 id="recipe-0">Baked Salmon</h1>
  ```

- This React element has similar properties applied to new DOM elements.

  ```javascript
  {
    $$typeof: Symbol(React.element),
    "type": "h1",
    "key": null,
    "ref": null,
    "props": {id: "recipe-0", children: "Baked Salmon"},
    "_owner": null,
    "_store": {}
  }
  ```

In the above piece of code:

- `type`: Which type of HTML or SVG element to create.
- `props`: Represents the data and child elements required to construct a DOM element.
- `children`: Displaying other nested elements or text.

### React Factory

`React.createFactory` is just a helper that binds your component class to `React.createElement` so you can make your own factories.

- `React.DOM` gives a bunch of factories for HTML elements.

```javascript
Greeting = React.createFactory(GreetingClass);

React.render(
  React.DOM.div({id: "greeting-container", className: "container"},
    Greeting({name: "World"})
  ),
  document.getElementById("root"))
);
```

::: danger DEPRECATED
React components can no longer be called directly like this. Instead use JSX. See [React Factories](https://reactjs.org/warnings/legacy-factories.html).
:::

## React Component

React components are reusable chunks of JavaScript that output (via JSX) HTML elements.

- Components are the building block of React UI.

- At a bare minimum, a React component is simply a JavaScript class (with a render method) or a function that returns (JSX) a description of the component's UI:

```jsx
// Class component

class Hello extends React.Component {
  render() {
    return <h1>Hello, World!</>;
  }
}

// Functional component

function Hello() {
    return <h1>Hello, World!</>;
}
```

Ways to create a React class component:

- When React was first made open source in 2013, there was one way to create a component: `createClass`. The use of `React.createClass` to create a component looks like this:

  ```javascript
  const IngredientsList = React.createClass({
    displayName: "IngredientsList",

    render() {
      return React.createElement(
        "ul",
        { className: "ingredients" },
        this.props.items.map((ingredient, i) =>
          React.createElement("li", { key: i }, ingredient),
        ),
      );
    },
  });
  ```

  Components that used `createClass` would have a `render()` method that described the React element(s) that should be returned and rendered. The idea of the component was the same: we'd describe a reusable bit of UI to render.

  ::: danger DEPRECATED
  In React _v15.5_ (April 2017), React started throwing warnings if `createClass` was used. In **React _v16_ (September 2017), `React.createClass` was officially deprecated** and was moved to its own package, `create-react-class`.
  :::

- Using class syntax added to JavaScript with ES2015. React added `React.Component` API that allowed the use of class syntax to create a new component:

  ```javascript
  class IngredientsList extends React.Component {
    render() {
      return React.createElement(
        "ul",
        { className: "ingredients" },
        this.props.items.map((ingredient, i) =>
          React.createElement("li", { key: i }, ingredient),
        ),
      );
    }
  }
  ```

  ::: tip HEADS-UP
  This syntax may as well be deprecated in near future.
  :::

- `displayName`: This string property is used in debugging messages.

### Rendering React Components

Once a React element is created, we need a way to display it in the browser. **ReactDOM** contains the tools necessary to render React elements in the browser.

The `ReactDOM.render()` method takes two arguments:

1. The HTML-like elements (a.k.a. **JSX**) you want to output.

2. The **location in the DOM** where React will render the JSX into.

```jsx
ReactDOM.render(<h1>Sherlock Holmes</h1>, document.querySelector("#container");
```

When will React render a component?

1. State changes

2. Parent component renders

3. Props changes

4. `shouldComponentUpdate` function returns `true`

5. `component.forceUpdate(callback)`: Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`

## React Fragments

Let us create a React component:

```jsx
function Welcome({ name }) {
  return <h1>Welcome {name}</h1>;
}

ReactDOM.render(<Welcome name="Mort" />, document.getElementById("root"));
```

- If we add an adjacent element to `h1` inside the `Welcome()` function (as shown below), we will get an error, because React expects component to return only one parent element.

```jsx
function Welcome({name}) {
  return (
    <h1>Welcome {name}</h1>
    <p>To the world of React</p>);
}

ReactDOM.render(<Welcome name="Mort" />, document.getElementById("root"));
```

- The above JSX will be converted to standard JavaScript as shown below, here we can see that the function returns 2 items, which is not valid in JavaScript:

```jsx
function Welcome({ name }) {
  return (
    React.createElement("h1", null, "Welcome ", name),
    React.createElement("p", null, "To the world of React")
  );
}
```

- To overcome these issue, we should wrap the two elements with a parent element such as a `div`, so that only one `createElement` is returned by the function after transpilation:

```jsx
function Welcome({ name }) {
  return (
    <div>
      <h1>Welcome {name}</h1>
      <p>To the world of React</p>
    </div>
  );
}

ReactDOM.render(<Welcome name="Mort" />, document.getElementById("root"));
```

- In cases where parent element such as `div` tag are unnecessary, React (16.2+) provides an inbuilt element called `React.Fragment` which mimics the behaviour of a wrapper without actually creating a new tag:

```jsx
function Welcome({ name }) {
  return (
    <React.Fragment>
      <h1>Welcome {name}</h1>
      <p>To the world of React</p>
    </React.Fragment>
  );
}
```

- An alternate syntax:

```jsx
function Welcome({ name }) {
  return (
    <>
      <h1>Welcome {name}</h1>
      <p>To the world of React</p>
    </>
  );
}
```

- In the DOM, the fragment is not visible in the resulting tree:

```html
<h1>Welcome Mort</h1>
<p>To the world of React</p>
```

## React `StrictMode`

`StrictMode` is a tool for highlighting potential problems in an application. Like Fragment, `StrictMode` does not render any visible UI. It activates additional checks and warnings for its descendants.

- Strict mode checks are run in development mode only; they do not impact the production build.

```jsx
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

`StrictMode` currently helps with:

- Identifying components with unsafe life-cycles
- Warning about legacy string `ref` API usage
- Warning about deprecated `findDOMNode` usage
- Detecting unexpected side effects
- Detecting legacy context API
- Ensuring reusable state

## Conditional Rendering

Conditional rendering in React works the same way conditions work in JavaScript.

Use JavaScript operators like `if` or the ternary operator to create elements representing the current state, and let React update the UI to match them.

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;

  // OR
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById("root"),
);
```

- We can use inline if with logical `&&` operator, whenever we need to render an expression only when the condition is met

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2> You have {unreadMessages.length} unread messages. </h2>
      )}{" "}
    </div>
  );
}
```

- It works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

- Note that returning a falsy expression will still cause the element after `&&` to be skipped but will return the falsy expression. In the example below, `<div>0</div>` will be returned by the render method.

```jsx
render() {
  const count = 0;  return (
    <div>
      {count && <h1>Messages: {count}</h1>}    </div>
  );
}

// OUTPUT
<div>0</div>
```

Preventing Component from Rendering by returning `null`:

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}
```

## Props

A key factor to make components reusable and composable is the **ability to configure** them, and **React provides properties (props)** for doing so.

**Props are the mechanism used in React for passing data from parent to child components**.

- They **can't be changed from inside the child component (immutable)**; props are **passed and "owned" by the parent**.

```jsx
import React, { Component } from "react";

// Parent Component
class GroceryList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity="1" name="Bread" />
        <ListItem quantity="6" name="Eggs" />
        <ListItem quantity="2" name="Milk" />
      </ul>
    );
  }
}

// Child Component
class ListItem extends Component {
  render() {
    return (
      <li>
        {this.props.quantity} × {this.props.name}
      </li>
    );
  }
}

React.render(<GroceryList />, document.getElementById("root"));
```

### Children

React renders child elements using `props.children`

The content between the opening and closing tags using `props.children`:

```jsx
import React, { Component } from "react";

// Parent Component
class GroceryList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity="1">Bread</ListItem>
        <ListItem quantity="6">Eggs</ListItem>
        <ListItem quantity="2">Milk</ListItem>
      </ul>
    );
  }
}

// Child Component
class ListItem extends Component {
  render() {
    return (
      <li>
        {this.props.quantity} × {this.props.children}
      </li>
    );
  }
}

React.render(<GroceryList />, document.getElementById("root"));
```

### Prop Validation

When creating components, it is good practice to specify which props can be used, which ones are required, and which types of values they accept.

This can be done by declaring `prop-types` library (or `propTypes` old)

- `PropTypes` do type checking at runtime
- Used for development and not production
- They produce errors only during development

Install `prop-types`:

```bash
npm install --save prop-types
```

_Example:_

```jsx
import React from "react";
import PropTypes from "prop-types";

const Greeter = (props) => {
  return <h1>{props.salutation}</h1>;
};

Greeter.propTypes = {
  salutation: PropTypes.string.isRequired,
};

render(<Greeter salutation="Hello World" />, document.getElementById("root"));
```

The above code is equivalent to:

```jsx
const Greeter = (props) => {
  const { salutation } = props;

  if (typeof salutation !== "string") {
    console.warn(
      `Expected type for salutation is a string, but a ${typeof salutation} was passed`,
    );
  }

  return <h1>{salutation}</h1>;
};
```

Some prop types:

| Type      | Validator          |
| --------- | ------------------ |
| Arrays    | `PropTypes.array`  |
| Boolean   | `PropTypes.bool`   |
| Functions | `PropTypes.func`   |
| Numbers   | `PropTypes.number` |
| Objects   | `PropTypes.object` |
| Strings   | `PropTypes.string` |
| Symbols   | `PropTypes.symbol` |

You can combine multiple `propTypes`:

| Validator              | Description                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `PropTypes.oneOfType`  | Any one of the type: `PropTypes.oneOfType([PropTypes.string, PropTypes.number])`                       |
| `PropTypes.arrayOf`    | Array of certain type: `PropTypes.arrayOf(PropTypes.string)`                                           |
| `PropTypes.objectOf`   | Object with property values of certain type                                                            |
| `PropTypes.shape`      | Object with particular shape `PropTypes.shape({color: PropTypes.string, fontSize: PropTypes.number});` |
| `PropTypes.node`       | Any value                                                                                              |
| `PropTypes.element`    | React element                                                                                          |
| `PropTypes.instanceOf` | Instance of a given class                                                                              |
| `PropTypes.oneOf`      | One of the options in an enum: `PropTypes.oneOf(['News', 'Photos'])`                                   |

::: tip NOTE

PropTypes and TypeScript can be used together as type checkers

- PropTypes: Runtime Type Check
- TypeScript: Static Type Check

:::

### Default Props

Specify default values for `props` with `defaultProps`

```jsx
const Greeting = (props) => {
  return <div>Hi {props.name}!</div>; // Hi Guest
};

// provide default values
Greeter.defaultProps = {
  name: "Guest",
};
```

- Since ES2022, we can `defaultProps` as `static` property within a class component:

  ```jsx
  class Greeting extends React.Component {
    static defaultProps = {
      name: "stranger",
    };

    render() {
      return <div>Hello, {this.props.name}</div>;
    }
  }
  ```

- This is used for `undefined` props, but not for `null` props

```jsx
const Greeting = (props) => {
  return <div>Hi {props.name}!</div>; // Hi null
};

// provide default values
Greeter.defaultProps = {
  name: "Guest",
};
```

## Application State

In React **`props` are immutable**. This leads to static components.

### `useState` Hook

The `useState` [hook](#hooks) declares a "state variable".

This is a way to "preserve" some values between the function calls - `useState` is a new way to use the exact same capabilities that [`this.state`](#class-based-state) provides in a class.

- Normally, variables "disappear" when the function exits but state variables are preserved by React.

- React will preserve this state between re-renders.

- `useState` returns a pair:

  - The current state value and a function that lets you update it
  - This function is similar to `this.setState` in a class
  - Except it doesn't merge the old and new state together

- `useState` takes only one argument: the initial state

  - The initial state is only used during the first render

Sample syntax:

```jsx
const [state, setState] = useState(initialState);
```

_Example:_

```jsx
import React, { useState } from "react";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

**Lazy initial state**: If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render:

- `useState` will will always run on renders as well, hence if a callback function is provided. It will only run once

```jsx
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

React schedules the state changes, hence the state changes can be in any order.

To set a new state based on old state, we need to pass an callback instead of the new state:

- React will pass the previous state to this callback as a parameter
- The value returned by this callback will be used as the new state

```javascript
const [count, setCount] = useState(0);

// Increment count based on previous value
setCount((prevCount) => prevCount + 1);
```

**Multiple states**: A single component can have multiple states managed either by multiple state variables or a single state object with keys refereeing to states

```javascript
// Preferable
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

setFirstName("React");

// or

const [fullName, setFullName] = useState({
  firstName: "",
  lastName: "",
});

setFullName((prevFullName) => {
  return {
    ...prevFullName,
    firstName: "React",
  };
});
```

### Class Based State

To have mutable data that represent the state of that component, React provides a private object called `this.state` whose data can be changed by calling `this.setState()`.

- The state object needs to be initialized inside the constructor function else it **will have `null` value**

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

- To update the state we should always use the React provided function called `this.setState({})`. It takes the new values of the state

- This is because React uses `this.setState({})` method to track the changes happening to the state of the component.

- Whenever **component's internal state changes** the **component is rendered again**, so to avoid this the state changes need to be kept to minimum.

- `this.setState({})` will only update the state values that are passed as the parameter and the rest remain unchanged

- You can **access previous state** while setting new state by passing a callback function instead of new object inside `this.setState()`:

```javascript
this.setState((prevState) => {
  return { count: prevState.count + 1 };
});
```

- You can access props inside `this.setState()` by using the second parameter of the callback function:

```javascript
this.setState((prevState, props) => {
  return { count: prevState.count + 1 };
});
```

::: tip NOTE

If you want to access `this.props` inside the constructor, you need to pass props to `constructor()` and `super()`. And if you just need `props` inside the constructor, you need to pass props to `constructor()`:

1. Not passing props:

   ```javascript
   constructor() {
     super();
     console.log(this.props) // undefined
   }

   // OR

   constructor(props) {
     super();
     console.log(this.props) // undefined
     console.log(props) // props object
   }
   ```

2. Passing props will require us to pass props to `super` constructor as well:

   ```javascript
   constructor(props) {
     super(props);
     console.log(this.props) // props object
     console.log(props) // props object
   }
   ```

:::

::: danger STATE MUTATION

- Do not mutate the state directly as it breaks the React's state management and JavaScript copies objects and arrays by reference, hence causing unexpected behaviours.

- If the state is directly mutate React will not know about the state change and hence it will not render the component with the latest state change.

:::

**React immutability helper**: React provides an add-on to help in changing objects in immutable way.

```bash
npm install --save react-addons-update
```

Usage:

```javascript
let student = { name: "John Caster", grades: ["A", "C", "B"] };

let newStudent = update(student, { grades: { $push: ["A"] } });
```

## Events

React implements a **synthetic event system**.

JSX makes use of HTML like event handling API, with some small changes in the naming scheme. Like the event names (`onclick`) are in camel case (`onClick`).

- Use camel-case for event names.
- Cannot `return false` to prevent default behaviour in React as of in HTML.

```jsx
<a
  href="#"
  onclick="console.log('The link was clicked.');
return false"
>
  {" "}
  Click me{" "}
</a>
```

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }
  return (
    <a href="#" onClick={handleClick}>
      {" "}
      Click me{" "}
    </a>
  );
}
```

```js
function handleClick(event) {
  event.persist();
  this.setState((prevState) => ({
    foo: prevState.foo + event.pageX,
  }));
}
```

::: tip NOTE
As of _v17_, `e.persist()` doesn't do anything because the SyntheticEvent is no longer pooled
:::

## Styling

React supports both inline styling and external [CSS](../../CSS/CSS.md)

React's component inline styles are specified as a JavaScript object with style names in camel case:

```jsx
<div style={{ width: 10, height: "100%", fontSize: "2em" }}>Hello, World!</div>
```

React inline styles have the following advantages:

- Scoped styles without selectors
- Avoids specificity conflicts
- Source order independence

It is better to use an external CSS file (or CSS preprocessor such as Sass or Less) for major style definitions and use **inline styling for dynamic, state-based appearance**.

### CSS-In-JS

CSS-in-JS features:

- Co-location of JS, CSS and HTML (in some cases) in a single file, **painless maintenance**
- **Scoped CSS**: produce unique CSS class names
- Support SSR (Server-Side Rendering)
- Automatic vendor prefixes

Styles definition syntax:

1. Tagged Templates:

   ```javascript
   // consider "css" being the API of a generic CSS-in-JS library
   const heading = css`
     font-size: 2em;
     color: ${myTheme.color};
   `;
   ```

   - We can easily be migrate existing CSS code without rewriting it.
   - Syntax highlight and code suggestions require additional editor plugins

2. Object Styles:

   ```javascript
   // consider "css" being the API of a generic CSS-in-JS library
   const heading = css({
     fontSize: "2em",
     color: myTheme.color,
   });
   ```

   - CSS properties are written in camelCase
   - JavaScript values can be referenced directly
   - Migrating existing CSS would require a rewrite

CSS-in-JS libraries:

- [Emotion](https://emotion.sh/): Framework agnostic
- [styled-components](https://styled-components.com/)
- [styled-jsx](https://github.com/vercel/styled-jsx): Build by Vercel

- [Comparing CSS-in-JS libraries](https://github.com/andreipfeiffer/css-in-js/blob/main/README.md)

- [The Past, Present, and Future of CSS-in-JS by Max Stoiber](https://www.youtube.com/watch?v=a31BUlx-EXc)

## Keys

Keys help React identify which items have changed, are added, or are removed

- Keys should be given to the elements inside the array to give the elements a stable identity

- Keys are unique identifiers that allow for fast loop-ups between trees for the elements

```jsx
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

- Don't use indexes for keys it the order of items may change. This can negatively impact performance and may cause issues with component state

Ways to create unique keys:

- Transform the array into an object using a transformation function:

  ```jsx
  const dishes = ["Mac and Cheese", "Maggie"];

  const dishObjects = dishes.map((dish, i) => ({ id: i, title: dish }));

  const dishItems = dishObjects.map((dish) => (
    <li key={dish.id}>{dish.title}</li>
  ));
  ```

- If items don't have ids, we can use [Nano ID](https://github.com/ai/nanoid/) to create short non-sequential url-friendly unique ids.

  - But don't use `nanoid` directly as a `key`

  ```jsx
  import { nanoid } from "nanoid";

  // Right way to use nanoid
  const createNewTodo = (text) => ({
    completed: false,
    id: nanoid(25), // default is 10 in nanoid
    text,
  });

  todos.map((todo) => <li key={todo.id}>{todo.title}</li>);

  // don't do this
  todos.map((todo) => <li key={nanoid()}>{todo.title}</li>);
  ```

When all of the below conditions are met, you may safely use the index as a key:

1. The list and items are static–they are not computed and do not change;
2. The items in the list have no ids;
3. The list is never reordered or filtered.

Why Keys?

React makes some assumptions and takes a naive approach in some cases. Also, it is very tricky when dealing with any list of repeating items

Key can be used on single element:

```jsx
const App = () => {
  const [key, setKey] = useState("abc");

  return (
    <>
      <SomeComponent key={key} />
      <button onClick={() => setKey(id())}>Update</button>
    </>
  );
};
```

- In the above example when the `key` changes, `SomeComponent` will be remounted

## Refs

When we use React we directly don't interact with the actual DOM, instead we deal with the virtual DOM created by React.

Refs provide a way to access DOM nodes or React elements created in the render method.

Use Refs when:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

Avoid using refs for anything that can be done declaratively.

- For example, instead of exposing `open()` and `close()` methods on a `Dialog` component, pass an `isOpen` prop to it.

::: tip NOTE
`ref` updates happen before `componentDidMount` or `componentDidUpdate` lifecycle methods.
:::

### `useRef` Hook

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

```jsx
const refContainer = useRef(initialValue);
```

- A common use case is to access a child imperatively:

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

- One advantage of `useRef` over `useState` is that the reference dose not trigger a re-render

- Can be used ref instead of state when we only want to read the value and not manipulate it.

### Creating Refs

1. We create a class property which will hold the element/component ref using `React.createRef()` (React _v16.3_) and attach it to the React element via the `ref` attribute. Refs are commonly assigned to an instance property when a component is constructed so they can be referenced throughout the component.

   ```jsx
   class MyComponent extends React.Component {
     constructor(props) {
       super(props);
       this.myRef = React.createRef();
     }

     render() {
       return <div ref={this.myRef} />;
     }
   }
   ```

2. Using **"callback refs"**, which gives more fine-grain control over when refs are set and unset.

   - Instead of passing a s`ref` attribute created by `createRef()`, you can pass a function.
   - The function receives the React component instance or HTML DOM element as its argument, which can be stored and accessed elsewhere.

   ```jsx
   class CustomTextInput extends React.Component {
     constructor(props) {
       super(props);

       this.textInput = null;

       this.setTextInputRef = (element) => {
         // element will be a DOM element or a React component when the component mounts
         // element will be null when the component unmounts
         this.textInput = element;
       };

       this.focusTextInput = () => {
         // Focus the text input using the raw DOM API
         if (this.textInput) this.textInput.focus();
       };
     }

     componentDidMount() {
       // autofocus the input on mount
       this.focusTextInput();
     }

     render() {
       // Use the `ref` callback to store a reference to the text input DOM
       // element in an instance field (for example, this.textInput).
       return (
         <div>
           <input type="text" ref={this.setTextInputRef} />
           <input
             type="button"
             value="Focus the text input"
             onClick={this.focusTextInput}
           />
         </div>
       );
     }
   }
   ```

   ::: warning CAVEATS WITH CALLBACK REFS
   If the `ref` callback is defined as an inline function, it will get called twice during updates, first with `null` and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the `ref` callback as a bound method on the class, but note that it shouldn't matter in most cases.
   :::

3. _Legacy API_: String Refs

   - The `ref` attribute is a string, like `myTextInput`, and the DOM node is accessed as `this.refs.textInput`

   ```jsx
   class FocusText extends Component {
     handleClick() {
       // Explicitly focus the text input using the raw DOM API
       this.refs.myTextInput.focus();
     }

     render() {
       return (
         <div>
           <input type="text" ref="myTextInput" />
           <input
             type="button"
             value="Focus the text input"
             onClick={this.handleClick.bind(this)}
           />
         </div>
       );
     }
   }
   ```

::: danger WILL BE DEPRECATED
Don't use this way of creating refs, they have [some issues](https://github.com/facebook/react/pull/8333#issuecomment-271648615), will be deprecated in the future.
:::

### Accessing Refs

When a `ref` is passed to an element in `render`, a reference to the node becomes accessible at the `current` attribute of the ref.

```javascript
const node = this.myRef.current;
```

The value of the ref differs depending on the type of the node:

- When the `ref` attribute is used on an HTML element, the `ref` created in the constructor with `React.createRef()` receives the underlying DOM element as its `current` property.

- When the `ref` attribute is used on a custom class component, the `ref` object receives the mounted instance of the component as its `current`.

- **You may not use the ref attribute on function components** because they don't have instances.

_Example:_ Adding a ref to a DOM element

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

_Example:_ Adding a Ref to a Class Component

- If we wanted to wrap the `CustomTextInput` above to simulate it being clicked immediately after mounting, we could use a ref to get access to the custom input and call its `focusTextInput` method manually:

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}
```

_Example:_ Refs and Function Components

- By default, **you may not use the ref attribute on function components** because they don't have instances:

_The below code will not work_:

```jsx
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work! the ref this.textInput will be null
    return <MyFunctionComponent ref={this.textInput} />;
  }
}
```

- You can, however, **use the ref attribute inside a function component** as long as you refer to a DOM element or a class component:

```jsx
function CustomTextInput(props) {
  // textInput must be declared here so the ref can refer to it
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

### Forwarding Refs

In some cases we need to expose DOM refs to Parent Components. There are few ways to achieve this. It is recommended to use **ref forwarding** in React _v16.3_ or higher

::: danger ADD NOTES HERE
Check this [Link](https://reactjs.org/docs/forwarding-refs.html).
:::

Ref forwarding is a technique for automatically passing a ref through a component to one of its children. Ref forwarding lets components opt into exposing any child component's ref as their own.

For React _v16.2_ and earlier doesn't yet support ref forwarding. We can use the below technique:

- Expose a special prop on the child.
- This prop can be named anything other than `ref` (e.g. `inputRef`).
- The child component can then forward the prop to the DOM node as a ref attribute.
- This lets the parent pass its ref to the child's DOM node through the component in the middle.
- This pattern is that it works several components deep.
- Check out [DOM ref forwarding alternatives](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509)

_Example:_

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return <CustomTextInput inputRef={this.inputElement} />;
  }
}
```

::: warning DON'T
Don't Overuse Refs
:::

## Hooks

Hooks (React _v16.8_) let you use state and other React features without writing a class.

Hooks are functions that let you _"hook into"_ React state and lifecycle features from function components.

They help in resolving some of the problems caused by class based components:

- Wrapper hell

  - Higher order components
  - Render props

- Huge components
- Confusing classes

Hooks provided by React:

1. [`useState`](#usestate-hook)
2. [`useEffect`](#useeffect-hook)
3. [`useContext`](#usecontext-hook)
4. [`useReducer`](#usereducer-hook)
5. [`useCallback`](#usecallback-hook)
6. [`useMemo`](#usememo-hook)
7. [`useRef`](#useref-hook)
8. [`useImperativeHandle`](#useimperativehandle-hook)
9. [`useLayoutEffect`](#uselayouteffect-hook)
10. [`useDebugValue`](#usedebugvalue-hook)
11. [`useDeferredValue`](#usedeferredvalue-hook): _v18_
12. [`useTransition`](#usetransition-hook): _v18_
13. [`useId`](#useid-hook): _v18_
14. `usesyncexternalstore`: _v18_ (to be used by libraries)
15. `useinsertioneffect`: _v18_ (to be used by libraries)

### Rules of Hooks

- Only call Hooks at the Top Level

  - **Don't call** Hooks **inside loops, conditions, or nested functions**

- Only call Hooks from React Function components or custom Hook functions

### `useEffect` Hook

The Effect Hook lets you **perform side effects** in function components

Side effects such as:

- Accessing [`localStorage`](../JavaScript.md#local-storage)
- Event listeners
- Syncing 2 different internal states together
- Data fetching from API/database interactions
- Subscriptions (e.g. web sockets)
- Manually changing the DOM in React components
- Basically anything that React isn't in charge of

Not recommended use case for `useEffect`:

- Updating state (derive it whenever possible)
- Use [react-query](https://tanstack.com/query/v4) for data fetching instead of `useEffect`
- Actions (Bind to user actions)

_Example:_

```jsx
import React, { useState, useEffect } from "react";
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- By using this hook, you tell React that your component needs to do something after render

- **`useEffect` runs after every render** until dependency array is provided

- We can think of `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined

There are two common kinds of side effects in React components:

1. Effects Without Clean-up:

   - Running some additional code after React has updated the DOM

   - Network requests, manual DOM mutations, and logging are common examples of effects that don't require a clean-up

2. Effects with Clean-up:

   ```jsx
   import React, { useState, useEffect } from "react";

   function FriendStatus(props) {
     const [isOnline, setIsOnline] = useState(null);

     useEffect(() => {
       function handleStatusChange(status) {
         setIsOnline(status.isOnline);
       }

       ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

       // Specify how to clean-up after this effect
       return function cleanUp() {
         ChatAPI.unsubscribeFromFriendStatus(
           props.friend.id,
           handleStatusChange,
         );
       };
     }, []);

     if (isOnline === null) {
       return "Loading...";
     }

     return isOnline ? "Online" : "Offline";
   }
   ```

   - The first argument it takes is a callback function
   - The second argument is called the dependency array, it is optional

The callback function passed on to **`useEffect` must not be made as `async`**, because `useEffect` returns a callback function which React will run when the **component unmounts or the dependencies change** and the effect hook needs to run again with new values.

- If the function is made `async` the `useEffect` will return a `Promise` instead of the callback function that was provided to the `return` statement

```javascript
// don't do this
useEffect(async () => {
  const res = await fetch("some url");
  const data = await res.json();
  setMemes(data);
}, []);

// instead create a async function that will
// be called from the callback function

const getMemes = async () => {
  const res = await fetch("some url");
  const data = await res.json();
  setMemes(data);
};

useEffect(() => {
  getMemes();
}, []);
```

The behaviours without the dependency array, with an empty `[]` and with dependency array are very different:

```javascript
useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

Dependencies array dose value comparison, but for object and functions it performs reference comparison

Tips:

- Use Multiple Effects to Separate Concerns
- Optimizing Performance by Skipping Effects:

  - Cleaning up or applying the effect after every render might create a performance problem

  ```jsx
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      document.title = `You clicked ${this.state.count} times`;
    }
  }
  ```

  Using Hooks:

  ```jsx
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // Only re-run the effect if count changes
  ```

### `useReducer` Hook

An alternative to `useState`. It accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method. (If you're familiar with Redux, you already know how this works.)

- It takes in the current state and returns a new state

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
        +
      </button>
    </>
  );
}
```

- React guarantees that `dispatch` function identity is stable and won't change on re-renders. This is why it's safe to omit from the `useEffect` or `useCallback` dependency list.

`useEffect` vs `useReducer`:

- When one element of your state relies on the value of another element of your state in order to update use `useReducer`

### `useCallback` Hook

It Returns a memoized callback.

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed.

- It is helpful when passing callback props to highly optimized child component (such as memoized child)

```jsx
function ParentComponent() {
  const onHandleClick = useCallback(() => {
    // this will return the same function
    // instance between re-renders
  });

  return <MemoizedSubComponent handleClick={onHandleClick} />;
}
```

- It **doesn't memoize the function result**, rather it memoizes the function object itself

### `useMemo` Hook

It Returns a memoized value.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Pass a "create" function and an array of dependencies. `useMemo` will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

- `useMemo` runs the function passed during rendering. Don't do anything there that you wouldn't normally do while rendering (such as side effects, they belong in `useEffect`)

- If no array is provided, a new value will be computed on every render.

- Write your code so that it still works without `useMemo` and then add it to optimize performance.

- Don't use this hook if the answer is "no" to "dose this component re-render often with the same props?"

- To benefit from `React.memo` the component should:

  - Be a Pure functional component.
  - Render _often_.
  - Usually, re-render with the same props.
  - Be "medium" to "big" in size.

It can be used to memoize child to only rerender if props have changed:

```jsx
function SubComponent({ text }) {
  return <div>SubComponent: {text}</div>;
}

const MemoizedSubComponent = React.memo(SubComponent);
```

- The comparison done by `useMemo` is on **shallow basis**, to have a fine grained control we can pass a custom comparison function as the second argument

```jsx
function SubComponent({ handleClick }) {
  return <div onClick={handleClick}>SubComponent</div>;
}
const MemoizedSubComponent = React.memo(SubComponent);

function ParentComponent() {
  return (
    <MemoizedSubComponent
      handleClick={() => {
        // this function is different on each render!
      }}
    />
  );
}

// Solution
function ParentComponent() {
  const onHandleClick = useCallback(() => {
    // this will return the same function
    // instance between re-renders
  });

  return <MemoizedSubComponent handleClick={onHandleClick} />;
}
```

- If the child component accepts callback props, then the parent must memoize the callback passed to child

```javascript
function moviePropsAreEqual(prevMovie, nextMovie) {
  return (
    prevMovie.title === nextMovie.title &&
    prevMovie.releaseDate === nextMovie.releaseDate
  );
}

React.memo(Component, moviePropsAreEqual);
```

- Memoization can be avoid by using `children` prop: this technique is known as **"lifting content up"**

  - When `count` changes, `Parent` component will re-render. But it still has the same `children` prop it got from the `App` last time, so React doesn't visit that subtree

  ```jsx
  const Parent = ({ children }) => {
    const [count, setCount] = useState(0);

    return (
      <div>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          Counter {count}
        </button>

        {children}
      </div>
    );
  };

  function App() {
    return (
      <Parent>
        <Child />
      </Parent>
    );
  }

  // <Child /> component is not rerendered
  ```

### `useImperativeHandle` Hook

`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`

- Lets you customize the handle exposed as a `ref`

```jsx
useImperativeHandle(ref, createHandle, [deps]);
```

_Example:_

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({

    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} ... />;
}

FancyInput = forwardRef(FancyInput);
```

In this example, a parent component that renders `<FancyInput ref={inputRef} />` would be able to call `inputRef.current.focus()`

### `useLayoutEffect` Hook

The signature is identical to `useEffect`, but it **fires synchronously after all DOM mutations**

### `useDebugValue` Hook

`useDebugValue` can be used to display a label for custom hooks in React DevTools.

```jsx
useDebugValue(value);
```

_Example:_

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}
```

### `useDeferredValue` Hook

`useDeferredValue` accepts a value and returns a new copy of the value that will defer to more urgent updates

- Dose same thing as [`useTransition`](#usetransition-hook), making a slow and laggy interface faster

- Useful when the value comes "from above" and you don't actually have control over the corresponding `setState` call

- This Hook wraps a value affected by the state change

```jsx
const deferredValue = useDeferredValue(value);
```

_Example:_

```jsx
const List = (input) => {
  const LIST_SIZE = 20000;

  const defInput = useDeferredValue(input);

  // expensive task
  const divList = useMemo(() => {
    const l = [];
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(<div key={i}>{defInput}</div>);
    }
    return l;
  }, [defInput]);

  return divList;
};

const DefValue = () => {
  const [input, setInput] = useState("");

  const handleClick = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  return (
    <>
      <input type="text" value={input} onChange={handleClick} />
      <div>{List(input)}</div>
    </>
  );
};

// input:    a
// defInput:

// input:    ab
// defInput:

// input:    abc
// defInput:

// input:    abcd
// defInput: abcd
```

### `useTransition` Hook

Returns a stateful value for the pending state of the transition, and a function to start it

- This Hook wraps the state updating code

```jsx
const [isPending, startTransition] = useTransition();
```

_Example:_

```jsx
const DelayedApp = () => {
  const [input, setInput] = useState('')
  const [list, setList] = useState<JSX.Element[]>([])
  const [isPending, startTransition] = useTransition()

  const LIST_SIZE = 20000

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)

    startTransition(() => {
      // expensive task
      const l: JSX.Element[] = []
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(<div key={i}>{e.target.value}</div>)
      }

      // this state update is de-prioritized
      // thus UI is not blocked by this time consuming task
      setList(l)
    })
  }

  return (
    <>
      <input type="text" name="t" id="t" value={input} onChange={handleClick} />
      {isPending ? <p>Loading...</p> : <div>{list}</div>}
    </>
  )
}
```

```jsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount((c) => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

- `startTransition` lets you mark updates as low priority in the provided callback as transitions

  - Lets you explicitly tell React which updates are a lower priority

  ```javascript
  function handleChange(e) {
      setHighPriorityInput(e.target.value);

      React.startTransition(() => {
          setLowPrioritySearchTerm(e.target.value);
      }
  }
  ```

  - Can be used standalone without `useTransition`, as shown in the above example

- `isPending` indicates when a transition is active to show a pending state

### `useId` Hook

`useId` is a hook for generating unique IDs that are stable across the server and client, while avoiding hydration mismatches.

```jsx
const id = useId();
```

- **`useId` is not for generating keys in a list. Keys should be generated from your data.**

_Example:_

```jsx
function NameFields() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id + "-firstName"}>First Name</label>
      <div>
        <input id={id + "-firstName"} type="text" />
      </div>
      <label htmlFor={id + "-lastName"}>Last Name</label>
      <div>
        <input id={id + "-lastName"} type="text" />
      </div>
    </div>
  );
}
```

### Custom Hooks

- [Collection of custom Hooks](./Hooks.md)
- [useHooks - Know about custom hooks](https://usehooks.com/)

## Component Life-Cycle Methods

React life cycle methods are methods that are executed at certain occasions throughout the life cycle of the component.

These are **available only in Class based components** and not present in functional components.

A `React.Component` subclass must define a `render()` method

- `render()`: Invoked before the component is mounted and then whenever the [State](#state-management) or [Props](#props) changes.

  - It should always return React element

![Component Life-Cycle Methods](./react_component_life_cycle.webp)

### Mounting

**Mounting** is creating new instance of a component and inserting into the DOM.

Order of method calls on mount:

- `constructor`
- `getDerivedStateFromProps`
- `render`
- `componentDidMount`

List of Methods:

1. `constructor`:

   - `super()` must be called at the start inside the constructor if class extends another class, in this case the component extends `React.Component` class

   - Setting up [state](#state-management)
   - Creating [refs](#refs)
   - Method binding: `this.handleClick = this.handleClick.bind(this)`

   ```javascript
   class MyComponent extends Component {
     constructor(props) {
       super(props);

       this.state = {
         counter: 0,
       };
     }
   }
   ```

   - Writing a constructor is optional, and you can initialize your state like so if your babel setup has support for **class fields**:

   ```javascript
   class MyComponent extends Component {
     state = {
       counter: 0,
     };
   }
   ```

   - _Constructor_ is required to call `createRef` or method binding

2. `componentDidMount`: **Invoked once, immediately after the initial rendering** occurs. At this point, the component has a DOM representation that can be accessed.

   - This is **not invoked during component re-rendering** after the component has been mounted.

   - API calls are made here
   - Add event listeners

3. `getDerivedStateFromProps`: **Invoked right before calling the `render()`** method, both on the initial mount and on subsequent updates. It should return an object to update the state, or `null` to update nothing.

   - resetting a video or audio element when the source changes
   - refreshing a UI element with updates from the server
   - closing an accordion element when the contents change

   ```javascript
   static getDerivedStateFromProps(props, state) {
     if (state.blocks.length > 0) {
       return null;
     }

     return { blocks: createBlocks(props.numberOfBlocks) };
   }
   ```

   - Checkout this link which suggests to use this method only in rare cases [You probably don't need derived state](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

::: tip NOTE
Components whose single responsibility is to communicate with the remote API, and passing data and callbacks down as props are called **container component**.
:::

::: danger DEPRECATED
This method is deprecated

`componentWillMount()`: Invoked once, immediately before the initial rendering occurs. Setting state here will not trigger a re-rending.
:::

### Updating

**Updating** is re-rendering the component. Based on changes occurring in component props or state.

Order of method calls based on updates:

- `getDerivedStateFromProps`
- `shouldComponentUpdate`
- `render`
- `getSnapshotBeforeUpdate`
- `componentDidUpdate`

**Prop Changes** and **State Changes**:

1. `shouldComponentUpdate`: **Called before the render function** and it gives the opportunity to **define if a re-rendering is needed or can be skipped**.

   - Stop unnecessary re-renders

   ```javascript
   shouldComponentUpdate(nextProps, nextState) {
     return true; // if render is called on props or state change
     // return false if render is not required
   }
   ```

2. `componentDidUpdate`: **Invoked immediately after the component's updates are flushed to the DOM**.

   - This method is **not called for the initial render**

   - If `getSnapshotBeforeUpdate()` is implemented (which is rare), the value it returns will be passed as a third `snapshot` parameter to `componentDidUpdate()`. Otherwise this parameter will be `undefined`

   - This method will **not be invoked if `shouldComponentUpdate()` returns `false`**

   ```javascript
   componentDidUpdate(prevProps, prevState, snapshot) {
     // Typical usage (don't forget to compare props):
     if (this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
      }
   }
   ```

3. `getSnapshotBeforeUpdate` (NEW): Invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle method will be passed as a parameter to `componentDidUpdate()`

   - A snapshot value (or `null`) should be returned
   - Use case is not common

   ```javascript
   getSnapshotBeforeUpdate(prevProps, prevState) {
      return 100;
    }

   componentDidUpdate(prevProps, prevState, snapshot) {
      console.log(snapshot); // 100
    }
   ```

::: danger DEPRECATED

These have be deprecated:

- `componentWillReceiveProps(nextProps)`: Invoked when a component is receiving new props. Calling `this.setState()` will not trigger re-rendering.

- `componentWillUpdate(nextProps, nextState)`: Invoked immediately before rending when new props or state being received. State change via `this.setState` is not allowed as this function should be strictly used to prepare for upcoming update and not trigger an update itself.

:::

### Unmounting

Unmounting is when a component is being removed from the DOM.

Order of method calls based on updates:

- `componentWillUnmount`

1. `componentWillUnmount`: **Invoked once, immediately before a component is unmounted from the DOM**. Used for clean-up operations like removing any event listener's timers defined in mounting life cycle.

   - Tear down or clean up tasks or code that will otherwise clutter the app before the component disappears

   - Remove event listeners

   - **Should not call `setState()`**

   ```javascript
   componentWillUnmount() {
      // tear down or cleanup
    }
   ```

### Error Boundaries (Handling)

These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

Error boundaries are React components that **catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI** instead of the component tree that crashed

- During runtime errors React unmounts the whole React component tree
- Error boundaries catch these runtime errors and display a fallback UI

Error boundaries **do not catch** errors for:

- Event handlers
- Asynchronous code
- Server side rendering
- Errors thrown in the error boundary itself (rather than its children)

A class component becomes an error boundary if it defines **either (or both)** of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`.

- `static getDerivedStateFromError()`: This lifecycle is invoked after an error has been thrown by a descendant component.

  - It receives the error that was thrown as a parameter and should return a value to update state.

- `componentDidCatch()`: This lifecycle is invoked after an error has been thrown by a descendant component.

  - It receives two parameters:

    1. `error`: The error that was thrown.

    2. `info`: An object with a `componentStack` key containing information about which component threw the error.

  - to log error information.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Wrap around components that might throw an error
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>;
```

- [react-error-boundary library](https://github.com/bvaughn/react-error-boundary)
- [Using the library](https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react)

## Forms

Handling forms in react is a bit different from how they are in plain HTML:

- In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. Form data is usually handled by the DOM

- In React, we can **use state property of the component to maintain form data and be the "single source of truth"**. This way the component that renders a form also controls what happens in that form on subsequent user input.

React form elements share the same HTML semantic element name and its attributes as props, with some exceptions such as:

- Instead of `for=` use `htmlFor=`
- The `textarea` tag of HTML is slightly different in React as the inner-text of this will be represented by the `value` prop:

  ```html
  // THIS WILL CAUSE AN ERROR
  <textarea>This is the description.</textarea>

  // THIS IS THE CORRECT USAGE
  <textarea value="This is the description." />
  ```

- In HTML, you set the selected option using the `selected` attribute on the option tag. In React, in order to make components easier to manipulate, the following format is adopted instead:

  ```html
  <select value="B">
    <option value="A">Mobile</option>
    <option value="B">Work</option>
    <option value="C">Home</option>
  </select>
  ```

### Controlled Components

An input form element whose value is controlled by React is called a "controlled input or Controlled Component"

- The form data is stored in component's state property

- As state is immutable, user won't be able to provide any input from the form's user interface

- To enable user input, we need to implement `handleChange` method to update the state based on user input

- As state will contain all the form's data, on submit this can be passed on to an API call or for further processing

Lets create a simple input form which takes users first-name. Please find the code below:

_Example:_

```jsx
class UserForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" type="text" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

- Here we have an input element whose value is **not tracked by the React. Hence, it is an [Uncontrolled Component](#uncontrolled-components)**

- To make it a controlled component, we need to track the input value through the component's state. So we will add a key `firstName` to the state object:

```jsx
class UserForm extends Component {
  state = {
    firstName: "",
  };

  render() {
    return (
      <form>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" type="text" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

- Now the state needs to change based on user input. For that we need to implement `handleChange` method and attach it to `onChange` event of the input element:

```jsx
class UserForm extends Component {
  constructor(props) {
    super(props);
    state = {
      firstName: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      firstName: event.target.value,
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" type="text" onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

- The input element's value is now tracked by React. But, this is still not a controlled component. Because, due to some business logic the `this.state.firstName` is changed outside of the form's interface (in code without any user action), this will not be reflected in the user interface. As, the input element's value is independent of the state, currently it only updates the state.

- To correct this the input element's value should be bound to the state. This can be done by assigning the state to the input value, such as:

```jsx
class UserForm extends Component {
  constructor(props) {
    super(props);
    state = {
      firstName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      firstName: event.target.value,
    });
  }

  handleSubmit(event) {
    alert("First name was submitted: " + this.state.firstName);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          onChange={this.handleChange}
          value={this.state.firstName}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

- This form is driven by the state and user actions update the state. `handleSubmit` method is used to handle the form submit event

_Example:_

- If there are multiple input elements, there is not need to write separate `handleChange` method. We can modify the code shown in the previous example as:

```jsx
class UserForm extends Component {
  constructor(props) {
    super(props);
    state = {
      firstName: "",
      emailId: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

    this.setState({
        [name]: value
    });
  }

  render() {
    return (
        <input name="firstName" type="text" onChange={this.handleChange} value={this.state.firstName} />
        <input name="emailId" type="email" onChange={this.handleChange} value={this.state.firstName} />
    );
  }
}
```

- There only few updates:

  - All form elements will require to have the name prop to be set same as the key name used in the state object to track that particular element

  - Ternary operator is used to determine the value as all elements have user data in their value props except checkboxes which have boolean data in the checked prop

  - Using the ES6 computed property name syntax the state key can be updated using the corresponding input name

Good to know:

- If you hard code the value of any input element such as `<input type="text" value="Panda" />`.

- In the interface the user will see input box with value "Panda". But the input field will not be editable.

- This is because React has declared the value to be "Panda". It will override any value user inputs and makes it "Panda".

Advantages of this way is:

- The form data is kept out of the interface and is entirely managed by the code. This is the React way of handling components.

- This pattern helps to implement interfaces that respond to or validate user interactions.

::: warning NOTE

- You can pass an array into the `value` prop, allowing you to select multiple options in a `select` tag: `<select multiple={true} value={['B', 'C']}>`

- The **file input** tag's value is read-only, and hence it is an **uncontrolled** component in React.

:::

### Uncontrolled Components

In a [controlled component](#controlled-components), form data is handled by a React component. The alternative is **uncontrolled components, where form data is handled by the DOM itself**.

Controlled components adhere to React's principles and have their advantages. In most cases, controlled components are recommended.

While uncontrolled components are an anti-pattern for how most other components are constructed in React, sometimes you don't need to oversee the user input field by field like in simple forms.

- To write an uncontrolled component, instead of writing an event handler for every state update, you can use a `ref` to get form values from the DOM:

```jsx
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert("First name was submitted: " + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input name="name" type="text" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

- **Default Values**: In the React rendering lifecycle, the `value` attribute on form elements will override the value in the DOM. With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a `defaultValue` attribute instead of `value`.

- Likewise, `<input type="checkbox">` and `<input type="radio">` support `defaultChecked`, and `<select>` and `<textarea>` supports `defaultValue`

```jsx
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

#### Form Data

```jsx
const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    console.log(Object.fromEntries(data.entries()));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="userName" />
      <input type="text" name="email" />
      <input type="password" name="password" />
    </form>
  );
};
```

#### File Input Tag

- In HTML, an `<input type="file">` lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript via the File API.

- n React, an file input element is always an uncontrolled component because its value can only be set by a user, and not programmatically.

- We need to use the File API to interact with the files.

_Example:_ Using ref to the DOM node to access file(s) in submit handle:

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

- Checkout [Formik](./Formik.md)

### Form Validation

Using built-in browser validation with JavaScript to control how error messages are rendered

```jsx
const [error, setError] = useState("");

const onBlur = (event) => {
  if (event.target.validity.valid) {
    setError("");
  } else {
    setError(event.target.validationMessage);
  }
};

<form noValidate>
  <input minLength={3} onBlur={onBlur} />
  <div>{error}</div>
</form>;
```

## State Management

Sometimes, we want the share state across different components or want the state of two components to always change together.

- To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props.

- This is known as **"lifting state up"**

```jsx
const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <h1>Todo List</h1>
      <TodoInput onChange={setTodos} />
      <TodoList todos={todos} />
    </>
  );
};
```

- If the shared state is being consumed by a child component nested very deep, can cause unnecessary prop passing, which is referred to as prop drilling.

- _Prop drilling_ refers to the process of sending props from a higher-level component to a lower-level component.

- To overcome Prop drilling we can either use the [Context API](#context-api) or a state management system

Types of state:

- **UI State**: State used for controlling interactive parts of our application (e.g. dark mode toggle, modals)

  - State that's only useful in the UI for controlling the interactive parts of our app (like modal `isOpen` state)

  - [Redux](./Redux.md)
  - [jotai](https://github.com/pmndrs/jotai): Atomic State
  - [zustand](https://github.com/pmndrs/zustand)
  - [recoiljs](https://recoiljs.org/)
  - [XState](https://xstate.js.org/): State machine
  - [Immer](https://immerjs.github.io/immer/): Write mutable code and execute it immutably
  - [MobX](https://mobx.js.org/)

- **Server Cache State**: State from the server, which we cache on the client-side for quick access (e.g. call an API, store the result, use it in multiple places)

  - State that's actually stored on the server and we store in the client for quick-access

  - [`react-query`](https://react-query.tanstack.com/)
  - [`SWR`](https://swr.vercel.app/): _stale-while-revalidate_

- _Form State_: The many different states of a form (e.g. loading, submitting, disabled, validation, retrying)

- _URL State_: State managed by the browser (e.g. filter products, saving to query parameters, and refreshing the page to see the same products filtered)

- _State Machine_: An explicit model of your state over time (e.g. a stop-light goes from green -> yellow -> red, but never green -> red)

### Context API

Context API (React _v16.3_) enable us to define the context Object which stores some data and will make it available throughout the hierarchy without passing the data as props

- Initialize Context:

  ```javascript
  // src/currency/currency-context.js
  import * as React from "react";

  export const CurrencyContext = React.createContext();
  ```

- The Context object exposes a `Provider` component, which is most often used at the top-level component to provide its context to all child components:

  - `value` is the current value

  ```jsx
  import { CurrencyContext } from "./currency-context";

  const App = () => {
    return (
      <CurrencyContext.Provider value="€">
        <Books list={dataItems} />
      </CurrencyContext.Provider>
    );
  };
  ```

- The Context object also exposes a `Consumer` component, which can be used in all child components which need to access the context:

  ```jsx
  import { CurrencyContext } from "./currency-context";

  const Book = ({ item }) => {
    return (
      <CurrencyContext.Consumer>
        {(currency) => (
          <li>
            {item.title} - {item.price} {currency}
          </li>
        )}
      </CurrencyContext.Consumer>
    );
  };
  ```

#### `useContext` Hook

This hook is used to create common data that can be accessed throughout the component hierarchy without passing the props down manually to each level (hence avoiding prop drilling)

- The context can be consumed by using the **`useContext`** hook:

```jsx
import { CurrencyContext } from "./currency-context";
import { useContext } from "react";

const Book = ({ item }) => {
  // const value = useContext(MyContext);
  const currency = useContext(CurrencyContext);

  return (
    <li>
      {item.title} - {item.price} {currency}
    </li>
  );
};
```

_Example:_

```jsx
// src/count/count-context.jsx
import * as React from "react";

const CountContext = React.createContext();

const useCount = () => {
  // create context
  const context = React.useContext(CountContext);

  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }

  return context;
};

const CountProvider = (props) => {
  // manage state of the context
  const [count, setCount] = React.useState(0);

  const value = React.useMemo(() => [count, setCount], [count]);

  return <CountContext.Provider value={value} {...props} />;
};

export { CountProvider, useCount };
```

```jsx
// src/count/page.jsx
import * as React from "react";
import { CountProvider, useCount } from "./count-context";

const Counter = () => {
  const [count, setCount] = useCount();

  const increment = () => setCount((c) => c + 1);

  return <button onClick={increment}>{count}</button>;
};

const CountDisplay = () => {
  const [count] = useCount();

  return <div>The current counter count is {count}</div>;
};

const CountPage = () => (
  <div>
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
  </div>
);
```

We can provide an initial value while creating a context:

```jsx
const CurrencyContext = React.createContext({ currency: "USD" });

const { currency } = React.useContext(CurrencyContext);
```

- As the context consumers are usually rendered within a provider which can provide a useful value, we can remove default value

#### Limitations Of Context

- **Not optimized for high frequency changes**

- React Context also **shouldn't be used to replace all** component communications and props

- Component should be configurable via props and shot prop chains might not need any replacement

| Context API                                                                  | Redux                                      |
| ---------------------------------------------------------------------------- | ------------------------------------------ |
| Built-in tool                                                                | External, increased bundle size            |
| Minimal setup                                                                | Extensive setup                            |
| Specifically designed for static data, that is not often refreshed or update | Good for both static and dynamic data      |
| Debugging can be hard in highly nested component structure                   | Powerful Redux Dev Tools to ease debugging |

- When a component consumes certain part of data from Context, it will be re-rendered even if the rest of the data in the Context changes

## Portals

Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

```javascript
ReactDOM.createPortal(child, container);
```

- It's useful to insert a child into a different location in the DOM:

```javascript
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode  );
}
```

Typical use case for portals is when a parent component has an `overflow: hidden` or `z-index` style, but you need the child to visually "break out" of its container. For example, **dialogs, hover-cards, and tooltips**

## Other APIs

1. `flushSync`: Lets you force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately

   - Using flushSync is uncommon and **can hurt the performance** of your app

   ```javascript
   import { flushSync } from "react-dom";

   socket.onMessage((message) => {
     flushSync(() => {
       setMessages((prevMessages) => [...prevMessages, message]);
     });

     scrollToLastMessage();
   });
   ```

2. `findDOMNode`

## Client-Side Routing

There are many libraries available:

- [React Router](./React_Router.md)

## Concurrent Features

Concurrent React can work on multiple tasks at a time, and switch between them according to priority

- Can partially render a tree without committing the result
- Dose not block the main thread

Name transitions: async rendering --> concurrent React --> Concurrent mode --> Concurrent features

- We need to use `ReactDOM.createRoot` instead of `ReactDOM.render` (deprecated in _v18_) to enable current mode

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Suspense

`Suspense` suspends things until they are ready

Declaratively specify the loading UI for any part of the component tree, if it's not yet ready to be displayed

- Initially was used for lazy loading

- The lazy component should then be rendered inside a `Suspense` component, which allows us to show some fallback content (such as a loading indicator) while we're waiting for the lazy component to load

_Example:_

```jsx
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Suspense for Data Fetching:

### Code-Splitting

#### Dynamic `import()` Syntax

Dynamic `import()` syntax is supported by Webpack:

```javascript
import { add } from "./math";

console.log(add(16, 26));
```

**After:**

```javascript
import("./math").then((math) => {
  console.log(math.add(16, 26));
});
```

- When Webpack comes across this syntax, it automatically starts code-splitting your app.

#### React Lazy Loading

`React.lazy` (React _v16.6_) function lets you render a dynamic import as a regular component.

- `React.lazy` takes a function that must call a dynamic `import()`. This must return a `Promise` which resolves to a module with a **`default` export containing a React component.**

**Before:**

```javascript
import OtherComponent from "./OtherComponent";
```

**After:**

```javascript
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```

- Lazy loading named exports:

```javascript
const DetailPage = React.lazy(() =>
  import("./OtherComponent").then((module) => ({
    default: module.NamedComponent,
  })),
);
```

- Before React _v16.6_ we used [`react-loadable`](https://github.com/jamiebuilds/react-loadable): Recommended for server rendered apps

::: tip NAMED EXPORTS
`React.lazy` currently **only supports default exports**
:::

#### Route Based Code-Splitting

Code splitting based on the routes the user visits:

_Example:_ Using [React Router](./React_Router.md)

```jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

## React Server Components

Server components are completely rendered on the server and do not require client-side JavaScript to render. In addition, server components allow developers to keep some logic on the server and only send the result of that logic to the client. This reduces the bundle size sent to the client and improves client-side rendering performance

[Introducing Zero-Bundle-Size React Server Components](https://beta.reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components)

## Deploying React App

Run the `build` script:

```bash
npm run build
```

The source code will be bundled for production, minified and stored by default in:

- `build` if you are using CRA
- `dist` if you are using `vite.js`

## Security

React provides the `dangerouslySetInnerHTML` property to skip XSS protection and render anything directly

- Avoid using it as it may cause [XSS](../../../Concepts/Application_Security/Cross_Site_Scripting.md)

- Add a layer of security with [DOMPurify](https://github.com/cure53/DOMPurify)

- To convert Markdown to HTML use [markedjs/marked](https://github.com/markedjs/marked)

_Example:_

```jsx
import DOMPurify from "dompurify";

const App = () => {
  const data = "lorem <b>ipsum</b>";

  return (
    <>
      <div>{data}</div>
      <div dangerouslySetInnerHTML={{ __html: data }} />
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />
    </>
  );
};

// lorem <b>ipsum</b>
// lorem ipsum
// lorem ipsum

export default App;
```

## Versions

1. React _v18_:

   - March 29, 2022
   - `ReactDOM.render` is deprecated
   - Automatic batching
   - New Hooks:

     - [`useDeferredValue`](#usedeferredvalue-hook)
     - [`useTransition`](#usetransition-hook)
     - [`useId`](#useid-hook)
     - `usesyncexternalstore`
     - `useinsertioneffect`

   - Streaming SSR with [Suspense](#suspense)
   - Concurrent rendering: A behind-the-scenes

2. React _v17_:

   - October 20, 2020
   - React import is not required
   - New JSX transform:

     - Old transformation

       ```jsx
       import React from "react";

       function App() {
         return <h1>Hello World!</h1>;
       }

       // Transformed code
       import React from "react";

       function App() {
         return React.createElement("h1", null, "Hello World!");
       }
       ```

     - New transformation

       ```jsx
       function App() {
         return <h1>Hello World!</h1>;
       }

       // Transformed code
       import { jsx as _jsx } from "react/jsx-runtime";

       function App() {
         return _jsx("h1", { children: "Hello World!" });
       }
       ```

   - React will no longer attach event handlers at the `document` level. Instead, it will attach them to the root DOM container into which your React tree is rendered

3. React _v16_:

   - Fibre
   - React _16.3_:

     - Marked for depreciation `UNSAFE_componentWillMount`, `UNSAFE_componentWillReceiveProps`, `UNSAFE_componentWillUpdate`

     - [`React.createContext`](#context-api)
     - [`React.createRef`](#creating-refs)

4. React _v15_

5. React _v0.14_

6. React _v0.13_

7. React _v0.12_

- Mixins (deprecated)

## References

- [React as a UI Runtime](https://overreacted.io/react-as-a-ui-runtime/)

- [Writing Resilient Components](https://overreacted.io/writing-resilient-components/#writing-resilient-components)

- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

- [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)

- [Reactiflux - React community](https://www.reactiflux.com/)

- [Awesome React](https://github.com/enaqx/awesome-react)

- [Awesome React Components Collection](https://github.com/brillout/awesome-react-components)

- [React patterns](https://reactpatterns.com/)

- [React cheat-sheet](https://devhints.io/react)

- [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react)

- [React hooks explained](https://wattenberger.com/blog/react-hooks)

- [Hero35](https://hero35.com/topic/react)

- [awesome-react-talks](https://github.com/tiaanduplessis/awesome-react-talks)

- [react-redux-links](https://github.com/markerikson/react-redux-links)

- [Very old React tutorial](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/)


## Libraries

1. Icons:

   - [react-icons](https://react-icons.netlify.com): collection of different SVG icons

2. CSS Animations

   - [react-transition-group](https://github.com/reactjs/react-transition-group/tree/v1-stable)

     - Basic animation
     - 14.7kb (mini)

   - [react-spring](https://github.com/pmndrs/react-spring)

     - Ease of use
     - 27kb (mini)

   - [react-motion](https://github.com/chenglou/react-motion)

     - Ease of use
     - 90kb (mini)

   - [framer-motion](https://github.com/framer/motion)

     - Ease of use
     - 20kb (mini)

   - [react-move](https://github.com/sghall/react-move)

     - Ease of use
     - 12.7kb

3. Multi Select Input:

   - [react-select](https://github.com/jedwatson/react-select)

4. Performance:

   - [why-did-you-render](https://github.com/welldone-software/why-did-you-render)

   - [Benchmark React Components](https://engineering.musefind.com/how-to-benchmark-react-components-the-quick-and-dirty-guide-f595baf1014c)
