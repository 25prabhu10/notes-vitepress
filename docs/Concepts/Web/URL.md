---
title: Uniform Resource Locator (URL)
description: A Uniform Resource Locator (URL), colloquially termed a web address
---

# URL

A Uniform Resource Locator (URL), colloquially termed a web address, is a reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it.

- Defined in [RFC 1738](https://datatracker.ietf.org/doc/html/rfc1738) in 1994 by Tim Berners-Lee

A URL is a specific type of Uniform Resource Identifier (URI),

- **URL** is subset of **URI**

URL are mostly used to reference:

- Web pages ([http](./HTTP.md))
- File transfer (`ftp`)
- email (`mailto`)
- Database access (`JDBC`)
- And many other applications

## URL Syntax

Every HTTP URL conforms to the syntax of a generic URI (consist of a hierarchical sequence of 5 components):

```markdown
URI = scheme ":" ["//" authority] path ["?" query] ["#" fragment]
```

Where the `authority` component divides into 3 subcomponents:

```markdown
authority = [userinfo "@"] host [":" port]
```

The URI comprises:

- **Scheme**: A non-empty scheme component followed by a colon (`:`):

  - Begins with a letter
  - Followed by any combination of letters, digits, plus (`+`), period (`.`), or hyphen (`-`)
  - Canonical form Lowercase (they are case-insensitive)
  - E.g. `http`, `https`, `ftp`, `mailto`, `file`, `data`, and `irc`

- **Authority**: An optional component preceded by 2 slashes (`//`):

  - `userinfo` (optional) subcomponent that may consist of a user name and an optional password proceeded by a colon (`:`), followed by an at symbol (`@`)

    - `username:password`: is depreciated for security reasons (it uses plain text)

  - `host`: A subcomponent consisting of either a registered name or an IP address

    - IPv4 addresses must be in dot-decimal notation
    - IPv6 addresses must be enclosed in brackets (`[]`)

  - `port`: optional subcomponent preceded by a colon (`:`)

- **Path**: A component, consisting of a sequence of path segments separated by a slash (`/`)

  - Always defined and may be empty (0 length)
  - In `http` and `https` URIs, the last part of a path is named `pathinfo` (optional)
  - For more information [Wiki URL](https://en.wikipedia.org/wiki/URL)

- **Query**: An optional component preceded by a question mark (`?`), containing a query string of non-hierarchical data:

  - Its syntax is not well defined
  - By convention is most often a sequence of attribute–value pairs separated by a delimiter.

- **Fragment**: An optional component proceeded by a hash (`#`):

  - The fragment contains a fragment identifier providing direction to a secondary resource, such as a section heading in an article identified by the remainder of the URI.
  - When the primary resource is an HTML document, the fragment is often an id attribute of a specific element, and web browsers will scroll this element into view.

Example URL `http://www.example.com:81/a/b.html?user=Alice&year=2049#heading` is divided into different parts:

- Scheme: `http` (Protocol)
- Authority: Domain Name + Port

  - Domain Name: `www.example.com` (Hostname)
  - Port Number: `81`

- Path: `/a/b.html` (Path to the file or API endpoints or dynamically generated)
- Query: `?user=Alice&year=2049` (Parameters)
- Fragment: `#heading` (Anchor)

Ways to specify a URL:

- Full URL: `<a href='http://stanford.edu/news/2019/'>2019 News</a>`
- Relative URL: `<a href='september'>September News</a>`
  - Same as: `http://stanford.edu/news/2019/september`
- Absolute URL: `<a href='/events'>Events</a>`
  - It removes everything till the root and adds `/event` to it unlike relative URL
  - Same as: `http://stanford.edu/events`
- Fragment URL: `<a href='#section3'>Jump to Section 3</a>`
  - Scrolls to `<a href='section3' />` within page
  - Same as: `http://stanford.edu/events#section3`

Some HTML tags that can include URL:

- `<img>`
- `<video>`, `<audio>`
- `<canvas>`
- `<link>`, `<style>`
- `<script>`

::: tip TRAILING FORWARD SLASH
If you add trailing `/` to the URL?
:::

## Internationalized URL

An Internationalized Resource Identifier (IRI) is a form of URL that includes Unicode characters. All modern browsers support IRIs.

- The domain name in the IRI is known as an Internationalized Domain Name (IDN).

- Web and Internet software automatically convert the domain name into `punycode` usable by the Domain Name System; for example, the Chinese URL `http://例子.卷筒纸` becomes `http://xn--fsqu00a.xn--3lr804guic/`. The `xn--` indicates that the character was not originally ASCII

  - Punycode is a representation of Unicode with the limited ASCII character subset used for Internet hostnames

- The URL path name can also be specified by the user in the local writing system. If not already encoded, it is converted to UTF-8, and any characters not part of the basic URL character set are escaped as hexadecimal using percent-encoding; for example, the Japanese URL `http://example.com/引き割り.html` becomes `http://example.com/%E5%BC%95%E3%81%8D%E5%89%B2%E3%82%8A.html`. The target computer decodes the address and displays the page.

## References

- [Punycode converter](https://www.punycoder.com/)
