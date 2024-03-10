---
title: Axios
description: A promise-based HTTP Client for node.js and the browser
---

# Axios

[Axios](https://github.com/axios/axios) is a promise-based HTTP Client for [node.js](../Node.js) and the browser.

On the server-side it uses the native node.js `http` module, while on the client (browser) it uses `XMLHttpRequests`.

Features:

- Make `XMLHttpRequests` from the browser
- Make `http` requests from node.js
- Supports the _Promise_ API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against _CSRF_

Advantages of `fetch` over axios:

- Less API to learn
- Smaller bundle size
- Reduced trouble when updating packages/managing breaking changes
- Immediate bug fixes/releases
- Conceptually simpler

## Setup

Install axios package:

```bash
npm install axios

# or

yarn install axios
```

_Example:_ Using axios with [React](../React)

```javascript
import axios from "axios";
import React from "react";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

export default function App() {
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // Async version
  React.useEffect(() => {
    async function getPost() {
      try {
        const response = await client.get("/1");

        setPost(response.data);
      } catch (error) {
        setError(error);
      }
    }

    getPost();
  }, []);

  if (error) return `Error: ${error.message}`;

  if (!post) return "No post!";

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```

Checkout `npm install use-axios-client` for axios based custom hook

## Response

The response schema:

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  // As of HTTP/2 status text is blank or unsupported.
  // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

## Concurrent Requests

```javascript
const [{ data: todos }, { data: posts }] = Promise.all([
  axios.get("https://jsonplaceholder.typicode.com/todos"),
  axios.get("https://jsonplaceholder.typicode.com/posts"),
]);
```

## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch`.

```javascript
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
```

- If you need to remove an interceptor later you can.

  ```javascript
  const myInterceptor = axios.interceptors.request.use(function () {
    /*...*/
  });
  axios.interceptors.request.eject(myInterceptor);
  ```

- You can add interceptors to a custom instance of axios.

  ```javascript
  const instance = axios.create();
  instance.interceptors.request.use(function () {
    /*...*/
  });
  ```

## Transform Request and Response

Transform Request and Response:

```javascript
const instance = axios.create({
  baseURL: "api-url.com",
  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [
    (data, headers) => {
      const encryptedString = encryptPayload(JSON.stringify(data));

      data = {
        SecretStuff: encryptedString,
      };

      return JSON.stringify(data);
    },
  ],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data

      return data;
    },
  ],
});
```

_Example:_

```javascript
// Provide only response json part
// => Chuk other metadata provided by axios
const responseSuccessHandler = (response) => {
  return response.data;
};

// Log & Sanitize errors response
// => The errors given by server will not be always consistent so we
//    could sanitize the response and return proper error to the client.
const responseErrorHandler = (error) => {
  var errors = ["Something went wrong, please try again!"];

  if (error.response) {
    if (error.response.data.errors) errors = error.response.data.errors;
    if (error.response.data.error) errors = [error.response.data.error];

    if (error.response.status === 401) forceLogoutUser();
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }

  return Promise.reject({
    status: error.response.status,
    errors: errors,
  });
};

axios.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error),
);
```

## Request Cancellation

Axios supports `AbortController` to cancel requests in fetch API way:

```javascript
const controller = new AbortController();

axios
  .get("/foo/bar", {
    signal: controller.signal,
  })
  .then(function (response) {
    //...
  });
// cancel the request

controller.abort();
```

## Axios Instance

You can create a new instance of axios with a custom config.

```javascript
import axios from "axios";
import { getCSRFToken } from "components/utils";

const axiosInstance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    "X-CSRF-Token": getCSRFToken(),
  },
});

export default axiosInstance;
```

## Custom Fetch Client

Create a custom `fetch` client with some of the features of axios:

```javascript
const localStorageKey = "__bookshelf_token__";

function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(localStorageKey);
  const headers = { "content-type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        logout();
        window.location.assign(window.location);
        return;
      }
      if (response.ok) {
        return await response.json();
      } else {
        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
      }
    });
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}
```

Usage:

```javascript
import { client } from "./api-client";

function create(listItemData) {
  return client("list-items", { body: listItemData });
}

function read() {
  return client("list-items");
}

function update(listItemId, updates) {
  return client(`list-items/${listItemId}`, {
    method: "PUT",
    body: updates,
  });
}

function remove(listItemId) {
  return client(`list-items/${listItemId}`, { method: "DELETE" });
}

export { create, read, remove, update };
```

## Reference

- [Axios examples](https://github.com/axios/axios/tree/master/examples)
- [Replace axios with a fetch wrapper](https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper)
