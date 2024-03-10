# NodeJS-Express-Handlebars Project

- [NodeJS](./Node.js.md) is a JavaScript runtime used in server-side development.
- Express is a Fast, unopinionated, minimalist web framework for NodeJS.
- Handlebars is a simple templating language.

## Project Scaffolding

Use [Express application generator](https://expressjs.com/en/starter/generator.html) to generate boilerplate.

```bash
npx express-generator
```

This command will create the following files:

```bash
create : myapp
create : myapp/package.json
create : myapp/app.js
create : myapp/public
create : myapp/public/javascripts
create : myapp/public/images
create : myapp/routes
create : myapp/routes/index.js
create : myapp/routes/users.js
create : myapp/public/stylesheets
create : myapp/public/stylesheets/style.css
create : myapp/views
create : myapp/views/index.jade
create : myapp/views/layout.jade
create : myapp/views/error.jade
create : myapp/bin
create : myapp/bin/www
```

### Directories And Files

#### `myapp`

This will be the root directory of the project.

#### `package.json`

This file holds various meta-data relevant to the project.

#### `public`

All the static files such as JavaScript files, stylesheets, images, fonts, and other static files are placed here.
Express will make this folder accessible from the URL.

#### `routes`

All the application routes are defined here.

#### `views`

This folder will contain the template files to generate the HTML files.
Express supports many template engines such as _pug_, _ejs_, _jade_, _handlebars_, etc.
The default template engine is _jade_, this can be change by using the `--view` option.

```bash
npx express-generator --view=pug
```

#### `app.js`

Express web framework is set up here.

```javascript
// IMPORTING express
const express = require("express");

// INITIALIZING express APP
const app = express();

// ENABLE JSON PARSER AND DEFAULT SIZE LIMIT IS "100kb"
app.use(express.json());

// PARSES INCOMING REQUESTS WITH URLENCODED PAYLOADS
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
```

#### Modules

1. `helmet`: Help protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately.

   ```javascript
   const express = require("express");
   const helmet = require("helmet");

   const app = express();

   // SECURITY HEADERS
   app.use(helmet());
   app.disable("x-powered-by");
   app.disable("etag");

   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));

   app.get("/", (req, res) => {
     res.send("Hello World");
   });

   module.exports = app;
   ```
