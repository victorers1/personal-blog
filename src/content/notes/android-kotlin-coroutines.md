---
title: 'Android Coroutines and Flow'
description: "Notes of a Udemy course"
pubDate: 'Apr 07 2025'
updatedDate: 'Apr 08 2025'
heroImage: '/android-gradient.png'
---

## Intro

- Course: [Kotlin Coroutines and Flow for Android Development](https://globant.udemy.com/course/coroutines-on-android/)
- Language version: Kotlin 2.0.21
- IDE: Android Studio Meerkat | 2024.3.1
- Runtime version: 21.0.5+-12932927-b750.29 aarch64
- VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.
- macOS: 15.3.2

## Routines vs. Coroutines

**Routines**: a sequence of actions regularly followed; a fixed program.

**Coroutines**: Cooperative routines

Example of program that runs on a single thread, no coroutine involved:

```kotlin
fun main() {
    println("main starts")

    routine(1, 500)

    routine(2, 300)

    println("main ends")
}

// Doesn't create new threads or coroutines. Blocks the main thread, where it's running
fun routine(number: Int, delay: Long) {
    println("Coroutine $number starts work on ${Thread.currentThread().name}")
    Thread.sleep(delay) // Blocks current thread
    println("Coroutine $number has finished on ${Thread.currentThread().name}")
}
```

Output:

```text
main starts
Coroutine 1 starts work on main
Coroutine 1 has finished on main
Coroutine 2 starts work on main
Coroutine 2 has finished on main
main ends
```

Same logic using Coroutines:

```kotlin
fun main() = runBlocking {
    println("main starts")

    // Register all coroutines to run in parallel.
    // Because of that, the run time is 500 ms
    joinAll(
        async { coroutine(1, 500) },
        async { coroutine(2, 300) }
    )

    println("main ends")
}

suspend fun coroutine(number: Int, delay: Long) {
    println("Coroutine $number starts work on ${Thread.currentThread().name}")
    delay(delay)
    println("Coroutine $number has finished on ${Thread.currentThread().name}")
}
```

Output:

```text
main starts
Coroutine 1 starts work on main
Coroutine 2 starts work on main
Coroutine 2 has finished on main
Coroutine 1 has finished on main
main ends
```

Because of how coroutines works, the output was different. To obtain the above result using threads, we do:

```kotlin
fun main() {
    println("main starts")

    threadRoutine(1, 500)
    threadRoutine(2, 300)

    println("main ends")
}

fun threadRoutine(number: Int, delay: Long) {
    thread { // Creates a new thread
        println("Coroutine $number starts work on ${Thread.currentThread().name}")
        Thread.sleep(delay)
        println("Coroutine $number has finished on ${Thread.currentThread().name}")
    }
}
```

Output:

```text
main starts
Coroutine 1 starts work on Thread-0
Coroutine 2 starts work on Thread-1
Coroutine 2 has finished on Thread-1
Coroutine 1 has finished on Thread-0
main ends
```

So, what's the point of Coroutines? *Efficiency*.

> "Coroutines are light-weight Threads".
>
> &mdash; *Every coroutine tutorial*

That's why it is possible to create 1 million coroutines:

```kotlin
fun main() = runBlocking {
    repeat(1_000_000) {
        launch {
            delay(5000)
            print("*")
        }
    }
}
```

Output (1 million asterisks, you can check in a text editor):

```text
**********************************[...]*************************
```

But, you can't run 1 million threads (in a mere personal laptop):

```kotlin
fun main() {
    repeat(1_000_000) {
        thread {
            Thread.sleep(5000)
            print("*")
        }
    }
}
```

Output:

```text
[0.445s][warning][os,thread] Failed to start thread "Unknown thread" - pthread_create failed (EAGAIN) for attributes: stacksize: 2048k, guardsize: 16k, detached.
[0.445s][warning][os,thread] Failed to start the native thread for java.lang.Thread "Thread-4074"
Exception in thread "main" java.lang.OutOfMemoryError: unable to create native thread: possibly out of memory or process/resource limits reached
 at java.base/java.lang.Thread.start0(Native Method)
 at java.base/java.lang.Thread.start(Unknown Source)
 at kotlin.concurrent.ThreadsKt.thread(Thread.kt:42)
 at kotlin.concurrent.ThreadsKt.thread$default(Thread.kt:20)
```

## Blocking vs. Suspending

In Kotlin, suspending a function means pausing its execution at a specific point and allowing the program to continue with other tasks, **without blocking the thread**.

- Coroutines can be suspended and resumed
- While suspended, they don't block any thread
- In contrast to blocked threads, other tasks can be performed while Coroutines are suspended.

## Multithreaded Coroutines

It's possible to change the thread by command line:

```kotlin
fun main() = runBlocking {
    println("main starts")

    joinAll( // equivalent to a for-each Job
        async { multiThreadCoroutine(1, 500) },
        async { multiThreadCoroutine(2, 300) }
    )

    println("main ends")
}

suspend fun multiThreadCoroutine(number: Int, delay: Long) {
    println("Coroutine $number starts work on ${Thread.currentThread().name}")
    delay(delay)

    withContext(Dispatchers.Default) {
        println("Coroutine $number has finished on ${Thread.currentThread().name}")
    }

}
```

Output:

```text
main starts
Coroutine 1 starts work on main
Coroutine 2 starts work on main
Coroutine 2 has finished on DefaultDispatcher-worker-1
Coroutine 1 has finished on DefaultDispatcher-worker-1
main ends
```

## Keywords

- Job

- Deferred
