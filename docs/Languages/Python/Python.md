# Python 3

Python is an interpreted, high-level, general-purpose programming language. Created by **Guido van Rossum** and first released in 1991, Python's design philosophy emphasizes code readability with its notable use of significant whitespace. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.

Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python is often described as a "batteries included" language due to its comprehensive standard library.

Python was conceived in the late 1980s as a successor to the ABC language. Python 2.0, released in 2000, introduced features like list comprehensions and a garbage collection system capable of collecting reference cycles. Python 3.0, released in 2008, was a major revision of the language that is not completely backward-compatible, and much Python 2 code does not run unmodified on Python 3.

The Python 2 language, i.e. Python 2.7.x, is "sunsetting" on January 1, 2020 (after extension; first planned for 2015), and the Python team of volunteers will not fix security issues, or improve it in other ways after that date. With the end-of-life, only Python 3.5.x and later will be supported.

Python interpreters are available for many operating systems. A global community of programmers develops and maintains CPython, an open source reference implementation. A non-profit organization, the Python Software Foundation, manages and directs resources for Python and CPython development.

## Project Scaffolding

1. Create a folder with project name.

2. Create virtual python environment, so that the project related packages are confined to the project and will have a specific version:

   ```bash
   # give any name in place of env
   python3 -m venv env
   ```

3. Activate the environment:

   ```bash
   env\Scripts\activate.bat

   # On Unix or MacOS, run:
   source env/bin/activate
   ```

4. Install the required packages and start working.

## Packages

