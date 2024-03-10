---
title: React Router
description: React Router enables "client side routing"
---

# React Router

React Router enables "client side routing"

- `react-router` core library
- BaseName
- v6
- `GetUserConfirmation`
- `forceRefresh`
- `useRouteMatch`

## Routes

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- A `<Route>` is only ever to be used as the child of `<Routes>` element, never rendered directly.

- If you want the new page to start from top:

```jsx
const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <>...</>;
};
```

- Not found page:

```jsx
<BrowserRouter>
  <Header />
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFoundPage />} />
</BrowserRouter>
```

```jsx
<BrowserRouter>
  <Header />
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route component={NotFoundPage} />
</BrowserRouter>
```

## BrowserRouter

- `basename="profile"`

## Queries

```jsx
<BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile/:id" element={<Profile />} />
  </Routes>
</BrowserRouter>
```

```jsx
// http://localhost:5173/profile/565?name=mort&id=999

import { useLocation, useParams } from "react-router-dom";

export const Profile = () => {
  const { id } = useParams(); // 565

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  console.log(query.get("name")); // mort
  console.log(query.get("age")); // `null`

  return <h1>My profile id {id}</h1>;
};

// export const Profile = ({ match }) => {
//   console.log(match.params.id);
//   return <h1>My profile</h1>;
// };
```

## Navigation (Redirect)

- Using `useNavigate` hook:

```jsx
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  if (id === null) {
    navigate("/");
  }

  return <h1>My profile id {id}</h1>;
};
```

- In v6 `Redirect` is replaced by `Navigate`

```jsx
import { BrowserRouter, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route
        path="/profile"
        component={loggedIn ? <Profile /> : <Navigate to="/" />}
      />
    </BrowserRouter>
  );
}
```

```jsx
import { BrowserRouter, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route
        path="/profile"
        component={loggedIn ? <Profile /> : <Redirect to="/" />}
      />
    </BrowserRouter>
  );
}
```

## History

```jsx
import { useHistory } from "react-router-dom";

export const Profile = ({ loggedIn }) => {
  const history = useHistory();

  useEffect(() => {
    if (!loggedIn) {
      // Redirect to home page if user is not logged in
      history.push("/");
    }
  }, [loggedIn, history]);

  return <h1>My profile id {id}</h1>;
};
```

## V5

- Routes:

  ```jsx
  import { BrowserRouter, Route } from "react-router-dom";

  function App() {
    return (
      <BrowserRouter>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    );
  }
  ```

  - By default React-Router will render all the matched paths

    - In the above code, if we navigate to the path `/about` both `<Home />` and `<About />` components will be rendered as `/about` can be matched with `/` and `/about`

    - To exclude `/` from being matched we can specify the **`exact` attribute**:

    ```jsx
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </BrowserRouter>
    ```

- Links: They render an anchor tag `<a>`

  ```jsx
  import { Link } from "react-router-dom";

  export const NavBar = () => {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
      </ul>
    );
  };
  ```

  - The above JSX will be rendered as:

  ```html
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/about">about</a>
    </li>
    <li>
      <a href="/profile">profile</a>
    </li>
  </ul>
  ```

  - Even though an anchor tag is render, on clicking the link the page will not be reloaded
  - React prevents the browser navigation to the new page

::: danger LINK
`Link` should always be under any of the children of `BrowserRouter`
:::

## Types of Routers

- `BrowserRouter`: Uses everything after the TLD (.com, .net) or port as the "path"

  - `localhost:3000/page-two`: `/page-two` is matched
  - Backend server need to be configured to respond to different routes

- `HashRouter`: Uses everything after a `#` as the "path"

  - `localhost:3000/#/page-two`: `/page-two` is matched
  - As anything after the `#` is ignored by the browser before making the request to server. The server will always return the root `index.html`

- `MemoryRouter`: Doesn't use the URL to track navigation

  - `localhost:3000/`: URL don't change even if we navigate to other pages
