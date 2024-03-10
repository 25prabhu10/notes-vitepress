---
title: Unicode
description: Unicode Normalisation Vulnerability
---

# Unicode Normalisation Vulnerability

**Normalization ensures two strings that may use a different binary representation for their characters have the same binary value after normalization.**

- Normalisation algorithms must be idempotent
- Convert strings to canonical form so that it is standardised

There are two overall types of equivalence between characters:

1. _Canonical Equivalence:_ characters are assumed to have the same appearance and meaning when printed or displayed.

2. _Compatibility Equivalence:_ is a weaker equivalence, in that two values may represent the same abstract character but can be displayed differently.

There are 4 Normalization algorithms defined by the Unicode standard:

1. **NFD**: _Normalization Form Canonical Decomposition_: Characters are decomposed by canonical equivalence, and multiple combining characters are arranged in a specific order.

2. **NFC**: _Normalization Form Canonical Composition_: Characters are decomposed and then recomposed by canonical equivalence.

3. **NFKD**: _Normalization Form Compatibility Decomposition_: Characters are decomposed by compatibility, and multiple combining characters are arranged in a specific order.

4. **NFKC**: _Normalization Form Compatibility Composition_: Characters are decomposed by compatibility, then recomposed by canonical equivalence.

## Case Study

Spotify account hijacking:

1. Target user account is bigbird
2. Create new account "ᴮᴵᴳᴮᴵᴿᴰ", Python string u'\u1d2e\u1d35\u1d33\u1d2e\u1d35\u1d3f\u1d30'
3. Send a request for a password reset for your new account.
4. A password reset link is sent to the email you registered for your new account. Use it to change the password.
5. Now, instead of logging in to account with username "ᴮᴵᴳᴮᴵᴿᴰ", try logging in to account with username bigbird with the new password.
6. Success! Mission accomplished.

Spotify followed simple rules for usernames:

- not allow white space in usernames,
- treat "BigBird" and "bigbird" as the same username.

