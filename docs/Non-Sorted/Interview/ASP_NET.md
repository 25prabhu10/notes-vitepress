---
title: ASP.NET
---

# ASP.NET

## MVC

1. What is MVC Design pattern?

   - Software architectural pattern for implementing user interfaces.
   - It divides a given software application into three interconnected parts, so as to separate internal representation of information from the way that information is presented to or accepted from the user.

2. What is Model, View, and Controller?

   - The Model represents the application core (for instance a list of database records).

     - Classes that represent the data of the application and that use validation logic to enforce business rules for that data.

   - The View displays the data (the database records).

     - Template files that your application uses to dynamically generate HTML responses.

   - The Controller handles the input (to the database records).

     - Classes that handle incoming browser requests, retrieve model data, and then specify view templates that return a response to the browser.

### Model

1. What is Model Validation? how will you achieve it in ASP.NET Core?

   - using Data Annotations

   - Validation attributes let us specify validation rules for model properties. Model state represents errors that come from two sub systems: model binding and model validation.

   - There are in-built attributes in ASP.NET MVC core,

     - CreditCard: This validates that the property has a credit card format.

     - Compare: This attribute validates that two property in model class match like password and compare password.

     - EmailAddress: This validates the property has email address format.

     - Phone: This validates that the property has a telephone number format.

     - Range: This validates that the property value within a specified range.

     - RegularExpression: This validates that the property value matches a specified regular expression.

     - Required: This validates that the field is not null

     - StringLength: This validates that a string property value doesn't exceed a specified length limit.

     - URL: This validates that the property has a URL format.

     - Remote: This validates input on the client by calling an action method on the server

### View

1. How data is passed from controller to a view?

   - `TempData`: The dictionary for temporary data. Initialize a TempData and then use it in your view. TempData keeps data for the time of HTTP Request, which means that it holds data between two consecutive requests. TempData helps us to transfer data between controllers or between actions. TempData internally use Session variables.

     - `TempData["UserName"] = model.UserName;`
     - In the view, You can either store the value to a variable and then display the variable value or display the tempData value directly
     - `var UserName = TempData["UserName"] as string;`

   - `ViewData`: ViewData also behaves and operates like a TempData.

     - `ViewData["UserName"] = model.UserName;`
     - ViewData is Faster than ViewBag

   - `ViewBag`: ViewBag is very similar to ViewData. ViewBag is a dynamic property

     - ViewBag is able to set and get value dynamically
     - Add any number of additional fields without converting it to strongly typed.
     - ViewBag is just a wrapper around the ViewData.

   - Simple sessions: `Session["UserName"] = model.UserName;`

2. What is a `ViewModel`?

   - It is a model that is specifically designed for use within a view. It provides a simplified interface on top of the domain model that keeps decision-making in the view to a minimum.

### Controller

1. Action Methods and Types of Result Types?

2. Properties of Routes?

   - Route Name: A route is a URL pattern that is mapped to a handler. A handler can be a controller in the MVC application that processes the request. A route name may be used as a specific reference to a given route.

   - URL Pattern: A URL pattern can contain literal values and variable placeholders (referred to as URL parameters). The literals and placeholders are located in segments of the URL that are delimited by the slash (/) character.
   - Defaults: When you define a route, you can assign a default value for a parameter. The defaults is an object that contains default route values.

   - Constraints: A set of constraints to apply against the URL pattern to more narrowly define the URL that it matches.

3. Routing example?

   | URL                                 | Controller     | Action | Id  |
   | ----------------------------------- | -------------- | ------ | --- |
   | `http://localhost:4736/`            | HomeController | Index  |
   | `http://localhost:4736/Book/`       | BookController | Index  |
   | `http://localhost:4736/Book/Create` | BookController | Create |
   | `http://localhost:4736/Book/Edit/2` | BookController | Edit   |

4. What is a Middleware?

   - software which is injected into the application pipeline to handle request and responses.
   - they are just like chained to each other and form as a pipeline.

5. The use `@model` and `@Model` in razor view files?
6. The use of HTML and URL helper methods.
7. How to pass data from View to Controller Action methods using `FormCollection`, Request object, `QueryString`, Session object and Model Binders.
8. Model binding? The most important topic that every developer must understand.
9. Model binding with Include and Exclude properties.

