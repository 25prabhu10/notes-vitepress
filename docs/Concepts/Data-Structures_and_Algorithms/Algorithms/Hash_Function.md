---
title: Hash Function
description: A function that can be used to map data of arbitrary size to fixed-size values
---

# Hash Function

A function that can be used to map data of arbitrary size to fixed-size values

- The values returned by a hash function are called _hash values_, _hash codes_, _digests_, or _simply hashes_.

- The values are usually used to index a fixed-size table called a _[hash table](../Data-Structures/Hash_Table.md)_.

- Use of a hash function to index a hash table is called _hashing_ or _scatter storage addressing_.

## Consistent Hashing

Consistent Hashing is a **distributed hashing scheme** that operates independently of the number of servers or objects in a distributed hash table.

- It may be necessary or desirable to split a hash table into several parts, hosted by different servers.

- This is needed to achieve horizontal scaling

To determine how to split the hash table, we can take hash _modulo_ of the number of servers:

`server = hash(key) % N`

- `N` is the size of the pool

Problems with this method:

- Difficult to increase or decrease the pool size
- Almost all the keys need to be remapped if a new server is added or removed

- Hash space
- Hash ring

Problems with Consistent Hashing:

- Uneven distribution

  - Virtual nodes are used to overcome this issue

- Amazon DynamoDB
- Apache Cassandra

## Rendezvous hashing

**Rendezvous** or **highest random weight (HRW) hashing** is an algorithm that allows clients to achieve distributed agreement on a set of `k` options out of a possible set of `n` options.

- Rendezvous hashing is both much simpler and more general than [consistent hashing](#consistent-hashing), which becomes a special case (for `k=1`) of rendezvous hashing.

## Cryptographic Hash Functions

Check out [Hashing](../../Application_Security/Cryptography.md#hashing)
