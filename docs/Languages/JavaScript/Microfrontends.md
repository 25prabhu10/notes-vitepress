---
title: Microfrontends
description:
date: 2023-03-16
lastmod: 2023-03-16
---

# Microfrontends

Microfrontend is a front-end web development pattern in which a single application may be built from disparate builds

It is analogous to a microservices approach but for client-side single-page applications written in JavaScript

- Divide a monolithic app into multiple, smaller apps
- Each smaller app is responsible for a distinct feature of the product

Microfrontend using the following three approaches:

- With Module Federation ([WebPack](./Tools/Webpack/Webpack.md))
- With Web Components
- With IFrames

Usecases:

- Multiple engineering teams can work in isolation
- Each smaller app is easier to understand and make changes to
- Each app can be built using different tech stack

## Integration

Major categories of integration:

1. Build-Time Integration (compile-time integration): Before Container gets loaded in the browser, it gets access to different apps source code

2. Run-Time Integration (client-side integration): After Container gets loaded in the browser, it gets access to different apps source code

3. Server Integration: While sending down JavaScript to load up Container, a server decides on whether or not to inculde app source code
