---
title: HTML Elements
description: HTML Elements
---

# HTML Elements

Checkout [HTML Elements](./HTML.md#element)

## Section Element

A section is a thematic grouping of content.

## Article Element

An article is intended to be independently distributable or reusable.

- Content that you would like to link to, such as blog posts, comments, etc.

## Header Element

### Heading Group Element

The `<hgroup>` element should be used where you want a main heading with one or more subheadings.

- This is **not used** very much

  ```html
  <hgroup>
    <h1>Heading 1</h1>
    <h2>Subheading 1</h2>
    <h2>Subheading 2</h2>
  </hgroup>
  ```

- The `<hgroup>` element can only contain other headers, that is `<h1>` to `<h6>` and including `<hgroup>`

## Aside Element

The `<aside>` element is intended for content that is not part of the flow of the text in which it appears, however still related in some way. `<aside>` can be used as a sidebar to your main content.

## Navigation Element

```html
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact us</a></li>
  </ul>
</nav>
```

## Anchor Element

The `<a>` HTML element (or _anchor_ element), with its `href` attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.

_Example:_

```html
<a href="https://example.com">Website</a>

<a href="mailto:m.bluth@example.com">Connect over Email</a>

<a href="tel:+123456789">Call our store</a>
```

### Anchor Attributes

- `download`: attribute causes the browser to treat the linked URL as a download. You cannot use cross origin URLs

  ```html
  <a href="/example.pdf" download> Download PDF </a>

  <!-- Provide a file-name -->
  <a href="/example.pdf" download="case-study.pdf"> Download PDF </a>

  <!-- Download files generated by you, such as data from a table -->
  <a href="data:..." download="case-study.pdf"> Download PDF </a>

  <a href="blob:..." download="case-study.pdf"> Download PDF </a>
  ```

  - For cross origin downloads, fetch the file and turn it into an object URL.

  ```javascript
  const fileText = await fetch(url).then((res) => res.text());
  const blob = new Blob([fileText], {
    type: "application/pdf",
  });

  const blobUrl = URL.createObjectURL(blob);

  // Add this URL to anchor tag
  anchor.href = blobUrl;
  ```

- `referrerpolicy`: How much of the referrer to send when following the link

  - `no-referrer`: The Referer header will not be sent (set this for security reasons)

- `target`: Where to display the linked URL

  - `_self`: the current browsing context. (Default)

  - `_blank`: usually a new tab, but users can configure browsers to open a new window instead. Set `rel="noopener"` which does not set `window.opener`, for some browsers it is the default behaviour

    - **Not good for accessibility**, as user is navigated away from the current context and not clear indication to go back

  - `_parent`: the parent browsing context of the current one. If no parent, behaves as `_self`.

  - `_top`: the topmost browsing context (the "highest" context that's an ancestor of the current one). If no ancestors, behaves as `_self`.

- `title`: Using a title attribute in your anchor elements will improve accessibility when used the right way.

  ```html
  <a href="http://blog.com/all-articles" title="A list of all articles."
    >Click here.</a
  >
  ```

- Creating URL the right way:

  ```javascript
  // Don't use string concatenation
  const url = `https://builder.io/api/v1/image?height=${encodeURIComponent(
    height,
  )}&width=${encodeURIComponent(width)}`;

  // Instead use the global URL constructors
  const url = new URL("https://builder.io/api/v1/image");

  url.searchParams.set("height", height);
  url.searchParams.set("width", width);
  url.toString();

  // Get current URL
  const page = new URL(location.href).searchParams.get("page");
  ```

## Images

Browsers now have a built-in support for lazy loading images; (no need fort extra JavaScript code)

```html
<img loading="lazy" />
```

### Picture Element

The `<picture>` HTML element contains **zero or more `<source>` elements** and **one `<img>` element** to offer alternative versions of an image for **different display/device scenarios**

Checkout [Responsive Images](./Modern_Image_Delivery_Techniques.md)

_Example:_

