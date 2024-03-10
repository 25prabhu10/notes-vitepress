---
title: Language Integrated Query (LINQ)
description: LINQ enables us to query any type of data store (SQL Server, XML documents, Objects in memory etc.)
---

# LINQ

Language Integrated Query (LINQ) enables us to query any type of data store (SQL Server, XML documents, Objects in memory etc.)

- LINQ enables us to work with different data sources using a similar coding style without having the need to know the syntax specific to the data source.

  - .NET app --> ADO.NET SQL --> Databases
  - .NET app --> XPATH, XSLT --> XML Documents
  - .NET app --> Arrays, Generics --> In Memory Objects

- It also provides intellisense and compile time error checking

- It can be written using any .NET supported programming language

- LINQ provider is a component between the LINQ query and the actual data source, which converts the LINQ query into a format that the underlying data source can understand

Why have a query language in a programming language?

- Get strong type
- Consistent Syntax: One query syntax for all data sources

When not to use LINQ?

## Advantages

- Composable
- Debugger

_Example:_

```csharp
var results = new List<WebColor>();
var colors = CourseLib.ColorSource.GetColors();

foreach (var color in colors)
{
  if (color.HSL.Saturation > 50)
  {
    results.Add(color);
  }
}

results.Sort((a, b) => (a.ColorName[0].CompareTo(b.ColorName[0])));


// Using LINQ
var q = from color in CourseLib.ColorSource.GetColors()
orderby color.ColorName
where color.HSL.Saturation > 50
select color;
```

## Providers

The provider is responsible for turning your query intent into domain-specific commands

- LINQ to objects
- LINQ to XML
- LINQ to entities
- LINQ to SQL
- LINQ to ADO.NET

## 3-Phases

There are 3-phases of a LINQ query:

1. Set up a data source

   - Initialize the source
   - Use the appropriate LINQ provider

     - The default provider is LINQ to Objects

2. Define the Query:

   - Write the query code
   - Query is converted to an expression tree

3. Execute the Query:

   - Query runs and returns the result data

- It is also called deferred execution
- **Sequences** are the source of data for a query

  - In LINQ, a sequence is any type that implements `IEnumerable<T>`

**Query Operator**: A method that transforms a sequence

## Parts of a Query

What sources are query-able?

- We need a pool of data to query
- Pool of data in functional programming is called a _sequence_
- In C# class represent data and for them to be query-able, they have to implement either of these interfaces:

  - `IEnumerable`
  - `IQueryable`: Is an interface designed `Queryable` providers i.e. remote data sources, like database. It allows for more sophisticated query expressions and disparate data sources

1. `IEnumerable`:

   ```csharp
   // Show all types that implement
   // the IEnumerable (LINQ) interface in msCorLib

   var temp = Assembly.Load("mscorlib");

   var q = from t in temp.GetExportedTypes()
           from i in t.GetInterfaces()
           where i.IsGenericTypes && t.IsClass && i.GetGenericTypeDefinition() == typeof(IEnumerable<>)
           orderby t.Name
           select t.Name;
   ```

2. `IQueryable`:

   ```csharp
   // Use in LINQ to Entities, LINQ to SQL etc.

   var temp = Assembly.Load("System.Data.Entity");

   var q = from t in temp.GetExportedTypes()
           from i in t.GetInterfaces()
           where i.IsGenericTypes && t.IsClass && i.GetGenericTypeDefinition() == typeof(IQueryable<>)
           orderby t.Name
           select t.Name;
   ```

   - Arrays, Stacks, Dictionaries, String (collection of characters)
   - Array are treated specially by the CLR
   - Array implements `IEnumerable`, not `IEnumerable<T>`
   - But for a concrete array CLR alters it to inherit array, implements `IEnumerable<T>`, `ICollection<T>`, and `IList<T>`
   - Provided the array is single dimensional and 0-lower bound.

     ```csharp
     Double[] array = new Double[] { 4.4, 2.2, 6.6 };

     var q = from a in array
             orderby a
             select a;
     ```

A Query consists of a source (sequence) and at least one Query Operator

- All the Query operators are implemented as extension methods and are in the Enumerable class

```csharp
// List all Query Operators

var temp = Assembly.Load("System.Linq");

var q = from method in typeof(System.Linq.Enumerable).GetMethods()
        orderby method.Name
        group method by method.Name into g
        select new { Name = g.Key, Overloads = g.Count() };
```

### Query Operator Usage

