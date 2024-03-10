---
title: Redux
description: A Predictable State Container for JS Apps
---

# Redux

A Predictable State Container for JavaScript Apps

- Redux was inspired by several important qualities of [Flux architecture](#flux-architecture)
- A change emitter holding a value
- _Reducers + Flux = Redux_

A complex state management tool, with a single store as CDS (Central Data Store)

- To change state of the app, we call an --> **Action Creator** --which produces an--> **Action** --which is fed to--> **Dispatch** --which forwards the action to--> **Reducers** --which creates new--> **State** --emit a change event to all the--> **Subscribers** --> then, wait until we need to update the state again

Core Concepts and Principles:

- Single source of truth
- State is read-only
- Changes are made with pure reducer functions

Redux Constraints:

- **Single state tree**
- **Actions describe updates**
- **Reducers apply updates**

This type of data flow enables:

- Hot reloading
- Time travel
- Log actions and states (as they are just plain objects)
- Find the bad state easily, check the action, and fix the reducer
- Easy to write tests

> "Redux is just a (dumb) event emitter" 🙃

## Flux Architecture

Build to overcome constraints of MVC

Single direction data flow:

```text
Action --> Dispatcher --> Store --> View
  ^                                  |
  |                                  |
  |                                  v
   <---------------------------------
```

## Store

It is the **Globalized State** of the application

_Example:_

```javascript
import { createStore } from "redux";
import reducerFn from "../reducers/todosReducer";

export const store = createStore(reducerFn);
```

Simplified version of `createStore`:

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  const dispatch = (action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  dispatch({});

  return { dispatch, subscribe, getState };
};
```

## Actions

An action must be a plain JavaScript object

Actions have 2 properties:

- `type`: a **unique identifier** (required), usually written in capital letters
- `payload`: **data** (it is optional)

_Example:_

```javascript
// action creator
const createAdd = (num) => {
  // returns an action
  return {
    type: "ADD_ONE",
    payload: {
      addBy: num,
    },
  };
};
```

- To use `async` calls use a middleware such as [`redux-thunk`](#redux-thunk) or [`redux-saga`](#redux-saga)

## Reducers

Manages the state and returns the newly updated state

- Reducers must be **Pure Functions**
- **Should not mutate the original state** (no side-effects)
- Always provide a default state
- Must return any value besides `undefined`
- Should **always return new state**
- They should be **synchronous functions**

_Example:_

```javascript
const defaultState = {
  counter: 0,
};

const reducerFn = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "INC":
      return { counter: state.counter + 1 };

    case "DEC":
      return { counter: state.counter - 1 };

    case "ADDBY":
      return { counter: state.counter + action.payload };

    default:
      return state;
  }
};
```

- Combine multiple reducers

```javascript
import { createStore, combineReducers } from "redux";

const allReducers = combineReducers({
  reducerFn,
  // ...
});

const store = createStore(allReducers);
```

## Dispatch

Dispatch is used to send actions to update the data

_Example:_

```javascript
store.dispatch(createAdd(25));
```

- Using Hooks:

```javascript
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

dispatch({ type: "INC" });

dispatch({ type: "DEC" });

dispatch({ type: "ADDBY", payload: 10 });
```

## Using Redux

Simple Redux store used in a simple JavaScript app:

```html
<p id="value"></p>

<button id="increment">Increment</button>
```

```javascript
import { createStore } from "redux";

const valueEl = document.getElementById("value");

// 1. Create reducer function
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { counter: state.counter + 1 };

    default:
      return state;
  }
};

// 2. Set initial state
const initialState = { counter: 0 };

// 3. Create a store
const store = createStore(counterReducer, initialState);

// 5. When the subscription callback runs:
const render = () => {
  // 5.1 Get the current store state
  const state = store.getState();

  // 5.2 Extract the data you want
  const newValue = state.counter.toString();

  // 5.3 Update the UI with the new value
  valueEl.innerHTML = newValue;
};

// 4. Subscribe to store updates
store.subscribe(render);

// 6. Display the UI with the initial store state
render();

// 7. Dispatch actions based on UI inputs
document.getElementById("increment").addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
```

### `react-redux`

`react-redux` subscribes to the Redux store, checks to see if the data your component wants has changed, and re-renders your component

- It provides bind between React and Redux

- Added Hooks API in _v7.1_

Integrating Redux in a React App:

- Install Redux and `react-redux`:

  ```bash
  npm install redux react-redux
  # or
  yarn add redux react-redux
  ```

### `redux-toolkit`

Includes packages like:

- Redux (core library, state management)
- Immer (allows to mutate state)
- `redux-thunk` (handles async actions)
- reselect (simplifies reducer functions)

Usage:

1. Install the required packages:

   ```bash
   npm install @reduxjs/toolkit react-redux
   # Or
   yarn add @reduxjs/toolkit react-redux
   ```

2. `createSlice`:

   ```javascript
   import { createSlice } from "@reduxjs/toolkit";

   const initialState = {
     value: 0,
   };

   export const counterSlice = createSlice({
     name: "counter",
     initialState
     reducers: {
       increment:(state) => {
         state.value += 1;
       },

       decrement:(state) => {
         state.value -= 1;
       },

       incrementByAmount:(state, action) => {
         state.value += action.payload;
       },
     },
   });
   ```

3. `configureStore`:

   - Simplified configuration options and good defaults
   - Includes `redux-thunk` middleware
   - Enables Redux DevTools Extension

   ```javascript
   import { configureStore } from "@reduxjs/toolkit";

   export const store = configureStore({
     reducer: {
       counter: counterSlice.reducer,
     },
   });
   ```

4. Export Actions:

   ```javascript
   // returns an action
   //{ type: "UNIQUE KEY"}
   counterSlice.actions.increment;

   // action creators are generated for each case reducer function
   export const { increment, decrement, incrementByAmount } =
     counterSlice.actions;
   ```

5. Dispatch actions:

   ```javascript
   import { useDispatch, useSelector } from "react-redux";

   const APP = () => {
     const counter = useSelector((state) => state.counter.value);

     const dispatch = useDispatch();

     const incrementHandler = () => {
       dispatch(counterSlice.actions.increment());
     };

     return <h1>Counter: {counter}</h1>;
   };
   ```

## Redux Middleware

Middleware provides a 3rd-party extension point between dispatching an action and the moment it reaches the reducer. (For logging, crash reporting, async tasks, etc.)

### `redux-thunk`

Middleware to help us write async actions

- The word "thunk" is a programming term that means _"a piece of code that does some delayed work"._

- Add `redux-thunk` as middleware:

  ```javascript
  import { applyMiddleware, createStore } from "redux";
  import thunk from "redux-thunk";

  const store = createStore(reducers, applyMiddleware(thunk));
  ```

- Async action creators must return a function, that takes `dispatch` and `getState` (optional) as parameters. This function should manually call `dispatch`

  ```javascript
  export const fetchUser = (id) => async (dispatch) => {
    const res = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
      type: "FETCH_USER",
      payload: res.data,
    });
  };
  ```

- Rest of the Redux config will be same

### `redux-saga`

Watcher Saga --> Actions --> Worker Saga

## References

- [react-redux history implementation](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)

- [Demystifying React Redux](https://blog.scottlogic.com/2020/05/01/demystifying-react-redux.html)

- [Fundamentals of Redux Course from Dan Abramov](https://egghead.io/lessons/react-redux-the-single-immutable-state-tree)

- [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

- [React & Redux in TypeScript - Complete Guide](https://github.com/piotrwitek/react-redux-typescript-guide)