```html
<picture>
  <source
    srcset="/media/cc0-images/surfer-240-200.jpg"
    media="(min-width: 800px)"
  />

  <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
</picture>
```

### SVG Element

Benefits of `<svg>`:

- Can be displayed as regular `<img>`
- Can be incorporated in HTML document
- Can be defined once and used many times
- Can be styled using CSS
- Can be made accessible

## Figure Element

The `<figure>` HTML element represents self-contained content, potentially with an optional caption, which is specified using the `<figcaption>` element.

- The figure, its caption, and its contents are referenced as **a single unit**.

- Usually used when an image can potential have a caption

Can be used for:

- Code snippets

  ```html
  <figure>
    <figcaption>main.js</figcaption>

    <pre>
        const name = "JavaScript";
        console.log(name);
    </pre>
  </figure>
  ```

- Quotations

  ```html
  <figure>
    <figcaption><b>Edsger Dijkstra:</b></figcaption>
    <blockquote>
      If debugging is the process of removing software bugs, then programming
      must be the process of putting them in.
    </blockquote>
  </figure>
  ```

- Poems

  ```html
  <figure>
    <p style="white-space:pre">
      Bid me discourse, I will enchant thine ear, Or like a fairy trip upon the
      green, Or, like a nymph, with long dishevelled hair, Dance on the sands,
      and yet no footing seen: Love is a spirit all compact of fire, Not gross
      to sink, but light, and will aspire.
    </p>
    <figcaption>
      <cite>Venus and Adonis</cite>, by William Shakespeare
    </figcaption>
  </figure>
  ```

_Example:_

```html
<figure>
  <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset" />

  <figcaption>An elephant at sunset</figcaption>
</figure>

<style>
  figure {
    border: thin #c0c0c0 solid;
    display: flex;
    flex-flow: column;
    padding: 5px;
    max-width: 220px;
    margin: auto;
  }

  img {
    max-width: 220px;
    max-height: 150px;
  }

  figcaption {
    background-color: #222;
    color: #fff;
    font: italic smaller sans-serif;
    padding: 3px;
    text-align: center;
  }
</style>
```

## Tables

Tables are compound elements consisting of:

- `table`: Table element
- `tr`: Table row
- `td`: Table cell
- `th`: Table header cell

_Example:_

```html
<table>
  <tr>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Favorite Animal</th>
  </tr>
  <tr>
    <td>Beau</td>
    <td>Bow</td>
    <td>cow</td>
  </tr>
  <tr>
    <td>Quincy</td>
    <td>Larson</td>
    <td>dog</td>
  </tr>
</table>
```

The above code will be rendered as:

| FirstName | LastName | FAVORITE ANIMAL |
| --------- | -------- | --------------- |
| Beau      | Bow      | cow             |
| Quincy    | Larson   | dog             |

## HTML Forms

An HTML form is used to collect user input. The user input is most often sent to a server for processing.

_Example:_

```html
<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>
```

### Form Element

The form element `<form>` is used to create an HTML form for user input:

```html
<form>...</form>
```

It's Attributes:

- `autocomplete`: Indicates whether input elements can by default have their values automatically completed by the browser

  - `off`: No autofill (expect for username and password)
  - `on`: The browser may automatically complete entries

- `name`: The name of the form. Must **not be empty string** and must **be unique among other form elements**

- `rel`: Specifies the relationship between the current document and the linked document

Attributes for form submission:

- `action`: The URL that processes the form submission. This value can be overridden by a formaction attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element.

- `enctype`: If the value of the **method attribute is post, enctype is the MIME type** of the form submission.

  - `application/x-www-form-urlencoded`: The default value.
  - `multipart/form-data`: Use this if the form contains `<input>` elements with type=file.
  - `text/plain`: Introduced by HTML5 for debugging purposes.
  - This value can be overridden by `formenctype` attributes on `<button>`, `<input type="submit">`, or `<input type="image">` elements.

