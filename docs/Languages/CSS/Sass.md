---
title: Sass
description: Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets
---

# Sass

Syntactically Awesome Style Sheets (Sass) is a CSS pre-processor, this helps users to use features like variables, nesting, mixins, inheritance, and catch errors during compilation. These features help in writing well structured, readable, maintainable, and scalable CSS.

A stylesheet language initially designed by Hampton Catlin and developed by Nathan Weizenbaum and Chris Eppstein.

## Syntax

Sass can be written using any one of the two different syntax:

1. Sass Syntax (`.sass`): Based on _HAML_ syntax style
2. Sassy CSS (SCSS) (`.scss`): Based on CSS3 syntax style (New)

Debug: `@debug $number`

## Variables

Variables in Sass are used for reusing values

`$` symbol is prefixed to create variable

- SCSS:

  ```scss
  $font-stack: Helvetica, sans-serif;
  $primary-color: #333;

  body {
    font: 100% $font-stack;
    color: $primary-color;
  }
  ```

- Sass:

  ```scss
  $font-stack: Helvetica, sans-serif
  $primary-color: #333

  body
    font: 100% $font-stack
    color: $primary-color
  ```

- Resulting CSS:

  ```css
  body {
    font:
      100% Helvetica,
      sans-serif;
    color: #333;
  }
  ```

::: tip NOTE
CSS variables are used whenever dynamic styles need to be applied, like under media queries. Mixture of both CSS and Sass variables are used depending on the need. Check CSS variables vs Sass variables.
:::

## Nesting

Sass allows nesting CSS rules, similar to HTML nesting

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

Resulting CSS:

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

> Overly nesting could prove hard to maintain

## Partials

Create partial Sass files that contain little snippets of CSS that you can include in other Sass files

- Partial is a Sass file named with a **leading underscore**: `_some-partial.scss`

- Import the partial file into other Sass files using `@use` rule

## Modules

Split styles into multiple files and use `@use` rule to load this Sass file as a module

- This allows us to use its [variables](#variables), [mixins](#mixins), and [functions](#functions)

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use "base";

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

Resulting CSS:

```css
body {
  font:
    100% Helvetica,
    sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

## Mixins

Mixin lets you make **groups of CSS declarations** that you want to reuse throughout your site

- Pass in values to make your mixin more flexible

- Create a mixin you use the `@mixin` directive

- Use it as a CSS declaration starting with `@include`

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

Resulting CSS:

```css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

## Extend/Inheritance

Using `@extend` lets you share a set of CSS properties from one selector to another

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}
```

Resulting CSS:

```css
.message,
.success,
.error,
.warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}
```

## Operators

Doing math in CSS

- Math operators like `+`, `-`, `*`, `math.div()`, and `%`

```scss
@use "sass:math";

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}
```

Resulting CSS:

```css
article[role="main"] {
  width: 62.5%;
}
```

## Functions

Functions allow you to define complex operations on SassScript values that you can re-use throughout your stylesheet

- Use [mixins](#mixins) for side-effects, and use functions just to compute values

```scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
```

Resulting CSS:

```css
.sidebar {
  float: left;
  margin-left: 64px;
}
```

## Utilities

- Generate `padding` utility classes with different padding values:

  ```scss
  $base-size: 1rem;

  $sizes: (
    "size-1": $base-size * 0.25,
    "size-2": $base-size * 0.5,
    "size-3": $base-size * 0.75,
    "size-4": $base-size * 1,
    "size-5": $base-size * 1.5,
    "size-6": $base-size * 2,
    "size-7": $base-size * 2.5,
    "size-8": $base-size * 3,
  );

  $sides: inline, inline-start, inline-end, block, block-start;

  @use "sass:string";

  @each $size, $size-value in $sizes {
    $number: string.slice($size, 6);

    .padding {
      &-#{$number} {
        padding: $size-value;
      }

      @each $side in $sides {
        &-#{$side}-#{$number} {
          padding-#{$side}: $size;
        }
      }
    }
  }
  ```

  Resulting CSS:

  ```css
  .padding-1 {
    padding: 0.25rem;
  }
  .padding-inline-1 {
    padding-inline: "size-1";
  }
  .padding-inline-start-1 {
    padding-inline-start: "size-1";
  }
  .padding-inline-end-1 {
    padding-inline-end: "size-1";
  }
  .padding-block-1 {
    padding-block: "size-1";
  }
  .padding-block-start-1 {
    padding-block-start: "size-1";
  }

  /* 
  .
  .
  .
  */
  .padding-block-start-8 {
    padding-block-start: "size-8";
  }
  ```

- Utility media query using `@mixins`:

  ```scss
  @use "sass:map";

  $breakpoints: (
    small: 40em,
    medium: 65em,
    large: 90em,
  );

  @mixin mq($key) {
    $size: map.get($breakpoints, $key);

    @media (min-width: $size) {
      @content;
    }
  }

  .card {
    padding: 1em;

    @include mq(small) {
      padding: 2em;
    }
  }
  ```

  Resulting CSS:

  ```css
  .card {
    padding: 1em;
  }

  @media (min-width: 40em) {
    .card {
      padding: 2em;
    }
  }
  ```

## References

- [Sass](https://sass-lang.com/)

- [Another UI Guy - Sass Notes](https://anotheruiguy.gitbooks.io/sassintherealworld_book-i/content/)

- [Sass Guidelines](https://sass-guidelin.es/)
