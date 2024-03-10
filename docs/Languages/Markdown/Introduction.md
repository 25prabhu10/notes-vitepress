---
prev: ./
next: ./Heading
---

# Introduction

## Things you need

### vimwiki/vimwiki - This is a personal wiki for vim

vimrc settings

> `let g:vimwiki_ext2syntax = {'.md': 'markdown', '.markdown': 'markdown', '.mdown': 'markdown'}`

### suan/vim-instant-markdown - This open markdown file for a instant preview

vimrc settings

> `let g:instant_markdown_autostart = 0 " disable autostart`  
> `map <leader>md :InstantMarkdownPreview<CR>`

## How to use vimwiki

- Enter --> To create a new note (cursor must be on a word)
- Enter --> To enter into the note
- Backspace --> To Go back
- `<leader>md` --> To Open Markdown preview on web browser
