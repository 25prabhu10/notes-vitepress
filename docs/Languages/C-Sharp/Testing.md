---
title: Testing
description: .NET Testing
---

# Testing

For more details checkout [Testing](../../Concepts/Testing/)

## Unit Testing

Unit Testing Frameworks:

- [NUnit](https://nunit.org/)
- [xUnit](https://xunit.net/)
- MSTest

Mocking Libraries: Handle indirect outputs of SUT

- [Moq](https://github.com/moq/moq4)
- NSubsititue
- FakeItEasy
- Microsoft Fakes

Assertion Libraries:

- [Fluent Assertions](https://fluentassertions.com/introduction)

### NUnit

- Setup:

  ```csharp
  class SomethingTests
  {
      [SetUp]
      public void SetUp()
      {

      }
  }
  ```

- Test:

  ```csharp
  [Test]
  public void ShouldReturnSomething()
  {
      // Arrange

      // Act

      // Assert
  }
  ```

### XUnit

- Written by the developers of [NUnit](#nunit)
- Intuitive terminology
- Excellent extensibility

Elements

- `[Fact]`: is always true
- `[Theory]`: is true with the right data
- `[InlineData]`, `[MemberData]`, `[ClassData]`: passing data to a unit test
- Constructor should be used for Set Up

Parametrized tests: Using `[Theory]`: represents a suite of tests that execute the same code but have different input arguments.

- `[InlineData]`: Pass data inline
- `[MemberData]`: Fetch data from a static property or method
- `[ClassData]`:

_Example:_

```csharp
[Theory]
[InlineData(1, 2, 1)]
[InlineData(1, 3, 2)]
public void DiffTest(int x, int y, int expectedValue)
{
    // Arrange
    var calculator = new MathFormulas();

    // Act
    var result = calculator.Diff(x, y);

    // Assert
    Assert.Equal(expectedValue, result);
}
```

```csharp
// Create test data
public static IEnumerable<object[]> Data =>
        new List<object[]>
        {
            new object[] { 1, 2, 3},
            new object[] { -4, -6, -10},
            new object[] { -2, 2, 0},
            new object[] { int.MinValue, -1, int.MacValue},
        };

[Theory]
[MemberData(nameof(MathFormulas.Data), MemberType = nameof(MathFormulas))]
public void AddTest(int x, int y, int expectedValue)
{
    // Arrange
    var calculator = new MathFormulas();

    // Act
    var result = calculator.Add(x, y);

    // Assert
    Assert.Equal(expectedValue, result);
}
```

```csharp
// Create test data
public IEnumerator<object[]> GetEnumerator()
{
    yield return new object[] { 1, 2, 3};
    yield return new object[] { -4, -6, -10};
    yield return new object[] { -2, 2, 0};
    yield return new object[] { int.MinValue, -1, int.MacValue};
}

IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

[Theory]
[ClassData(nameof(MathFormulas))]
public void AddTest(int x, int y, int expectedValue)
{
    // Arrange
    var calculator = new MathFormulas();

    // Act
    var result = calculator.Add(x, y);

    // Assert
    Assert.Equal(expectedValue, result);
}
```

Skip Tests:

- `[Fact(Skip = "the reason")]`
- `[Theory(Skip = "the reason")]`
