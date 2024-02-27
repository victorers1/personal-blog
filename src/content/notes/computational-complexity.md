---
title: 'Computational Complexity'
description: "Notes from an Udemy Course"
pubDate: 'Feb 24 2024'
updatedDate: 'Feb 24 2024'
heroImage: '/complexity-gradient.png'
---

## Intro

Course: [C++ Data Structures & Algorithms + LEETCODE Exercises](https://www.udemy.com/course/data-structures-algorithms-cpp/)

## Types

### Time Complexity

Amount of time used by a program to run completely. But, execution time depends not only on the code itself but also on the capacity of the machine it's running. So, a program efficiency is not exactly measured in seconds but in terms of complexity's growth rate as we increase the input size.

### Space Complexity

Amount of memory used by a program to run completely. It's common to see algorithms that uses more memory to reduce execution time or vice-versa.

## Symbols

- $\Omega$ (uppercase Omega) represents the **best case**
- $\Theta$ (uppercase Theta) represents the **average case**
- $\Omicron$ (uppercase Omicron) represents the **worst case**

## $\Omicron$ notation

Describes the worst-case scenario for an algorithm.

### Common complexities

- $\Omicron(1)$: Constant Time
  - Doesn't depend on the size of the data set.
  - Example: Accessing an array element by its index.
- $\Omicron(\log n)$: Logarithmic Time
  - Splits the data in each step (divide and conquer).
  - Example: Binary search.
- $\Omicron(n)$: Linear Time
  - Directly proportional to the data set size.
  - Example: Looping through an array.
- $\Omicron(n\log n)$: Linearithmic Time
  - Splits and sorts or searches data.
  - Example: Merge sort, quick sort.
- $\Omicron(n^2)$: Polynomial Time
  - Nested loops for each power of n.
  - Example: Bubble sort.
- $\Omicron(n!)$: Factorial Time
  - Any algorithm that calculates all permutations of a given array.
  - Example: Travelling salesman problem.

### Simplification Rules

#### Drop constants

- $\Omicron(10n) \equiv \Omicron(n)$;
- $\Omicron(10n^2) \equiv \Omicron(n^2)$;
- and so on.

#### Drop Non-Dominant Terms

- $\Omicron(n^2 + n) \equiv \Omicron(n^2)$;
- $\Omicron(n^4 + n^3) \equiv \Omicron(n^4)$;
- and so on.

#### Show Different Terms for Inputs

If an algorithm has two independents inputs, say $a$ and $b$, complexity should be in terms of these variables. For example $\Omicron(a + b)$, $\Omicron(ab)$, $\Omicron(a \log b)$ and so on. As $a$ and $b$ can have different values, $\Omicron(a + b) \neq \Omicron(n + n) \equiv \Omicron(2n)$.

### Cheat Sheet

[Here's a list](https://www.bigocheatsheet.com/) with some algorithms along with their time and space complexity.

## $\Theta$ notation

It tells you what to generally expect in terms of me complexity

## $\Omega$ notation

Describes the best-case scenario for an algorithm.
