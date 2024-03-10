---
title: Redis
description: An in-memory data structure store
---

# Redis

Redis is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability

Redis is a key-value store that let us store some data, the value, inside a key. It offers ultra-fast performance to satisfy demanding real-time applications

- Port (default): `6379`

- Case insensitive

- By default all values are of type string

## Commands

- `redis-server`: starts Redis Server

- `redis-cli`: CLI utility to interact with Redis(connect to Redis)

- `redis-sentinel`: runs Redis Sentinel, a tool for monitoring and failover

- `redis-benchmark`: checks Redis performance

  ```bash
  redis-benchmark -n 1000 -d 1000000 -c 200
  ```

- `redis-check-aof` & `redis-check-dump`: used for the rare cases when there are corrupted data files

```bash
# checking if redis is working
redis-cli ping
```

## Syntax

```sql
-- SET key value [expiration EX seconds | PX milliseconds] [NX|XX]
SET name mort
-- OK

-- update the value of a key
SET name kyle

-- GET key
GET name
-- "kyle"

-- DEL key
DEL name
-- (integer) 1

GET name
-- (nil)

EXISTS name
-- (integer) 0 [not exists]
-- (integer) 1 [exists]

KEYS *
-- 1) "name"
-- list all keys that match the pattern

-- FLUSHALL [ASYNC | SYNC]
FLUSHALL
-- OK
-- delete all the keys of all the existing databases

KEYS *
-- (empty list or set)
```

- Non-destructive write:

  ```sql
  -- we want to set value for the key "services"
  SET service "heroku aws"
  -- we misspelled "services" and now
  -- the value of key "service" will be overwritten

  -- to prevent this we can use
  SETNX key value
  -- creates a key in memory if and only if the key
  -- dose not exist already
  -- SET if Not eXists

  SETNX service "heroku aws"
  -- (integer) 0

  SETNX services "heroku aws"
  -- (integer) 1
  ```

- Expire keys:

  - Timeout can be rest by using `SET` with the key again

  ```sql
  EXPIRE key seconds

  TTL name
  -- (integer) -1

  EXPIRE name 30

  TTL name
  -- (integer) 27

  -- after 30 seconds
  TTL name
  -- (integer) -2

  -- TTL returns:
  -- 1. timeout left in seconds
  -- 2. `-2` if the key doesn't exist
  -- 3. `-1` if the key exists but has no expiry set
  ```

## Data Types

Redis is a data structure server

### Core

1. Strings: Redis strings are the most basic Redis data type, representing a sequence of bytes

   - Binary-safe Strings

   - "binary-safe" means that the string can contain any type of data represented as a string: PNG images or serialized objects, for example.

2. Lists: Redis lists are lists of strings sorted by insertion order

   - Like linked lists

   - `RPUSH`: inserts a new element at the end of the List

     ```sql
     -- RPUSH key value [value ...]
     -- returns length of list after insertion

     RPUSH engineers "Alice"
     -- 1
     RPUSH engineers "Bob"
     -- 2
     RPUSH engineers "Carmen"
     -- 3

     -- multiple element insertions
     RPUSH engineers "Eve" "Francis" "Gary"
     ```

   - `LPUSH`: behaves the same as `RPUSH` except that it inserts the element at the front of the List

     ```sql
     -- LPUSH key value [value ...]
     ```

   - `LRANGE`: returns a subset of the List based on a specified start and stop index

     - `0`: first element
     - `-1`: last element

     ```sql
     -- LRANGE key start stop

     LRANGE engineers 0 -1
     -- 1) "Alice"
     -- 2) "Bob"
     -- 3) "Carmen"
     ```

   - `LLEN`: length of a List at any time

     ```sql
     -- LLEN key
     LLEN engineers
     -- (integer) 3
     ```

   - `LPOP`: **removes** and returns the **first element** of the List

     ```sql
     -- LPOP key
     LPOP engineers
     ```

   - `RPOP`: **removes** and returns the **last element** of the List

     ```sql
     -- RPOP key
     RPOP engineers
     ```

