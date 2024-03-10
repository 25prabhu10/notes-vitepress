---
title: Shell Scripting
description: Working with Unix Shells like GNU Bash.
---

# Shell Scripts

Scripts contain a series of commands. An interpreter executes these commands.

Great for automating repetitive tasks

- [Explain Shell Commands](https://explainshell.com/)
- [ShellCheck: Finds bugs in your shell scripts](https://www.shellcheck.net/)

::: tip Note
Anything you can type at the command line, you can put in a script.
:::

## Bash

GNU Bash is a Unix shell.
Bash is a command processor. Bash can read and execute commands from a file, called a shell script.

## First Shell Script

Let's create a simple script, that prints `Hello World` to the terminal.

1. Create a `script.sh` file with the below content:

   ```bash
   #!/bin/bash
   echo "Hello World"
   ```

2. To execute this script, just enter the file name in the command line, like this `./script.sh`.

3. If you get any file permission errors, try providing the file executable permission: `chmod 755 script.sh`

4. Output:

   ```bash
   Hello World
   ```

## Use of Shebang

It is used to specify the shell program that needs to be used to execute the script file

When the interpreter executes the script. The first line, i.e. shebang is used as an argument for the path of the shell program. This can be observed below:

```bash
# run the script in background
./script.sh &

# check the process
ps -ef process_id

# check commands executed by script.sh
pstree -p process_id
```

Different Bash shebang:

- `#!/usr/bin/env bash`: Flexibility on different systems (protability)

  - Different `*nixes` put `bash` in different places

- `#!/usr/bin/bash`: Explicit control on a given system of what executable is called

::: warning Why Shebang is needed?

- If no shebang is specified, then your default shell will be used.
- Different shells have slightly varying syntax and this may cause errors.

:::

::: tip Other Interpreters
Use python interpreter path as shebang if executing python script or any other interpreter path for that matter.
:::

## Comments

Pound sign (`#`) is used for writing in-line comments.

## Variables

Storage locations that have a name.

### Declaring Variables

Syntax: `VARIABLE_NAME="Value"`

Do not use spaces before or after **=** sign.

You can assign command output to a variable, by enclosing the command inside `( )` braces like: `USER_NAME=$(who)`

> By convention variables are written in uppercase.

::: tip Note
You can use back ticks or Tilda instead of the `$( )` syntax. This is an older convention.
:::

### Using Variables

There are two ways to use them:

1. Prefix dollar (`$`) sign to the variable:

   ```bash
   MY_SHELL="BASH"
   echo "I like the $MY_SHELL shell."
   ```

2. Enclose the variable inside curly `{ }` braces and prefix `$` sign. This is used whenever you need to concatenate the variable with some other text:

   ```bash
   echo "I like ${MY_SHELL}ing script"
   ```

## Tests

It checks for a condition, if the condition is met then it proceeds to execute the code enclosed within its block.
Else it will skip that block and proceed with the next statements.

Syntax: `[ condition-to-test-for ]`

To check the different test operators use `help test` or `man test`.

### Some File operators (tests)

- `-d FILE` : True if file is a directory.
- `-e FILE` : True if file exists.
- `-f FILE` : True if file exists and is a regular file.
- `-r FILE` : True if file is readable by you.
- `-s FILE` : True if file exists and is not empty.
- `-w FILE` : True if the file is writable by you.
- `-x FILE` : True if file is executable by you.

### String operators (tests)

- `-z STRING` : True if string is empty.
- `-n STRING` : True if string is not empty.
- `STRING1=STRING2` : True if the strings are equal.
- `STRING1!=STRING2` : True if the strings are not equal.

### Arithmetic Operators (tests)

- `ARG1 -eq AEG2` : True I both are equal.
- `-ne` : not equal.
- `-lt` : less than
- `-le` : less than or equal to
- `-gt` : greater than
- `-ge` : greater than or equal to

## if-else statement

Syntax for `if`:

```bash
if [ condition-is-true ]
then
  command 1
  command 2
  command n
fi

# double bracket [[
# this construct is not POSIX compliant
# and only available in Bash shell along with a few other shells
if [[ $MY_SHELL == "bash" ]]
```

Example:

```bash
if [ "$MY_SHELL"="bash" ]
then
  echo "You seem to like bash shell."
elif [ "$MY_SHELL"="ksh" ]
then
  echo "You seem to like ksh Shell."
else
  echo "You don't seem to like the bash shell."
fi
```

::: tip
Use variables under quotes to prevent unknown errors
:::

## for Loop

Syntax:

```bash
for VARIABLE_NAME in ITEM_1 ITEM_2 ITEM_N
do
  command n
done
```

Example:

```bash
for COLOR in red green blue
do
  echo "COLOR: \$COLOR"
done
```

- The list is usually stored inside a variable. With white space separating each item.

  ```bash
  COLORS="red green blue"

  for COLOR in $COLORS
    do
      echo "COLOR: $COLOR"
  done
  ```

## Positional Parameters

From `$0`-`$9` are used as positional parameters.

- `$0` : Name of the script being run.
- Rest are parameters passed through command line.
- `$@` is the list of all arguments. It can be used to loop through the parameters.

## User Input (STDIN)

The `read` command accepts STDIN.

Syntax:

```bash
read -p "PROMPT" VARIABLE
```

## Output

File descriptors:

- `0` is `stdin` the _standard input_
- `1` is `stdout` the _standard output_
- `2` is `stderr` the _standard error_

```bash
# redirect stdout to file.txt
echo test > file.txt
echo test 1> file.txt

# redirect stderr to file.txt
echo test 2> file.txt

# redirect stderr and stdout to file.txt
echo test 2>&1 file.txt
```

- `>`: _redirection_
- `>>`: append to target if exists

- `>&`: redirect a _stream_ to another _file descriptor_

Thus, in `2>&1`:

- `2>` redirects `stderr` to an _(unspecified) file_
- `&1` redirects `stderr` to `stdout`
