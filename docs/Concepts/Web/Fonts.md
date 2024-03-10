# Fonts

Google fonts:

- Free fonts
- Google uses it to track users
- Might be a bit slower

You can self host Google fonts in your server, use this link [Google web-fonts helper](https://google-webfonts-helper.herokuapp.com/fonts)

You can use system fonts if you want to not load a separate font:

- Fast: No network request, no time to parse a font, no flash of an incorrect font.
- Styles & Unicode: System fonts have lots of styles and broad language coverage, unlike many web-fonts.
- Familiarity: Web apps feel more native when they use system font faces.

```css
/*Sans-serif*/
font-family:
  -apple-system,
  BlinkMacSystemFont,
  avenir next,
  avenir,
  segoe ui,
  helvetica neue,
  helvetica,
  Ubuntu,
  roboto,
  noto,
  arial,
  sans-serif;

/*Serif*/
font-family:
  Iowan Old Style,
  Apple Garamond,
  Baskerville,
  Times New Roman,
  Droid Serif,
  Times,
  Source Serif Pro,
  serif,
  Apple Color Emoji,
  Segoe UI Emoji,
  Segoe UI Symbol;

/*Mono*/
font-family:
  Menlo,
  Consolas,
  Monaco,
  Liberation Mono,
  Lucida Console,
  monospace;
```

- Reference [SYSTEM FONT STACK](https://systemfontstack.com/)

## Preload

```html
<link
  rel="preload"
  href="fonts/Roboto.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="fonts/Noto.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

## Hierarchy

- Sub-headers: 24px
- Primary heading: 48px
- Secondary heading: 32px
- Body: 16px

## Font Choices

- Two font type if needed, avoid using more

## Typeface

## Whitespace

## Color & Contrast

- Heading: black
- Body text: dark gray

## Letter Spacing

## Optimal Line Length

- Short lines
- Keep lines between 60-80 characters long
