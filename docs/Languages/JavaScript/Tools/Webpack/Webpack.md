---
title: Webpack
description: A static module bundler for modern JavaScript applications.
---

# Webpack

It is a **A static module bundler for modern JavaScript applications**.

A module bundler takes all of our different files (JavaScript, LESS, CSS, JSX, ESNext, and so on) and turns them into a single file.

The two main benefits of bundling are _modularity_ and _network performance_. It can also put source code through loaders that can transform and compile it.

Some of the features are:

- **Code splitting**: Splits up code into different chunks that can be loaded when required. Sometimes these are called as _rollups_ or _layers_.

- **Minification**: Removes whitespace, line breaks, rename lengthy variable names to smaller ones, and unnecessary code to reduce the file size.

- **Feature Flagging**: Sends code to one or more-but not all-environments when testing out features.

- **Hot Module Replacement (HMR)**: Watches for changes in source code. Changes only the updated modules immediately without reloading the browser tab.

- **Modularity**: Using module pattern, we can split code into multiple files and import them based on the requirement in each file.

- **Composition**: With modules, we can build small, simple, reusable React components that we can compose efficiently into applications. Smaller components are easier to comprehend, test, and reuse. They're also easier to replace down the line when enhancing applications.

- **Speed**: Packaging all the application's modules and dependencies into a single client bundle will reduce the load time of an application.

- **Consistency**: Since webpack will compile JSX and JavaScript, we can start using tomorrow's JavaScript syntax today. Babel supports a wide range of ESNext syntax, which means we don't have to worry about whether the browser supports our code. It allows developers to consistently use cutting-edge JavaScript syntax.

## Setup

To get started install `webpack` and `webpack-cli` as either global or local dependency.

```bash
npm install webpack webpack-cli --save-dev
```

Once installed add the below script tags inside `package.json` file:

```bash
webpack

# FOR YARN ADD THIS
node ./node_modules/webpack-cli/bin/cli.js
```

The above command will invoke webpack with its default settings and produce results.

::: tip NOTE
Webpack v5 is being used here.
:::

## Configuration

We can use webpack out of the box without any user defined configurations.

By default:

- It looks for `index.js` file in the `src` directory and starts building from there.
- Generates the bundled output file called `main.js` inside the `dist` directory.
- Include all the project dependencies inside `index.js` file and webpack by default can handle most of these dependencies.

If the user wants to **override the defaults**, customize webpack, or handle dependency, they can **create a configuration file**.

Webpack's configuration file is a JavaScript file that exports a webpack configuration.

- Create a file called `webpack.config.js` in the root directory of the repository (or anywhere and pass the path to webpack).

- In the `package.json` file add a script that invokes webpack with this configuration file. `webpack --config webpack.config.js`

Configuration file exports a configuration object:

```javascript
module.exports = {};
```

1. `entry`: Entry point for the webpack. Default: `./src/index.js`

2. `output`: Output file and directory. Default: `./dist/main.js`

3. `mode`: Mode in which webpack needs to operate in `development`, `production` or `none`. Default: `production`

4. `devtool`: To create source-maps or remove `eval` from output file

5. `loaders`: Webpack only understands JavaScript and JSON files by default. [Loaders](#loaders) allow webpack to process other types of files

6. `plugins`: [Plugins](#plugins) can perform wider range of tasks like bundle optimization, asset management and injection of environment variables

## Loaders

Loaders help webpack to pre-process files. This allows you to bundle any static resource way beyond JavaScript

Loaders work at the individual file level _during or before_ the **bundle** is generated

### Transpiling

- `babel-loader`: This package allows transpiling JavaScript files using **[Babel](https://github.com/babel/babel)**. Use `babel.config.js` for babel configurations

  Installation:

  ```bash
  npm install -D babel-loader @babel/core @babel/preset-env
  ```

  Usage:

  ```javascript
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  }
  ```

  Configuration:

  ```javascript
  module.exports = {
    presets: [
      "@babel/preset-env",
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
  };
  ```

  ::: tip NOTE
  Babel uses [browserslist](https://github.com/browserslist/browserslist) to traget browsers
  :::

- `ts-loader`: Loads [TypeScript](https://www.typescriptlang.org/)

### Templating

- `html-loader`: Exports HTML as string. HTML is minimized when the compiler demands

  Installation:

  ```bash
  npm install --save-dev html-loader
  ```

  Usage:

  ```javascript
  module: {
  rules: [
    {
      test: /\.html$/i,
      loader: 'html-loader',
    },
  ],
  }
  ```

### Styling

- `css-loader`: Loads CSS files from imports.

  ```bash
  npm install --save-dev css-loader
  ```

- `style-loader`: Inject CSS into the DOM.

  ```bash
  npm install --save-dev style-loader
  ```

- `sass-loader`: Loads a Sass/SCSS file and compiles it to CSS.

  ```bash
  npm install --save-dev sass-loader sass
  ```

  ::: tip NOTE
  Needs [Dart Sass](https://github.com/sass/dart-sass) or [Node Sass](https://github.com/sass/node-sass).
  Recommended to use Dart Sass.
  :::

- `postcss-loader`: Loader to process CSS with [PostCSS](https://github.com/postcss/postcss).

  Installation

  ```bash
  npm install --save-dev postcss-loader postcss postcss-preset-env
  ```

  Requires `postcss.config.js` for configuration:

  ```javascript
  module.exports = {
    plugins: [require("postcss-preset-env")],
  };
  ```

  ::: tip NOTE
  PostCSS uses [browserslist](https://github.com/browserslist/browserslist) to traget browsers.
  :::

Basic styling configuration:

```javascript
module: {
  rules: [
    {
      test: /\.scss$/i,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ],
    },
  ],
}
```

## Plugins

Plugins work at **bundle** or **chunk** level and usually work at the end of the bundle generation process

Plugins can also modify how the bundles themselves are created. Plugins have more powerful control than loaders

Bhumika Bharti
Abhishek Ramaswamy (Data Science Team Lead)
Aparna Padmakshi (Engineering Manager)
Sarathprasanna K B (UI/UX Designer)

Purdue University Global, PG & Certification
Training Reembersment
Udemy Courses Vouchers

Content Team

K & N analytics

Associate --> DS --> Sen DS --> Pricpal
Data Engineering --> ... --> Architic
SVP --> VP
