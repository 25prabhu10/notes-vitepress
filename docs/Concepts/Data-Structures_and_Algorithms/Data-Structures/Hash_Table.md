---
title: Hash Table (Hash Map)
description: A data structure which stores data in an associative manner
---

# Hash Table (Hash Map)

A _hash table (hash map)_ is a data structure which implements an _associative [array](./Arrays.md)_ abstract data type, a structure that can _map keys to values_.

- At high level Hash Table is a key-value lookup

  - **Key**: unique integer that is used for indexing the values

  - **Value**: data that are associated with keys.

- A hash table uses a **[hash function](../Algorithms/Hash_Function.md)** to compute an index into an array of buckets or slots, from which the desired value can be found

## Hash Collisions

When the hash function generates the same index for multiple keys, there will be a conflict (what value to be stored in that index).

- Ideally, the hash function will assign each key to a unique bucket, but most hash table designs employ an imperfect hash function, which might cause hash collisions where the hash function generates the same index for more than one key.

- Such collisions must be accommodated in some way.

- Hash table size directly affects on the number of collisions.

- The bigger the hash table size the less collisions you'll get.

Hash collision resolved by:

1. **Separate Chaining**:

   - Make each cell of hash table **point to a linked list** of records that have same hash function value.

   - Chaining is simple, but requires additional memory outside the table.

2. **Open Addressing**: In open addressing, all elements are stored in the hash table itself. Each table entry contains either a record or `NIL`.

   - When searching for an element, we examine the table slots one by one until the desired element is found or it is clear that the element is not in the table.

**Load Factor** = items in table / size of table

- At certain Load Factor (approx. 0.8) the average cache misses per lookup becomes exponentially large when using open addressing

- For lower Load Factor open addressing is better than separate chaining

Different techniques used in open addressing are:

1. **Linear Probing**: collision is resolved by checking the next slot.

   - The problem with linear probing is that a cluster of adjacent slots is filled. When inserting a new element, the entire cluster must be traversed.

   - This adds to the time required to perform operations on the hash table.

   - `h(k, i) = (h'(k) + i) mod m`

   - `i = {0, 1, ...}`

   - `h'(k)`: is a new hash function

2. **Quadratic Probing**: the spacing between the slots is increased (greater than one) by using the following relation.

   - `h(k, i) = (h′(k) + c1i + c2i2) mod m`

   - `c1` and `c2` are positive auxiliary constants,

   - `i = {0, 1, ...}`

3. **Double hashing**: If a collision occurs after applying a hash function `h(k)`, then another hash function is calculated for finding the next slot.

   - `h(k, i) = (h1(k) + ih2(k)) mod m`

## Operations

- **HashTable**: This operation is used in order to create a new hash table.

- **Delete**: This operation is used in order to delete a particular key-value pair from the hash table.

- **Get**: This operation is used in order to search a key inside the hash table and return the value that is associated with that key.

- **Put**: This operation is used in order to insert a new key-value pair inside the hash table.

- **DeleteHashTable**: This operation is used in order to delete the hash table

## Grow/Shrink Hash Table

## Performance

Insert, Find and Delete:

- `O(1)` for a "good" hash-table
- `O(n)` for a terrible hash-table (lots of collisions, etc)

## Applications

- Constant time lookup and insertion is required
- Cryptographic applications
- Indexing data is required
