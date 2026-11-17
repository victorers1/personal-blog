---
title: 'Kotlin Language'
description: "a.k.a Android Language"
date: 2024-03-13
---

## Intro

TODO

## Data Types

The [official doc](https://kotlinlang.org/docs/basic-types.html) has a complete and pretty easy text about it. These notes aren't supposed to be a mirror of the documentation already available online.

### Any, Unit & Nothing

`Any`: The root of the Kotlin class hierarchy. Every Kotlin class has `Any` as a superclass.

```kotlin title="Kotlin"
// The returned value's type isn't pre-defined
fun returnsAnyType(): Any? {
    val randomNumber = (0..5).random()
    return when (randomNumber) {
        0 -> "string"
        1 -> 's'
        2 -> 1
        3 -> Double.MAX_VALUE
        4 -> Float.MAX_VALUE
        5 -> true
        else -> null
    }
}
```

`Unit`: The type with only one value. This type corresponds to the `void` type in Java.

```kotlin title="Kotlin"
fun hasNoReturn(): Unit {
}
```

`Nothing`: `Nothing` has no instances. You can use `Nothing` to represent "a value that never exists": for example, if a function has the return type of `Nothing`, it means that it never returns (always throws an exception).

```kotlin title="Kotlin"
// This function can't return anything, not even an Unit
fun returnsNothing(): Nothing {
    throw Exception()
}
```

## Functions

[Source text](https://kotlinlang.org/docs/lambdas.html).

### Higher-order functions

A higher-order function is a function that takes functions as parameters, or returns a function. That's not exclusive to Kotlin.

### Functions literals

Function literals are functions that are not declared but are passed immediately as an expression. There are two kinds of function literal in Kotlin: **Lambda expressions** and **Anonymous functions**.

#### Lambda expressions

Below, an example of the usage of a lambda function that compares two strings by its lengths:

```kotlin title="Kotlin"
max(strings, { a, b -> a.length < b.length })
```

Since a lambda is an expression, it can be attributed into a variable:

```kotlin title="Kotlin"
// Types inside lambda
val isStringShorterThanInt = { a: String, b: Int -> a.length < b }

// Types outside lambda
val isGreaterThan: (Int, Int) -> Boolean = { a, b -> a > b }
```

There are a few cool syntax rules that applies to lambda expressions:

##### Inferred Return Value

If the inferred return type of the lambda is not Unit, the last (or possibly single) expression inside the lambda body is treated as the return value:

```kotlin title="Kotlin"
val compare: (String, String) -> Boolean = { str1, str2 ->
    val len1 = str1.length
    val len2 = str2.length
    len1 > len2
}
```

##### Passing Trailing Lambdas

According to Kotlin convention, if the last parameter of a function is a function, then a lambda expression passed as the corresponding argument can be placed outside the parentheses:

```kotlin title="Kotlin"
val product = items.fold(1) { acc, e -> acc * e }
```

Such syntax is also known as **trailing lambda**.

If the lambda is the only argument in that call, the parentheses can be omitted entirely:

```kotlin title="Kotlin"
data class Person(
    val age: Short
)

fun main() {
    val person = Person(27)

    // option 1
    val v = person.takeIf({ it -> it.age > 18 })

    // option 2
    val p = person.takeIf { it -> it.age > 18 }
}
```

##### it: Implicit Name Of A Single Parameter

If the compiler can parse the signature without any parameters, the parameter does not need to be declared and `->` can be omitted. The parameter will be implicitly declared under the name `it`.

```kotlin title="Kotlin"
// option 1
person.let { it -> print(it.age) }

// since there is only one argument, it can be omitted
person.let { print(it.age) }
```

##### Returning A Value From A Lambda Expression

In Kotlin, function can be nested using functions literals, local functions and expressions. When a `return` statement is called inside a lambda expression, will take effect on the outer calling function:

```kotlin title="Kotlin"
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return // non-local return directly to the caller of foo()
        print(it)
    }
    println("this point is unreachable")
}
```

To return from a lambda expression, qualify the `return`:

```kotlin title="Kotlin"
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return@forEach // local return to the caller of the lambda - the forEach loop
        print(it)
    }
    print(" done with implicit label")
}
```

Alternatively, you can replace the lambda expression with an anonymous function:

```kotlin title="Kotlin"
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach(fun(value: Int) {
        if (value == 3) return  // local return to the caller of the anonymous function - the forEach loop
        print(value)
    })
    print(" done with anonymous function")
}
```

##### Underscore For Unused Variables

If the lambda parameter is unused, you can place an underscore instead of its name:

```kotlin title="Kotlin"
map.forEach { (_, value) -> println("$value!") }
```

#### Anonymous Functions

They're simply normal functions without the name:

```kotlin title="Kotlin"
// with name
fun sum(a: Int, b: Int): Int {
    return a + b
}

// without name, with body
var sum = fun(a: Int, b: Int): Int {
    return a + b
}

// without name, expression body
var sum = fun(a: Int, b: Int): Int = a + b
```

The parameters and the return type are specified in the same way as for regular functions, except the parameter types can be omitted if they can be inferred from the context:

```kotlin title="Kotlin"
integers.filter(fun(item) = item > 0)
```

In the example above, the function `filter` expects an argument of type `(Int) -> Boolean` so, when passing just `fun(item) = item > 0` the compiler infers the type `Int` to `item`.

Note that when `filter` receives an anonymous function, this is placed inside `()`. If we gave a lambda expression, this could be placed inside `{}`:

```kotlin title="Kotlin"
integers.filter { it > 0 }
```

## Working with Dates

TODO

## Ranges and progressions

There's an official text about [ranges in Kotlin](https://kotlinlang.org/docs/ranges.html). Below, I will cover some concepts with examples.

### Comparing ranges

Ranges can be compared using equality operator (`==`).

```kotlin title="Kotlin"
fun main() {
    val zeroToTen: IntRange = 0.rangeTo(10)
    val zeroTo10: IntRange = 0..10
    println(zeroToTen == zeroTo10) // true

    val zeroToNine: IntRange = 0.rangeUntil(10)
    val zeroTo9: IntRange = 0..<10
    println(zeroToNine == zeroTo9) // true

    println(zeroTo10 == zeroTo9) // false
    println(zeroToTen == zeroToNine) // false
}
```

### Date ranges

Syntax to define a date range:

```kotlin title="Kotlin"
val birth = Date.from(Instant.ofEpochMilli(834669000000L))
val now = Date()
val life: ClosedRange<Date> = birth..now
```

`ClosedRange` doesn't have an iterable interface, so it cannot be used in a loop:

```kotlin title="Kotlin"
// error: For-loop range must have an 'iterator()' method
for (date in life) {
    println(date);
}
```

But it still have some getters:

```kotlin title="Kotlin"
print(life.start)
print(life.endInclusive)
```

And some methods that doesn't require iterating over each date:

```kotlin title="Kotlin"
val newMillennium = Date.from(Instant.ofEpochMilli(946684800000L))

life.contains(newMillennium);
life.run {
    start.before(now)
};
life.takeIf { range ->
    range.isEmpty()
};
life.isEmpty() // that's deep
```

## Classes and Objects

### Normal Classes

```kotlin title="Kotlin"
class Dog(val name: String, val breed: String, var age: Int = 1) {
    init {
        bark()
    }
    fun bark() {
        println("Woof Woof");
    }
}
```

### Data Classes

Given this example:

```kotlin title="Kotlin"
data class Coffee(
    val spoonsCount: Int,
    val ownerName: String,
    val size: String,
    val creamAmount: Int = 0
)
```

The compiler automatically derives the following members from all properties declared in the primary constructor:

- `.equals()`/`.hashCode()` pair.

- `.toString()` of the form "Coffee(spoonsCount=3, ownerName="John", size="XL", creamAmount=2)".

- `.componentN()` functions corresponding to the properties in their order of declaration.

- `.copy()` function.

### Constructors

Every class have an implicit constructor which doesn't need to be written.

```kotlin title="Kotlin"
class Empty
```

The implicit constructor (a.k.a default constructor) can be private. Having only privates constructors, the class can't be instanced, just like the `Nothing` class. Example:

```kotlin title="Kotlin"
class NoInstance private constructor()
```

The class below has a default constructor which requires a String and a Short.

```kotlin title="Kotlin"
class Constructor(private var name: String, private var age: Short) {

    /**
    When defining another constructor, it needs to call the default constructor using `this`
    keyword.
     */
    constructor() : this("", 0) {
        // Constructors can have a body
        println("Warning: constructed an empty object")
    }

    /**
     * More than one constructor can be defined, as long as they don't have the same signature.
     */
    constructor(name: String) : this(name, 0)

    /**
     * The definition below is invalid because the default constructor already has the signature
     * (String, Short)
     */
    // constructor(str: String, num: Short) : this(str, num)

    override fun toString(): String = "Constructor(name: $name, age: $age)"
}
```

Usage example:

```kotlin title="Kotlin"
fun main() {
    Empty() // Has an implicit constructor

    // NoInstance() Can't be instanced

    val c1 = Constructor()
    val c2 = Constructor("Victor")
    val c3 = Constructor("Victor", 18)

    for (c in arrayOf(c1, c2, c3)) {
        println(c)
    }
}
```

### Inline Value Classes

TODO

### Object Expressions and Declarations

TODO

### Getters, Setters & fields

TODO

### Late Initialization

TODO

### With

TODO

## Async Programming

TODO

## Coroutines

TODO

## Nice Utilities

### Random Numbers

The easiest to generate a random Int way is through ranges:

```kotlin title="Kotlin"
val randomNumber = (0..5).random()
```

To generate random `Double` in the range `[0.0, 1.0)`, do:

```kotlin title="Kotlin"
val random = Math.random()
```

Since computers doesn't have infinite precision, there is a limited amount of `Double` numbers they can represent. Given a number N, you can verify what's the next possible `Double` right after or before N. For example, let `N = 1.0`. We can verify that the next `Double` that the computer can represent is `1.0000000000000002` by running:

```kotlin title="Kotlin"
println(1.0.nextUp())
```

We can verify that `0.9999999999999999` is the `Double` value right before the 1.0 with the command `println(1.0.nextDown())`.

The same applies to `Float`:

```kotlin title="Kotlin"
println(1.0f.nextDown()) // 0.99999994
println(1.0f.nextUp()) // 1.0000001
```

Since the largest double value less than 1.0 is `Math.nextDown(1.0)`, a value $x$ in the closed range $[x1, x2]$ where $x1 \leq x2$ may be defined by the statements:

```kotlin title="Kotlin"
double f = Math.random()/Math.nextDown(1.0);
double x = x1*(1.0 - f) + x2*f;
```
