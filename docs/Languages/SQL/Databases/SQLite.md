---
title: SQLite
description: A database engine
---

# SQLite

SQLite is a SQL database engine

It is:

- **Self-contained**
- Zero-configuration
- Serverless:

  - Doesn't require a separate server process to operate (client/server architecture)
  - Embedded into an end program

- Transactional:

  - [ACID](./RDBMS.md#transactional) compliant

- Uses dynamic types for tables
- Allows a single database connection tp access multiple files simultaneously
- Capable of creating in-memory databases

## Data-Types

- SQLite uses dynamic type system
- The data-type of a value is associated with the value itself, not with its container (column)

Storage classes (5 basic data types):

1. `NULL`: The value is a NULL value (Missing or unknown info)

2. `INTEGER`: The value is a signed integer, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value

3. `REAL`: The value is a floating point value, stored as an 8-byte IEEE floating point number

4. `TEXT`: The value is a text string, stored using the database encoding (`UTF-8`, `UTF-16BE` or `UTF-16LE`)

5. `BLOB`: The value is a blob of data, stored exactly as it was input

_Example:_

```sql
SELECT
typeof(100),
typeof(100.0),
typeof("SQLite"),
typeof(0x12),
typeof(0e5),
typeof(x'1000'),
typeof(NULL);

-- integer|real|text|integer|real|blob|null
```

| `typeof(100)` | `typeof(100.0)` | `typeof("SQLite")` | `typeof(0x12)` | `typeof(0e5)` | `typeof(x'1000')` | `typeof(NULL)` |
| ------------- | --------------- | ------------------ | -------------- | ------------- | ----------------- | -------------- |
| `integer`     | `real`          | `text`             | `integer`      | `real`        | `blob`            | `null`         |

- Boolean values are stored as integers `0` (false) and `1` (true). Keywords `TRUE` and `FALSE`, are supported as of V3.23.0 (2018-04-02)

- The built-in Date And Time Functions of SQLite are capable of storing dates and times as `TEXT`, `REAL`, or `INTEGER` values

  - `TEXT` as ISO-8601 strings ("YYYY-MM-DD HH:MM:SS.SSS")
  - `REAL` as Julian day numbers, the number of days since noon in Greenwich on `November 24, 4714 B.C.` according to the proleptic Gregorian calendar
  - `INTEGER` as Unix Time, the number of seconds since `1970-01-01 00:00:00 UTC`

## Syntax

- Generally follows [PostgreSQL](./PostgreSQL.md) syntax. [SQL as understood by SQLite](https://www.sqlite.org/lang.html)
- Does **not enforce type checking** (one can, for example, insert a `string` into a column defined as an `integer`)

### SELECT

- Simple query:

```sql
SELECT 1 + 1;
-- 2

SELECT
   10 / 5,
   2 * 4;
-- 2|8
```

- Complex query:

```sql
SELECT DISTINCT column_list
FROM table_list
  JOIN table ON join_condition
WHERE row_filter
ORDER BY column
LIMIT count OFFSET offset
GROUP BY column
HAVING group_filter;
```

- Use `DISTINCT` clause to query unique rows in a table
- Use `WHERE` clause to filter rows in the result set
- Use `ORDER BY` clause to sort the result set
- Use `LIMIT` OFFSET clauses to constrain the number of rows returned
- Use `GROUP BY` to get the group rows into groups and apply aggregate function for each group
- Use `HAVING` clause to filter groups
- Use `INNER JOIN` or `LEFT JOIN` to query data from multiple tables using join

### SQLite Constraints

Constraints are placed on columns. They limit the data that can be inserted into tables

- `NOT NULL`: Ensures that a column cannot have `NULL` value
- `UNIQUE`: Ensures that all values in a column are different
- `PRIMARY KEY`: Uniquely identifies each row/record in a database table
- `FOREIGN KEY`: Uniquely identifies a row/record in another table
- `CHECK`: Ensures that all values in a column satisfies certain conditions.
- `DEFAULT`: Provides a default value for a column when none is specified

```sql
CREATE TABLE COMPANY3(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   EMAIL          TEXT    NOT NULL UNIQUE,
   AGE            INT     DEFAULT 18,
   ADDRESS        CHAR(50),
   SALARY         REAL    CHECK(SALARY > 0)
);
```

### SQL Features That SQLite Does Not Implement

- Complete `ALTER TABLE` support: Only the RENAME TABLE, ADD COLUMN, RENAME COLUMN, and DROP COLUMN variants of the ALTER TABLE command are supported. Other kinds of ALTER TABLE operations such as ALTER COLUMN, ADD CONSTRAINT, and so forth are omitted.

- Complete trigger support: FOR EACH ROW triggers are supported but not FOR EACH STATEMENT triggers

- Writing to VIEWs: VIEWs in SQLite are read-only. You may not execute a DELETE, INSERT, or UPDATE statement on a view. But you can create a trigger that fires on an attempt to DELETE, INSERT, or UPDATE a view and do what you need in the body of the trigger

- GRANT and REVOKE: Since SQLite reads and writes an ordinary disk file, the only access permissions that can be applied are the normal file access permissions of the underlying operating system. The GRANT and REVOKE commands commonly found on client/server RDBMSes are not implemented because they would be meaningless for an embedded database engine

## Commands

- Help: `.help`

- Connect to database:

  ```sql
  -- open sqlite
  -- use ".open FILENAME" to reopen on a persistent database
  .open album.db

  -- or open db directly
  -- sqlite3 album.db
  ```

- Exit sqlite:

  ```sql
  .exit CODE
  .quit
  .q
  ```

- List databases in the current database connection:

  ```sql
  .database
  -- main: album.db r/w
  ```

- List tables in a database:

  ```sql
  .tables

  -- albums employees invoices playlists

  .table '%es'

  -- employees invoices
  ```

- Show database schema:

  ```sql
  .schema

  -- schema and the content of the sqlite_stat tables
  .fullschema
  ```

- Show table structure:

  ```sql
  .schema albums
  ```

- List indexes:

  ```sql
  .indexes

  -- indexes of a specific table
  .indexes TABLE
  ```

- Export query:

  ```sql
  .output albums.txt

  SELECT title FROM albums
  ORDER BY title
  LIMIT 24;

  .quit
  ```

- Export entire database:

  ```sql
  .output ./chinook.sql
  .dump
  .quit
  ```

- Export specific table:

  ```sql
  .output ./albums.sql
  .dump albums
  .quit
  ```

- Export only the schema:

  ```sql
  .output ./chinook_structure.sql
  .schema
  .quit
  ```

- Execute SQL statements from a file:

  ```sql
  .mode column
  .header on
  .read query.sql
  ```

- Backup current database:

  ```sql
  .backup
  ```