1. Using Enumerable static methods to query a sequence:

   ```csharp
   var colors = new List<string> { "Green", "Blush", "Yellow" };

   // Use static methods in Enumerable
   // Call the Where method, pass an IEnumerable and delegate (predicate function)
   var w = Enumerable.Where(colors, c => c.StartsWith("B"));
   ```

2. Using Enumerable extension methods to query a sequence:

   ```csharp
   var colors = new List<string> { "Green", "Blush", "Yellow" };

   // Call the Where method using extension method syntax on an IEnumerable
   // and pass a delegate (predicate function)
   var w = colors.Where(c => c.StartsWith("B"));
   ```

3. Using Query Expression syntax:

   ```csharp
   var numbers = new List<int> { 1, 100, 98, 23, 55 };

   // Starts with
   // from varName in sequence

   var q = from n in numbers
           select n;

   var q2 = from n in numbers
           orderby n descending
           where n % 100 == 0
           select (n + 50);
   ```

### Deferred Execution

The execution of a query is distinct from the creation of the query.

- You do not retrieve any data just by creating a query

```csharp
var numbers = new List<int> { 1, 100, 98, 23, 55 };

var q = from n in numbers
        orderby n
        select n;

// Running the query
var numAsArray = q.ToArray();

// Running again
var numAsList = q.ToList();

foreach (var item in q)
{
  Console.WriteLine(item);
}
```

### Execution Pipeline

Combine extension methods to create execution pipeline:

```csharp
var colors = new List<string> { "Green", "Blush", "Yellow" };

// Where returns IEnumerable<T>
var pipe1 = colors.Where(c => c.Length > 5);

// OrberBy returns IOrderedEnumerable<T>
var pipe2 = pipe1.OrderBy(p => p);

// Distinct returns IEnumerable<T>
var pipe3 = pipe2.Distinct();

// Combining all
var q = colors.Where(c => c.Length > 5).OrderBy(p => p).Distinct();
```

### Query Syntax vs Method Syntax

Query syntax and method syntax are semantically identical, but many people find query syntax simpler and easier to read.

- Some queries must be expressed as method calls

_Example:_ To retrieve the number of elements that match a specified condition, we need to use `Count()` method:

```csharp
var colors = new List<string> { "Green", "Blush", "Yellow" };

var q = from color in colors
        where color.StartsWith("B")
        select color;

var count = q.Count();

// Combining both

var count = (from color in colors
        where color.StartsWith("B")
        select color).Count();
```

## Generators

The Enumerable class contains methods to generate `IEnumerable` sources

1. `Empty`: Returns a `0` length `Array<T>`

   - Low memory usage
   - Useful for a starting value, or as a empty parameter for method

   ```csharp
   var listOfDates1 = Enumerable.Empty<DateTime>();

   listOfDates1.GetType().Name;
   listOfDates1.Count();

   // Create empty List
   List<DateTime> listOfDates2 = Enumerable.Empty<DateTime>().ToList();

   listOfDates1.GetType().Name;
   ```

2. `DefaultIfEmpty`: When the source enumerable has no entries, it returns an enumerable with a single value; the default value of that Type

   ```csharp
   var numbers1 = new List<int> { 1, 2, 3, 5 };
   var numbers2 = Enumerable.Empty<int>().ToList();

   var listOfInts1 = Enumerable.DefaultIfEmpty<int>(numbers1);
   // 1, 2, 3, 5

   var listOfInts2 = Enumerable.DefaultIfEmpty<int>(numbers2);
   // 0
   ```

3. `Repeat`: Adds a set of repeated items to `IEnumerable`

   ```csharp
   // statement based way to add items
   List<int> manyThrees = new List<int>();
   for (int i = 0; i < 128; i++)
   {
     manyThrees.Add(3);
   }


   // using a function is preferable to writing statements (Functional Programming)
   var manyFives = Enumerable.Repeat<int>(5, 200);
   ```

4. `Range`: Generates a sequence of integral numbers within a specified range

   ```csharp
   var numbers = Enumerable.Range(start: 1000, count: 30);

   // skipping numbers
   var odds = Enumerable.Range(start: 1000, count: 30).Where(e => e % 2 == 1);
   ```

## Query Expressions

The Query expression syntax is a substitute for calling the query operator extension method

LINQ query expressions can be categorized into 3 areas:

1. Takes a sequence, returns a new sequence containing the same element type

   - Doubles to Doubles, Strings to Strings, Products to Products, etc.
   - Elements are the same, but may be sorted, grouped, filtered

