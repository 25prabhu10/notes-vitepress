---
title: RESTful Web Services
description: Representational state transfer
lastmod: 2023-08-14
---

# RESTful Web Services

**REpresentational State Transfer** is a de-facto standard for a **software architecture** for interactive applications that use multiple Web services.

Ref: RESTful Web Services by Leonard Richardson & Sam Ruby

> "HTTP and HTML have been called 'Whoopee Cushion and Joy Buzzer of the Internet protocols, only comprehensible as elaborate practical jokes'..."

Other protocols built on top of HTTP, designed for building Web Services are:

- WS-Notification
- WS-Security
- WSDL (Web Services Description Language)
- SOAP (Simple Object Access Protocol)

Request-Response API Paradigms:

- RESTful API
- Remote Procedure Call (RPC)
- GraphQL

## Why REST?

Because it has:

- Scalability
- Generality
- Independence
- Latency (Caching)
- Security
- Encapsulation

REST vs RPC:

| REST (REpresentational State Transfer)                   | RPC (Remote Procedure Call)                                  |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| Endpoints are nouns (resources): `api.example.com/users` | Endpoints are verbs (methods): `api.example.com/getUserInfo` |
| Calling the endpoint is acting on the resource:          | Calling the endpoint is calling the method:                  |
| `GET api.example.com/users/123`                          | `GET api.example.com/getUserInfo`                            |
| `POST api.example.com/users/123`                         | `POST api.example.com/updateUser`                            |
| Returns resources that were acted upon                   | Returns results of the function call                         |
| Resource oriented                                        | Function oriented                                            |
| Data driven                                              | Action driven                                                |
| Text based                                               | Binary serialized                                            |
| Ease of use                                              | Storage efficient                                            |

_Example:_ gRPC

```rpc
sytax = "proto3";

package helloworld;

service HelloWorld {
  rpc SayHello (HelloRequest) returns (HelloResponse);
}

message HelloRequest {
  string name = 1;
}

message HelloResponse {
  string name = 1;
}
```

```javascript
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('./protos/helloworld.proto', {})

const server = new grpc.Server()

const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld

// Define and register helloworld RPC handler
function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name })
}
sever.addService(helloProto.HelloWorld.service, {
  sayHello: sayHello,
})

// Create a gRPC server and listen on port 50051
server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  () => {
    serve.start()
    console.log('Server running on port 50051')
  },
)
```

- Above as RESTful API

```javascript
const express = require('express')
const app = express()
app.use(express.json())

// Define and register /sayHello REST endpoint
app.post('/sayHello', (req, res) => {
  const name = req.body.name

  res.json({ message: 'Hello' + name })
})

// Create an HTTP server and listen on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

REST APIs are not that useful for non-CRUD operations, such as:

- Archiving:

  - Work around in REST: Sending action in body

  ```http
  PATCH /users/user-1
  Body: { "archived": true }
  ```

- Deactivate:

  - Work around in REST: Using sub-resource as actions name (only acceptable for sub-resources)

  ```http
  PUT /users/user-1/deactivate
  ```

- Search:

  - Work around in REST: Using query parameters

  ```http
  PUT /search/code?name=bob
  ```

Advantages:

- Standard method names, arguments and status codes
- Utilize HTTP features
- Easy to maintain

Disadvantages:

- Big payload
- Multiple HTTP round trips

REST APIs are best for APIs that expose CRUD like operations

| SOAP                       | Rest                        |
| -------------------------- | --------------------------- |
| A fixed process            | Few requirements            |
| Lots of documents up front | Docs discovered as you go   |
| Detailed scenarios         | Flexible, based on needs    |
| Complex error handling     | Flexible, based on patterns |

### Resource

RESTful APIs are designed around _resources_

Resource is an **abstraction of information** in REST. Which are any kind of object, data, or service that can be accessed by the client.

A resource has an _identifier_, which is a URI that uniquely identifies that resource.

**URL** is subset of **URI**

- URI is _Universal Resource Identifier_
- URL is _Universal Resource Locator_
- Your name is an Identifier, it's an URI.
- But your address is both an Identifier and locator, it's both an URI and an URL.
- _Example:_ `https://adventure-works.com/orders/1`
- Checkout notes about URL here: [URL Notes Link](./URL.md)

Clients interact with a service by **exchanging _representations_ of resources**.

