---
title: Angular
description: A JavaScript Framework  to create reactive Single-Page-Applications (SPA)s
---

# Angular

Angular is a **JavaScript Framework** which allows you to create _reactive_ **Single-Page-Applications** (SPA)s.

## Introduction

Lets get started...

### Project Setup

1. To start with we need to install **[Node.js](https://nodejs.org/en/)**. This will also install npm (Node Package Manager).

2. Install the **Angular CLI**.

   ```bash
   npm install -g @angular/cli
   ```

   > Angular CLI creates projects, generates application and library code, and performs a variety of ongoing development tasks such as testing, bundling, and deployment.

3. Create a new workspace and initial starter app:

   ```bash
   ng new my-app
   ```

4. Launch the server:

   ```bash
   cd my-app
   ng serve --open
   ```

5. Install **[Bootstrap](https://getbootstrap.com/)** if needed.

   ```bash
   npm install --save bootstrap popper.js jquery
   npm audit fix --force
   ```

   Now add **Bootstrap** to the project by adding the below lines in **`angular.json`** file:

   ```json
   "styles": ["./node_modules/bootstrap/dist/css/bootstrap.min.css",]

   "scripts": ["./node_modules/jquery/dist/jquery.min.js", "./node_modules/bootstrap/dist/js/bootstrap.min.js"]
   ```

6. For this case we will use a css framework called **[Semantic UI](https://semantic-ui.com/)**, to download it and for more info visit [Link](https://semantic-ui.com/introduction/getting-started.html).

7. Import `semantic.min.css` in the main `style.css` file:

   ```typescript
   @import './app/vendor/semantic.min.css';
   ```

8. Start the mess...

### TypeScript

To learn more see this document [TypeScript](../TypeScript/TypeScript.md)

### How dose Angular start?

1. `main.ts` file is executed first. There `.bootstrapModule(AppModule)` directs to `app.module.ts` file.

2. This file contains all the components of the app.

3. There `bootstrap: [AppComponent]` points to `app.components.ts` file.

4. This file contains the `selector: 'app-root'`. This is an attribute present in the `index.html` file.

5. Now angular will place everything between this `app-root` attribute.

## Modules

A **collection** of [Components](#components)

## Components

They are the basic building blocks.

### Create a Component

#### Manual Method

1. Usually all _modules_ and _components_ reside inside `src/app` folder.

2. Create a new folder with the component name.

3. **`name.component.ts`** is the main component file.

   - **export class** that is created inside this file and add **Component decorator** to it:

     ```typescript
     import { Component } from "@angular/core";
     @Component({
       selector: "app-name", // this is user defined element
       templateUrl: "./name.component.html", // this is html file
     })
     export class NameComponent {}
     ```

4. Create **`name.component.html`** file and fill it.

5. Add the this component to **`app.module.ts`**:

   ```typescript
   import { NameComponent } from "./name/name.component";
   @NgModule({
     declarations: [AppComponent, NameComponent],
     imports: [BrowserModule, FormsModule, HttpModule],
     providers: [],
     bootstrap: [AppComponent]
   })
   ```

6. Add `"<app-name></app-name>"` in the `app.component.html` file.

#### CLI Method

1. Run the below command:

   ```bash
   ng generate component name # or ng g c name
   ```

2. Step 1-5 is done by the CLI automatically. Proceed with step-6.

### Component Files vs Inline

#### Inline HTML

Add the HTML code directly into the **`name.component.ts`** file:

```typescript
@Component({
    ...,
    template: '<app-name></app-name>', // replace templateUrl
    ...
})
```

#### Inline CSS

Add Styles directly into the **`name.component.ts`** file:

```typescript
@Component({
    ...,
    styles: [`` ` ``
h3 {
color: doderblue;
}
`` ` ``],
    ...
})
```

### Component Selector

Selector works the same way as CSS selector works, So all the CSS types of selectors can be used except _id_ and _pseudo_ selectors.

- **`app-name`** for element **`<app-name></app-name>`**
- **`[app-name]`** for attribute **`<div app-name></div>`**
- **`.app-name`** for class **`<div class="app-name"></div>`**

## Databinding

Communication between TypeScript Code (Business Logic) and Template (HTML).

### String Interpolation

```typescript
// name.component.ts
export class name {
  id: number = 10;
  status = "offline";
  getStatus() {
    return this.status;
  }
}
```

```html
<!-- name.component.html -->
<p>{{ 'Server' }} with ID {{ id }} is {{ getStatus() }}.</p>
```

### Property Binding `[property]=""`

```typescript
// name.component.ts
export class name {
    allow = true;
}

// name.component.html
<button class="btn btn-primary" [disabled]="!allow">Submit</button>
<p [innerText]="allowNewServer"></p>
```

### Event Binding `(event)=""`

```typescript
// name.component.ts
export class name {
    CreationStatus = "It was not created!!!";

    onCreateServer() {
    this.CreationStatus = "It was created!";
  }
}

// name.component.html
<button class="btn btn-primary">Submit</button>
<p (click)="onCreateServer()">CreationStatus</p>
```

- Using **event** return values: (Passing and Using Data with Event Binding)

  ```typescript
  // name.component.ts
  export class name {
      Name = '';

      onUpdateServerName(event: Event) {
      this.Name = (<HTMLInputElement>event.target).value;
    }
  }

  // name.component.html
  <input ="text" class="form-control" (input)="onUpdateServerName($event)">
  <p> {{ Name }} </p>
  ```

### Two-Way-Databinding `[(ngModel)]=""`

```typescript
// name.component.ts
export class name {
    Name = '';
}

// name.component.html
<input ="text" class="form-control" [(ngModel)]="Name">
<p> {{ Name }} </p>
```

## Directives

### Structural Directives

#### `*ngIf`

- Simple Example:

  ```typescript
  // name.component.ts
  export class name {
      Name = '';
      Displays = true;
  }

  // name.component.html
  <input ="text" class="form-control" [(ngModel)]="Name">
  <p *ngIf="Displays"> {{ Name }} </p>
  ```

- `else` can also be used:

  ```typescript
  <p *ngIf="Displays; else DisplayThis">Name is {{ Name }}</p>
  <ng-template #DisplayThis>
      <p>No Name</p>
  </ng-template>
  ```

### Attribute Directives

#### `*ngStyle`
