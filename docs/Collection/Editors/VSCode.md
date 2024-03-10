---
title: Visual Studio Code (VSCode)
description: A lightweight but powerful source code editor.
---

# Visual Studio Code (VSCode)

Visual Studio Code is a free source-code editor

[Snippet Generator](https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode)

## Short Cut Keys

1. Command Pallet:

   `Ctrl + Shift + p` or `F1`

2. Settings:

   `Ctrl + ,`

3. Zen Mode

   `Ctrl + k` and `z`

4. Go to File Bread Crumb on the top:

   `Ctrl + Shift + ;`

5. Find a word and put cursor on each one of them:

   `Ctrl + Shift + l`

## Change Market Place URL

Open `product.json` file present in `/usr/lib/code/`:

Replace:

```json
"extensionsGallery": {
   "serviceUrl": "https://open-vsx.org/vscode/gallery",
   "itemUrl": "https://open-vsx.org/vscode/item"
},
```

With:

```json
"extensionsGallery": {
   "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
   "itemUrl": "https://marketplace.visualstudio.com/items"
},
```

[Stackoverflow Reference](https://stackoverflow.com/questions/44057402/using-extensions-in-compiled-vscode)