- [appdirs](https://github.com/ActiveState/appdirs):

  - A small Python module for determining appropriate platform-specific dirs, e.g. a "user data dir"

- [asn1crypto](https://github.com/wbond/asn1crypto):

  - A fast, pure Python library for parsing and serializing ASN.1 structures.

- [astroid](https://github.com/PyCQA/astroid):

  - A common base representation of python source code for pylint and other projects

- [attrs](https://www.attrs.org/en/stable/):

  - attrs is the Python package that will bring back the joy of writing classes by relieving you from the drudgery of implementing object protocols (aka dunder methods).

- [Automat](https://github.com/glyph/Automat):

  - Automat is a library for concise, idiomatic Python expression of finite-state automata (particularly deterministic finite-state transducers).

## Python Libraries

- Python-2 Code vs. Python-3:

  ```python
  # 2to3 -w filename.py
  # python2x
  from __future__ import division  # imports python3

  print "Hello World"  # is acceptable in Python 2
  print ("Hello World")  # in Python 3, print must be followed by ()
  # print x,           # Trailing comma suppresses newline in Python 2
  # print(x, end=" ")  # Appends a space instead of a newline in Python 3

  # python2 has 2 inputs, input() and raw_input()#input() function treats received data as string if it is included in quotes '' or "", otherwise data is treated as number
  ```

- **Python Everything**:

```python
# os library
import os

os.getcwd()  # gives current path
os.mkdir("directory name")  # makes directory in the current directory
os.rename("old_name", "new_name")  # renames the files and directories
os.rmdir("dirname")  # deletes the directory
os.remove("test.txt")  # deletes the file
os.chdir("directory path")  # change directory path

abs(-5)  # absolute number prints positive numbers if input is -5 or 5
help("")  # help for everything use import if error
max([1, 5])  # maximum value in the list or something
min([1, 5])  # minimum value in the list or something
round(6.6)  # to round of the floating numbers
# i.e. 16.66666 to 16.667 using round(16.66666 , 3)


# sys library
import sys

sys.stderr.write("This is stderr text")  # used to print error
sys.stderr.flush()
sys.stdout.write("This is stdout text")

print(sys.argv)  # gets file name and get input from other Languages

print("what is ur name")

name = sys.stdin.readline()
print("Hello", name)

string_name = "My name is Prabhu"
print(string_name[11:16])

print(string_name[:11] + "Vinayak")

print("%c is my %s letter and my number %d is %.5f" % ("X", "favorite", 1, 0.14))

print(name.capitalize())

print(name.find("Prabhu"))

print(name.isalpha())

print(name.isalnum())

print(len(name))

print(name.replace("Prabhu", "Vinu"))

print(name.strip())

name_list = name.split(" ")
print(name_list)

import urllib.parse

# urllib library
import urllib.request

urllib.parse.urlencode("")
urllib.request.Request("")
urllib.request.urlopen("")

import math
from tkinter import EXCEPTION

math.floor(2.6)  # round() like function rounds to down
math.ceil(2.6)  # round() like function rounds to up

"string".lower()  # to convert string into lowercase

import time

start_time = time.time()
print("\n\n--- %s seconds ---" % (time.time() - start_time))

import statistics

x = [1, 2, 3, 4, 5]

me = statistics.mean(x)
medi = statistics.median(x)
sdev = statistics.stdev(x)
ver = statistics.variance(x)

# import statistics as s
# from statistics import *  # all without using statistics.
# from statistics import mean
# from statistics import mean as m
# from statistics import median

# - single line comment and ''' = multiline comment
print(
    """
   multiline print
"""
)

# print("my name is %s and wiegergjg %d dfsf", %("Prabhu", 25))

# ! or # -*- coding: encoding -*-
# ex: # -*- coding: cp-1252 -*- which uses Windows-1252 encoding

a, b = 0, 1  # which is equal to a=0 and b=1 initialization
print(
    b, end=","
)  # end can be used to avoid the newline after the output, or end the output with a different string

# operators list:
# +, -, *, /, %(remainder)

# (quotient without floating point) i.e. 17/3 is 5.66667 but 17//3 is 5 using _ we can add the value the previous answer i.e. new + _

# The "pass"  statement does nothing.
pass

print(r"C:\some\name")  # r used to to differentiate \name form \n

len()  # returns the length of a string.


# lists are like arrays []
squares = [1, 4, 9, 16, "a"]
new_squares = squares + [36, 49, 64, 81, 100]

squares.append(55)  # to add item to end of list
squares[2:5] = []  # to remove items from 2 to 4
a = ["a", "b", "c"]
n = [1, 2, 3]  # adding to x, x = [a, n]

for w in squares:  # prints from squares
    print(w, len(w))

for i in range(5):  # prints 0 to 4
    pass

for i in range(0, 5, 3):  # prints 0, 3
    pass

for i in range(len(squares)):
    # prints all squares
    print(i, squares[i])

list(range(5))  # gives [0, 1, 2, 3, 4]

# numbers, string, lists, tuples, dictionary

# ** = power to

quote = '"Allawa '

multiline_quote = """ just
like everyone"""

print("%s %s %s" % ("I like", quote, multiline_quote))

print("I do't like this", end="")

# import modules using = import_random, import_sys, import_os

print("Hello World!")

# Lists [] will have index with first one having index = 0.

grocery_lis = ["Juice", "Tomatoes", "Potato"]
print("First item", grocery_lis[0])
print(grocery_lis[0:2])

others = ["wash car", "pick up kids"]
to_do = [grocery_lis, others]

grocery_lis.append("Onions")
grocery_lis.insert(1, "Pickle")
grocery_lis.remove("Juice")
grocery_lis.remove(grocery_lis[3])
grocery_lis.sort()
grocery_lis.reverse()
grocery_lis.index("Pickle")
grocery_lis.count("Onions")  # counts the number of times Onions is in grocery_lis

del grocery_lis[4]

to_do_list = others + grocery_lis
print(len(to_do_list))
print(max(to_do_list))
print(min(to_do_list))


# CSV
import csv

with open("exm.csv") as csv_file:
    readCSV = csv.reader(csv_file, delimiter=",")

# tuples() unlike lists we will not be able to change it after it is created they are faster

pi_tuple = (3, 1, 4, 1, 5, 9)
pi_tuple = 3, 1, 4, 1, 5, 9  # its a tuple

new_list = list(pi_tuple)
new_tuple = tuple(new_list)

len(new_tuple), min, max

# Dictionary {} values with unique keys and you cannot join keys
# name = {key:value, key:value}

super_villain = {"Fiddler": "Isaac Bowin", "007": "123"}
del super_villain["Fiddler"]  # delete
super_villain["007"] = "009"  # adds to the Dictionary no order

print(super_villain.get("007"))
print(super_villain.keys())
print(super_villain.values())

# conditionals if, else, elif

try:  # it checks if there is any error inside it
    print("working")  # and if error is there it will go to exact
except Exception as e:  # Exception or NameError these are error handling
    print(e)  # it will print = 'xxasd' is not in ____


age = 21

if age > 16:
    print("You")
else:
    print("Not")

if age > 21:
    print("YNO")
elif age >= 16:
    print("yuno")
else:
    print("W")

# AND_OR_NOT

if (age > 0) and (age <= 18):
    print("You")
elif (age >= 21) or (age <= 65):
    print("Not")
elif not (age == 30):
    print("You dont get it")
else:
    print("nothing")

# loops

for x in range(0, 10):
    print(x, " ", end="")

for y in grocery_lis:
    print(y)

for x in [2, 4, 6, 8, 10]:
    print(x)

num_lis = [[1, 2, 3], [10, 20, 30], [100, 200, 300]]
for x in range(0, 3):
    for y in range(0, 3):
        print(num_lis[x][y])

import random

random_num = random.randrange(0, 100)
while random_num != 15:
    print(random_num)
    random_num = random.randrange(0, 100)

print("just finished")

i = 0
while i <= 20:
    if i % 2 == 0:
        print(i)
    elif i == 9:
        break
    else:
        i += 1
        continue
    i += 1


def Main():  # using main function
    print("Hello, World!!!")


if __name__ == "__main__":
    Main()


def add_number(fNum, lNum):
    sumNum = fNum + lNum
    return sumNum


print(add_number(1, 4))


# Variable-length arguments
def print_info(arg1, *var_tuple):
    print("Output is: ")
    print(arg1)
    for var in var_tuple:
        print(var)
    return


print_info(10)
print_info(70, 60, 50)

#!/usr/bin/python
# shows linux where to find python
# will work only if used as main code and will not work when used as module
if __name__ == "__main__":
    print("Such a great module!!!!")

# lambda
sum = lambda arg1, arg2: arg1 + arg2
print("Value of total : ", sum(10, 20))

global var_name  # use global to access global variables inside a function

# locals() and globals() functions can be used to see all local variables and global variables in that function


# r = readonly (default mode)
# rb = readonly in binary format (default mode)
# r+ = read and write
# rb+ = read and write in binary
# x = create a new file and open for writing
# w and a have all 4 modes

test_file = open("test.txt", "wb")  # "ab+" to rad and append file
print(test_file.mode)
print(test_file.name)
print(test_file.closed)
test_file.write(bytes("Write me to the file\n", "UTF-8"))
test_file.close()

test_file = open("test.txt", "r+")
test_file_in = test_file.read()
print(test_file_in)

# tell() tells position of in the file
# seek(offset, from) goes to the specific position in file from = 0(beginning), 1(current), 2(end of file)


def marks(mark):
    assert mark >= 0  # this produces an error if mark is smaller than 0


try:
    print("working good")
except EXCEPTION as e:  # only except: can also be written
    print("this went wrong" + e)
else:
    print("Everything went smoothly")

# or

try:
    pass
finally:  # some code that has to happen even if try dose not occur
    # fh.close()
    pass


def marks(mark):
    if mark > 100 and mark < 0:
        raise Exception(mark)  # produces an exception


class Network_Error(RuntimeError):  # user defined exception
    def __init__(self, arg):
        self.args = arg


try:
    raise Network_Error("Bad hostname")
except Network_Error as e:
    print(e.args)


class Animal:
    __name = ""  # or = None #__name can also be written as name
    __height = 0
    __weight = 0
    __sound = 0

    def __init__(self, name, height, weight, sound):
        self.__name = name
        self.__height = height
        self.__weight = weight
        self.__sound = sound

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name

    def set_sound(self, sound):
        self.__sound = sound

    def get_sound(self):
        return self.__sound

    def get_type(self):
        print("Animal")

    def toString(self):
        return "{} is {} cm tall and {} kilogram and say {}".format(
            self.__name, self.__height, self.__weight, self.__sound
        )


cat = Animal("Wiskers", 33, 10, "Meow")
print(cat.toString())


class Dog(Animal):
    __owner = None

    def __init__(self, name, height, weight, sound, owner):
        self.__owner = owner
        super(Dog, self).__init__(name, height, weight, sound)

    def set_owner(self, owner):
        self.__owner = owner

    def get_owner(self):
        return self.__owner

    def get_type(self):
        print("Dog")

    def toString(self):
        return "{} is {} cm tall and {} kilogram and say {} his owner is {}".format(
            self.__name, self.__height, self.__weight, self.__sound, self.__owner
        )

    def multiple_sounds(self, how_many=None):
        if how_many is None:
            print(self.get_sound())
        else:
            print(self.get_sound() * how_many)


spot = Dog("Spot", 53, 27, "Ruff", "Prabhu")
print(spot.toString())

```
