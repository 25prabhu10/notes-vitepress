# Backend Questions

1. What are the characteristics of a RESTful API? Give an example e.g. if returning a list of customer accounts

   - it is stateless
   - use HTTP verbs as Fielding originally defined
   - express URLs with nouns rather than verbs
   - make expressive use of HTTP Status Codes
   - choose wisely between XML (increasingly rare), JSON, and HATEOAS (rapidly growing)
   - are well-documented and reliable
   - support `X-HTTP-METHOD-Override` to accommodate picky proxies
   - track version
   - handle errors carefully and explicitly
   - log activity
   - paginate, filter, and sort results
   - limit rates
   - explicitly design in other commercially-significant API-specific features

- What APIs have you built in the past? (drill down into candidates knowledge of the application architecture, what design decisions were made? what could be improved?)
- What are some considerations one should take when building APIs?
- How would you authenticate a public facing API? Follow up question, have you used token based authentication? explain how it works?
- How much .NET Core experience do you have?
- What have you built with .NET Core?
- What you can you tell me about OWASP?

## Application To Solve for

The mobile apps IOS and Android consume a microservice platform backend to retrieve the data

There are separate backend API for functions such as login, accounts list, retrieval, transaction history etc.

Consider that the user is already logged in has seen a list of all his accounts and now clicked in one particular account to see its details which led to the screen

To render the screen the app makes a call to a single public facing API endpoint. let's call it "transactions Edge API". to this endpoint it passes a security context + an account identifier and receives a limited transaction history + future (scheduled) transactions for that account

The transactions edge API in turn consumes 3 separate middle tier (restricted zone) APIs that provide the following services:

- Retrieve list of accessible accounts for any customer identifier (sourced from SAP)

- Retrieve transaction history for any account identifier (sourced from SAP)

- Retrieve future (scheduled) transactions for any account identifier (sourced from Oracle DB)

1. Sketch a solution architecture diagram (lines and boxes) showing:

   - The native app client (e.g. iOS or Android app)
   - The public facing API
   - The middle tier APIs
   - SAP
   - Oracle DB

2. propose endpoint specification for each of the public facing and middle tier API calls using REST principles

   For each specify:

   - HTTP verb and route
   - Samples of JSON request/response payload structure

Follow Up Questions:

1. How might you implement security on the public and point? assume the customer has already authenticated themselves to the native app using the login credentials via separate API

2. How do you prevent a malicious scholar accessing transactions for an account but do not own

3. What http code should be returned if customer ID and account id don't match?

4. You receive reports of slow calls for the web tier API. what steps do you take to investigate / remediate?

5. The customer's account list is expensive to retrieve and changes in frequently. what performance optimisation options might we consider?

6. Consider that there are cost / performance constraints on the calls made to SAP. for example: say it will only give us transactions in batch of 50 per call with a paging key. how do we implement an experience where the customer can keep scrolling back through their history loading more transactions as required?

7. You receive reports of a memory leak in the sky dual transactions API the one accessing Oracle in production what steps do you take to investigate/remediate?

Coding On Paper:

1. Code a c# Web API controller class to implement the following endpoints:

   - Request: `GET /customers/{identifier}/identity`
   - Response: `HTTP 200 OK`

     ```json
     {
       "FirstName": "Jonathan",
       "LastName": "Brown",
       "PreferredName": "Johnny"
     }
     ```

   - Request: `PUT /customers/{identifier}/identity`

     ```json
     {
       "PreferredName": "John"
     }
     ```

   - Response: `HTTP 204 NO CONTENT`

2. Assume that the following class and interface are defined:

   - Public class customer identity public string `firstName` public string `lastName` public string preferred name

   - Public interface I customer service customer identity get customer string identifier void update customer string identifier string preferred name

   - Assume the Web API project is using an IOC container supporting constructor injection of dependencies to controller
