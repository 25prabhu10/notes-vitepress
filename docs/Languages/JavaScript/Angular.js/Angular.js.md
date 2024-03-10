---
title: AngularJS
description: A JavaScript Framework to create Single-Page-Applications (SPA)s
---

# AngularJS

AngularJS is a JavaScript-based open-source front-end web framework for developing single-page applications

Features of AngularJS:

- Dependency Injection
- Two way data-binding
- Testing
- Model View Controller
- Directives, Filters, etc...

## Setup

- Various ways to integrate AngularJS:

  - Install AngularJS from `npm` or `yarn`
  - Download AngularJS script and include the script tag
  - Use the CDN to get the AngularJS script

- To bootstrap AngularJS we need to include the `ng-app` directive as part of the HTML element such as body or the HTML page itself, so that AngularJS can start managing it

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="angular.min.js"></script>
      <title>Document</title>
    </head>
    <body ng-app></body>
  </html>
  ```

- Using double curly braces (binding expression) we can write AngularJS expression within the HTML

## Modules

A module is a container for different parts of the application i.e. controllers, services, directives, filters, etc

- It can be thought of as the `Main()` method in other types of applications

- To create a module use angular object's `module()` method:

  ```javascript
  var myApp = angular.module("myModule", []);
  ```

## Controller

In AngularJS a controller is a JavaScript function. The job of the controller is to build a model for the view to display

- To create a controller function, just create a function and pass the `$scope` as parameter.

  ```javascript
  var myController = function ($scope) {
    $scope.message = "AngularJS Tutorial";
  };
  ```

- `$scope` is an angular object passed by angular framework
- The model is attached to this `$scope` object which is then available in the view and can be displayed

## Digest Cycle

Digest cycle (digest phase or digest process or digest loop)

- Responsible to walk-through entire watch list for modifications

  - Dirty-checking: the process of checking the current values of scope variables with their previous values

- Exists modifications? Executes Watch Listeners, if any

- Keeps note of all modifications and notifies AngularJS Framework to update DOM

- Digest process runs as part of Angular Context:

  - Angular Context: run-time env. of AngularJS Framework
