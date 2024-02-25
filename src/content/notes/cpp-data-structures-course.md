---
title: 'Data Structures & Algorithms in C++'
description: "Notes from an Udemy Course"
pubDate: 'Feb 24 2024'
# updatedDate: Feb 12 2024
heroImage: '/cpp-gradient.png'
---

## Intro

Course: [C++ Data Structures & Algorithms + LEETCODE Exercises](https://www.udemy.com/course/data-structures-algorithms-cpp/)

## Pointers

Variables that stores memory addresses, not actual values.

### What it isn't

```c++
#include <iostream>

using namespace std;

int main() {
    int num1 = 11;
    int num2 = num1; // num2 will receive a new value that is a copy of what's in num1

    num1 = 22;

    cout << "num1 = " << num1 << endl; // Will print 22
    cout << "num2 = " << num2 << endl; // Will print 11
}
```

### Whats it is

```c++
#include <iostream>

using namespace std;

int main() {
    int* num1 = new int(11); // Creates the value 22 at an available memory position and saves its address at num1
    int* num2 = num1; // num2 will receive that same address that's in num1

    *num1 = 22; // The asterisk on the left means we're accessing the value at the address stored in num1

    cout << "num1 = " << *num1 << endl; // Will print 22
    cout << "num2 = " << *num2 << endl; // Will print 22
}
```

### `new-delete` vs `malloc-free`

TODO

### The `*void` type

TODO

## Classes

```c++
// Declaration
class Cookie {
    private:
        string color;
    public:
        Cookie (string color) {
            this->color = color;
        }
};

// Usage
Cookie* cookie = new Cookie("green");
```

### `this` keyword

### When to use `->`

TODO

## Linked List
