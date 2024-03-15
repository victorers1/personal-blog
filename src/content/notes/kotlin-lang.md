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
