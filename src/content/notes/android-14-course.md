---
title: 'Android 14 Course'
description: "Notes an Udemy course"
pubDate: 'Mar 13 2024'
updatedDate: 'Mar 14 2024'
heroImage: '/android-gradient.png'
---

## Intro

- Course: [The Complete Android 14 & Kotlin Development Masterclass](https://www.udemy.com/course/android-kotlin-developer/)
- Language version: Kotlin 1.9.22
- IDE: Android Studio Hedgehog | 2023.1.1 Patch 2
- VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.

NOTE: The code below is an indistinguishable mix between mine and the teacher's.

## Rock, Paper, Scissors game

Just a Kotlin file implementing a Console program.

```kotlin
enum class Material(val id: UByte) {
    ROCK(1u), PAPER(2u), SCISSORS(3u)
}

fun main() {
    println("Insert your material: ")
    println("1 - Rock")
    println("2 - Paper")
    println("3 - Scissors")

    val userNum: UByte = readln().toUByte()
    val userMaterial = numToMaterial(userNum)

    val randomNum: UByte = (1..3).random().toUByte()
    val randomMaterial = numToMaterial(randomNum)

    println("You choose $userMaterial")
    println("CPU choose $randomMaterial")

    val result: Byte = compare(userMaterial, randomMaterial)
    if (result > 0) {
        print("You win")
    } else if (result < 0) {
        print("You lose")
    } else {
        print("That's a tie")
    }
}

fun numToMaterial(num: UByte): Material = Material.entries.first { m -> m.id == num }

/**
 * Compares materials.
 *
 * Returns:
 *   1, if m1 wins m2
 *  -1, if m1 loses to m2
 *   0, if m1 is equal to m2
 */
fun compare(m1: Material, m2: Material): Byte = when {
    m1 == m2 -> 0
    m1 == Material.ROCK && m2 == Material.SCISSORS -> 1
    m1 == Material.PAPER && m2 == Material.ROCK -> 1
    m1 == Material.SCISSORS && m2 == Material.PAPER -> 1
    else -> -1
}
```

## Bank Account class

Just a Kotlin file implementing a Console program.

```kotlin
class BankAccount(private val accountHolder: String, private var balance: Double) {
    private val transactionHistory: MutableList<String> = mutableListOf()

    init {
        val text = "$accountHolder opened an account with balance R\$ $balance in ${Date()}"
        println(text)
        transactionHistory.add(text)
    }

    fun deposit(amount: Double) {
        var history = ""

        if (amount > 0) {
            balance += amount
            history = "$accountHolder deposited U\$ $amount"
        } else {
            history =
                "Deposit Error: Amount must be greater than U\$ 0. Given amount is U\$ $amount"
        }
        transactionHistory.add(history)
        println(history)
        println("Your balance is U\$ $balance")
    }

    fun withdraw(amount: Double) {
        var history = ""
        if (amount in 0.0..balance) {
            balance -= amount
            history = "$accountHolder withdraw U\$ $amount"
        } else {
            history = "Withdraw Error: The amount U\$ $amount cannot be withdraw."
        }
        transactionHistory.add(history)
        println(history)
        println("Your balance is U\$ $balance")
    }

    fun displayHistory() {
        println("Transaction history of $accountHolder account")
        for (t in transactionHistory) {
            println(t)
        }
    }
}
```

Usage:

```kotlin
fun main() {
    val myAccount = BankAccount("Victor", 0.0)

    myAccount.deposit(-1.0)
    myAccount.withdraw(1.0)
    myAccount.withdraw(-1.0)
    myAccount.deposit(5500.56)
    myAccount.withdraw(2500.0)
    myAccount.withdraw(2500.0)
    myAccount.deposit(1400.0)

    println("")
    myAccount.displayHistory()
}
```

Output example:

```text
Victor opened an account with balance R$ 0.0 in Fri Mar 15 12:13:32 GFT 2024
Deposit Error: Amount must be greater than U$ 0. Given amount is U$ -1.0
Your balance is U$ 0.0
Withdraw Error: The amount U$ 1.0 cannot be withdraw.
Your balance is U$ 0.0
Withdraw Error: The amount U$ -1.0 cannot be withdraw.
Your balance is U$ 0.0
Victor deposited U$ 5500.56
Your balance is U$ 5500.56
Victor withdraw U$ 2500.0
Your balance is U$ 3000.5600000000004
Victor withdraw U$ 2500.0
Your balance is U$ 500.5600000000004
Victor deposited U$ 1400.0
Your balance is U$ 1900.5600000000004

Transaction history of Victor account
Victor opened an account with balance R$ 0.0 in Fri Mar 15 12:13:32 GFT 2024
Deposit Error: Amount must be greater than U$ 0. Given amount is U$ -1.0
Withdraw Error: The amount U$ 1.0 cannot be withdraw.
Withdraw Error: The amount U$ -1.0 cannot be withdraw.
Victor deposited U$ 5500.56
Victor withdraw U$ 2500.0
Victor withdraw U$ 2500.0
Victor deposited U$ 1400.0

```
