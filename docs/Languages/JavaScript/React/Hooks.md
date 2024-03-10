---
title: Hooks
description: Custom Hooks
---

# Hooks

Collection of custom hooks

- If custom Hook receives a callback function that will be called inside `useEffect`:

```jsx
function App() {
    const [url, setUrl] = useState(null);
    const { data } = useFetch({ url, onSuccess: () => console.log("Success") });

    return (
    <>
        <div>{JSON.stringify(data)}</div>
        <div>
            <button onClick={() => setUrl("users")} />
            <button onClick={() => setUrl("todos")} />
        </div>
    </>
    );
}

const useCallbackRef = (callback) => {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return callbackRef;
}

export const useFetch = (options) => {
    const [data, setData] = useState(null);

    cosnt savedOnSuccess = useCallbackRef(options.onSuccess);

    useEffect(() => {
        if (options.url) {
            fetch(options.url)
                .then((response) => response.json())
                .then((json) => {
                    savedOnSuccess.current();
                    setData(json);
                });
        }
    }, [options.url)
}
```

## Toggle Hook

```javascript
[color, toggle] = useReducer((prev) => !prev, false);
```

Typescript:

```typescript
import { useCallback, useState } from "react";

const App = () => {
  // call the hook which returns, current value and the toggler function
  const [isTextChanged, setIsTextChanged] = useToggle();

  return (
    <button onClick={setIsTextChanged}>
      {isTextChanged ? "Toggled" : "Click to Toggle"}
    </button>
  );
};

// custom Hook
// parameter is the boolean, with default "false" value
const useToggle = (initialState: boolean = false): [boolean, any] => {
  // initialize the state
  const [state, setState] = useState<boolean>(initialState);

  // define and memorize toggler function in case we pass down the component,
  // this function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState((state) => !state), []);

  return [state, toggle];
};
```

### Dark Mode

```javascript
export const useDarkMode = () => {
  const preferDarkQuery = "(prefers-color-scheme: dark)";

  const [mode, setMode] = useState(
    () =>
      window.localStorage.getItem("colorMode") ||
      (window.matchMedia(preferDarkQuery).matches ? "dark" : "light"),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const handleChange = () => setMode(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener(handleChange);
  }, [preferDarkQuery]);

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  return [mode, setMode];
};

const styles = {
  dark: {
    color: "white",
    backgroundColor: "black",
  },
  light: {
    color: "black",
    backgroundColor: "white",
  },
};
```

- Export a button to toggle modes:

```jsx
export const Button = () => {
  const [mode, setMode] = useDarkMode();

  return (
    <button
      style={styles[mode]}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode}
    </button>
  );
};
```

_Example:_

```jsx
const matchDark = "(prefers-color-scheme: dark)";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia(matchDark) && window.matchMedia(matchDark).matches,
  );

  useEffect(() => {
    const matcher = window.matchMedia(matchDark);
    const onChange = ({ matches }) => setIsDark(matches);

    matcher.addEventListener(onChange);

    return () => {
      matcher.removeEventListener(onChange);
    };
  }, [setIsDark]);

  return isDark;
};

const App = () => {
  const theme = useDarkMode() ? themes.dark : themes.light;

  return <ThemeProvider theme={theme}>...</ThemeProvider>;
};
```

## Counter Hook

```javascript
[count, increment] = useReducer((prev) => prev + 1, 0);
```

## One-Way Boolean State

```javascript
const [isEnabled, enable] = useReducer(() => true, false);
```

## Click outside

```jsx
const useClickOutside = (elRef, callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (elRef?.current?.contains(e.target) && callback) {
        callbackRef.current(e);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callbackRef, elRef]);
};

const Menu = () => {
  const menuRef = useRef(null);

  const onClickOutside = () => {
    console.log("Clicked outside!");
  };

  useClickOutside(menuRef, onClickOutside);

  return <div ref={menuRef}>Menu items</div>;
};
```

## HTTP Request

_Example 1:_

```javascript
import { useCallback, useEffect, useState } from "react";

export const useHttp = (url = "", options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, options) => {
    try {
      setIsLoading(true);

      const response = await fetch(url, options);

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      setApiData(data);
      setError(null);
    } catch (error) {
      setError(error);
      setApiData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    sendRequest(url, {
      ...options,
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [url, options, sendRequest]);

  return { isLoading, error, apiData };
};
```

_Example 2:_

```jsx
// https://api.github.com/users/25prabhu10
import { useState, useEffect } from "react";

const GitHub = ({ login }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!login) return;

    setLoading(true);

    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (!data) return null;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.location}</p>
      <img src={data.avatar_url} alt={data.login} />
    </div>
  );
};

export default GitHub;
```