2. Takes a sequence, returns a new sequence containing a different type of element

   - Transforms the object into another type
   - Integers to Decimals, Products to Strings

   ```csharp
   IEnumerable<string> colors = new List<string> { "Green", "Blush", "Yellow" };

   // this query takes a list of strings and returns a list of integers
   IEnumerable<int> q = from c in colors
                       select c.Length;
   ```

3. Takes a sequence, returns a single value

   - AKA (reduce, fold, aggregate, accumulate, etc.)
   - Reduces a list of data to a aggregate value min, max, sum
   - They require use to extension methods to perform these operations along with query expression

   Query Expression Clauses:

   - There are additional words (other than extension methods) needed for a valid query expression know as Clauses

     - Required in all query expressions: `[from, in]`
     - Required, query expression must end with one of these clauses: `[select, group]`
     - Optional: `[where, orderby, join, let, from]`

   ```csharp
   IEnumerable<string> q1 = colors.select(c => c);

   // the above can be written using query expression
   IEnumerable<string> q2 = from c in colors
                           select c;
   ```

### Select

Select returns a sequence of the chosen type: `IEnumerable<string>, IOrderedEnumerable<Product>`

`SelectMany` flattens a one-many relationship or saying it another way , it can ungroup nested sequences

```csharp
void Main()
{
  HistoryCalendar cal;
  var calendars = new List<HistoryCalendar> ();

  cal = new HistoryCalendar();
  cal.Decade = "Seventies";
  cal.Years = Enumerable.Range(1970, 10).ToList();
  calendars.Add(cal);

  cal = new HistoryCalendar();
  cal.Decade = "Eighties";
  cal.Years = Enumerable.Range(1980, 10).ToList();
  calendars.Add(cal);

  var q = from calendar in calendars
          select calendar;

  var q2 = calendars.SelectMany(m => m.Years);
}

// Define other methods and classes here
public class HistoryCalendar
{

  public string Decade { get; set; }
  public List<int> Years { get; set; }
}
```

### Filters

1. `Where`: The Where clause filters the sequence based on a predicate function

   - The predicate is applied to each element in the sequence
   - Define a predicate that uses a boolean expression to determine what to return in filtered sequence

   ```csharp
   var q = from color on colors
           where color.Length > 5
           select color;
   ```

2. `OfType<T>`: This operator is used to return only the elements of a specified type

### Aggregates

1. `Sum()`
2. `Average()`
3. `Min()`
4. `Max()`
5. `Count()`: Can take a optional predicate lambda

   ```csharp
   var count = numbers.Count(n => n > 20);
   ```

6. `Aggregate`: Define a function to call from custom aggregator

   ```csharp
   var setA = Enumerable.Range(1, 20).Where(x => x % 3 == 0);

   var multipleOf = setA.Aggregate((first, second) => first * second);

   // Set the initial seed (accumulator value)
   var multipleOf = setA.Aggregate(120, (first, second) => first * second);
   ```

### Groups

Group produces a sequence of groups, organized by a key.

`GroupBy` returns a sequence of groups

- Each group has a 'key' and a 'value'
- GroupBy uses an expression to determine the group 'key' and which sequence items belong in that group
- The 'value' is the sequence of items in the group

```csharp
var colors = CourseLib.ColorSource.GetColors();

var groupedResult = colors.GroupBy(c => c.ColorFamily );

var q = from color in colors
        group color by color.ColorFamily;
```

Use `elementSelector` to specify what properties on the members of the group

```csharp
var colors = CourseLib.ColorSource.GetColors();

var groupedByColorFamily = colors.GroupBy(keySelector: x => x.ColorFamily, elementSelector: y => new { y.ColorName, y.HexValue });

// similarly
var q = from color in colors
        let colorShort = new { color.ColorName, color.ColorFamily }
        group colorShort by colorShort.ColorFamily; // key selector
```

Change the key name or value name with `resultSelector`:

```csharp
var groupedByColorFamily = colors.GroupBy(keySelector: x => x.ColorFamily, elementSelector: y => new { y.ColorName, y.HexValue }, resultSelector: (key, value) => new {Family = key, Colors = value });

// similarly
var q = from color in colors
        let colorShort = new { color.ColorName, color.ColorFamily }
        group colorShort by colorShort.ColorFamily //key selector
        into familyGroup // variable used in resultSelector
        select new { Family = familyGroup.Key, Colors = familyGroup }; // result selector
```

### Joins

Join together two sequences

