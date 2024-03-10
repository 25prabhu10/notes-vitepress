---
title: CSS Snippets
description: Collection of CSS Snippets
---

# CSS Snippets

## Display

- Centered always:

  ```html
  <div class="parent blue">
    <div class="box coral" contenteditable>:)</div>
  </div>

  <style>
    .parent {
      display: grid;
      place-items: center;
    }
  </style>
  ```

- Auto vertical to horizontal display:

  ```html
  <div class="parent white">
    <div class="box green">1</div>
    <div class="box green">2</div>
    <div class="box green">3</div>
  </div>

  <style>
    .parent {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .box {
      /* flex: <flex-grow> <flex-shrink> <baseWidth> */

      flex: 1 1 150px; /*  Stretching: fill space*/
      flex: 0 1 150px; /*  No stretching: */
      margin: 5px;
    }
  </style>
  ```

- Side-bars:

  ```html
  <div class="parent">
    <div class="section yellow" contenteditable>Min: 150px / Max: 25%</div>
    <div class="section purple" contenteditable>
      This element takes the second grid position (1fr), meaning it takes up the
      rest of the remaining space.
    </div>
  </div>

  <style>
    .parent {
      display: grid;

      /* grid-template-columns: minmax(<min>, <max>) ...; */
      grid-template-columns: minmax(150px, 25%) 1fr;
    }
  </style>
  ```

- Pancake Stack: Header - Main - Footer

  ```html
  <div class="parent">
    <header class="blue section" contenteditable>Header</header>
    <main class="coral section" contenteditable>Main</main>
    <footer class="purple section" contenteditable>Footer Content</footer>
  </div>

  <style>
    .parent {
      display: grid;
      grid-template-rows: auto 1fr auto;
    }
  </style>
  ```

- Holy Grail Layout:

  ```html
  <div class="parent">
    <header class="pink section">Header</header>
    <div class="left-side blue section" contenteditable>Left Sidebar</div>
    <main class="section coral" contenteditable>Main Content</main>
    <div class="right-side yellow section" contenteditable>Right Sidebar</div>
    <footer class="green section">Footer</footer>
  </div>

  <style>
    .parent {
      display: grid;
      grid-template: auto 1fr auto / auto 1fr auto;
    }

    header {
      padding: 2rem;
      grid-column: 1 / 4;
    }

    .left-side {
      grid-column: 1 / 2;
    }

    main {
      grid-column: 2 / 3;
    }

    .right-side {
      grid-column: 3 / 4;
    }

    footer {
      grid-column: 1 / 4;
    }
  </style>
  ```

- 12-Span Grid:

  ```html
  <div class="parent white">
    <div class="span-12 green section">Span 12</div>
    <div class="span-6 coral section">Span 6</div>
    <div class="span-4 blue section">Span 4</div>
    <div class="span-2 yellow section">Span 2</div>
  </div>

  <style>
    .parent {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
    }

    .span-12 {
      grid-column: 1 / span 12;
    }

    .span-6 {
      grid-column: 1 / span 6;
    }

    .span-4 {
      grid-column: 4 / span 4;
    }

    .span-2 {
      grid-column: 3 / span 2;
    }

    /* centering text */
    .section {
      display: grid;
      place-items: center;
      text-align: center;
    }
  </style>
  ```

- RAM (Repeat, Auto, Minmax):

  ```html
  <div class="parent white">
    <div class="box pink">1</div>
    <div class="box purple">2</div>
    <div class="box blue">3</div>
    <div class="box green">4</div>
  </div>

  <style>
    .parent {
      display: grid;
      grid-gap: 1rem;

      /* grid-template-columns: repeat(auto-fill, minmax(<base>, 1fr)) */
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  </style>
  ```

- Min and max size:

  ```html
  <div class="parent white">
    <div class="card purple">
      <h1>Title Here</h1>
      <div class="visual yellow"></div>
      <p>
        Descriptive Text. Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sed est error repellat veritatis.
      </p>
    </div>
  </div>
  <style>
    .parent {
      display: grid;
      place-items: center;
    }

    .card {
      /* clamp(<min>, <actual>, <max>)*/
      width: clamp(23ch, 50%, 46ch);
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }

    .visual {
      height: 125px;
      width: 100%;
    }
  </style>
  ```

- Maintain Aspect ratio:

  ```html
  <div class="parent white">
    <div class="card blue">
      <h1>Video Title</h1>
      <div class="visual green"></div>
      <p>Descriptive text for aspect ratio card demo.</p>
    </div>
  </div>
  <style>
    parent {
      display: grid;
      place-items: center;
    }

    .visual {
      /* aspect-ratio: <width> / <height> */
      aspect-ratio: 16 / 9;
    }

    .card {
      width: 50%;
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }
  </style>
  ```

## Text

- Truncate Text:

  ```css
  .box {
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  ```

- Gradient Text:

  ```css
  h1 {
    background: linear-gradient(to right, rgb(67, 124, 205), rgb(69, 214, 202));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  ```

- Vertical Text:

  ```css
  h1 {
    writing-mode: vertical-lr;
  }
  ```

- Blend Modes:

  ```css
  h1 {
    background: black;
    color: blue;
    // mix-blend-mode: screen; // white is cutout and black is opaque
    mix-blend-mode: multiply; // black is cutout and white is opaque
  }
  ```

- Text (or any content) as background:

  ```css
  body {
    background: url('data:image/svg+xml,\
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\
      <style>@keyframes foo %7Bto %7B transform: rotate(-20deg)}}</style>\
      <text y="1em" font-size="100" style="animation: foo 1s infinite alternate">🚀</text>\
      </svg>');
    background-size: 100px 100px;
  }
  ```

## Carousel

- Snap:

  ```css
  .container {
    width: 20rem;
    height: 20rem;
    background-color: #fff;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x proximity; /* mandatory */
  }

  .item {
    min-width: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-snap-align: center;
  }
  ```

## SVG

- Animated border:

  ```css
  <svg>
  <style>
  @keyframes marching-ants {to{stroke-dashoffset: -15px;}}
  </style>
  <rect width="100%" height="100%" style="stroke: black; stroke-widthL 4px; fill: none; stroke-dasharray: 10px 5px; animation: marching-ants 1s infintie linear;" />
  </svg>
  ```

## References

- [10 Modern CSS layout and sizing techniques](https://1linelayouts.glitch.me/)
