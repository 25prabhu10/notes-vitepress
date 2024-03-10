---
title: Next.js
description: Web development framework
---

# Next.js

Web development framework enabling React-based web applications with server-side rendering and generating static websites

```bash
npx create-next-app@latest --typescript
# or
yarn create next-app
# or
pnpm create next-app
```

3 types of rendering methods are available:

- [Server-Side Rendering](#server-side-rendering-ssr)
- Static Site Generation
- Client-Side Rendering

Server-Side Rendering and Static Site Generation are also referred to as **Pre-Rendering** because the fetching of external data and transformation of React components into HTML happens before the result is sent to the client

## Server-Side Rendering (SSR)

With server-side rendering, the HTML of the page is generated on a server for each request. The generated HTML, JSON data, and JavaScript instructions to make the page interactive are then sent to the client

On the client, the HTML is used to show a fast non-interactive page, while React uses the JSON data and JavaScript instructions to make components interactive (for example, attaching event handlers to a button). This process is called **hydration**

Use `getServerSideProps` for SSR in Next.js

Isomorphic, Universal, or SSR (All the same thing!)

- Isomorphic application, runs both server and client. For each request it runs a virtual app, that generates the static pages

Advantages:

- Improved SEO
- Faster load times

## Static Site Generation (SSG)

With Static Site Generation, the HTML is generated on the server, but unlike server-side rendering, there is no server at runtime. Instead, content is generated once, at build time, when the application is deployed, and the HTML is stored in a CDN and re-used for each request

To statically generate pages use `getStaticProps`

## Client-Side Rendering

In a standard React application, the browser receives an empty HTML shell from the server along with the JavaScript instructions to construct the UI. This is called client-side rendering because the initial rendering work happens on the user's device

## Incremental Static Regeneration (ISR)

You can use **Incremental Static Regeneration** to create or update static pages after you’ve built your site. This means you do not have to rebuild your entire site if your data changes