```csharp
var setA = Enumerable.Range(2, 3);
var setB = Enumerable.Range(5, 3);

var g1 = from a in setA
         from b in setB
         group a by b into groupA
         select groupA;

var q1 = setA.Select(a => setB.Select(b => $"A {a}, B:{b}"));


var q2 = from a in setA
         from b in setB
         select new {a, b };
```

### First and Last

Returns the first or last element of a sequence. `First()` and `Last()` will throw exception if the sequence is empty.

```csharp
var numbers = new List<int> { 50, 4, 10, 3 };

numbers.First();  // 50
numbers.Last();   // 3

var emptyNumbers = new List<int>();

numbers.First();
numbers.Last();
```

Use `FirstOrDefault`, `LastOrDefault`:

```csharp
var emptyNumbers = new List<int>();
var emptyStrings  = new List<string>();
var emptyBools  = new List<bool>();
var emptyPerson  = new List<Person>();

emptyNumbers.FirstOrDefault();  // 0
emptyStrings.FirstOrDefault();  // null
emptyBools.LastOrDefault();     // False

emptyPerson.FirstOrDefault();
```

### Find

Find() Method:

- Purpose: The `Find()` method is designed for retrieving an entity by its primary key. It is a more efficient way to retrieve an entity when you know the primary key value

- Performance: `Find()` can be more efficient for retrieving entities by primary key because it first checks if the entity is already in the context's change tracker. If it is, it returns the tracked entity without making a database query. If not, it fetches the entity from the database and adds it to the context's change tracker

- No asynchronous version

_Example:_

```csharp
var entity = dbContext.Set<TEntity>().Find(id);
```

### Index

`ElementAt`: Returns the element at a specified index in a sequence.

`ElementAtOrDefault`: Returns the element at a specified index in a sequence or a default value if the index is out of range.

```csharp
var fiveCount = new List<int> { 0, 5, 10, 15, 20, 25, 30};

fiveCount.ElementAt(1);           // 5
fiveCount.ElementAtOrDefault(22); // 0
```

### Single

`Single`: Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

`SingleOrDefault`: Returns a single, specific element of a sequence, or a default value if that element is not found.

```csharp
var colors =  CourseLib.ColorSource.GetColors();

colors.Single(x => x.ColorName =="SteelBlue");
colors.SingleOrDefault(x => x.ColorName =="DirtBrown");
```

### Distinct

Select only distinct values

```csharp
List<int> numbers = new List<int>{ 1, 2, 2, 1, 3, 5, 5, 6 };

var q = numbers.Distinct();

// use select to specify what property to evaluate for distinct
var distinctColors = CourseLib.ColorSource.GetColors().Select(x=>x.HexValue).Distinct();
```

### Intersect

`Intersect`: items that occur in both sets

```csharp
var numbersA = new List<int>{ 0, 2, 4, 5, 6, 8, 9, 8};
var numbersB = new List<int>{ 1, 3, 5, 7, 8, 9 };

var q = numbersA.Intersect(numbersB);
```

### Union

`Union`: merge two sequences, remove all duplicates

```csharp
var numbersA = new List<int> { 0, 2, 4, 5, 6, 8, 9, 8 }; // 8 items
var numbersB = new List<int> { 1, 3, 5, 7, 8, 9 };       // 6 items

var q = numbersA.Union(numbersB);
```

### Except

`Except`: returns members of the first set that don't appear in the second set.

```csharp
var numbersA = new List<int> { 0, 2, 4, 5, 6, 8, 9, 8 }; // 8 items
var numbersB = new List<int> { 1, 3, 5, 7, 8, 9 };       // 6 items

var q1 = numbersA.Except(numbersB);
var q2 = numbersB.Except(numbersA);
```

### Quantify

- `Any`: Check for empty list

  - Stops evaluation as soon as it find a item that satisfies

  ```csharp
  var colors = new List<string>
      { "Green", "Blush", "Yellow",  "Red", "Orange", "Burgandy","Purple",
         "White", "Black", "Blue" ,"Bronze"};
  var emptyList = new List<double>();

  // look at the Count vs. Any methods
  // both are useful to determine if a sequence has values

  colors.Count();
  emptyList.Count();

  // vs.

  colors.Any();
  emptyList.Any();

  // one issue with using the aggregate Count method
  // is that it iterates the entire sequence
  if (colors.Count() > 0)
  {
    "Items in colors!";
  }
  else
  {

    "Colors is empty!";
  }

  // this is a better approach!
  if (colors.Any())
  {
    "Items in colors!";
  }
  else
  {

    "Colors is empty!";
  }
  ```

