---
title: Performance Metrics
description: User-Centric Performance Metrics
---

# Performance Metrics

|                   |                                                                  |
| ----------------- | ---------------------------------------------------------------- |
| Is it happening?  | Did the navigation start successfully? Has the server responded? |
| Is it useful?     | Has enough content rendered that users can engage with it?       |
| Is it usable?     | Can users interact with the page, or is it busy?                 |
| Is it delightful? | Are the interactions smooth and natural, free of lag and jank?   |

## Types of Metrics

- **Perceived load speed**: how quickly a page can load and render all of its visual elements to the screen.

- **Load responsiveness**: how quickly a page can load and execute any required JavaScript code in order for components to respond quickly to user interaction

- **Runtime responsiveness**: after page load, how quickly can the page respond to user interaction.

- **Visual stability**: do elements on the page shift in ways that users don't expect and potentially interfere with their interactions?

- **Smoothness**: do transitions and animations render at a consistent frame rate and flow fluidly from one state to the next?

## Metrics

1. **First Contentful Paint (FCP)**: measures the time from when the page starts loading to when any part of the page's content is rendered on the screen

2. **Largest Contentful Paint (LCP)**: measures the time from when the page starts loading to when the largest text block or image element is rendered on the screen

3. **First Input Delay (FID)**: measures the time from when a user first interacts with your site (i.e. when they click a link, tap a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to respond to that interaction

4. **Cumulative Layout Shift (CLS)**: measures the cumulative score of all unexpected layout shifts that occur between when the page starts loading and when its lifecycle state changes to hidden

5. **Time to First Byte (TTFB)**: measures the time it takes for the network to respond to a user request with the first byte of a resource

6. **Interaction to Next Paint (INP)**: measures the latency of every tap, click, or keyboard interaction made with the page, and-based on the number of interactions-selects the worst interaction latency of the page (or close to the highest) as a single, representative value to describe a page's overall responsiveness

7. **Time to Interactive (TTI)**: measures the time from when the page starts loading to when it's visually rendered, its initial scripts (if any) have loaded, and it's capable of reliably responding to user input quickly

8. **Total Blocking Time (TBT)**: measures the total amount of time between FCP and TTI where the main thread was blocked for long enough to prevent input responsiveness

Other Matrices:

- User Timing API
- Long Tasks API
- Element Timing API
- Navigation Timing API
- Resource Timing API
- Server timing

## Real User Monitoring (RUM)
