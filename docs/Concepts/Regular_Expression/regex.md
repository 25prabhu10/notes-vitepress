---
title: regex
description: Regular expression (regex) is a sequence of characters that specifies a search pattern in text
---

# Regular expression (regex)

regex is a sequence of characters that specifies a search pattern in text

## Syntax

Identifiers:

- `.`: any character, except for a newline

- `\d`: any digit (0-9)
- `\D`: not a digit

- `\w`: any character (a-z, A-Z, 0-9, \_)
- `\W`: not a character

- `\s`: whitespace (space, tab, newline)
- `\S`: not whitespace

- `\b`: the whitespace around words (word boundary)
- `\B`: not a word boundary

Modifiers:

- `+`: match 1 or more
- `?`: match 0 or 1
- `*`: match 0 or more

- `^`: match the **beginning** of a string
- `$`: match the **end** of the string

- `|`: either or

- `[ ]`: range or variance `[A-Z]` (match characters in brackets)
- `[^ ]`: not match the range or variance `[A-Z]`

- `{x}`: expecting `x` amount
- `{1,3}`: we're expecting 1 to 3

White Space Characters:

- `\n`: new line
- `\s`: space
- `\t`: tab
- `\e`: escape
- `\f`: form feed
- `\r`: return

DON't FORGET!: `{ } \`

_syntax characters_:

- `\`:
- `.`:
- `*`:
- `+`:
- `?`:
- `(`:
- `)`:
- `[`:
- `]`:
- `{`:
- `}`:

### Groups & Look-around

- `(abc)`: capture group
- `\1`: back-reference to group _#1_
- `(?:abc)`: non-capturing group
- `(?=abc)`: positive lookahead
- `(?!abc)`: negative lookahead

### Quantifiers

- `?`: match never or 1

- `*`: match 0 or more times

- `+`: match 1 or more times

- `{n}`: match _n_ times

- `{n,}`: match _n_ or more times

- `{n,m}`: match at least _n_ times, at most _m_ times

- `|`: match this or that

### Atoms

_Atoms_ are the basic building blocks of regular expressions

### Lookahead

## JavaScript

```javascript
const regTerm = /hello/;

console.log(regTerm);
console.log(regTerm.source); // hello
```

### Flags

| Literal flag | Property name | ES     | Description                    |
| ------------ | ------------- | ------ | ------------------------------ |
| `d`          | `hasIndices`  | ES2022 | Switch on match indices        |
| `g`          | `global`      | ES3    | **Match multiple times**       |
| `i`          | `ignoreCase`  | ES3    | Match **case-insensitively**   |
| `m`          | `multiline`   | ES3    | `^` and `$` match per line     |
| `s`          | `dotAll`      | ES2018 | Dot matches line terminators   |
| `u`          | `unicode`     | ES6    | **Unicode mode** (recommended) |
| `y`          | `sticky`      | ES6    | No characters between matches  |

### Methods

- `exec()`: executes a search for a match in a specified string and returns a result `array`, or `null`

  ```javascript
  const regex1 = RegExp("foo*", "g");
  const str1 = "table football, foosball";
  let array1;

  while ((array1 = regex1.exec(str1)) !== null) {
    console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
    // expected output: "Found foo. Next starts at 9."
    // expected output: "Found foo. Next starts at 19."
  }
  ```

- `test()`: executes a search for a match between a regular expression and a specified string. **Returns `true` or `false`**

  ```javascript
  const str = "table football";

  const regex = new RegExp("foo*");
  const globalRegex = new RegExp("foo*", "g");

  console.log(regex.test(str));
  // expected output: true
  ```
