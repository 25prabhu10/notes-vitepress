---
title: React Testing
description: React Testing
---

# React Testing

- [Enzyme](https://enzymejs.github.io/enzyme/)

```jsx
// src/App.js
import React from "react";
import useSWR from "swr";
import { convert } from "./utils/currency";

export default function App() {
  const [base, dest] = ["USD", "CAD"];
  const { data: rate, error } = useSWR([base, dest], convert);

  if (error) return "Error!";
  if (!rate) return "Loading!";

  return (
    <div>
      {base} to {dest}: {rate}
    </div>
  );
}

// src/App.test.js
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// mock the currency module (which contains the convert function)
jest.mock("./utils/currency", () => {
  return {
    convert: jest.fn().mockImplementation(() => {
      return 1.42;
    }),
  };
});

test("renders learn react link", async () => {
  // Act
  const { findByText } = render(<App />);
  const element = await findByText(/USD to CAD: 1.42/i);

  // Assert
  expect(element).toBeInTheDocument();
});
```

## React Testing Library

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) builds on top of DOM Testing Library by adding APIs for working with React component

React Testing Library is a set of helpers that let you test React components without relying on their implementation details

- This approach makes refactoring a breeze and also nudges you toward best practices for accessibility

- It _doesn't provide a way to "shallowly" render_ a component without its children

It helps with:

- Rendering components into virtual DOM
- Searching virtual DOM
- Interacting with virtual DOM

Finding Elements:

- Testing Library recommends finding elements by accessibility handles

  - [Which query to use?](https://testing-library.com/docs/queries/about/#priority)

### Queries

Use queries that are accessible to everyone

Types of Queries:

| Type of Query         | 0 Matches     | 1 Match        | >1 Matches   | Retry (Async/Await) | Element not in DOM |
| --------------------- | ------------- | -------------- | ------------ | :-----------------: | :----------------: |
| **Single Element**    |               |                |              |                     |                    |
| `getBy...`            | Throw error   | Return element | Throw error  |         No          |         No         |
| `queryBy...`          | Return `null` | Return element | Throw error  |         No          |      **Yes**       |
| `findBy...`           | Throw error   | Return element | Throw error  |       **Yes**       |         No         |
| **Multiple Elements** |               |                |              |                     |                    |
| `getAllBy...`         | Throw error   | Return array   | Return array |         No          |         No         |
| `queryAllBy...`       | Return `[]`   | Return array   | Return array |         No          |      **Yes**       |
| `findAllBy...`        | Throw error   | Return array   | Return array |       **Yes**       |         No         |

#### Query Types

- `Role` (most preferred)
- `AltText` (images)
- `Text` (display elements)

- Form elements:

  - `PlaceholderText`
  - `LabelText`
  - `DisplayValue`

In order of preference:

1. `getByRole`:
2. `getByLabelText`:
3. `getByPlaceholderText`:
4. `getByText`:
5. `getByDisplayValue`:
6. `getByAltText`:
7. `getByTitle`:
8. `getByTestId`:

TextMatch: represents a type which can be either a:

- string:

  ```javascript
  // <div>Hello World</div>

  screen.getByText("Hello World"); // full string match
  screen.getByText("llo Worl", { exact: false }); // sub-string match
  screen.getByText("hello world", { exact: false }); // ignore case
  ```

- regex:

  ```javascript
  // <div>Hello World</div>

  screen.getByText(/^hello world$/i); // full string match, ignore case
  screen.getByText(/world/i); // sub-string match ignore case
  screen.getByText(/World/); // sub-string match
  ```

- function:

  ```javascript
  (content?: string, element?: Element | null) => boolean;

  // <div>Hello World</div>

  screen.getByText((content) => content.startsWith("Hello")); // sub-string match
  ```

### Matchers

The [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) library provides a set of **custom DOM based jest matchers** that you can use to extend jest

- These will make your tests more declarative, clear to read and to maintain

- `src/setupTests.js` imports `import @testing-library/jest-dom` it before each test, makes matchers available

Commonly used matchers:

- `toBeVisible`
- `toBeChecked`

### Tools

- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library): best practices and anticipate common mistakes when writing tests with Testing Library

- [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom): Rules for use with jest-dom

## References

- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)

- [React Testing Library](https://github.com/testing-library/react-testing-library)
