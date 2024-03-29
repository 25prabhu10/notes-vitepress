# The CSS

HTML5 Boilerplate's CSS includes:

- [Normalize.css](#normalizecss)
- [style.css](#stylecss)

This starting CSS does not rely on the presence of
[conditional class names](https://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/),
[conditional style sheets](https://css-tricks.com/how-to-create-an-ie-only-stylesheet/),
or Modernizr.js, and it is ready to use no matter what
your development preferences happen to be.

## Normalize.css

In order to make browsers render all elements more consistently and in line
with modern standards, we include Normalize.css - a modern, HTML5-ready
alternative to CSS resets.

As opposed to CSS resets, Normalize.css:

- targets only the styles that need normalizing
- preserves useful browser defaults rather than erasing them
- corrects bugs and common browser inconsistencies
- improves usability with subtle improvements
- doesn't clutter the debugging tools
- has better documentation

For more information about Normalize.css, please refer to its [project
page](https://necolas.github.io/normalize.css/).

## `style.css`

Several base styles are included that build upon `Normalize.css`. These
styles:

- provide basic typography settings that improve text readability

- protect against unwanted `text-shadow` during text highlighting

- tweak the default alignment of some elements (e.g.: `img`, `video`, `fieldset`, `textarea`)

- style the prompt that is displayed to users using an outdated browser

These styles are included in [`style.css`](https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/style.css). See the [`style.css`](https://github.com/h5bp/main.css) project [documentation](https://github.com/h5bp/main.css/blob/main/README.md#features) for a full discussion of these styles.