3. Sets: Redis sets are **unordered** collections of **unique strings** that act like the sets (Java HashSets, Python sets). With a Redis set, you can add, remove, and test for existence `O(1)` time (in other words, regardless of the number of set elements)

   - `SADD`: create a Set

     ```sql
     -- SADD key member [member ...]
     -- returns the number of members that were added

     SADD languages "english"
     -- 1
     SADD languages "spanish"
     -- 1
     SADD languages "french"
     -- 1

     -- multiple insertions
     SADD languages "chinese" "japanese" "german"

     SADD languages "english"
     -- 0
     -- as it is already present
     ```

   - `SREM`: remove members from a Set

     ```sql
     -- SREM key member [member ...]
     SREM languages "english" "french"
     -- 2

     SREM languages "english"
     -- 0
     ```

   - `SISMEMBER`: verify that a member is part of a Set

     ```sql
     -- SISMEMBER key member

     SISMEMBER languages "spanish"
     -- 1

     SISMEMBER languages "hindi"
     -- 0
     ```

   - `SMEMBERS`: show all the members that exist in a Set

     ```sql
     -- SMEMBERS key
     SMEMBERS languages
     ```

   - `SUNION`: combine Sets

     - If we pass to `SUNION` a key that doesn't exist, it considers that key to be an empty set (a set that has nothing in it).

     ```sql
     -- SUNION key [key ...]
     SADD ancient-languages "greek"
     SADD ancient-languages "latin"

     SUNION languages ancient-languages
     ```

4. Hashes: Redis hashes are record types modelled as collections of field-value pairs (Python dictionaries, Java HashMaps, and Ruby hashes)

   - `HSET`: sets `field` in the Hash to `value`

     ```sql
     -- HSET key field value
     -- returns:
     -- 1 if field is a new field in the hash and value was set
     -- 0 if field already exists in the hash and the value was updated

     HSET computer name "MacBook Pro"
     -- 1
     HSET computer disk 512
     -- 1
     HSET computer ram 16
     -- 1
     HSET computer year 2015
     -- 1

     HSET computer year 2018
     -- 0
     ```

   - `HGET`: returns the value associated with field in a Hash

     ```sql
     -- HGET key field

     HGET computer year
     ```

   - `HGETALL`: get all the fields with their values from the hash is to use

     ```sql
     -- HGETALL key
     HGETALL computer
     ```

   - `HMSET`: set multiple fields at once

     ```sql
     -- HMSET key field value [field value ...]

     HMSET tablet name "iPad" year 2016 disk 64 ram 4
     ```

   - `HMGET`: specify from which fields in the hash we want to get a value

     ```sql
     -- HMGET key field [field ...]
     HMGET tablet disk ram
     ```

5. Sorted sets: Redis (_v1.2_) **sorted** sets are collections of **unique strings** that maintain order by each string's associated score

   - `ZADD`: adds all the specified members with specified scores to the Sorted Set

     - `ZADD` option arguments (Redis _v3.0.2_):

       - `XX`: Only update members that already exist. Never add members

       - `NX`: Don't update already existing members. Always add new members

       - `CH`: Modify the return value from the number of new members added, to the total number of members changed (`CH` is an abbreviation of _changed_). Changed members are new members added and members already existing for which the score was updated. So members specified in the command line having the same score as they had in the past are not counted

       - `INCR`: When this option is specified `ZADD` acts like `ZINCRBY`. Only one score-members pair can be specified in this mode

     ```sql
     -- ZADD key [NX|XX] [CH] [INCR] score member [score member ...]
     ```

   - `ZRANGE`: returns the specified range of members in the Sorted Set

     ```sql
     -- ZRANGE key start stop [WITHSCORES]

     ZRANGE tickets 0 -1

     ZRANGE tickets 0 -1 WITHSCORES
     ```

6. Streams: A Redis stream is a data structure that acts like an append-only log. Streams help record events in the order they occur and then syndicate them for processing

7. Geospatial indexes: Redis geospatial indexes are useful for finding locations within a given geographic radius or bounding box

8. Bitmaps: Redis bitmaps let you perform bitwise operations on strings

9. Bitfields: Redis bitfields efficiently encode multiple counters in a string value. Bitfields provide atomic get, set, and increment operations and support different overflow policies

10. HyperLogLog: The Redis HyperLogLog data structures provide probabilistic estimates of the cardinality (i.e., number of elements) of large sets

## Node.js

```javascript
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis");

const DEFAULT_EXPIRATION = 3600;

const redisClient = Redis.createClient();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const getOrSetCache = (key, cb) =>
  new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);

      if (data != null) {
        return resolve(JSON.parse(data));
      }

      const freshData = await cb();

      redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));

      resolve(freshData);
    });
  });

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;

  const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } },
    );

    return data;
  });

  res.json(photos);
});

app.get("photos/:id", async (req, res) => {
  const photo = await getOrSetCache(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`,
      { params: { albumId } },
    );

    return data;
  });

  res.json(photo);
});

app.listen(3000);
```

## Certification

- RU102JS (Redis University): Redis for .NET Developers
