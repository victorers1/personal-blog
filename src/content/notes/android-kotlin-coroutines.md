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

- Coroutines can be suspended and resumed.
- While suspended, Coroutines don't block any thread. Unlike the `Thread.sleep` command, which blocks the thread.
- In contrast to blocked threads, other tasks can be performed while Coroutines are suspended.
- If the program ends when non-blocking Coroutines are running, they will be canceled.
- There is the `runBlocking` method to make a Coroutine block the thread in which it's running. As Coroutine are meant to be non-blocking, this method is not common in production code.

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

## Coroutine builders

### `launch`

Starts a non-blocking Coroutine that runs suspended functions sequentially:

```kotlin
fun main() {

    // launch starts a non-blocking coroutine.
    // The body will start to run, but both `delay(200)` will make the program
    // jump to the next line out of the `launch` and continue execution for 400 ms
    GlobalScope.launch {
        delay(200)
        delay(200) // executed after 200 ms
        println("printed from within Coroutine")
    }

    Thread.sleep(1000) // Without this, the above println won't be executed
    println("main ends")
}
```

Output without `Thread.sleep`:

```text
main ends
```

Output with `Thread.sleep`:

```text
printed from within Coroutine
main ends
```

The `launch` method returns a `Job` object, refer to the [Job](#job) section to get details.

OBS: It's not recommended to use `GlobalScope` in production code.

### `runBlocking`

Runs a new coroutine and blocks the current thread *interruptibly* until its completion.

```kotlin
fun main() = runBlocking<Unit> {
    launch {
        delay(500)
        println("printed from within Coroutine")

        // Because of how launch works, we don't have access to the
        // return value of the coroutine.
        networkRequest()
    }

    println("main ends")
}

suspend fun networkRequest(): String {
    delay(500)
    return "Result"
}
```

Output:

```text
main ends
printed from within Coroutine
```

In this other example, both `launch`s suspend its execution and the final print appears first in the console:

```kotlin
fun main() = runBlocking<Unit> {

    var resultList = mutableListOf<String>()

    val startTime = System.currentTimeMillis()

    launch {
        val result1 = networkCall(1) // makes the function suspend
        resultList.add(result1)
        println("result1 received: \'$result1\' after ${elapsedMillis(startTime)}ms")
    }

    launch {
        val result2 = networkCall(2) // makes the function suspend
        resultList.add(result2)
        println("result2 received: \'$result2\' after ${elapsedMillis(startTime)}ms")
    }

    println("Result list: \'$resultList\' after ${elapsedMillis(startTime)}ms")
}

suspend fun networkCall(number: Int): String {
    delay(500)
    return "Result $number"
}

fun elapsedMillis(startTime: Long) = System.currentTimeMillis() - startTime
```

Output:

```text
Result list: '[]' after 7ms
result1 received: 'Result 1' after 514ms
result2 received: 'Result 2' after 514ms
```

In the above code, we can use `job.join()` to suspend the current task and release the current thread to other task until the job is finished.

```kotlin
fun main() = runBlocking<Unit> {

    // Shared mutable state
    // This should be avoided whenever possible as it can lead to
    // racing problems
    var resultList = mutableListOf<String>()

    val startTime = System.currentTimeMillis()

    val job1 = launch {
        val result1 = networkCall(1) // makes the function suspend
        resultList.add(result1)
        println("result1 received: \'$result1\' after ${elapsedMillis(startTime)}ms")
    }

    val job2 = launch {
        val result2 = networkCall(2) // makes the function suspend
        resultList.add(result2)
        println("result2 received: \'$result2\' after ${elapsedMillis(startTime)}ms")
    }

    job1.join() // makes the function to suspend
    job2.join() // makes the function to suspend

    println("Result list: \'$resultList\' after ${elapsedMillis(startTime)}ms")
}

/// Rest of the code
```

Output:

```text
result1 received: 'Result 1' after 520ms
result2 received: 'Result 2' after 521ms
Result list: '[Result 1, Result 2]' after 521ms
```

### `async`

Unlike `launch`, returns a deferred.

## Keywords

### Job

Is a reference to a Coroutine which started with `launch`. Can be used to check the state the Coroutine is currently in as well as to cancel it.

### Deferred

Is a Job with a result.

## Miscellaneous

### Retry logic

```kotlin
private suspend fun <T> retry(numberOfRetries: Int, block: suspend () -> T): T {
    repeat(numberOfRetries) {
        try {
            return block()
        } catch (e: Exception) {
            Timber.e(e)
        }
    }
    return block()
}
```

Usage:

```kotlin
/// In a coroutine context
try {
    retry(numberOfRetries) {
        loadRecentAndroidVersions()
    }
} catch (e: Exception) {
    Timber.e(e)
    uiState.value = UiState.Error("Network request failed")
}
```

Retry logic with increasing backoff:

```kotlin
private suspend fun <T> retry(
    numberOfRetries: Int,
    initialDelayMillis: Long = 100,
    maxDelayMillis: Long = 1000,
    block: suspend () -> T
): T {
    var currentDelay = initialDelayMillis
    repeat(numberOfRetries) {
        try {
            return block()
        } catch (e: Exception) {
            Timber.e(e)
        }
        delay(currentDelay)
        currentDelay = (currentDelay * 2).coerceAtMost(maxDelayMillis)
    }
    return block()
}
```

Retry with timeout:

```kotlin
/// Implement these functions
private suspend fun <T> retryWithTimeout(
    numberOfRetries: Int, timeout: Long, block: suspend () -> T
) = retry(numberOfRetries) {
    withTimeout(timeout) {
        block()
    }
}

private suspend fun <T> retry(
    numberOfRetries: Int, delayBetweenRetries: Long = 100, block: suspend () -> T
): T {
    repeat(numberOfRetries) {
        try {
            return block()
        } catch (e: Exception) {
            Timber.e(e)
        }
        delay(delayBetweenRetries)
    }
    return block()
}
```

And use this way:

```kotlin

```

### Concurrent Network Requests

```kotlin
fun performNetworkRequestsConcurrently() {
    uiState.value = UiState.Loading

    viewModelScope.launch {
        try {
            val recentVersions = mockApi.getRecentAndroidVersions()
            val versionFeatures = recentVersions.map { version ->
                async {
                    mockApi.getAndroidVersionFeatures(version.apiLevel)
                }
            }.awaitAll()
            uiState.value = UiState.Success(versionFeatures)
        } catch (e: Exception) {
            uiState.value = UiState.Error("Network Request failed! Details: $e")
        }
    }
}
```
