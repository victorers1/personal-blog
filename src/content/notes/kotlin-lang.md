---
title: 'Kotlin Language'
description: "a.k.a Android Language"
pubDate: 'Mar 13 2024'
updatedDate: 'Apr 15 2024'
heroImage: '/kotlin-gradient.png'
---

## Intro

TODO

## Data Types

The [official doc](https://kotlinlang.org/docs/basic-types.html) has a complete and pretty easy text about the basic types. These notes aren't supposed to be a mirror of any documentation already available online.

## Functions

[Source text](https://kotlinlang.org/docs/lambdas.html).

### Higher-order functions

A higher-order function is a function that takes functions as parameters, or returns a function. That's not exclusive to Kotlin, it's a well-known computer science concept.

### Functions literals

In Kotlin there are a few ways of creating a function, one of them are **Function literals**. Function literals are functions that are not declared but are passed immediately as an expression. There are two kinds of function literal in Kotlin: **Lambda expressions** and **Anonymous functions**.

#### Lambda expressions

Below, an example of the usage of a lambda function that compares two strings by its lengths:

```kotlin
max(strings, { a, b -> a.length < b.length })
```

Since a lambda is an expression, it can be attributed into a variable:

```kotlin
// Types inside lambda
val isStringShorterThanInt = { a: String, b: Int -> a.length < b }

// Types outside lambda
val isGreaterThan: (Int, Int) -> Boolean = { a, b -> a > b }
```

There are a few cool syntax rules that applies to lambda expressions:

##### Inferred Return Value

If the inferred return type of the lambda is not Unit, the last (or possibly single) expression inside the lambda body is treated as the return value:

```kotlin
val compare: (String, String) -> Boolean = { str1, str2 ->
    val len1 = str1.length
    val len2 = str2.length
    len1 > len2
}
```

##### Passing Trailing Lambdas

According to Kotlin convention, if the last parameter of a function is a function, then a lambda expression passed as the corresponding argument can be placed outside the parentheses:

```kotlin
val product = items.fold(1) { acc, e -> acc * e }
```

Such syntax is also known as **trailing lambda**.

If the lambda is the only argument in that call, the parentheses can be omitted entirely:

```kotlin
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

```kotlin
// option 1
person.let { it -> print(it.age) }

// since there is only one argument, it can be omitted
person.let { print(it.age) }
```

##### Returning A Value From A Lambda Expression

In Kotlin, function can be nested using functions literals, local functions and expressions. When a `return` statement is called inside a lambda expression, will take effect on the outer calling function:

```kotlin
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return // non-local return directly to the caller of foo()
        print(it)
    }
    println("this point is unreachable")
}
```

To return from a lambda expression, qualify the `return`:

```kotlin
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return@forEach // local return to the caller of the lambda - the forEach loop
        print(it)
    }
    print(" done with implicit label")
}
```

Alternatively, you can replace the lambda expression with an anonymous function:

```kotlin
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

```kotlin
map.forEach { (_, value) -> println("$value!") }
```

#### Anonymous Functions

They're simply normal functions without the name:

```kotlin
// with name
fun sum(a: Int, b: Int): Int {
    return a + b
}

// without name, body body
var sum = fun(a: Int, b: Int): Int {
    return a + b
}

// without name, expression body
var sum = fun(a: Int, b: Int): Int = a + b
```

The parameters and the return type are specified in the same way as for regular functions, except the parameter types can be omitted if they can be inferred from the context:

```kotlin
integers.filter(fun(item) = item > 0)
```

In the example above, the function `filter` expects an argument of type `(Int) -> Boolean` so, when passing just `fun(item) = item > 0` the compiler infers the type `Int` to `item`.

Note that when `filter` receives an anonymous function, this is placed inside `()`. If we gave a lambda expression, this could be placed inside `{}`:

```kotlin
integers.filter { it > 0 }
```

## Working with Dates

TODO

## Ranges and progressions

There is an official text about [ranges in Kotlin](https://kotlinlang.org/docs/ranges.html). Below, I will cover what isn't in the docs, at least in a first look.

### Comparing ranges

Ranges can be compared using equality operator (`==`).

```kotlin
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

```kotlin
val birth = Date.from(Instant.ofEpochMilli(834669000000L))
val now = Date()
val life: ClosedRange<Date> = birth..now
```

`ClosedRange` doesn't have an iterable interface, so it cannot be used in a loop:

```kotlin
// error: For-loop range must have an 'iterator()' method
for (date in life) {
    println(date);
}
```

But it still have some getters:

```kotlin
print(life.start)
print(life.endInclusive)
```

And some methods that doesn't require iterating over each date:

```kotlin
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

## Classes

### Normal Classes

```kotlin
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

```kotlin
data class Coffee(
    val spoonsCount: Int,
    val ownerName: String,
    val size: String,
    val creamAmount: Int = 0
)
```

Usage:

```kotlin
fun main() {
    println("Who is this coffee for?");
    val name: String = readln();
    println("How many spoons of sugar do you want?");
    val spoons: Int = readln().toInt();

    val coffee = Coffee(spoons, name, "XXL", 3)
    println("Created $coffee")
}
```

An example of usage:

**Terminal**: Who is this coffee for?

**User input**: *denis*

**Terminal**: How many spoons of sugar do you want?

**User input**: *3*

**Terminal**: Created Coffee(spoonsCount=3, ownerName=denis, size=XXL, creamAmount=3)

## Async Programming

TODO

## Coroutine

TODO
