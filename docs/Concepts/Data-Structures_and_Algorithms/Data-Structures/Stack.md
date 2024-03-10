---
title: Stack
description: A stack is an abstract data type that serves as a collection of elements.
---

# Stack

A stack is an abstract data type that serves as a collection of elements, with two main principal operations:

1. **Push**: Which adds an element to the collection

2. **Pop**: Which removes the most recently added element that was not yet removed

**LIFO**: _Last-in First-out_ it is the order in which elements are pushed and popped.

- Similar to a stack of plates, inserting or removing is only possible at the top.

_Stack representation:_ :)

```c
// in -->|   |--> out
//       | 4 |
//       | 6 |
//       | 2 |
//       | 8 |
//       | . |
//       | . |
//       | . |
//       | - |
```

## Implementation

Data:

- Space for storing elements
- **Top pointer**

Operations:

- **Push**: Add an element to the top of a stack
- **Pop**: Remove an element from the top of a stack
- **IsEmpty**: Check if the stack is empty
- **Peak**: view first element in the queue
- IsFull: Check if the stack is full
- StackTop: Top most element

The stack can be implemented using:

- [Arrays](#arrays)
- [Linked List](#linked-list)

### Arrays

1. Create Stack:

   ```c
   struct Stack
   {
       int size;
       int top;
       int *A;
   };

   int main()
   {
       int i, x, n;

       // struct Stack *stack = (struct Stack *)malloc(sizeof(struct Stack));
       struct Stack stack;

       printf("Enter the size of the Stack: ");
       scanf("%d", &stack.size);

       printf("Enter the number of elements in the Stack: ");
       scanf("%d", &n);

       stack.A = (int *)malloc(stack.size * sizeof(int));
       stack.top = -1;

       printf("\nStack is Full: %d\n", isFull(&stack));
       printf("Stack is Empty: %d\n\n", isEmpty(&stack));

       printf("Enter Elements:\n");
       for (i = 0; i < n; i++)
       {
           scanf("%d", &x);
           Push(&stack, x);
       }

       return 0;
   }
   ```

2. Push:

   ```c
   void Push(struct Stack *stack, int x)
   {
       if (stack->top >= stack->size - 1)
           printf("\nStack-overflow!!!\n\n");

       stack->top++;
       stack->A[stack->top] = x;
   }
   ```

3. Pop:

   ```c
   int Pop(struct Stack *stack)
   {
       int x = -1;

       if (stack->top < 0)
       {
           printf("\nStack-underflow!!!\n\n");
           return x;
       }

       x = stack->A[stack->top];

       stack->A[stack->top] = 0;
       stack->top--;

       return x;
   }
   ```

4. Peek:

   ```c
   int Peek(struct Stack stack, int pos)
   {
       if (stack.top - pos + 1 < 0)
       {
           printf("\nInvalid Position\n");
           return -1;
       }

       return stack.A[stack.top - pos + 1];
   }
   ```

5. Stack Top:

   ```c
   int stackTop(struct Stack stack)
   {
       if (stack.top < 0)
       {
           printf("\nInvalid Position\n");
           return -1;
       }

       return stack.A[stack.top];
   }
   ```

6. Is Stack Empty:

   ```c
   int isEmpty(struct Stack *stack)
   {
       return stack->top == -1;
   }
   ```

7. Is Stack Full:

   ```c
   int isFull(struct Stack *stack)
   {
       return stack->top == stack->size - 1;
   }
   ```

### Linked List

1. Create Stack:

   ```c
   class Node
   {
   public:
       int data;
       Node *next;

       Node();
   };

   Node::Node()
   {
       next = NULL;
       data = 0;
   }

   class Stack
   {
   private:
       Node *top;

   public:
       Stack();
       ~Stack();
       void Push(int);
       int Pop();
       void Display();
       int Peek(int);
       int stackTop();
       int isEmpty();
       int isFull();
   };
   Stack::Stack()
   {
       top = NULL;
   }

   Stack::~Stack()
   {
       Node *temp = top;

       while (temp)
       {
           top = temp->next;
           delete temp;
           temp = top->next;
       }
   }
   ```

2. Push:

   ```c
   void Stack::Push(int x)
   {
       Node *t = new Node();

       if (!t)
       {
           printf("\nStack-overflow!!!\n\n");
           return;
       }

       t->data = x;
       t->next = top;

       top = t;
   }

   ```

3. Pop:

   ```c
   int Stack::Pop()
   {
       int x = -1;
       Node *t = top;

       if (!t)
       {
           printf("\nStack-underflow!!!\n\n");
           return x;
       }

       x = t->data;

       top = t->next;

       delete t;

       return x;
   }
   ```

4. Peek:

   ```c
   int Stack::Peek(int pos)
   {
       int i = 0;

       Node *t = top;

       if (!t)
           return -1;

       for (i = 1; i < pos; i++)
           t = t->next;

       return t->data;
   }
   ```

5. Stack Top:

   ```c
   int Stack::stackTop()
   {
       if (!top)
       {
           printf("\nStack is Empty!\n");
           return -1;
       }

       return top->data;
   }
   ```

6. Is Stack Empty:

   ```c
   int Stack::isEmpty()
   {
       return top == NULL;
   }
   ```

7. Is Stack Full:

   ```c
   int Stack::isFull()
   {
       Node *t = new Node();

       if (!t)
           return 1;

       delete t;
       return 0;
   }
   ```

## Applications

- To reverse a word

- In compilers

- In browsers: Store history of the tab

- **Parenthesis Matching**:

  - Every opening parenthesis must have a matching closing parenthesis. Add condition to check multiple types of parenthesis.

```c
struct Stack
{
    int size;
    int top;
    char *A;
};

void Push(struct Stack *stack, char x)
{
    stack->top++;
    stack->A[stack->top] = x;
}

char Pop(struct Stack *stack)
{
    char x;

    x = stack->A[stack->top];
    stack->A[stack->top] = 0;
    stack->top--;

    return x;
}

int isEmpty(struct Stack stack)
{
    return stack.top == -1;
}

int isBalance(char *exp)
{
    struct Stack stack;
    int i;

    stack.size = strlen(exp);        // <string.h>
    stack.top = -1;

    stack.A = (char *)malloc(stack.size * sizeof(char));

    for (i = 0; exp[i] != '\0'; i++)
    {
        if (exp[i] == '(')
            Push(&stack, exp[i]);

        else if (exp[i] == ')')
        {
            if (isEmpty(stack))
                return 0;

            Pop(&stack);
        }
    }

    return isEmpty(stack);
}

int main()
{
    char A[15] = {0};

    printf("Enter formula: ");
    scanf("%s", A);

    printf("\n\nIs balanced: %d\n", isBalance(A));

    return 0;
}
```

## Infix to Postfix Conversion

1. **Infix**: **Operand** - _Operator_ - **Operand** --> `a + b`

2. **Prefix**: _Operator_ - **Operand** - **Operand** --> `+ ab`

3. **Postfix**: **Operand** - **Operand** - _Operator_ --> `ab +`

**Associativity**:

| Symbol   | Priority | Associativity |
| -------- | :------: | :-----------: |
| `+`, `-` |    1     |      L-R      |
| `*`, `/` |    2     |      L-R      |
| `^`      |    3     |      R-L      |
| `-`      |    4     |      R-L      |
| `()`     |    5     |      L-R      |

- L-R: `a + b + c` --> `((a + b) + c)` --> `ab+c+` (Postfix form)
- R-L: `a ^ b ^ c` --> `(a ^ (b ^ c))` --> `abc^^` (Postfix form)

_Example:_

```c
struct Stack
{
    int size;
    int top;
    char *A;
};

void Push(struct Stack *stack, char x);

char Pop(struct Stack *stack);

char stackTop(struct Stack stack);

int isEmpty(struct Stack stack);

int precedence(char x, int outStack)
{
    if (x == '+' || x == '-')
        return outStack ? 1 : 2;

    else if (x == '*' || x == '/')
        return outStack ? 3 : 4;

    else if (x == '^')
        return outStack ? 6 : 5;

    else if (x == '(')
        return outStack ? 7 : 0;

    return 0;
}

char *infix_to_postfix(char *infix)
{
    struct Stack stack;
    char temp;
    int i = 0, j = 0;

    stack.size = strlen(infix);
    stack.top = -1;
    char *postfix = (char *)malloc((stack.size + 20) * sizeof(char));

    stack.A = (char *)malloc(stack.size * sizeof(char));

    while (infix[i] != '\0')
    {
        if (isdigit(infix[i]))
            postfix[j++] = infix[i++];

        else
        {
            if (precedence(infix[i], 1) > precedence(stackTop(stack), 0))
            {
                postfix[j++] = ' ';
                Push(&stack, infix[i++]);
            }
            else
            {
                temp = Pop(&stack);
                if (temp == '(')
                    i++;
                else
                    postfix[j++] = temp;
            }
        }
    }

    while (!isEmpty(stack))
        postfix[j++] = Pop(&stack);

    postfix[j] = '\0';

    return postfix;
}

int main()
{
    char A[15] = {0};

    printf("Enter the infix form: ");
    scanf("%s", A);

    char *result = infix_to_postfix(A);

    printf("Postfix form: %s", result);
    return 0;
}
```

### Evaluate Postfix

```c
struct Stack
{
    int size;
    int top;
    int *A;
};

void Push(struct Stack *stack, int x);

int Pop(struct Stack *stack);

int stackTop(struct Stack stack);

int isEmpty(struct Stack stack);

int doMath(char op, int op1, int op2)
{
    switch (op)
    {
    case '+':
        return op1 + op2;

    case '-':
        return op1 - op2;

    case '*':
        return op1 * op2;

    case '/':
        return op1 / op2;
    }

    return 0.0;
}

int evaluatePostfix(char *postfix)
{
    int i, num;
    int result;
    int operand2, operand1;
    struct Stack stack;

    stack.size = strlen(postfix);
    stack.top = -1;

    stack.A = (int *)malloc(stack.size * sizeof(int));

    for (i = 0; postfix[i] != '\0'; i++)
    {
        if (postfix[i] == ' ')
            continue;

        else if (isdigit(postfix[i]))                               // <ctype.h>
        {
            num = 0;

            while (isdigit(postfix[i]))
            {
                num = num * 10 + (int)(postfix[i] - '0');
                i++;
            }
            i--;

            Push(&stack, num);
        }

        else
        {
            operand2 = Pop(&stack);
            operand1 = Pop(&stack);
            result = doMath(postfix[i], operand1, operand2);
            Push(&stack, result);
        }
    }

    return Pop(&stack);
}

int main()
{
    char A[15] = {0};

    printf("Enter postfix form: ");
    fgets(A, 15, stdin);

    A[strlen(A) - 1] = '\0';

    printf("Result: %d", evaluatePostfix(A));

    return 0;
}
```

## Complexity

Array Based:

- Push and Pop: `O(1)`

## Implementing Stack Using Queue