10. How to show validation error messages in the view using Validation HTML Helper methods.
11. Using MVC and Entity Framework to create a CRUD application?
12. The use of Action Verbs when working with Action methods i.e. `HttpGet` and `HttpPost`?
13. How to create Create, Edit, Delete and Detail view files using Razor syntax with Model classes i.e. creating Strongly-typed views?
14. How to use `ModelState.isValid` and `ModelState.AddModelError`?
15. How to pass data from View to a Controller Action method via a view model, and the transferring the `ViewModel` object to the model object and the passing the model object instance to EF `DbSet.Add()` method for persisting the data in the database (Using `ViewModel` + model + EF for Create and Edit Action methods and Views)?
16. `DbContext` class, `DbSet` properties and the `DbContext()` c to configure database connection and `EntityState Enum`?
17. Required and Important data annotations to use with Entity Framework Code-First (`DataType`, Display, Required, `NotMapped` and others?
18. How to use `UpdateMode` And `TryUpdateModel`?
19. Layouts, Sections, Layout property and `_ViewStart` file?
20. How to render `DropDownLists`, `CheckBox`, `Radio` button from database?
21. How to use Display and Editor templates using `UIHint`?
22. How to create custom HTML Helper methods in MVC using extension methods?
23. How to build Partial View and rendering them?
24. Repository pattern, Generic Repository Pattern, and Unit of work pattern?
25. How to implement search, paging, sorting in MVC using Entity Framework?
26. How to render a Grid in MVC using Entity Framework?
27. CSRF attack and using `AntiForgery` token for security purposes?
28. What are Action Filters?

    - Filters allow us to run custom code before or after executing the action method.
    - They provide ways to do common repetitive tasks on our action method. The filters are invoked on certain stages in the request processing pipeline.

29. Caching in MVC?
30. Use of Areas in an MVC application?
31. Use of Ajax helpers in MVC application?
32. How to do logging in MVC application using Action Pattern Filters or `NLog` attributes?
33. Performance improvement: the use of Bundling and `Minification`?

34. What are the different filter types?

    - Authorization filters
      The Authorization filters are executed first. This filter helps us to determine whether the user is authorized for the current request. It can short-circuit a pipeline if a user is unauthorized for the current request. We can also create custom authorization filter.

    - Resource filters
      The Resource filters handle the request after authorization. It can run the code before and after the rest of the filter is executed. This executes before the model binding happens. It can be used to implement caching.

    - Action filters
      The Action filters run the code immediately before and after the controller action method is called. It can be used to perform any action before or after execution of the controller action method. We can also manipulate the arguments passed into an action.

    - Exception filters
      The Exception filters are used to handle exception that occurred before anything written to the response body.

    - Result filters
      The Result filters are used to run code before or after the execution of controller action results. They are executed only if the controller action method has been executed successfully.

## Core

1. What is the of `StartUp.cs` class? Its methods and their purposes

   - Middleware services and components integration and pipeline building

2. Authorization (role-based access control)

3. REST concepts:

   - HTTP Methods
   - HTTP Status Codes

4. Dependency Registration and Injection?

   - ASP.NET Core comes with a built-in Dependency Injection framework that makes configured services available throughout the application. You can configure the services inside the ConfigureServices method as below.

5. Describe the Service Lifetimes?

   - Transient Service: Services are created each time they are requested.

   - Scoped Service: Services are created on each request (once per request).

   - Singleton Service: Services are created once for the lifetime of the application.

6. Unit Testing

## Entity Framework

1. What is Entity Framework?

   - ORM (Object-Relational Mapper)

2. What are different types of Entity framework approaches?

   - Code First Approach: The Code First approach primarily uses classes to create the model and its relations, which are then used to create a database. This way, developers can work in an object-oriented manner without considering the database structure. By following this model, developers first write POCO classes and then use these classes to create the database. Code First is the method used by most developers using Domain-Driven Design (DDD).

   - Model First Approach: In contrast, the Model First approach uses ORM to build model classes and their relationships. Following the successful creation of the model classes and relationships, the physical database is created using these models.

   - Database-First Approach: In Entity Framework, Database First approach is used to build entity models based on existing databases and reduce the amount of code required. By using this approach, domain and context classes can be created based on existing classes.

3. What is an ORM, concepts of ORM and what is Entity Framework.
4. The difference between ADO.NET and ADO.NET Entity Framework.
5. Different approaches of Entity Framework and their uses in a project.
6. How data comes into a model class object and Entity framework uses this model object to persist data in the database i.e. SQL Server database tables./
