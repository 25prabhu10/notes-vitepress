---
title: RDBMS
description: Relational Database Management System (RDBMS)
date: 2023-02-04
lastmod: 2023-02-04
---

# Relational Database Management System (RDBMS)

> A Relational Model of Data for Large Shared Data Banks - Ted Codd (1970)

- A few related tables form a relational database
- _Relational Algebra_ allows us to retrieve data efficiently

Relationships: tell you how much of the data from foreign key field can be seen in the primary key column of the table that data is related to and vice-versa

- Cardinality constraints

Types of relationships:

- One-to-Many relationships: one value from a column under a table can be found many times in the column in the other table

- One-to-One

- Many-to-Many

Query Execution Diagram?
Explain?

## Transactional

Transaction is:

- A collection of queries
- Treated as one unit of work
- E.g. Account deposit (`SELECT`, `UPDATE`, `UPDATE`)

A transactional database is one in which all changes and queries appear to be **Atomic**, **Consistent**, **Isolated**, and **Durable** ([ACID](#acid))

Transaction Lifespan:

- Transaction `BEGIN`
- Transaction `COMMIT`
- Transaction `ROLLBACK`
- Transaction unexpected ending = `ROLLBACK` (e.g. crash)

Nature of Transactions:

- Usually Transactions are used to change and modify data
- However, it is perfectly normal to have a read only transaction
- Example, you want to generate a report and you want to get consistent snapshot based at the time of transaction

_Example:_

```sql
-- Transaction

-- ACCOUNT_ID BALANCE
--    1         $1000
--    2         $500

-- Send $100 From Account 1 to Account 2

BEGIN TX1

-- Check if ACCOUNT 1 contains the amount
SELECT BALANCE FROM ACCOUNT WHERE ID = 1

-- If BALANCE > 100 then send amount
UPDATE ACCOUNT SET BALANCE = BALANCE - 100 WHERE ID = 1
UPDATE ACCOUNT SET BALANCE = BALANCE + 100 WHERE ID = 2

COMMIT TX1
```

### ACID

1. Atomicity
2. Isolation
3.
4.

#### Atomicity

- All queries in a transaction must succeed
- If one query fails, all prior successful queries in the transaction should rollback
- If the database went down prior to a commit of a transaction, all the successful queries in the transactions should rollback

_Example:_

```sql
-- Transaction

-- ACCOUNT_ID BALANCE
--    1         $1000
--    2         $500

-- Send $100 From Account 1 to Account 2

BEGIN TX1

-- Check if ACCOUNT 1 contains the amount
SELECT BALANCE FROM ACCOUNT WHERE ID = 1

-- If BALANCE > 100 then send amount
UPDATE ACCOUNT SET BALANCE = BALANCE - 100 WHERE ID = 1

-- Database crashed, last update failed

-- ACCOUNT_ID BALANCE
--    1         $900
--    2         $500
```

- After we restarted the machine the first account has been debited but the other account has not been credited
- This is really bad as we just lost data, and the information is inconsistent
- An atomic transaction is a transaction that will rollback all queries if one or more queries failed
- The database should clean this up after restart

#### Isolation

- Can my inflight transaction see changes made by other transactions?

Read phenomena: The ANSI/ISO standard SQL 92 refers to three different read phenomena when a transaction retrieves data that another transaction might have updated

_Example:_

| id  | name  | age |
| --- | ----- | --- |
| 1   | Alice | 20  |
| 2   | Bob   | 25  |

1. Dirty reads: A _dirty read_ (aka uncommitted dependency) occurs when a transaction retrieves a row that has been **updated by another transaction** that is **not yet committed**

   ```sql
   -- Transaction 1
   BEGIN;
   SELECT age FROM users WHERE id = 1;
   -- retrieves 20

   -- Transaction 2
   BEGIN;
   UPDATE users SET age = 21 WHERE id = 1;
   -- no commit here

   -- Transaction 1
   SELECT age FROM users WHERE id = 1;
   -- READ UNCOMMITTED retrieves 21 (dirty read)
   -- READ COMMITTED retrieves 20 (dirty read has been avoided)
   -- REPEATABLE READ retrieves 20 (dirty read has been avoided)
   -- SERIALIZABLE retrieves 20 (dirty read has been avoided)
   COMMIT;

   -- Transaction 2
   ROLLBACK;
   ```

2. Non-repeatable reads: A _non-repeatable read_ occurs when a transaction retrieves a row twice and that row is updated by another **transaction that is committed** in between

   ```sql
   -- Transaction 1
   BEGIN;
   SELECT age FROM users WHERE id = 1;
   -- retrieves 20

   -- Transaction 2
   BEGIN;
   UPDATE users SET age = 21 WHERE id = 1;
   COMMIT;

   -- Transaction 1
   SELECT age FROM users WHERE id = 1;
   -- READ UNCOMMITTED retrieves 21 (non-repeatable read)
   -- READ COMMITTED retrieves 21 (non-repeatable read)
   -- REPEATABLE READ retrieves 20 (non-repeatable read has been avoided)
   -- SERIALIZABLE retrieves 20 (non-repeatable read has been avoided)
   COMMIT;
   ```

3. Phantom reads: A _phantom read_ occurs when a transaction retrieves a set of rows twice and new rows are **inserted into or removed** from that set by another transaction that is committed in between

   ```sql
   -- Transaction 1
   BEGIN;
   SELECT name FROM users WHERE age > 17;

   -- Transaction 2
   BEGIN;
   INSERT INTO users VALUES (3, 'Carol', 26);
   COMMIT;

   -- Transaction 1
   SELECT name FROM users WHERE age > 17;
   -- READ UNCOMMITTED retrieves Alice, Bob and Carol (phantom read)
   -- READ COMMITTED retrieves Alice, Bob and Carol (phantom read)
   -- REPEATABLE READ retrieves Alice, Bob and Carol (phantom read)
   -- SERIALIZABLE retrieves Alice and Bob (phantom read has been avoided)
   COMMIT;
   ```

- Lost updates:

  ```sql
  -- Transaction 1
  UPDATE users SET age = age + 10 WHERE id = 1;

  -- Transaction 2
  UPDATE users SET age = age + 50 WHERE id = 1;
  COMMIT;

  -- Transaction 1
  SELECT age FROM users WHERE id = 1;
  -- retrieves 70
  -- expected 30
  -- UPDATE in transaction was lost
  ```

- Isolation Levels for inflight transactions:

  - **Read uncommitted**: No Isolation, any change from the outside is visible to the transaction, committed or not

  - **Read committed**: Each query in a transaction only sees committed changes by other transactions

  - **Repeatable Read**: The transaction will make sure that when a query reads a row, that row will remain unchanged while its running

  - **Snapshot**: Each query in a transaction only sees changes that have been committed up to the start of the transaction. It's like a snapshot version of the database at that moment

  - **Serializable**: Transactions are run as if they serialized one after the other

  - **Each DBMS implements Isolation level differently**

- Isolation levels vs read phenomena:

| Isolation level  | Dirty read | Non-repeatable read | Phantom read |
| ---------------- | :--------: | :-----------------: | :----------: |
| Serializable     |     no     |         no          |      no      |
| Repeatable read  |     no     |         no          |     yes      |
| Read committed   |     no     |         yes         |     yes      |
| Read uncommitted |    yes     |         yes         |     yes      |

Database Implementation of Isolation:

- Each DBMS implements Isolation level differently

- **Pessimistic**: Row level locks, table locks, page locks to avoid lost updates

- **Optimistic**: No locks, just track if things changed and fail the transaction if so

- Repeatable read "locks" the rows it reads but it could be expensive if you read a lot of rows, postgres implements RR as snapshot. That is why you don't get phantom reads with postgres in repeatable read

- Serializable are usually implemented with optimistic concurrency control, you can implement it pessimistically with SELECT FOR UPDATE

#### Consistency

- Consistency in Data:

  - Defined by the user
  - Referential integrity (foreign keys)
  - Atomicity
  - Isolation

  _Example:_

  - Pictures

  | ID (**PK**) | BLOB | LIKES |
  | :---------: | :--: | :---: |
  |      1      |  xx  |   2   |
  |      2      |  xx  |   1   |

  - Picture_Likes

  | USER (**PK**) | PICTURE_ID (**PK**)(**FK**) |
  | ------------- | :-------------------------: |
  | Jon           |              1              |
  | Edmond        |              1              |
  | Jon           |              2              |

  - Spot inconsistency in this data

  - Pictures

  | ID (**PK**) | BLOB | LIKES |
  | :---------: | :--: | :---: |
  |      1      |  xx  |   5   |
  |      2      |  xx  |   1   |

  - Picture_Likes

  | USER (**PK**) | PICTURE_ID (**PK**)(**FK**) |
  | ------------- | :-------------------------: |
  | Jon           |              1              |
  | Edmond        |              1              |
  | Jon           |              2              |
  | Edmond        |              4              |

- Consistency in reads:

  - If a transaction committed a change will a new transaction immediately see the change?
  - Affects the system as a whole
  - Relational and NoSQL databases suffer from this
  - Eventual consistency

## Database Design / Data Modelling

1. It's an ongoing process where basic Database is designed:

   - Understand business data
   - Create a logical design
     - Tables, Indexes, Columns (ER Diagram)

2. Normalization is done:

   - Eliminate / Reduce:
     - Data Redundancy
     - Data Anomalies
     - Data Inconsistency

| De-normalized Database | Normalized Database |
| ---------------------- | ------------------- |
| Less Joins             | More Joins          |
| More Storage           | Less Storage        |
| High Data Redundancy   | Low Data Redundancy |

- Database designer: plot the entire database system on a canvas using a visualization tool

- Entity-Relationship (ER) diagram
- Relational Schema: an existing idea of how the database must be organized

  - Represents the concept database administrators must implement
  - Depict how a database is organized
  - Blueprints, or a plan for a database

  - Database Schema
    - Table name
    - Primary Key: (column name will be underlined)
    - Foreign Key: (add (FK) in after the column name)
    - Other fields

- Database Management = database design + creation + manipulation

- Database Administrator: maintenance of database

## Normalization

## Schema

## Database

Main goal: organize huge amounts of data that can be quickly retrieved

- _Entity_: the smallest unit that can contain a meaningful set of data

  - An object we want to model & store information about

- Data inside a column is known as _data value_
- Data values in a row make up a _record_ (or _row_)(horizontal entity), a _record_ is each entry that exists in a table
- _Field_ (or _column_)(vertical entity)(entity instance): a column in a table containing specific information about every record in the table

## Table

Tables are data organized in columns and rows

- An entity or database object

A column (or a set of columns) whose value exists and is **unique** for every record in a table is called a **primary key**

- Each table can have 1 and **only 1 primary key**
- **Cannot contain `NULL`** values
- Primary key may be composed of a set of columns
- Primary keys are the unique identifiers of a table
- Not all tables will have a primary key

Foreign key: identifies the relationships between tables, not the tables themselves

Unique Key: to specify that given field shouldn't have duplicate data

| Values           | Primary Key | Unique Key   |
| ---------------- | ----------- | ------------ |
| `NULL` values    | no          | yes          |
| Number of keys   | 1           | 0, 1 or more |
| Multiple columns | yes         | yes          |

## View

## Index

Index is a lookup table for specific columns

- Indexes are expensive

## Reference

- [drawSQL - Beautiful database diagrams](https://drawsql.app/)