- Many web APIs use [JSON](#json) as the exchange format.

  _Example:_

  ```json
  { "orderId": 1, "orderValue": 99.9, "productId": 1, "quantity": 1 }
  ```

The resource representations consist of:

- the **data**
- the **metadata** describing the data
- and the **hypermedia links** that can help the clients in transition to the next desired state

_Example:_ The following shows a JSON representation of an order. It contains links to get or update the customer associated with the order.

```json
{
  "orderID": 3,
  "productID": 2,
  "quantity": 4,
  "orderValue": 16.6,
  "links": [
    {
      "rel": "product",
      "href": "https://adventure-works.com/customers/3",
      "action": "GET"
    },
    {
      "rel": "product",
      "href": "https://adventure-works.com/customers/3",
      "action": "PUT"
    }
  ]
}
```

> A REST API consists of an assembly of interlinked resources. This set of resources is known as the REST API's **resource model**.

#### Types of Resources

1. **Singleton**: represents a single entity: `/customers/{customerId}`

2. **Collection**: represents a collection of entities: `/customers`

3. **Sub-collection**: a resource may contain sub-collection resources:

   - `/customers/{customerId}/accounts`
   - `accounts` is sub-collection of a particular `customer`
   - `/customers/{customerId}/accounts/{accountsId}`
   - `account` is a singleton inside a sub-collection

#### Naming conventions

- **Lowercase** letters in URL

- No trailing forward slash (`/`):

  ```url
  // avoid
  http://api.example.com/device-management/

  // instead use this
  http://api.example.com/device-management
  ```

- **Use hyphens** (-) and Do not use underscores (\_) in URL

- Do not use file extensions

- Query component to search, sort, filter, and paginate URI collection

### Maturity Model

Maturity model for web APIs by Leonard Richardson (2008):

- Level 0: Define one URI, and all operations are POST requests to this URI.
- Level 1: Create separate URIs for individual resources.
- Level 2: Use HTTP methods to define operations on resources.
- Level 3: Use hypermedia ([HATEOAS](#hateoas), described below).

_Level 3_ corresponds to a truly RESTful API according to Fielding's definition. In practice, many published web APIs fall somewhere around _level 2_.

### Hypermedia

The data format of representation is known as a **media type** and identifies a specification that defines how a representation is to be processed.

Hypertext (or hypermedia) means the **simultaneous presentation of information and controls**. It can be HTML or JSON or XML or any format.

### JSON

JSON is widely used as the exchange format.

Why JSON?

- Lightweight
- Ubiquity
- Simplicity
- Readability (YAML is better)
- Scalability
- Flexibility

Disadvantages:

- "Loose" and no enforced schema

Use a standardized schema for REST and JSON

Popular REST and JSON approaches:

- [HAL](https://stateless.group/hal_specification.html): Designed specifically HATEOAS
- [JSON API](https://jsonapi.org/)
- [ION](https://ionspec.org/): Designed specifically HATEOAS
- [JSON Schema](https://json-schema.org/)
- [Collection+JSON](http://amundsen.com/media-types/collection/)

## API

**Application Programming Interface (API)** is a connection between computers or between computer programs.

API defines a contract on how to interact with the application.

For an **API to be RESTful** it should comply with the following constraints:

1. **Uniform Design (interface)**: Once a developer becomes familiar with one of your APIs, he should be able to follow a similar approach for other APIs

2. **Client-Server Architecture**: Servers and clients may also be replaced and developed independently, as long as the interface between them is not altered

3. **Stateless**: No client context shall be stored on the server between requests. The client is responsible for managing the state of the application

4. **Cacheable** (last modified header): Well-managed caching partially or completely eliminates some client-server interactions, further improving scalability and performance

5. **Layered System**: Layered system architecture where client dose know how many systems are involved in fulfilling the request

6. **Code on Demand** (optional)

All the above constraints help you build a truly RESTful API, and you should follow them. Still, at times, you may find yourself violating one or two constraints. Do not worry; you are still making a RESTful API - but not "truly RESTful"

## API Design

1. Entity-oriented:

   - code manipulates the entities that are exposed
   - similar to learning a database schema
   - Their APIs are all the same
   - **RESTful APIs follow this**
   - Examples: `GET /dogs`, `POST /dogs`

2. Procedure-oriented:
   - code calls procedure/function/method
   - similar to learning the libraries of a programming language
   - Their APIs are all different
   - Examples: `/getAllDogs`, `/getAllLeashedDogs`, `/verifyLocation`, `verifyVeterinarianLocation`

Power of web:

- Links: link pages
- State Transitions: send data

API endpoint conventions follow same guidelines as resource naming:

- Use nouns to describe the API endpoint
- Collection Resource: `/applications`
- Instance (Singleton) Resource: `/applications/a1b2c3`

### HTTP Methods

HTTP protocol has several method defined for different use cases.

Checkout notes about HTTP here: [HTTP Notes Link](./HTTP.md)

| Verb     | Action                         | Idempotent? | Safe? | Response body? | Response cacheable? |
| -------- | ------------------------------ | ----------- | ----- | -------------- | ------------------- |
| `GET`    | Retrieve a resource            | Yes         | Yes   | Yes            | Yes                 |
| `HEAD`   | Retrieve header                | Yes         | Yes   | Yes            | Yes                 |
| `POST`   | Create or partial update       | No          | No    | Yes??          | Maybe?              |
| `PUT`    | Create or full update (upsert) | Yes         | No    | No             | No                  |
| `PATCH`  | Partial update                 | No          | No    | No             | No                  |
| `DELETE` | Delete a resource              | Yes         | No    | No             | No                  |

- Post can only be cached if it contains what's called freshness information or headers that describe its cache ability.

| Verb    | Full update? | Partial update? | Idempotent> | Response body? |
| ------- | ------------ | --------------- | ----------- | -------------- |
| `POST`  | Yes          | Yes             | No          | Yes??          |
| `PUT`   | Yes          | No              | Yes         | No             |
| `PATCH` | No           | Yes             | No          | No             |

Common Update Semantics:

1. Approach 1:

   - POST to create
   - PUT for full updates
   - PATCH for partial updates
   - Most spec compliant but also more complex

2. Approach 2:

   - POST to create or update
   - Simpler and easier, but no idempotent update capability (treat all updates as partial updates)

#### GET

- `GET`: Retrieve information. Read-only (safe)
- Successful: **returns HTTP status code 200** (OK)
- If the **resource cannot be found**, the method should **return 404** (Not Found)

#### POST

- `POST` and `PUT` can both be used for create and update

- `POST` is **not Idempotent**

- `POST` for create: on a parent resource:

  ```http
  POST /applications

  // partial resource data can be provided
  {
      "name": "Best App Ever",
  }

  Response:

  201 Created
  location: https://example.io/applications/a1b2c3
  ```

- `POST` for update: on instance resource

  ```http
  POST /applications/a1b2c3

  // partial update
  {
      "name": "Best App Ever",
  }

  Response:

  200 OK
  ```

- Creates a new resource: **returns HTTP status code 201** (Created). The URI of the new resource is included in the `Location` header of the response. The **response body** may contain a representation of the resource

- Some processing is done but does not create a new resource, the method can **return HTTP status code 200** and include the result of the operation in the response body. Alternatively, if there is no result to return, the method can return **HTTP status code 204** (No Content) with no response body

- If the client puts invalid data into the request, the server should **return HTTP status code 400** (Bad Request). The response body can contain additional information about the error or a link to a URI that provides more details

#### PUT

- `PUT` for create: if identifier is known by the client, `PUT /applications/[clientSpecifiedId]`

- `PUT` for update: full replacement. `PUT` should be Idempotent (mandated by HTTP):

  ```http
  PUT /applications/existingId

  // 100% of resource data is provided (create or update)
  {
      "name": "Best App Ever",
      "description": "Awesomeness"
  }

  Response:

  204 No Content
  ```

- Creates a new resource: it **returns HTTP status code 201** (Created), as with a POST method. If the method updates an existing resource, it **returns either 200 (OK) or 204 (No Content)**. In some cases, it might not be possible to update an existing resource. In that case, consider **returning HTTP status code 409** (Conflict)

- Consider implementing bulk HTTP PUT operations that can batch updates to multiple resources in a collection. The PUT request should specify the URI of the collection, and the request body should specify the details of the resources to be modified. This approach can help to reduce chattiness and improve performance

- Similar to upsert behaviour in some databases

#### PATCH

- `PATCH`: for partial update of record/entity

  ```http
  PATCH /applications/existingId

  {
      "description": "Changed..."
  }

  Response:

  204 No Content
  ```

- With a PATCH request, the client sends a set of updates to an existing resource, in the form of a _patch document_

- The patch document doesn't describe the whole resource, only a set of changes to apply

- There are two main JSON-based patch formats, called _JSON patch_ and _JSON merge patch_.

- [JSON merge patch](https://datatracker.ietf.org/doc/html/rfc7396) is somewhat simpler. The patch document has the same structure as the original JSON resource, but includes just the subset of fields that should be changed or added. In addition, a field can be deleted by specifying `null` for the field value in the patch document. (That means merge patch is not suitable if the original resource can have explicit `null` values.)

  ```json
  {
    "name": "gizmo",
    "category": "widgets",
    "color": "blue",
    "price": 10
  }
  ```

- JSON merge patch for the above example:

  ```json
  {
    "price": 12,
    "color": null,
    "size": "small"
  }
  ```

- This tells the server to update `price`, delete `color`, and add `size`, while `name` and `category` are not modified.

- Media type: `application/merge-patch+json`

- [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) is more flexible. It specifies the changes as a sequence of operations to apply. Operations include add, remove, replace, copy, and test (to validate values).

- Media type: `application/json-patch+json`

| Error condition                                                                                     | HTTP status code             |
| --------------------------------------------------------------------------------------------------- | ---------------------------- |
| The patch document format isn't supported.                                                          | 415 (Unsupported Media Type) |
| Malformed patch document.                                                                           | 400 (Bad Request)            |
| The patch document is valid, but the changes can't be applied to the resource in its current state. | 409 (Conflict)               |

#### DELETE

- `DELETE`: delete

- If the delete operation is successful, the web server should respond with **HTTP status code 204** (No Content), indicating that the process has been successfully handled, but that the response body contains no further information. If the resource doesn't exist, the web server can return **HTTP 404** (Not Found).

```http
DELETE /applications/existingId

Response:

204 No Content
```

#### HEAD

- `HEAD`: Retrieve headers, no body. Read-only (safe)
- Useful to get headers such as to check cache expiration

#### OPTIONS

- `OPTIONS`: HTTP communication options

### HTTP Semantics

Considerations for designing an API that conforms to the HTTP specification.

#### Media Types

- Format specification + Parsing rules
- `Content-Type`: header in a request or response specifies the format of the representation
- If the server doesn't support the media type, it should **return HTTP status code 415** (Unsupported Media Type).
- JSON: `application/json`
- XML: `application/xml`
- `application/ion+json`, `application/ion+json;v=2`

  ```http
  POST https://adventure-works.com/orders HTTP/1.1
  Content-Type: application/json; charset=utf-8
  Content-Length: 57

  {"Id":1,"Name":"Gizmo","Category":"Widgets","Price":1.99}
  ```

- A client request can include an `Accept` header that contains a list of media types the client will accept from the server in the response message.
- If the server cannot match any of the media type(s) listed, it should **return HTTP status code 406** (Not Acceptable).

  ```http
  GET https://adventure-works.com/orders/2 HTTP/1.1
  Accept: application/json
  ```

### Asynchronous Operations

- Sometimes a POST, PUT, PATCH, or DELETE operation might require processing that takes a while to complete.

- If you wait for completion before sending a response to the client, it may cause unacceptable latency. If so, consider making the operation asynchronous.

- **Return HTTP status code 202** (Accepted) to indicate the request was accepted for processing but is not completed.

- You should expose an endpoint that returns the status of an asynchronous request, so the client can monitor the status by polling the status endpoint. Include the URI of the status endpoint in the Location header of the 202 response.

  ```http
  HTTP/1.1 202 Accepted
  Location: /api/status/12345
  ```

- If the client sends a GET request to this endpoint, the response should contain the current status of the request. Optionally, it could also include an estimated time to completion or a link to cancel the operation.

  ```http
  HTTP/1.1 200 OK
  Content-Type: application/json

  {
      "status":"In progress",
      "link": { "rel":"cancel", "method":"delete", "href":"/api/status/12345" }
  }
  ```

- If the asynchronous operation creates a new resource, the status endpoint should return status code 303 (See Other) after the operation completes. In the 303 response, include a Location header that gives the URI of the new resource:

  ```http
  HTTP/1.1 303 See Other
  Location: /api/orders/12345
  ```

For more information, see [Asynchronous Request-Reply pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)

### Filter and Paginate Data

- API can allow passing a filter in the query string of the URI, such as `/orders?minCost=n`
- Server parses the parameter present in the query and returns the filtered results

_Example:_ Query strings that specify the maximum number of items to retrieve and a starting offset into the collection

```http
/orders?limit=25&offset=50
```

Also consider imposing an upper limit on the number of items returned, to help prevent Denial of Service attacks. To assist client applications, GET requests that return paginated data should also include some form of metadata that indicate the total number of resources available in the collection.

You can use a similar strategy to sort data as it is fetched, by providing a sort parameter that takes a field name as the value, such as /orders?sort=ProductID. However, this approach can have a negative effect on caching, because query string parameters form part of the resource identifier used by many cache implementations as the key to cached data.

You can extend this approach to limit the fields returned for each item, if each item contains a large amount of data. For example, you could use a query string parameter that accepts a comma-delimited list of fields, such as /orders?fields=ProductID,Quantity.

Give all optional parameters in query strings meaningful defaults. For example, set the limit parameter to 10 and the offset parameter to 0 if you implement pagination, set the sort parameter to the key of the resource if you implement ordering, and set the fields parameter to all fields in the resource if you support projections.

## Sorting

## Searching

## Error Handling

1. Use HTTP status codes:

- Status codes for scenarios:

  - Everything worked: `200`
  - The application did something wrong: `404`
  - The API did something wrong: `500`

- Google GData: `200, 201, 304, 400, 401, 403, 404, 409, 410, 500`
- Netflix: `200, 201, 304, 400, 401, 403, 404, 412, 500`
- Digg: `200, 400, 401, 403, 404, 410, 500, 503`

- On an average 8 codes: `200, 201, 304, 400, 401, 403, 404, 500`

- Twilio:

  ```json5
  // HTTP Status Code: 401

  {
    status: 401,
    message: 'Authenticate',
    code: 2003,
    more_info: 'https://www.twilio.com/docs/errors/20003',
  }
  ```

## API Versioning

APIs need to be versioned if breaking changes need to be implemented

- Create directories/namespaces like `v1`, `v2` and add the controllers inside them

Approaches to Restful Versioning:

1. Don't version if possible (clients should be dynamic)

2. Content/Media type (header) versioning (ideal): Content negotiation process that already exists in HTTP. When clients request a media type using the Accept header they can explicitly include a version number or string in the media type itself

   ```http
   GET api/test HTTP/1.1
   host: localhost

   Accept: application/ion+json;v=2.0
   content-type: text/plain;v=1.0
   ```

3. URL prefix (path) versioning:

   - `/api/v1/test`, `/api/v2/test`
   - Least restful
   - But more explicit to the clients

4. Query String:

   - `/api/test?api-version=1.0`, `/api/test?api-version=2.0`
   - Set default version

5. HTTP Header:

   ```http
   GET api/test HTTP/1.1
   host: localhost

   custom-version-header: 1.0
   ```

## HATEOAS

HATEOAS: Everything that is required to understand is within the document exchanged through REST API. The client dose not need any out-of-band information, just the API responses

- Hypermedia
- As
- The
- Engine
- Of
- Application
- State

The responses from the API tell the client what it can do.

- Responses should include links to the actions available
- Single (root) entry point
- Self-documentation: No need for out-of-band information or documentation

### ION Specification

HATEOAS in JSON: Ion

- [ION Working Group](https://ionspec.org/)

Ion objects contain:

- Links in ION:

  ```json
  {
    "href": "https://example.io",
    "method": "GET",
    "rel": ["self"]
  }
  ```

- Resources in ION: Include a self-referential link

  ```json5
  {
    "self": {
      "href": "https://example.io/people/123"
    },
    "firstName": "Godzilla",
    "birthDay": "1970-02-31"
  }

  // or implied

  {
    "href": "https://example.io/people/123",
    "firstName": "Godzilla",
    "birthDay": "1970-02-31"
  }
  ```

- `value` object: property. Models a collection of resources

  ```json5
  // no context of the language
  {
      "greeting": "Hola"
  }

  // metadata can be used to define the property
  {
      "greeting": {
          "value": "Hola",
          "lang": "es"
      }
  }
  ```

  _Example:_ The below object must be parsed as a collection

  ```json
  {
    "href": "https://example.io/people/123",
    "rel": ["collection"],
    "value": [
      { "href": "https://example.io/users/123", "login": "ddata" },
      { "href": "https://example.io/users/456", "login": "ttester" }
    ]
  }
  ```

- Collection: Meta-data can contain info relevant to each element of the collection (no need to repeat this info in each element) or the property of the collection (length, max-size...)

  ```json5
  // no info about the collection
  "value": []

  {
      // metadata ...
      "rel": [ "collection" ],
      "value": []
  }
  ```

- Linking:

  ```json5
  // links
  {
      "href": "https://example.io/users/a1b2c3c"
  }

  // link to other details
  GET /users/x7y8z9

  200 OK
  {
      "givenName": "Tony",
      "surname": "Stark",
      ...,
      "company": {
          "href": "https://example.io/orgs/g4h5i6",
          "rel": ["collection"]
      }
  }

  // linking self
  GET /users/x7y8z9

  200 OK
  {
      "self": { "href": "https://example.io/users/x7y8z9" },
      "givenName": "Tony",
      "surname": "Stark",
      ...,
  }
  ```

### Forms in ION

While Posting data, how do clients know which fields and types of data to submit to an endpoint?

- This can be solved using ION forms

- ION form is very similar to an HTML form
- ION forms are modeled on an ION collection of form fields objects

- HTML Form:

  ```html
  <form action="https://example.io/register" method="POST">
    <input type="text" name="firstName" />
    <input type="text" name="lastName" />
  </form>
  ```

- As ION collection:

  ```json5
  {
    href: 'https://example.io/register',
    rel: ['form'], // (or edit-form, create-form, query-form)
    method: 'POST',
    value: [
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string', required: true },
    ],
  }
  ```

- The ION form describes the metadata about what can be submitted to a particular endpoint. To submit a form, a client will read that metadata and create a request with the proper method and parameters.

### Example

Employee resource API:

1. GET route: returns array of employees

   - Query Parameters:

     - `bodyLimit`
     - `pageLimit`

   - Responses:
     - 200 Payload:
       - `ID`
       - `Name`
       - `Title`

2. GET route: returns specific employee

   - Path Parameters:

     - `ID`

   - Responses:
     - 200 Payload:
       - `ID`
       - `Name`
       - `Title`

3. POST route: add new employee

   - Parameters:

     - Payload:
       - `ID`

   - Responses:
     - 200

## Adding an API

1. Bolt-On Strategy: for existing systems

   - Brute-force approach
   - The fastest way to build something useful
   - Benefit: takes advantages of existing code and systems
   - Drawback: problems in the application or architecture leak through into the API

2. Greenfield Strategy: for new systems

   - API or mobile-first mindset
   - Benefits: takes advantage of new technologies and architectures and may reinvigorate the team
   - Drawback: often requires massive uppfront investment before any Benefits appear

3. Facade Strategy: replacing piece by piece

   - Benefit: ideal for legacy systems as the application is always functional
   - Drawback: multiple mindsts in the system
   - Drawback: hard to replicate behaviour for a full one-on-one conversion

## OpenAPI

It is RESTful API specification (AKA Swagger Specification)

- Allow machines/tools to integrate with API
- Allow humans to implement API code
- Allow humans to read and generate API documentation and test cases
- Latest version 3.0

OpenAPI is a format for describing restful APIs, but it isn't quite a schema like HAL or Ion.

The API description is saved in a file called `swagger.json`:

- You can build a `swagger.json` file by hand or generate it automatically.
- `swagger.json` can be processed to automatically to create a strongly typed client for your API or to generate API tests.
- `swagger.json` also enables a web tool called _Swagger UI_, which allows a human to browse to your API definition and documentation and interact with the API in real time.

## API Security

Checkout notes about API Security here: [API Security Notes Link](./../Application_Security/API.md)

- Course: _Web Security: OAuth and OpenID Connect with Keith Casey_
- YouTube: _OAuth 2.0 and OpenID Connect (in plain English)_ with Nate Barbettini

## API Performance

- API documentation
- Complex Database Queries
- Cost
- Security risk
- Inefficient & Complex Code
- Inadequate caching mechanism
- Technological complexity

Optimization techniques:

1. Caching
2. Connection pooling:

   - Reduce number of connections created and destroyed
   - But also maintain the number of connections open in order not to overwhelm the Database
   - RDS Proxy: it sits between your application and database to efficiently manage DB connections

3. Avoid N+1 Query Problem:

   - N+1 Problem: Include enough information in single resources inside collection resources

4. Pagination:
5. Fast serialization libraries
6. Compression:

   - Brotli

7. Asynchronous logging

## References

- RESTful Web APIs: Services for a Changing World - by Leonard Richardson

- _Learning RESTful APIs_

- [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)

- _Rest in Practice_

- _RESTful Web Services Cookbook_

- Nate Barbettini: building-and-securing-restful-apis-in-asp-dot-net-core-2018

## Queries

- Base URL
- URL versioning
- ID strategies
- DateTime representation
- Resource timestamps
- Collection Pagination
- Sorting
- Search
- Many to Many Associations
- Custom Form Constraints
- Async Operations
- Long-Lived Operations
- Batch Operations
- Clean Errors
- Security Controls
- Caching & Concurrency
- Long Term Maintenance
