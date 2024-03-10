---
title: Strings
description: Strings
---

# Strings

A string is a sequence of characters usually represented as an array data structure

- string is generally considered as a data type

## Characters Set

A character set is an element of internationalization that maps and translates an alphabet; that is, the characters that are used in a particular language.

### Character Encoding

Character Encoding is the process of assigning numbers to graphical characters such as human languages

#### ASCII

**American Standard Code for Information Interchange** (ASCII)

- 7-bit (stored as 1-byte in memory)
- 0-127, total 255 chars
- **A - 65** to **Z - 90**
- **a - 97** to **z - 122**
- **0 - 48** to **9 - 57**
- **Enter - 10**
- **Space - 13**
- **ESC - 27**

#### Unicode

- 16-bit (stored as 2-byte in memory)
- Represented in Hexadecimal form
- **A - 65** to **Z - 90**
- **a - 97** to **z - 122**
- **0 - 48** to **9 - 57**
- **Enter - 10**
- **Space - 32**
- **ESC - 27**

- Code-point
- `U+00639`

::: tip UTF-8
System for storing and representing code-points (encoding).
:::

## Characters

- 1-byte
- Character string must be enclosed in single quotes

```c
char temp = 'A';    // STORED AS 65

printf("%c", temp); // A
printf("%d", temp); // 65
```

## Strings Data

Strings: Array of Characters.

- String is an array of chars with a string delimiter at the end.
- To know the end of a string, a null char `\0` (or string delimiter or end of the string char) is used to mark the end of the string.
- String can be enclosed in double-quotes.
- String is mutable if defined as `A[]` and is immutable if defined as pointer `*A = "Hello"`

```c
char temp[5] = {'A', 'B', 'C', 'D', 'E'};
printf("%c", temp[0]);                    // A
printf("%s", temp);                       // ABCDE

char temp1[] = "ABCDE";
printf("%s", temp1);                      // ABCDE
printf("%lu", sizeof(temp1));             // 6
scanf("%s", temp1);

char temp2[5] = {'A', 'B'};                 // RESET WILL BE 0


char temp3[5] = {'A', 'B', 'C', 'D', '\0'};
char temp4[5] = {'A', 'B', 'C', '\0', 'D'};
printf("%s", temp3);                      // ABCD
printf("%s", temp4);                      // ABC
```

- `scanf` treats space and enter as the end of string
- To input string with spaces use `fgets()` (you could use `gets` but it is deprecated in C11 standard as it suffers from buffer overflow as it doesn't do any array bound testing).

  ```c
  char name[5];

  fgets(name, 5, stdin);
  ```

- You can check the size of the string using `strlen`
- `fgets()` adds `\n` (new line char) at the end which should be handled manually

  ```c
  #include <string.h>

  char name[5];

  fgets(name, 5, stdin);          // ABCDE

  printf("%s", name);           // ABCD
  printf("%lu", strlen(name));  // 4

  name[strcspn(name, "")] = '\0';
  ```

### String Length

Number of characters in the string.

```c
int main()
{
    char S[] = "WELCOME";

    int i;

    for (i = 0; S[i] != '\0'; i++)
    {
    }

    printf("%d", i);      // 7

    return 0;
}
```

Convert Uppercase to Lowercase:

```c
for (i = 0; S[i] != '\0'; i++)
    {
        S[i] = S[i] + 32;   // A:65 and a:97 So, 97-65=32
    }

printf("%s", S);          // welcome
```

Toggle case:

```c
int main()
{
    char S[] = "25WeLComE@";
    int i;

    for (i = 0; S[i] != '\0'; i++)
    {
        if (S[i] >= 65 && S[i] <= 90)
            S[i] += 32;

        else if (S[i] >= 97 && S[i] <= 122)
            S[i] -= 32;
    }

    printf("%s", S);      // 25wElcOMe@

    return 0;
}
```

Counting number of vowels and consonants:

```c
int main()
{
    char S[] = "How are you?";

    int i, v = 0, c = 0;

    for (i = 0; S[i] != '\0'; i++)
    {
        // you can use S[i] == 'a' also
        if (S[i] == 65 || S[i] == 69 || S[i] == 73 || S[i] == 79 || S[i] == 85 || S[i] == 97 || S[i] == 101 || S[i] == 105 || S[i] == 111 || S[i] == 117)
            v++;

        else if ((S[i] >= 65 && S[i] <= 90) || (S[i] >= 97 && S[i] <= 122))
            c++;
    }

    printf("%d", v);      // 5
    printf("%d", c);      // 4

    return 0;
}
```

Counting number of words:

```c
int main()
{
    char S[] = "How are   you?";

    int i, count = 0;

    for (i = 0; S[i] != '\0'; i++)
        if (S[i] == 32 && S[i + 1] != 32)
            count++;

    printf("%d", count + 1);       // 3

    return 0;
}
```

Check string validity (should only contain alphabets and no special chars):

```c
int string_validity(char str[])
{
    int i;

    for (i = 0; str[i] != '\0'; i++)
        if (str[i] < 65 || (str[i] > 90 && str[i] < 97) || str[i] > 122)
            return 0;

    return 1;
}

printf("%d", string_validity("Howareyou?"));

// OUTPUT:
// 0
```

2nd Version:

```c
int string_validity(char *str)
{
    int i;

    for (i = 0; str[i] != '\0'; i++)
        if (str[i] < 65 || (str[i] > 90 && str[i] < 97) || str[i] > 122)
            return 0;

    return 1;
}

int main()
{
    char *S = "Howareyou?";

    printf("%s", S);
    printf("%d", string_validity(S));

    return 0;
}
```

Reversing string:

```c
int main()
{
    char S[] = "Python";
    char reverse[7];
    int i, j;

    for (i = 0; S[i] != '\0'; i++)
    {
    }

    i--;

    for (j = 0; i >= 0; i--, j++)
        reverse[j] = S[i];

    reverse[j] = '\0';

    printf("%s", S);
    printf("%s", reverse);

    return 0;
}
```

2nd version:

```c
int main()
{
    char S[] = "Python";
    char temp;
    int i, j;

    for (j = 0; S[j] != '\0'; j++)
    {
    }

    j--;

    for (i = 0; i < j; i++, j--)
    {
        temp = S[i];
        S[i] = S[j];
        S[j] = temp;
    }

    printf("%s\n", S);

    return 0;
}
```

## Bitwise operations

1. Left shift
2. Bits ORing (Merging)
3. Bits ANDing (Masking)

Finding duplicate chars in a string:

```c
int main()
{
    char B[] = "Painting";
    int i, H = 0, x = 0;

    for (i = 0; B[i] != '\0'; i++)
    {
        x = 1;
        x = x << (B[i] - 97);

        if ((x & H) > 0)
        {
            printf("%c is duplicate\n", B[i]);
        }

        else
            H = x | H;
    }

    return 0;
}
```

## Anagram

Words made up of same letters (using hashing):

```c
int main()
{
    char A[] = "decimal";
    char B[] = "medical";
    // char C[] = "medicah";

    int i, j, H[26] = {0};

    for (i = 0; A[i] != '\0'; i++)
        H[A[i] - 97] += 1;

    for (j = 0; B[j] != '\0'; j++)
    {
        H[B[j] - 97] -= 1;
        if (H[B[j] - 97] < 0)
        {
            printf("Not anagrams\n");
            break;
        }
    }

    return 0;
}
```

## Permutations of String

- State space tree
- Back tracking
- Brute force