- `method`: The HTTP method to submit the form with.

  - `post`: The **POST method**; form data sent as the request body.
  - `get`: The **GET method**; form data appended to the action URL with a `?` separator. Use this method when the form has no side-effects.
  - `dialog`: When the form is inside a `<dialog>`, closes the dialog on submission.
  - This value is overridden by `formmethod` attributes on `<button>`, `<input type="submit">`, or `<input type="image">` elements.

- `novalidate`: This Boolean attribute indicates that the form shouldn't be validated when submitted. If this attribute is not set (and therefore the form is validated), it can be overridden by a `formnovalidate` attribute on a `<button`>, `<input type="submit">`, or `<input type="image"`> element belonging to the form.

- `target`: Indicates where to display the response after submitting the form. In HTML5, it is a name/keyword for a browsing context (for example, tab, window, or iframe). The following keywords have special meanings:

  - `_self (default)`: Load into the same browsing context as the current one.
  - `_blank`: Load into a new unnamed browsing context.
  - `_parent`: Load into the parent browsing context of the current one. If no parent, behaves the same as `_self.`
  - `_top`: Load into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one and has no parent). If no parent, behaves the same as `_self.`
  - This value can be overridden by a formtarget attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element.

::: tip NOTE

- Setting `target="\_blank"` on `<form>` elements implicitly provides the same rel behaviour as setting rel="noopener" which does not set window.opener.
- It is possible to use the `:valid` and `:invalid` CSS pseudo-classes to style a `<form>` element based on whether or not the elements inside the form are valid.

:::

## Input Element

The `<input>` HTML element is used to create interactive controls for web-based forms in order to **accept data from the user**

How an `<input>` works varies considerably depending on the value of its `type` attribute:

- Default is `type="text"`

Some input types:

1. `text`

2. `number`:

   ```html
   <input type="number" />
   ```

   - Parse the number:

   ```javascript
   const num = parseInt(input.value, 10);
   ```

   - Better way to extract the number:

   ```javascript
   const num = input.valueAsNumber;

   // We can set the number value
   input.valueAsNumber = 25;
   ```

3. `button`
4. `checkbox`
5. `color`
6. `date`
7. `email`
8. `file`
9. `hidden`
10. `image`
11. `password`
12. `radio`
13. `range`
14. `search`
15. `tel`
16. `url`

### Data-List

The `<datalist>` HTML element contains a set of `<option>` elements that represent the **permissible or recommended options available to choose** from within other controls.

- Recommend values to various input types

- Connect `datalist` with `input` element using `id` and `list` attributes

_Example:_

```html
<!-- Text -->
<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
</datalist>

<!-- Datetime -->
<input type="time" list="popularHours" />
<datalist id="popularHours">
  <option value="12:00"></option>
  <option value="13:00"></option>
</datalist>

<!-- Range -->
<input type="range" list="tickmarks" />
<datalist id="tickmarks">
  <option value="10"></option>
  <option value="25"></option>
</datalist>
```

## Date and Time Element

### Time Element

The `<time>` element allows an unambiguous ISO 8601 date to be attached to a human-readable version of that date.

```html
<time datetime="2017-10-31T11:21:00+02:00">Tuesday, 31 October 2017</time>
```

## Dialog Element

The `<dialog>` HTML element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.

- Can be used as modal instead of creating one manually

- By default dialog elements are not shown

- Use `open` attribute to show the element

_Example:_

```html
<dialog>
  <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
  }
</style>

<scrip>
    <!-- Open dialog -->
    document.querySelector('dialog').showModal()

    <!-- Close dialog -->
    document.querySelector('dialog').close()
</script>
```

::: danger NOTE
The `tabindex` attribute must not be used on the `<dialog>` element.
:::

## Details Disclosure element

The `<details>` HTML element creates a disclosure widget in which information is visible only when the widget is toggled into an _"open"_ state.

- A summary or label must be provided using the `<summary>` element.

_Example:_

```html
<details>
  <summary>Details</summary>

  <p>Something small enough to escape casual notice.</p>
</details>
```

## Other Elements

- `<address>`: Used for email address, social network account, street address, telephone number, or something you can get in touch with.
