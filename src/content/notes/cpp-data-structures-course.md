---
title: 'Data Structures & Algorithms in C++'
description: "Notes from an Udemy Course"
pubDate: 'Feb 24 2024'
# updatedDate: Feb 12 2024
heroImage: '/css-gradient.png'
---

## Intro

Course: [C++ Data Structures & Algorithms + LEETCODE Exercises](https://www.udemy.com/course/data-structures-algorithms-cpp/)

## Complexities

### Time Complexity

Amount of time used by a program to run completely. But, execution time depends not only on the code itself but also on the capacity of the machine it's running. So, a program efficiency is not exactly measured in seconds but in terms of complexity's growth rate as we increase the input value or dimension.

### Space Complexity

Amount of memory used by a program to run completely. It's common to see algorithms that uses more memory to reduce execution time or vice-versa.

## Symbols

- $\Omega$, the uppercase Omega represents the **best case**
- $\Theta$, the uppercase Theta represents the **average case**
- $\Omicron$, the uppercase Omicron represents the **worst case**

## $\Omicron$ notation

Describes the worst-case scenario for an algorithm.

### Common complexities

- **$\Omicron(1)$**: Constant Time
  - Doesn't depend on the size of the data set.
  - Example: Accessing an array element by its index.
- **$\Omicron(\log n)$**: Logarithmic Time
  - Splits the data in each step (divide and conquer).
  - Example: Binary search.
- **$\Omicron(n)$**: Linear Time
  - Directly propor onal to the data set size.
  - Example: Looping through an array.
- **$\Omicron(n\log n)$**: Linearithmic Time
  - Splits and sorts or searches data.
  - Example: Merge sort, quick sort.
- **$\Omicron(n^2)$**: Polynomial Time
  - Nested loops for each power of n.
  - Example: Bubble sort (O(n2)).

### Rules

#### Drop constants

- $\Omicron(10n) \equiv \Omicron(n)$;
- $\Omicron(10n^2) \equiv \Omicron(n^2)$;
- and so on.

#### Drop Non-Dominant Terms

- $\Omicron(n^2 + n) \equiv \Omicron(n^2)$;
- $\Omicron(n^4 + n^3) \equiv \Omicron(n^4)$;
- and so on.

## $\Theta$ notation

It tells you what to generally expect in terms of me complexity

## $\Omega$ notation

Describes the best-case scenario for an algorithm.
