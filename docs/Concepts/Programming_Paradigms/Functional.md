---
title: Functional
description:
date: 2023-09-17
lastmod: 2023-10-02
---

# Functional

## Monads

A monad is a structure that combines program fragments (functions) and wraps their return values in a type with additional computation

1. Wrapper Type: `NumberWithLogs`
2. Wrap Function (allows entry to monad ecosystem) also known as `return`, `pure`, `unit`: `wrapWithLogs`
3. Run Function (runs transformations on monadic values) also known as `bind`, `flatMap`, `>>=`: `runWithLogs`

- Monads are a design pattern that allows a user to chain operations while the monad manages secret work behind the scenes

_Example:_

```typescript
// Normal call
function square(x: number): number {
  return x * x
}

function addOne(x: number): number {
  return x + 1
}

addOne(square(2)) // 5

// Call with Logging
interface NumberWithLogs {
  result: number
  logs: string[]
}

function square(x: number): NumberWithLogs {
  const result = x * x
  return { result: result, logs: [`Squared ${x} to get ${result}`] }
}

function addOne(x: NumberWithLogs): NumberWithLogs {
  const result = x.result + 1
  return {
    result: result,
    logs: x.logs.concat([`Added 1 to ${x.result} to get ${result}`]),
  }
}

// Below code will not work
square(square(10))
addOne(5)

// To fix it use a wrapper function
function wrapWithLogs(x: number): NumberWithLogs {
  return {
    result: x,
    logs: [],
  }
}

function square(x: NumberWithLogs): NumberWithLogs {
  const result = x.result * x.result
  return {
    result: result,
    logs: x.logs.concat([`Squared ${x.result} to get ${result}`]),
  }
}

square(square(wrapWithLogs(10)))
addOne(wrapWithLogs(5))

// Refactor the above functions (same logic)
function square(x: number): NumberWithLogs {
  const result = x * x

  return {
    result: result,
    logs: [`Squared ${x} to get ${result}`],
  }
}

function runWithLogs(
  input: NumberWithLogs,
  transform: (_: number) => NumberWithLogs,
): NumberWithLogs {
  const newNumberWithLogs = transform(input.result)
  return {
    result: newNumberWithLogs.result,
    logs: input.logs.concat(newNumberWithLogs.logs),
  }
}

runWithLogs(wrapWithLogs(5), addOne)

const a = wrapWithLogs(5)
const b = runWithLogs(a, addOne)
const b = runWithLogs(b, square)
```

- **Option** (also know as Maybe):

  - `number = a number`
  - `Option<number> = a number OR nothing`
  - `Option<User> = a User OR nothing`

_Example:_

```typescript
function getPetNickname(): string | undefined {
  const user: User | undefined = getCurrentUser()

  if (user === undefined) {
    return user
  }

  const userPet: Pet | undefined = getPet(user)

  if (userPet === undefined) {
    return userPet
  }

  const userPetNickname: string | undefined = getNickname(userPet)

  return userPetNickname
}

// Same but using Option<T>
function getPetNickname(): Option<string> {
  const user: Option<User> = getCurrentUser()

  const userPet: Option<Pet> = run(user, getPet)

  const userPetNickname: Option<string> = run(userPet, getNickname)

  return userPetNickname
}

const doors = ['red', 'green', 'blue']

// With `flatMap` List's run function
const doorAndCoinPossibilites = doors.flatMap((door) => {
  return [door + ' heads', door + ' tails']
})

// Explicit map, then flatten
const unFlattenedDoorAndCoinPossibilites = doors.map((door) => [
  door + ' heads',
  door + ' tails',
])
const doorAndCoinPossibilites2 = unFlattenedDoorAndCoinPossibilites.flat()
```

| Monad                     | Abstracts Away                                      |
| ------------------------- | --------------------------------------------------- |
| `NumberWithLogs`/`Writer` | Accumulation of log data                            |
| `Option`                  | Possibility of missing values                       |
| `Future`/`Promise`        | Possibility for values to only become avaible later |
| `List`                    | Adstracts away branching computation                |
