---
title: 'Kotlin Language'
description: "a.k.a Android Language"
pubDate: 'Mar 13 2024'
updatedDate: 'Mar 13 2024'
heroImage: '/kotlin-gradient.png'
---

## Intro

TODO

## Data Types

The [official doc](https://kotlinlang.org/docs/basic-types.html) has a complete and pretty easy text about the basic types. These notes aren't supposed to be a mirror of any documentation already available online.

## Higher-order functions and lambdas

[Source doc](https://kotlinlang.org/docs/lambdas.html). TODO.

## Working with Dates

TODO

## Ranges and progressions

There is an official text about [ranges in Kotlin](https://kotlinlang.org/docs/ranges.html). Below, I will cover what isn't in the docs at least in a first look.

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
