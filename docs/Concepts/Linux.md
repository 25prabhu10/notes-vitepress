---
title: Linux
description: Linux is a OS
---

# Linux

Linux is a family of open-source Unix-like operating systems based on the Linux kernel

## Filesystem

Typical Filesystem Hierarchy Standard (FHS): To get more information checkout `man hier`

1. `/bin`:

   - Binaries of important executables and core OS commands (`ls`, `cat`)
   - Typically this directory is symbolically linked to `/usr/bin`

2. `/sbin`:

   - Contains system essential Binaries similar to `/bin`
   - Traditionally the programs in `sbin` were statically linked, thus had fewer library dependencies
   - Binaries containing system administration tools
   - Typically this directory is symbolically linked to `/usr/bin`

3. `/boot`:

   - Contains boot-files, files needed by the bootloader

4. `/dev`:

   - Contains device files
   - These files are dynamically created based on the various physical and virtual devices that are connected to the system
   - Devices are present here
   - All devices are files or directories

5. `/etc`:

   - Critical configuration files and startup scripts
   - System wide configurations
   - Such as settings for `ssh` are present in `vi /etc/ssh/ssh_config`

6. `/home`:

   - Location of the individual user home directories

7. `/lib`, `/lib32`, `/lib64`:

   - Contains shared libraries required by the system programs
   - Typically these directories are symbolically linked to `/usr/lib`

8. `/mnt`:

   - Mount devices temporarily: like attaching a network storage server temporarily
   - Some do permanent mounting

9. `/opt`:

   - Optional directory
   - Optional software packages are placed, mostly by vendors

10. `/proc`:

    - It is a pseudo file-system: a file-system that's created at startup and removed at shutdown
    - It contains the information about every running process on the machine
    - Each active process can have a sub-directory here
    - Also contains system information: such as CPU in `cat /proc/cpuinfo`

11. `/root`:

    - Root directory
    - Home directory for the root user

12. `/run`:

    - Contains information describing the system since boot-time
    - Such as who's logged in and what demons are running
    - Temp `fs` files

13. `/span`:

    - snap packages

14. `/srv`:

    - Occasionally used as a directory for files served by a web server or other server mechanisms such as `ftp`

15. `/sys`:

    - System files
    - Contains information about the devices, drivers, and kernel features
    - Like `/proc` but better structured

16. `/tmp`:

    - Directory to store temporary files and directories

17. `/usr`:

    - Contains most of the programs and utilities the system will run
    - The place where most of the installed programs reside

18. `/var`:

    - System specific variable files: likes logs, temp message files, spool files etc
    - Variable files that grow
    - Some web servers like Apache server files from `/var/www` directory

19. `lost+found`:

    - Contains chunks of broken files after a system crash

20. `/media`:

    - It is the mount mount for file systems stored on removable media

## grep

Grep is a command-line utility for searching plain-text data sets for lines that match a regular expression. Its name comes from the ed command g/re/p (globally search for a regular expression and print matching lines), which has the same effect. grep was originally developed for the Unix operating system like Linux, but later available for all Unix-like systems and some others such as OS-9

## sed

sed ("stream editor") is a Unix utility that parses and transforms text, using a simple, compact programming language

- TMP replace pattern:

```bash
sed -i 's/Steven/Kate/' file
```

## AWK

