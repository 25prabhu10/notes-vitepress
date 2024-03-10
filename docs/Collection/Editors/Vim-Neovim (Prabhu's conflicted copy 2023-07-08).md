---
title: Vim
description: A free and open-source, screen-based text editor program
---

# Vim - Neovim

- [dot-files configure - init.lua](https://alpha2phi.medium.com/learn-neovim-the-practical-way-8818fcf4830f)

[Vim](https://www.vim.org/) (a contraction of Vi IMproved) is a free and open-source, screen-based text editor program.

And [Neovim](https://github.com/neovim/neovim): A Vim-fork focused on extensibility and usability

Once Vim is opened Ex commands are executed.

## Initialization

First, initialize (if defined) the system `vimrc` (see `:version`)

```bash
$VIM/vimrc
```

Then, initialize the **first found** of the following user `vimrc` configurations:

```bash
$VIMINIT
$HOME/.vimrc
$HOME/.vim/vimrc
$EXINIT
$HOME/.exrc
$VIMRUNTIME/defaults.vim
```

For Neovim:

```bash
system vimrc file: "$VIM/sysinit.vim"
fall-back for $VIM: "/usr/share/nvim"
```

::: tip NO USER CONFIGURATION

To launch Vim/Neovim without user defined configuration file:

```bash
# skip everything
{ vim/nvim } -u NONE
# skip everything except plugins and syntax highlighting
{ vim/nvim } -u NORC
```

:::

::: tip NOTE

- Commands which are executed after entering `:` are called _Ex_ commands
- Environment variables such as `$VIM` or `$VIMRUNTIME` are set on launch of vim. They are provided as fallback paths. (see `:version`, `:echo $VIM`)

:::

### Plugins

Plugins / Package Scripts are loaded next:

```vim
:h load-plugins
```

First, plugin scripts are loaded, which is equivalent to running:

```vim
:runtime! plugin/**/*.vim
# except for 'rtp' directories ending 'after'
```

- **Usually, this is** `$HOME/.vim/plugin/**/*.vim`
- Then, packages are loaded:
- **Usually, this is** `$HOME/.vim/pack/*/start/*/plugin/**/*.vim`

### Runtimepath

A List of directories which will be searched for runtime files. (see `:h rtp`)

To list current runtimepaths:

```vim
:set rtp?
```

The runtimepath search order:

1. User `$HOME/.vim` or `$HOME/.config/nvim` (for Neovim)
2. Sysadmin folder
3. `$VIMRUNTIME`
4. Sysadmin `after` folder
5. User Home `after` folder

Sample list of files and directories searched during runtime:

- `syntax/`
- `compiler/`
- `ftdetect/`
- `filetype.vim`
- `scripts.vim`
- `autoload/`
- `ftplugin/`
- `plugin/`
- `pack/`
- `colors/`
- `doc/`
- `import/`
- `keymap/`
- `lang/`
- `menu.vim`
- `print/`
- `spell/`
- `tutor`
- `indent/`

#### Syntax

The runtime directory which is searched is called `syntax/`.

It is the first directory to be loaded from the runtimepath.

Enables customized syntax highlighting.

- When invoking `:set sytax=xxx`, syntax file(s) named `xxx.vim` are sourced from the runtimepath, Usually, an autocommand does this if the filetype can be inferred.
- System defaults usually defined in `$VIMRUNTIME/syntax`

There are two ways to enable syntax:

1. `:syntax enable`: Enables syntax and mostly keeps the colours (highlight groups)
2. `:syntax on`: Enables syntax but reverts to default colours (highlight groups)

To create a custom syntax file:

1. Create `syntax` folder inside `$HOME/.vim` or `$HOME/.config/nvim` (for Neovim)
2. Create a file such as `syntax/sshknownhosts.vim`
3. Now, create a syntax group which match the string (keyword) or patterns (using regex).
4. Link the above syntax group with the highlight group (to get the highlight groups run `:hi`)

   ```vim
   # first syntax group
   syntax match sshknownhostspubkey "AAAA[0-9a-zA-Z+/]\+[=]\{0,2}"

   # link the above syntax group to a highlight group
   highlight def link sshknownhostspubkey Special

   # keep adding syntax groups
   syn keyword sshalg ssh-rsa
   hi def link sshalg Identifier

   syn match sshknownhostsip "\<\(\d\{1,3}\.\)\{3}\d\{1,3}\>"
   hi def link sshknownhostsip Constant
   ```

5. Now set the syntax type same as the above created filename: `:set syntax=sshknownhosts`

Some considerations:

1. If `keyword` doesn't set the syntax properly, then probably vim doesn't know that match the keyword pattern

   - Check the keyword pattern: `:set iskeyword?`
   - Add the missing pattern to `iskeyword` at the start of the syntax file:

     ```vim
     " add - to match 'ssh-rsa' keyword
     setlocal iskeyword=@,48-57,_,192-255,-
     ```

2. If you switch buffers the syntax highlighting will be gone. This is because, there is no automatic filetype tp syntax inference going on (see [File Type Detections](#file-type-detection)

#### File Type Detection

There are many ways to detect file types:

1. Override filetype **AFTER** default filetype detection. Add `:set filetype=<file>` autocommand to a file in `ftdetect/`

2. Only create a new filetype **AFTER** default filetype detection. Add `:setfiletype <file>` autocommand to a file in `ftdetect/`

3. Define filetype **BEFORE** default filetype detection (detectable _by name_). Add `:setfiletype <file>` for all files you want to define in `filetype.vim` file

4. Define filetype **BEFORE** default filetype detection (detectable _by content_). Add `:setfiletype <file>` for all files you want to define in `scripts.vim` file

Runtime files and directories searched for filetype detection:

- `ftdetect` +
- `filetype.vim` +
- `scripts.vim`

You can define your own filetype using any one of the above mentioned ways (see `:h new-filetype`)

_Example:_

- Create `filetype.vim` file inside user vim runtime (using option 3)
- Add an autocommand (commands that get executed when an event occurs)

  ```vim
  au BufNewFile,BufRead know_hosts setfiletype sshknownshosts
  ```

#### Auto Load

The directory `autoload/` is searched during runtime (see `:h autoload`)

- Scripts loaded only when required
- When you issue a call `filename#funcname()`, Vim searches in the `autoload/` directory of runtimepath for a file called `filename.vim` and calls `funcname()`

_Example:_

- Create `autoload` directory inside the user vim runtime (using option 3)
- Create a script file which performs some task(s), like `gcp.vim`
- Write your script in any of you preferred language like `Python`, `Vimscript`, `JavaScript`, `Lua`...

  ```vim
  echo "Initializing Autoload Plugin"
  python3 << PYEND
  from google.cloud import storage

  def upload():
      storage_client = storage.Client()
      bucket = storage_client.bucket('scripts')
      blob = bucket.blob('vim_demo')
      blob.upload_from_filename(vim.eval("expand('%:p')")
      print('UPLOADED')

  PYEND

  function gcp#Upload()
      :py3 upload()
  endfunction
  ```

- Now call the above function using: `:call gcp#Upload()`

#### Compiler

Vim has builtin compiler options. Sets options for using a specific compiler (see `:h compiler`)

The directory `compiler/` is used to place compiler specific options.

- When invoking `:compiler xxx`, compiler specific options from `xxx.vim` are sourced to set a `makeprg` and `errorformat` for vim-native compilations

_Example:_

- Create `compiler` directory inside the user vim runtime (using option 3)
- Create a script file which contains the compiler instructions for a particular build, like `typescript.vim`
- Set the compiler, like `tsc` in case of TypeScript and set the error format (errors produced by the complier as `stdout`)

  ```vim
  CompilerSet makeprg=tsc
  CompilerSet errorformat=%E%f(%l\\,%c):%m
  " %E: Indicates error message
  " %f: Indicates that this part is the filename (with full path)
  " %l: Line number
  " %c: Column number
  " %m: Message part
  ```

- Now when we open a TypeScript project, just set the compiler, like `compiler typescript` (filename)
- Then run make: It will build the project and add errors to the [quickfix](#quickfix) list (`:copen`)

#### FileType Plugin

Defines Vim scripts loaded for particular files (applies to current buffer) (see `:h ftplugin`)

The directory `ftplugin/` is used to place the file specific vim scripts.

_Example:_

- Create `ftplugin/` directory inside the user vim runtime (using option 3)
- Create a script file, (`typescript.vim`) which sets filetype specific options and keybindings
- Now, just add the your options, keybindings, etc...

  ```vim
  " Set compiler automatically when the file is loaded
  compiler typescript
  nnoremap <buffer> <space> :silent make <bar> redraw!<CR>
  " <buffer>: Perfrom on the current buffer
  " <silent>: Don't show stdout
  " <bar>: Sperate 2 commands
  " redraw!: Redraws the current screen (and removes any issues while displaying the buffer)
  ```

#### Plugin

Defines global plugins automatically loaded when vim starts (see `:h plugin`)

The directory `plugin/` is used to place the file specific vim scripts.

_Example:_ Create plugin for OSC 52 yanks

- We want to create a plugin that allows us to directly yand all text to our local clipboard by utilizing an xterm-compatible terminal's OSC-52 escape sequence support

::: tip YANKING
For future use, add `alias vi='vi -c "let g:tty='\''$(tty)'\''"'` to `~/.bashrc` or `~/.zshrc`
:::

## Registers

Types of registers:

1. `""`: The _unnamed_ register (last deleted, changed, or yanked content)
2. `"*`: synchronized with the selection clipboard
3. `"+`: synchronized with the system clipboard
4. `"_`: _black hole register_ (deleted or changed content smaller than one line)
5. `":`: most recent executed command
6. `".`: last inserted text
7. `"%`: current filename
8. `"#`: alternate file name for the current window
9. `"/`: last search pattern
10. `"0 to "9`: 10 _numbered registers_ (last yank)
11. `"-`: _small delete register_
12. `a-z or A-Z`: 26 _named registers_

## Common commands

- `gw`: Format selected text content based on column text width

Window split:

- `<C-w>v`: split window vertically
- `<C-w>s`: split window horizontally
- `<C-w>=`: make split window equal width
- `<Cmd>close<CR>`: close current split window

## quickfix
