---
title: Bloom Filter
description: Bloom Filter
---

# Bloom Filter

It is a space-efficient probabilistic data structure, conceived by _Burton Howard Bloom_ in 1970, that is used to **test whether an element is a member of a set**.

Outcome of a Bloom filter:

1. Firm No

   - As **false negative are not possible**

2. Probably Yes

   - As false positives are possible
   - So, it is probabilistic

- It uses less memory than [hash tables](./Hash_Table.md) but it is less accurate

- Items cannot be removed from Bloom filter

To create Bloom filter, a [hashing function](../Algorithms/Hash_Function.md) with the following properties are required:

- Fast
- Evenly and randomly distributed
- Collisions are okay
- Collisions should be rare

Used in:

- Network routers
- Databases
- Browsers

## Working

A empty bloom filter is a **bit array** of `m` bits, all set to zero

- We need `k` number of **hash functions** to calculate the hashes for a given input.