AWK (`awk`) is a domain-specific language designed for text processing and typically used as a data extraction and reporting tool. Similar to the [Sed](#sed) and [Grep](#grep) commands, it is a filter, and is a standard feature of most Unix-like operating systems

### Usage

- Unix/Linux:

  ```bash
  awk '/pattern/ {print "$1"}'    # standard Unix shells
  ```

- DOS/Win:

  ```powershell
  awk '/pattern/ {print "$1"}'    # compiled with DJGPP, Cygwin
  awk "/pattern/ {print \"$1\"}"  # GnuWin32, UnxUtils, Mingw
  ```

Note that the DJGPP compilation (for DOS or Windows-32) permits an awk
script to follow Unix quoting syntax `'/like/ {"this"}'`. However, if the
command interpreter is `CMD.EXE` or `COMMAND.COM`, single quotes will not
protect the redirection arrows `(<, >)` nor do they protect pipes `(|)`.
These are special symbols which require "double quotes" to protect them
from interpretation as operating system directives. If the command
interpreter is bash, ksh, zsh or another Unix shell, then single and double
quotes will follow the standard Unix usage

Users of MS-DOS or Microsoft Windows must remember that the percent
sign `(%)` is used to indicate environment variables, so this symbol must
be doubled `(%%)` to yield a single percent sign visible to awk

To conserve space, use `'1'` instead of `'{print}'` to print each line.
Either one will work

### Handy one-line AWK scripts

- File Spacing:

```bash
 # double space a file
 awk '1;{print ""}'
 awk 'BEGIN{ORS="\n\n"};1'
 # double space a file which already has blank lines in it. Output file
 # should contain no more than one blank line between lines of text.
 # NOTE: On Unix systems, DOS lines which have only CRLF (\r\n) are
 # often treated as non-blank, and thus 'NF' alone will return TRUE.
 awk 'NF{print $0 "\n"}'
 # triple space a file
 awk '1;{print "\n"}'
```

- Numbering and Calculations:

```bash
 # precede each line by its line number FOR THAT FILE (left alignment).
 # Using a tab (\t) instead of space will preserve margins.
 awk '{print FNR "\t" $0}' files*
 # precede each line by its line number FOR ALL FILES TOGETHER, with tab.
 awk '{print NR "\t" $0}' files*
 # number each line of a file (number on left, right-aligned)
 # Double the percent signs if typing from the DOS command prompt.
 awk '{printf("%5d : %s\n", NR,$0)}'
 # number each line of file, but only print numbers if line is not blank
 # Remember caveats about Unix treatment of \r (mentioned above)
 awk 'NF{$0=++a " :" $0};1'
 awk '{print (NF? ++a " :" :"") $0}'
 # count lines (emulates "wc -l")
 awk 'END{print NR}'
 # print the sums of the fields of every line
 awk '{s=0; for (i=1; i<=NF; i++) s=s+$i; print s}'
 # add all fields in all lines and print the sum
 awk '{for (i=1; i<=NF; i++) s=s+$i}; END{print s}'
 # print every line after replacing each field with its absolute value
 awk '{for (i=1; i<=NF; i++) if ($i < 0) $i = -$i; print }'
 awk '{for (i=1; i<=NF; i++) $i = ($i < 0) ? -$i : $i; print }'
 # print the total number of fields ("words") in all lines
 awk '{ total = total + NF }; END {print total}' file
 # print the total number of lines that contain "Beth"
 awk '/Beth/{n++}; END {print n+0}' file
 # print the largest first field and the line that contains it
 # Intended for finding the longest string in field #1
 awk '$1 > max {max=$1; maxline=$0}; END{ print max, maxline}'
 # print the number of fields in each line, followed by the line
 awk '{ print NF ":" $0 } '
 # print the last field of each line
 awk '{ print $NF }'
 # print the last field of the last line
 awk '{ field = $NF }; END{ print field }'
 # print every line with more than 4 fields
 awk 'NF > 4'
 # print every line where the value of the last field is > 4
 awk '$NF > 4'
```

- String Creation:

```bash
 # create a string of a specific length (e.g., generate 513 spaces)
 awk 'BEGIN{while (a++<513) s=s " "; print s}'
 # insert a string of specific length at a certain character position
 # Example: insert 49 spaces after column #6 of each input line.
 gawk --re-interval 'BEGIN{while(a++<49)s=s " "};{sub(/^.{6}/,"&" s)};1'
```

- Array Creation:

```bash
 # These next 2 entries are not one-line scripts, but the technique
 # is so handy that it merits inclusion here.

 # create an array named "month", indexed by numbers, so that month[1]
 # is 'Jan', month[2] is 'Feb', month[3] is 'Mar' and so on.
 split("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec", month, " ")
 # create an array named "mdigit", indexed by strings, so that
 # mdigit["Jan"] is 1, mdigit["Feb"] is 2, etc. Requires "month" array
 for (i=1; i<=12; i++) mdigit[month[i]] = i
```

- Text Conversion and Substitution:

```bash
 # IN UNIX ENVIRONMENT: convert DOS newlines (CR/LF) to Unix format
 awk '{sub(/\r$/,"")};1'   # assumes EACH line ends with Ctrl-M
 # IN UNIX ENVIRONMENT: convert Unix newlines (LF) to DOS format
 awk '{sub(/$/,"\r")};1'
 # IN DOS ENVIRONMENT: convert Unix newlines (LF) to DOS format
 awk 1
 # IN DOS ENVIRONMENT: convert DOS newlines (CR/LF) to Unix format
 # Cannot be done with DOS versions of awk, other than gawk:
 gawk -v BINMODE="w" '1' infile >outfile
 # Use "tr" instead.
 tr -d \r <infile >outfile            # GNU tr version 1.22 or higher
 # delete leading whitespace (spaces, tabs) from front of each line
 # aligns all text flush left
 awk '{sub(/^[ \t]+/, "")};1'
 # delete trailing whitespace (spaces, tabs) from end of each line
 awk '{sub(/[ \t]+$/, "")};1'
 # delete BOTH leading and trailing whitespace from each line
 awk '{gsub(/^[ \t]+|[ \t]+$/,"")};1'
 awk '{$1=$1};1'           # also removes extra space between fields
 # insert 5 blank spaces at beginning of each line (make page offset)
 awk '{sub(/^/, "     ")};1'
 # align all text flush right on a 79-column width
 awk '{printf "%79s\n", $0}' file*
 # center all text on a 79-character width
 awk '{l=length();s=int((79-l)/2); printf "%"(s+l)"s\n",$0}' file*
 # substitute (find and replace) "foo" with "bar" on each line
 awk '{sub(/foo/,"bar")}; 1'           # replace only 1st instance
 gawk '{$0=gensub(/foo/,"bar",4)}; 1'  # replace only 4th instance
 awk '{gsub(/foo/,"bar")}; 1'          # replace ALL instances in a line
 # substitute "foo" with "bar" ONLY for lines which contain "baz"
 awk '/baz/{gsub(/foo/, "bar")}; 1'
 # substitute "foo" with "bar" EXCEPT for lines which contain "baz"
 awk '!/baz/{gsub(/foo/, "bar")}; 1'
 # change "scarlet" or "ruby" or "puce" to "red"
 awk '{gsub(/scarlet|ruby|puce/, "red")}; 1'
 # reverse order of lines (emulates "tac")
 awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }' file*
 # if a line ends with a backslash, append the next line to it (fails if
 # there are multiple lines ending with backslash...)
 awk '/\\$/ {sub(/\\$/,""); getline t; print $0 t; next}; 1' file*
 # print and sort the login names of all users
 awk -F ":" '{print $1 | "sort" }' /etc/passwd
 # print the first 2 fields, in opposite order, of every line
 awk '{print $2, $1}' file
 # switch the first 2 fields of every line
 awk '{temp = $1; $1 = $2; $2 = temp}' file
 # print every line, deleting the second field of that line
 awk '{ $2 = ""; print }'
 # print in reverse order the fields of every line
 awk '{for (i=NF; i>0; i--) printf("%s ",$i);print ""}' file
 # concatenate every 5 lines of input, using a comma separator
 # between fields
 awk 'ORS=NR%5?",":"\n"' file
```

- Selective Printing of Certain Lines:

```bash
 # print first 10 lines of file (emulates behaviour of "head")
 awk 'NR < 11'
 # print first line of file (emulates "head -1")
 awk 'NR>1{exit};1'
  # print the last 2 lines of a file (emulates "tail -2")
 awk '{y=x "\n" $0; x=$0};END{print y}'
 # print the last line of a file (emulates "tail -1")
 awk 'END{print}'
 # print only lines which match regular expression (emulates "grep")
 awk '/regex/'
 # print only lines which do NOT match regex (emulates "grep -v")
 awk '!/regex/'
 # print any line where field #5 is equal to "abc123"
 awk '$5 == "abc123"'
 # print only those lines where field #5 is NOT equal to "abc123"
 # This will also print lines which have less than 5 fields.
 awk '$5 != "abc123"'
 awk '!($5 == "abc123")'
 # matching a field against a regular expression
 awk '$7  ~ /^[a-f]/'    # print line if field #7 matches regex
 awk '$7 !~ /^[a-f]/'    # print line if field #7 does NOT match regex
 # print the line immediately before a regex, but not the line
 # containing the regex
 awk '/regex/{print x};{x=$0}'
 awk '/regex/{print (NR==1 ? "match on line 1" : x)};{x=$0}'
 # print the line immediately after a regex, but not the line
 # containing the regex
 awk '/regex/{getline;print}'
 # grep for AAA and BBB and CCC (in any order on the same line)
 awk '/AAA/ && /BBB/ && /CCC/'
 # grep for AAA and BBB and CCC (in that order)
 awk '/AAA.*BBB.*CCC/'
 # print only lines of 65 characters or longer
 awk 'length > 64'
 # print only lines of less than 65 characters
 awk 'length < 64'
 # print section of file from regular expression to end of file
 awk '/regex/,0'
 awk '/regex/,EOF'
 # print section of file based on line numbers (lines 8-12, inclusive)
 awk 'NR==8,NR==12'
 # print line number 52
 awk 'NR==52'
 awk 'NR==52 {print;exit}'          # more efficient on large files
 # print section of file between two regular expressions (inclusive)
 awk '/Iowa/,/Montana/'             # case sensitive
```

- Selective Deletion of Certain Lines:

```bash
 # delete ALL blank lines from a file (same as "grep '.' ")
 awk NF
 awk '/./'
 # remove duplicate, consecutive lines (emulates "uniq")
 awk 'a !~ $0; {a=$0}'
 # remove duplicate, non-consecutive lines
 awk '!a[$0]++'                     # most concise script
 awk '!($0 in a){a[$0];print}'      # most efficient script
```

## User Management

| Command                               | Description                |
| ------------------------------------- | -------------------------- |
| `sudo adduser username`               | Create a new user          |
| `sudo userdel username`               | Delete a user              |
| `sudo usermod -aG groupname username` | Add a user to group        |
| `sudo deluser username groupname`     | Remove a user from a group |

## cron

A cron expression is simply a string consisting of six fields that each define a specific unit of time

Each line of a crontab file represents a job, and looks like this:

```text
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * <command to execute>
```

Additionally you can also use the following **special characters to build more advanced expressions**:

| Special Character | Description                        |
| ----------------- | ---------------------------------- |
| `*`               | Trigger on tick of every time unit |
| `,`               | List separator                     |
| `–`               | Specifies a range                  |
| `/`               | Defines an increment               |

_Example:_

```bash
# executes every minute
0 * * * * *

# executes every hour
0 0 * * * *

# executes every day
0 0 0 * * *

# executes every month
0 0 0 0 * *

# executes on first day of jan each year
0 0 0 1 1 *

# executes at 08:30pm every saturday
30 20 * * SAT

# executes at 08:30pm every saturday
30 20 * * 6

# executes every five minutes
0 */5 * * * *

# executes every hour between 8am and 10am
0 0 8-10/1 * * *
```

## Mount

In Linux, `mount` is a command in various operating systems. Before a user can access a file on a Unix-like machine, the file system on the device which contains the file needs to be mounted with the mount command. Frequently mount is used for SD card, USB storage, DVD and other removable storage devices

- List mount-points:

```bash
findmnt (optional)<device/directory>
```

- Unmount:

```bash
umount <device/directory>
```

## iptables

Iptables is a user-space utility program that allows a system administrator to configure the IP packet filter rules of the Linux kernel firewall, implemented as different Netfilter modules. The filters are organized in different tables, which contain chains of rules for how to treat network traffic packets. Different kernel modules and programs are currently used for different protocols; iptables applies to IPv4, ip6tables to IPv6, arptables to ARP, and ebtables to Ethernet frames

## UFW (Uncomplicated Firewall)

UFW (uncomplicated firewall) is a firewall configuration tool for Linux that runs on top of [iptables](#iptables), included by default within Ubuntu distributions. It provides a streamlined interface for configuring common firewall use cases via the command line

Enable UFW

- To check if ufw is enabled, run:

```bash
sudo ufw status
```

- To enable UFW on your system, run:

```bash
sudo ufw enable
```

- If for some reason you need to disable UFW, you can do so with the following command:

```bash
sudo ufw disable
```

- Block an IP Address/Subnet:

```bash
sudo ufw deny from 203.0.113.0/24
```
