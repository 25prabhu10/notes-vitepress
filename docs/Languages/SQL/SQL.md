---
title: SQL
description: Structured Query Language
---

# SQL

Structured Query Language

- Cascading referential integrity constraint
- SQL implementations vary between systems
- SQL can mainly be categorised as [declarative programming](../../Concepts/Programming_Paradigms/) (non-procedural)

> Developed by Raymond Boyce and Donald Chamberlin

Sub-Groups of SQL Commands (syntax):

1. DDL (Data Definition Language):

   - Commands that can be used to define the database schema
   - A set of statements that allow the user to define or modify data structures and objects, such as tables
   - Some commands:

     - [`CREATE`](#create): to create entire databases and objects in database
     - [`ALTER`](#alter): alters the structure of existing objects such as database
     - [`DROP`](#drop): delete objects from database
     - [`RENAME`](#rename): rename an objects
     - [`TRUNCATE`](#truncate)

2. DML (Data Manipulation Language)

   - Commands that deal with the manipulation of data present in database
   - Statement allow us to manipulation the data in the tables of a database
   - Some commands:

     - [`SELECT`](#select): retrieve data from the database objects, like tables (DQL (Data Query Language))
     - [`INSERT`](#insert): insert data into a table
     - [`UPDATE`](#update): update existing data within a table
     - [`DELETE`](#delete): deletes all records from a table, space for the records remain

3. TCL (Transaction control language)

   - Commands which mainly deal with the transaction of database
   - Some commands:

     - [`COMMIT`](#commit): permanently save any transaction into the database
     - [`ROLLBACK`](#rollback): restores the database to last committed state. It is also used with save-point command to jump to a save-point in a transaction
     - `SAVEPOINT`: temporarily save a transaction so that you can rollback to that point whenever necessary

4. DCL (Data Control Language)

   - Commands which deal with the rights, permissions and other controls of the database system
   - Some commands:

     - [`GRANT`](#grant): allow specified users to perform specified tasks
     - [`REVOKE`](#revoke): cancel previously granted or denied permissions

Queries:

- A query is a set of instructions given to the RDBMS that tell what needs to be done

Data Type: Different DBMSs support different Data types

Comments:

```sql
-- comment
```

## CREATE

The `CREATE` command is used to establish a new database, table, index, or stored procedure

- DDL statement

```sql
-- CREATE object_type object_name

-- CREATE TABLE [table name] ( [column definitions] ) [table parameters]

CREATE TABLE employees (
    id            INTEGER       PRIMARY KEY,
    first_name    VARCHAR(50)   not null,
    last_name     VARCHAR(75)   not null,
    mid_name      VARCHAR(50)   not null,
    dateofbirth   DATE          not null
);

-- create a database user
CREATE USER 'kantara'@'localhost' IDENTIFIED BY 'some_password';
```

## SELECT

`SELECT` is used to read data from tables

- DML or DQL statement

```sql
-- query for all columns
SELECT * FROM artist;

-- query for select columns
SELECT artist_name,artist_id FROM artist;

-- calculate value
SELECT name, (gdp/population) FROM world;
```

`HAVING` vs `WHERE`:

- `WHERE` runs before `GROUP BY`, cannot use aggregate functions
- `HAVING` runs after `GROUP BY`, hence we can use aggregate functions

```sql
SELECT COUNT(customerId), country
FROM customers
GROUP BY country
HAVING COUNT(customerId) > 5;
```

### UNION

Combine the result-set of two or more `SELECT` statements

- Every `SELECT` statement within `UNION` must have the **same number of columns**
- The columns must also have **similar data types**
- The columns in every `SELECT` statement must also be in the **same order**

```sql
SELECT
  city
FROM customers
UNION
SELECT
  city
FROM suppliers
ORDER BY city;

-- UNION all
SELECT
  city
FROM customers
UNION ALL
SELECT
  city
FROM suppliers
ORDER BY city;
```

- `UNION` operator selects only distinct values by default
- To allow duplicate values, use `UNION ALL`

### JOIN

Joins are used to combine rows from two or more tables based on a common field between them

4 types of joins:

1. `LEFT JOIN`:

   - Select **all records** from the **left table** (`table1`), and the **matching records** from the **right table** (`table2`)
   - The result is **0 records** from the **right side**, if there is **no match**

   ```sql
   SELECT column_name
   FROM table1
   LEFT JOIN table2
     ON table1.column_name = table2.column_name;
   ```

2. `RIGHT JOIN`:

   - Select **all records** from the **right table** (`table2`), and the **matching records** from the **left table** (`table1`)
   - The result is **0 records** from the **left side**, if there is **no match**

   ```sql
   SELECT column_name
   FROM table1
   RIGHT JOIN table2
     ON table1.column_name = table2.column_name;
   ```

3. `INNER JOIN`: just known as `JOIN`

   - Select records that have **matching values in both tables**

   ```sql
   SELECT column_name
   FROM table1
   INNER JOIN table2
     ON table1.column_name = table2.column_name;

   -- or

   SELECT column_name
   FROM table1
   JOIN table2
     ON table1.column_name = table2.column_name;
   ```

4. `OUTER JOIN` (`FULL OUTER JOIN`):

   - Select **all records** when there is a **match in left (`table1`) or right (`table2`)** table records
   - Not supported in MySQL

   ```sql
   SELECT column_name
   FROM table1
   FULL OUTER JOIN table2
     ON table1.column_name = table2.column_name
   WHERE condition;
   ```

- Self `JOIN`:

  - A self join is a regular join, but the table is joined with itself

  ```sql
  SELECT
    a.customerName AS customerName1,
    b.customerName AS customerName2,
    a.city
  FROM customers a,
      customers b
  WHERE a.customerId <> b.customerId
  AND a.city = b.city
  ORDER BY a.city;
  ```

  ```sql
  SELECT
    a.customerName AS customerName1,
    b.customerName AS customerName2,
    a.city
  FROM customers a
  JOIN customers b
  WHERE a.customerId <> b.customerId
  AND a.city = b.city
  ORDER BY a.city;
  ```

### Sub-Query (Nested Queries)

A query within another query

```sql
SELECT
  a.studentId,
  a.name,
  b.total_marks
FROM student a,
     marks b
WHERE a.studentId = b.studentId
AND b.total_marks > (SELECT
  total_marks
FROM marks
WHERE studentId = 'V002');
```

## WHERE

Operators:

| Operator                        | Condition                                            | SQL Example                     |
| ------------------------------- | ---------------------------------------------------- | ------------------------------- |
| `=`, `!=`, `<`, `<=`, `>`, `>=` | Standard numerical operators                         | `col_name != 4`                 |
| `=`, `!=`, `<>`                 | Case sensitive exact string comparison               | `col_name = "abc"`              |
| `LIKE`                          | Case insensitive exact string comparison             | `col_name LIKE "ABC"`           |
| `%`                             | Match a sequence of zero or more characters          | `col_name LIKE "%AT%"`          |
| `_`                             | Match a single character                             | `col_name LIKE "AN_"`           |
| `IN (…)`                        | Number/String exists in a list                       | `col_name IN (2, 4, 6)`         |
| `NOT IN (…)`                    | Number/String does not exist in a list               | `col_name NOT IN (1, 3, 5)`     |
| `BETWEEN … AND …`               | Number is within range of two values (inclusive)     | `col_name BETWEEN 1.5 AND 10.5` |
| `NOT BETWEEN … AND …`           | Number is not within range of two values (inclusive) | `col_name NOT BETWEEN 1 AND 10` |

- `AND`
- `OR`
- `XOR`

```sql
-- query with clause
SELECT column, another_column, …
FROM myTable
WHERE condition
    AND/OR another_condition
    AND/OR …;

SELECT *
FROM artist
WHERE artist_name = "new order";

-- >, <, <=, >=, not equal ( <> or !=)
SELECT artist_name
FROM artist
WHERE artist_id < 5;

-- pattern matching
SELECT album_name
FROM album
WHERE album_name LIKE "retro%";

-- 3 letters beginning with 'R' and match rest
SELECT *
FROM track
WHERE track_name LIKE "r__ %";

SELECT album_name
FROM album
WHERE album_name > "c"
AND album_name < "m";

SELECT name, population
FROM world
WHERE name IN ('Brazil', 'Russia', 'India', 'China');

SELECT name, area
FROM world
WHERE area BETWEEN 250000 AND 300000;

-- find rows with NULL value
SELECT name, area
FROM world
WHERE area IS NULL
AND name IS NOT NULL;

-- XOR
SELECT name, population, area
FROM world
WHERE (population >= 250000000
AND area < 3000000)
OR (population < 250000000
AND area >= 3000000);
```

### DISTINCT

Select query with unique results:

```sql
SELECT DISTINCT column, another_column
FROM myTable
WHERE conditions;
```

### ORDER BY

Query sorted:

```sql
-- `ASC`: ascending (default)
SELECT * FROM artist ORDER BY artist_name;

-- descending
SELECT * FROM artist ORDER BY artist_name DESC;

-- multiple ways to order first by time then track_name
SELECT time, track_name FROM track
ORDER BY time DESC, track_name ASC;

-- ASCII behaviour
SELECT * FROM artist ORDER BY BINARY artist_name;

-- CAST(), AS
SELECT time, track_name FROM track ORDER BY CAST(time AS CHAR);
```

Cast as:

- `AS BINARY`
- `AS SIGNED`: to sort as a signed integer
- `AS UNSIGNED`: to sort as an unsigned integer
- `AS CHAR`: to sort as a character string
- `AS DATE`: to sort as a date
- `AS DATETIME`: to sort as a date and time
- `AS TIME`: to sort as a time

### LIMIT

Limit the total number of rows returned:

```sql
SELECT track_name FROM track LIMIT 10;

-- limit from row 6
SELECT track_name FROM track LIMIT 5,5;

-- or

SELECT track_name FROM track LIMIT 5 OFFSET 5;
```

## INSERT

- DML statement

```sql
-- INSERT INTO table_name (column_names) VALUES (data)

-- insert data into all columns
INSERT INTO artist
  VALUES (7, "Barry Adamson");

-- insert multiple rows
INSERT INTO album (artist_id, album_id, album_name)
  VALUES (7, 2, "Oedipus Schmoedipus"),
  (7, 2, "Oedipus Schmoedipus"),
  (7, 2, "Oedipus Schmoedipus");

-- using SELECT
INSERT INTO artist
  VALUES ((SELECT 1 + MAX(artist_id) FROM artist), "Barry Adamson");
```

- `IGNORE`: Ignore errors
- `DEFAULT`: Use default value

## UPDATE

- DML statement

```sql
-- update all rows
UPDATE artist
SET artist_name = UPPER(artist_name);

-- update only those rows that meet the conditions
UPDATE sales
SET date_of_purchase = '2017-12-12'
WHERE purchase_number = 1;
```

## DELETE

Delete a row in a table

- DML statement
- We can rollback data after using delete statement

```sql
-- delete all rows (empty the table)
DELETE FROM played;

-- delete only those rows that meet the conditions
DELETE FROM artist
WHERE artist_id = 3;
```

## TRUNCATE

Faster method to remove all rows in a table

Instead of deleting an entire table through `DROP`, we can remove its data and continue to have the table

- It is a DDL statement
- Drops the table
- Creates a new table
- Cannot rollback data

```sql
-- TRUNCATE object_type object_name

TRUNCATE TABLE played;
```

Limitations:

- In [MySQL](./Databases/MySQL.md) Identical to `DELETE` if you use InnoDB tables
- It dose not work with locking or transactions

## DROP

The `DROP` statement destroys an existing database, table, index, or view

- DDL statement

```sql
-- DROP object_type object_name

DROP TABLE employees;

DROP DATABASE airbnb;
```

## ALTER

The ALTER statement modifies an existing database object

- `ADD`
- `REMOVE`
- `RENAME`

```sql
-- ALTER object_type object_name [parameters]

ALTER TABLE sink ADD bubbles INTEGER;

ALTER TABLE sink DROP COLUMN bubbles;
```

## RENAME

```sql
-- RENAME object_type object_type TO new_object_name

RENAME TABLE customers TO customer_data;
```

## GRANT

Give (or grant) certain permissions for the table (and other objects) for specified groups/users of a database

```sql
-- GRANT type_of_permission ON database_name.table_name TO 'username'@'localhost'

GRANT SELECT,INSERT,UPDATE,DELETE ON employee TO user1;

-- grant all permissions
GRANT ALL ON movies.* to 'kantara'@'localhost';
```

## DENY

Bans certain permissions from groups/users

```sql
DENY UPDATE ON employee TO user1;
```

## REVOKE

Revoke permissions and privileges of database from groups/users

```sql
-- REVOKE type_of_permission ON database_name.table_name FROM 'username'@'localhost'

REVOKE INSERT ON employee FROM user1;
```

## COMMIT

Not every change made to a database is saved automatically

- This command saves the changes made using `INSERT`, `DELETE`, `UPDATE`
- Committed states can accrue

```sql
-- SQL statement that perform some changes on database

-- save those changes
COMMIT;
```

## ROLLBACK

Allows you to undo any changes you have made but don't want to be saved permanently

- Reverts to the last non-committed state

```sql
-- SQL statement that perform some changes on database
-- save changes

-- undo last saved changes
ROLLBACK;
```