- `Any([predicate])`: Determines whether any element of a sequence exists or satisfies a condition.

  - Stops evaluation as soon as it find member that satisfies
  - Takes an predicate as a parameter

  ```csharp
  var colors = CourseLib.ColorSource.GetColors();

  bool hasMatchingItem = colors.Any(w => w.ColorName.StartsWith("C"));

  var q = from c in colors
          where c.ColorName.StartsWith("C")
          select c.ColorName;

  bool hasMaxBlue = colors.Any(c => c.BlueValue >=255);
  ```

- `Contains`: return whether a specified item is contained in the sequence.

  - Takes a object as a parameter

  ```csharp
  var numbers = new List<int> { 24, 18, 16, 76, 14, 24, -10 };
  var containsNumber = numbers.Contains(14);

  var colors = CourseLib.ColorSource.GetColors();
  var colorRef1 = new CourseLib.WebColor { ColorName = "DirtBrown", ColorFamily = CourseLib.ColorFamily.Brown };
  var colorRef2 = colors.ElementAt(101);

  var containsBrown = colors.Contains(colorRef1);

  var containsOther = colors.Contains(colorRef2);
  ```

- `All`: returns whether all the elements in the input sequence match the given predicate

  ```csharp
  var colors = CourseLib.ColorSource.GetColors();

  var numbers = new List<int> { 25, 18, 16, 76, 140, 24 ,-10};

  var areEven = numbers.All(x => x % 2 == 0); // False

  var hasTwoDigits = numbers.All(n => Math.Floor(Math.Log10(Math.Abs(n)) + 1) == 2); // True
  ```

### Partition

- `Take`: Get a consecutive subset of the sequence
- `Skip`: Skip a consecutive subset of the sequence

  ```csharp
  var numbers = Enumerable.Range(1, 50);

  numbers.Take(5);

  numbers.Skip(46);
  numbers.Skip(numbers.Count() - 12);

  numbers.Skip(2).Take(3);
  // new in .NET 6 same as above
  numbers.Take(2..5);

  numbers.Skip(2).Take(10);
  ```

- `TakeWhile`: Returns elements from a sequence
  as long as a specified condition is true,
  and then skips the remaining elements.

- `SkipWhile`: Bypasses elements in a sequence
  as long as a specified condition is true
  and then returns the remaining elements.

  ```csharp
  var numbers = new List<int> { 21, 32, 43, 54, 65, 201, 301, 401, 76, 87, 98 };

  numbers.TakeWhile(x => x <100 ).Dump();

  numbers.SkipWhile(x => x <100 ).Dump();
  ```

Chunk a collection with LINQ:

```csharp
// .NET 5 <
public IEnumerable<IEnumerable<T>> ChunkBy<T>(IEnumerable<T> source, int chunkSize)
{
    return source
        .Select((x, i) => new { Index = 1, Value = x })
        .GroupBy(x => x.Index / chunkSize)
        .Select(x => x.Select(v => v.Value));
}

public IEnumerable<Task[]> Chunk<T>(IEnumerable<T> enumerable, int size)
{
    while (enumerable.Any())
    {
        yield return enumerable.Take(size).ToArray();

        enumerable = enumerable.Skip(size);
    }
}

// .NET 6 +
public IEnumerable<Task[]> Chunk<T>(IEnumerable<T> enumerable, int size)
{
    return enumerable.Chunk(size);
}

```

### 3rd Party Extensions

LINQ provides many useful Enumerable methods.

- Many are implemented as Extension methods

- It's possible to create more extension methods to add other query operations.

- _MoreLinq_ is available as a [NuGet package](https://morelinq.github.io/)
- Examples at [Link](https://github.com/morelinq/examples):

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7 };

// Returns a sequence with a range of elements in the source sequence moved to a new offset.
var resultA = numbers.Move(3,numbers.Count(),0);

// Pads a sequence with default values if it is narrower (shorter in length)
// than a given width.
var resultA = numbers.Pad(10);

// Pads a sequence with default values in the beginning if it is narrower (shorter in length)
// than a given width.
var resultB = numbers.PadStart(12);

// Returns a sequence of elements in random order from the original sequence.
var resultA = numbers.Shuffle();

// Generates a sequence of lists that represent the permutations of the original sequence
var resultB = numbers.Permutations();

// Returns every N-th element of a source sequence
var resultA = numbers.TakeEvery(8);
```

## References

- [LINQPad - The .NET Programmer's Playground](https://www.linqpad.net/)
