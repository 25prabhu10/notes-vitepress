---
title: Dynamic Programming
description: Dynamic Programming
date: 2023-08-06
lastmod: 2023-08-06
---

# Dynamic Programming

_Example:_ Fibonacci series

```javascript
function genFibonacciSeries(num, memo) {
  // 0, 1
  if (num <= 1) return num

  if (memo[num] != undefined) {
    return memo[num]
  }

  const fibNum =
    genFibonacciSeries(num - 1, memo) + genFibonacciSeries(num - 2, memo)

  memo[num] = fibNum

  return fibNum
}

function fibonacciSequence(num) {
  const memo = {}

  return genFibonacciSeries(num, memo)
}

console.log('0', fibonacciSequence(0))
console.log('1', fibonacciSequence(1))
console.log('2', fibonacciSequence(2))
console.log('3', fibonacciSequence(3))
console.log('4', fibonacciSequence(4))
console.log('5', fibonacciSequence(5))
console.log('6', fibonacciSequence(6))
console.log('7', fibonacciSequence(7))
```