[Creative usernames and Spotify account hijacking](https://engineering.atspotify.com/2013/06/18/creative-usernames/)

## JavaScript

- ECMAScript-5 has problems with characters present in astral planes

```javascript
'mañana' == 'mañana'
// false

'ma\xF1ana' == 'man\u0303ana'
// false

'ma\xF1ana'.length
// 6

'man\u0303ana'.length
// 7


// match foo + one character + bar
/foo.bar/.test('foo💩bar')
// false

/foo.bar/.test('foogbar')
// true


// doesn't match line breaks, either
/^.$/.test('💩')
// false

// matches line breaks, but
// still doesn't match whole astral symbols
/^[\s\S]$/.test('💩')
// false


/^[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF]$/.test('💩')
// true
```

- [JavaScript Unicode](https://flaviocopes.com/javascript-unicode/)

## MySQL vs. UTF-8

```sql
CREATE TABLE `table_name` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `column_name` VARCHAR(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

- Try adding unicode character

```sql
UPDATE table_name SET column_name = 'foo💩bar' WHERE id = 9001;
-- Query OK, 1 row affected, 1 warning

SHOW WARNINGS;
--
-- | Level   | Code | Message                                                                       |
-- |---------|------|-------------------------------------------------------------------------------|
-- | Warning | 1366 | Incorrect string value : '\xF0\x9F\x92\xA9' for column 'column_name' at row 1 |

SELECT column_name FROM table_name WHERE id = 9001;
-- foo
```

### Mitigation

- Use the new UTF-8 implementation in MySQL which is `utf8mb4`
- `mb4`: Multi-Byte-4

```sql
ALTER TABLE `table_name`
CONVERT TO CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

## C-Sharp

Case mapping:

```csharp
// Case mapping use these
Regex.IsMatch(input, regex, RegexOptions.IgnoreCase);
Regex.IsMatch("hac\u212A", "HACK", RegexOptions.IgnoreCase) == true

string.Equals(input1, input2, StringComparison.CurrentCultureIgnoreCase);

new CultureInfo(..).CompareInfo.Compare(input1, input2, CompareOptions.IgnoreNonSpace)

// instead of
strings.ToLower(input);
strings.ToUpper(input);
```

Normalization:

```csharp
input.Normalize(NormalizationForm.FormC);

input.Normalize(NormalizationForm.FormKC);
```

Others:

```csharp
IdnMapping().GetAscii(input)

// Use these of URL
Uri(input).Host /
Uri(input).IdnHost /
Uri(input).SafeDnsHost

// Example
new Uri("http://faceboo\u212A.com").Host == "facebook.com"
```

## Python

Case mapping:

```python
input.lower()
input.upper()
re.compile(regex, re.IGNORECASE).match(input)
input.casefold()
```

Normalization:

```python
unicodedata.normalize('NFC' input)

unicodedata.normalize('NFKC', input)
```

Others:

```python
urllib.parse.urlparse(input).hostname

// Example
import urllib.parse

urllib.parse.urlparse("http://i\u006bea.com").hostname ==
urllib.parse.urlparse("http://ikea.com").hostname
```

## Domain Names

- IDN Domains (Internationalized Domain Name)
- 2009
- Stored as ASCII strings using Punycode transcription
- No changes to the DNS system needed
- Checkout notes about URL here: [URL Notes Link](./../Web/URL.md)

## RIGHT-TO-LEFT OVERRIDE

Unicode Character 'RIGHT-TO-LEFT OVERRIDE' (U+202E)

```ruby
ruby -e 'File.rename("backdoor_ppt.exe", "resume\xe2\x80\xaetpp.exe")'
```

## ASCII Encoding

**American Standard Code for Information Interchange** (ASCII), is a character encoding standard for electronic communication.

- 1963
- 7-Bit character set

  - only 128 characters
  - 0000000 - 1111111

- A: 65 = 41 (hex) = 1000001 (binary)
- A: 97 = 61 (hex) = 1100001 (binary)

## ISO-8856-X

- ASCII compatible
- 8-Bit character set

  - 256 characters
  - 00000000 - 11111111

- 8859-2: (Central Europe)

## Unicode Encoding

- It is a **standard** for consistent encoding
- Each character or symbol is mapped to a numerical value which is referred to as a **code point**.
- It's like a database which gives the relationship between a code point to a character

- 1991
- MultiByte character set
- Fully ASCII and ISO-8859 compatible
- Different encodings (UTF-8, UTF-16, UTF-32, EBCDIC, ...)
- Current version: 12 (~137,000 characters)

- `U+0000` - `U+10FFFF`

- `U+0000` - `U+007F`: ASCII
- `U+0080` - `U+00FF`: ISO

- `U+0000` - `U+FFFF` (BMP: Basic Multilingual Plane) = 65536 characters
- `U+010000` - `U+10FFFF` (Astral Planes) = Over a million

### Encoding

The term _encoding_ means the method in which characters are represented as a series of bytes.

- UTF-8 can represent ASCII characters using 1 byte or up to4 bytes for other characters
- UTF-16 uses a minimum of 2 bytes, up to 4 bytes
- UTF-32 uses 4 bytes for all characters

- Western languages are more efficient with UTF-8
- Asian languages are efficient with UTF-16
- OS must support these standards for applying right encoding
- File written with UTF-8 encoding should only be decoded with UTF-8

## Reference

- [UNICODE SECURITY CONSIDERATIONS](https://unicode.org/reports/tr36/)
- [Unicode Normalization Forms](https://unicode.org/reports/tr15/)
- [Unicode Normalization](https://appcheck-ng.com/wp-content/uploads/unicode_normalization.html)

- [JavaScript Regex tester](https://scriptular.com/)

- [Punycode converter](https://www.punycoder.com/)

- [Windows Unicode](https://www.youtube.com/watch?v=jeIBNn5Y5fI)
