---
prev: ./Links
next: ./Code
---

# Images

Images can be inserted using URLs or relative physical path.

Images in Markdown are very similar to links. The difference is that, the square brackets must be prefixed with an exclamation mark `!`.

Also, they may have some alternative text. A description of the image, which is displayed if the image can't be loaded.

## Inline

Same as inserting a link but prefixed with a `!`.

Syntax:

```markdown
![Alternate text](path/to/image "optional text")
```

## Reference

Same as inserting a referenced link but prefixed with a `!`.

```markdown
![Alternate text][id]
[id]: url/to/image "optional text"
```
