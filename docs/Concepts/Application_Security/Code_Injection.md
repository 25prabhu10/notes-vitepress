---
title: Code Injection
description: Code injection is the exploitation of a computer bug that is caused by processing invalid data
---

# Code Injection

Untrusted user input is interpreted **by server and executed**

## Impact

Data can be stolen, modified, or deleted

## SQL Injection

SQL injection occur when an attacker is able to inject SQL queries via the input data of an application.

A successful attack allows an attacker to access and manipulate the backend database.

Causes:

- user input is used to dynamically build queries
- if input is not but validated the query interrupted
- can be tricked into running arbitrary SQL queries or commands

### Testing

Using [`sqlmap`](https://sqlmap.org/) a penetration testing tool that automates the process of detecting and exploiting SQL injection flaws

_Example:_ Vulnerable URL: `http://testphp.vulnweb.com/listproducts.php?cat=1`

1. List information about the existing databases

   ```bash
   sqlmap -u http://testphp.vulnweb.com/listproducts.php?cat=1 --dbs
   ```

2. List information about Tables present in a particular Database

   ```bash
   sqlmap -u http://testphp.vulnweb.com/listproducts.php?cat=1 -D acuart --tables
   ```

3. List information about the columns of a particular table

   ```bash
   sqlmap -u http://testphp.vulnweb.com/listproducts.php?cat=1 -D acuart -T artists --columns
   ```

4. Dump the data from the columns

   ```bash
   sqlmap -u http://testphp.vulnweb.com/listproducts.php?cat=1 -D acuart -T artists -C aname --dump
   ```

### Mitigation

- Reject untrusted / invalid input data
- Use latest frameworks
- Typically found by penetration testers / secure code review
- Use prepared statements
- developers should use parameterized queries
- developers should use all or left validation on all user inputs. this ensures all input is checked against and allowed list of input parameters before they are processed in the code
- apply the least privilege principal on all backend database users
- consider GET and POST parameters cookies and other http headers

## GET Request

## POST Request

Vulnerable Node.JS code:

```javascript
function authenticate(req, res, next){
  const username = req.query.username,
        password = req.query.password
  let sqlRequest = new sql.Request(),
      sqlQuery = "select * from users where (username= '" + username + "' and password ='" + password + "')"
  sqlRequest.query(sqlQuery).then(function(recordSet){
    if(recordSet.length == 1){
      loggedIn = true
      //successful log in
    } else {
      authentication failed
    }
  })
  .catch(next)
}
```

Fixed code:

```javascript
function authenticate(req, res, next) {
  const username = req.query.username,
    password = req.query.password;
  let preparedStatement = new sql.PreparedStatment(),
    sqlQuery =
      "select * from users where (username = @username and password = @password)";

  preparedStatement.input("username", sqlVarChar(50));
  preparedStatement.input("password", sqlVarChar(50));
  preparedStatement
    .prepare(sqlQuery)
    .then(function () {
      return preparedStatement
        .execute({ username: username, password: password })
        .then(function (recordSet) {
          if (recordSet.length == 1) {
            loggedIn = true;
            //successful log in
          } else {
            //authentication failed
          }
        });
    })
    .catch(next);
}
```

## insecure deserialization

serialisation is when data structures object states are translated into a format that can be stored

deserialization is the opposite process it involves extracting a data structure from a series of bytes

insecure deserialization occurs when untrusted data is used to abuse the logic flow of an application

- execute arbitrary code or inflict a denial of service (DoS) when it is being de-serialized

Causes:

- trusting data provided by sanitized object more than classic user input

Prevention:

- sanitize the data of a serialised object as untrusted user input through filtering or validation

- implement integrity checks such as digital signatures on any serialised object. this will prevent tempering

- isolate and run code that de-serializs in a low privilege environment

## server-side request forgery

this is a vulnerability in which the server can be made to perform a request on the hackers behalf

hacker could:

- scan for open ports
- retrieve files
- access internal services

this vulnerability usually occurs when an application is not restricting the location and type of resources it can access

Prevention:

- restrict requests made by the server to whitelisted locations whenever possible
- verify that the requested filetype matches that which is expected
- display a generic error in the event of failure
- restrict requests to approved URL scheme

## References

1. [Defeating SQL Injection](https://www.computer.org/csdl/magazine/co/2013/03/mco2013030069/13rRUxZRbsU)

2. [SQL Injection Cheat Sheet](https://www.netsparker.com/blog/web-security/sql-injection-cheat-sheet/)

3. [OWASP - SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
