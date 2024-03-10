---
title: Puzzles
description:
date: 2022-12-30
lastmod: 2023-01-04
---

# Puzzles

## Monkeys and Doors

Question: There are 100 doors, all closed. In a nearby cage are 100 monkeys

The first monkey is let out, and runs along the doors opening every one. The second monkey is then let out, and runs along the doors closing the 2nd, 4th, 6th,… - all the even-numbered doors. The third monkey is let out. He attends only to the 3rd, 6th, 9th,… doors (every third door, in other words), closing any that is open and opening any that is closed, and so on. After all 100 monkeys have done their work in this way, what state are the doors in after the last pass?

Solution Approach:

Consider door number 56, monkeys will visit it for every divisor it has. So 56 has 1 & 56, 2 & 28, 4 & 14, 7 & 8. So on pass 1 1st monkey will open the door, pass 2 2nd one will close it, pass 4 open, pass 7 close, pass 8 open, pass 14 close, pass 28 open, pass 56 close. For every pair of divisors the door will just end up back in its initial state. But there are cases in which the pair of divisor has same number for example door number 16. 16 has the divisors 1 & 16, 2 & 8, 4&4. But 4 is repeated because 16 is a perfect square, so you will only visit door number 16, on pass 1, 2, 4, 8 and 16… leaving it open at the end. So only perfect square doors will be open at the end.

Answer:

10

## Color of the Bear

Question: A Bear has fallen from a height of 10m from ground. It reached ground in sqrt(2) seconds. Luckily it didn't get hurt. What color is the bear?

Solution Approach:

Calculating g, it comes as 10, which means the bear is found where there is more gravity. The gravity is increased at the poles. and the [South pole doesn't have bears](http://sciencequestionswithchris.wordpress.com/2014/01/07/do-i-weigh-less-on-the-equator-than-at-the-north-pole/).

So the bear being referred to comes from North Pole. Hence, its white.

One of the craziest questions I came across :P

## Divide Gold Bar

Question: You've got someone working for you for seven days and a gold bar to pay him. The gold bar is segmented into seven connected pieces.

You must give them a piece of gold at the end of every day. What are the fewest number of cuts to the bar of gold that will allow you to pay him 1/7th each day?

Solution Approach:

Day 1: Give A (+1) Day 2: Get back A, give B (-1, +2) Day 3: Give A (+1) Day 4: Get back A and B, give C (-2,-1,+4) Day 5: Give A (+1) Day 6: Get back A, give B (-1,+2) Day 7: Give A (+1) Hence, we need to make 2 cuts. Cut 1, so that the bar is divided into 1 and 6 pieces. And second on the 6 piece bar, so that it is divided into 2 and 4 pieces.

Answer:

2

## Next Number

Question:
What's the next number in this sequence:

10, 9, 60, 90, 70, 66, 96, 94, 98, ... ?
