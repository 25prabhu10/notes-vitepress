---
title: CSS Testing
description: CSS Testing
---

# CSS Testing

```bash
npm install jest
```

```js
// jest.config.js

module.exports = {
  moduleFileExtensions: ["js"],
  testRegex: "(\\.|/)spec\\.js$",
};
```

```js
scripts: {
  test: `jest -c path/jest.config.js`;
}
```

```js
// jest

expect(expression).toBe(expected);
```

```bash
npm install node-sass
```

```js
const sass = require("node-sass");

const result = sass.renderSync({
    data: "SCSS CODE..."
});

result.css.toString(); // generate css

// testing

function(SCSS) => CSS

// &

expect(str).toBe(str)

```

```js
const result = sass.renderSync({
    data : @import 'functions.scss'
            .test { background: getPrimary() }
});

expect(result.css.toString()).toBe(`.test { background: #fa3}`);
```

## Snapshot Testing

## dahfazz/test-my-css
