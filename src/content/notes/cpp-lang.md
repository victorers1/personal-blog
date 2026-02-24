---
title: 'C++'
description: "Notes about C++"
pubDate: 'Feb 26 2024'
updatedDate: 'Mar 12 2024'
heroImage: '/cpp-gradient.png'
---

## Intro

These notes covers a bunch of C++ basic features. The best up-to-date reference is [cppreference.com](https://en.cppreference.com/w/)

### ISO

The **International Organization for Standardization** is an independent, non-governmental, international standard development organization composed of representatives from the national standards organizations of member countries.

Although one might think *ISO* is an abbreviation, the letters do not officially represent an acronym or initialism. Because "International Organization for Standardization" would have different acronyms in different languages (IOS in English, OIN in French), the founders decided to give it the short form ISO. ISO is derived from the Greek word isos (ίσος, meaning "equal").

### Standardization

C++ is standardized by a group known as [ISO/IEC JTC 1/SC 22](https://www.iso.org/committee/45202.html). That soup letters has these meanings:

- ISO: International Organization for Standardization
- IEC: International Electrotechnics Commission
- JTC 1: Joint Technical Committee number 1
- SC 22: Subcommittee number 22

So, they're a Subcommittee inside the Joint Technical Committee formed by ISO members and IEC members.

Version's informal names carries a 2-digit code representing the year it was released, e.g., `C++98`, `C++03`, `C++11`, `C++14`, `C++17`, `C++20`, `C++23`, `C++26` and so on. Note that in 2011 they adopted a schedule of 3 year release interval.

| Year | ISO/IEC Standard | Informal name |
| --- | --- | --- |
| 1998 | 14882:1998 | C++98 |
| 2003 | 14882:2003 | C++03 |
| 2011 | 14882:2011 | C++11, C++0x |
| 2014 | 14882:2014 | C++14, C++1y |
| 2017 | 14882:2017 | C++17, C++1z |
| 2020 | 14882:2020 | C++20, C++2a |
| 2023 | | C++23 |

Newer C++ standards usually do not make old code invalid, generally they just add features to the language and standard library. But, C++11 fundamentally changed the language. You should never use any language standard below that or resources that use any language standard below C++11.

## Compilers

Biggest ones are:

- MSVC, developed by Microsoft for Windows.
- g++, the GNU compiler developed for Linux, but also available as ports for Windows.
- clang++, the C++ compiler developed by the LLVM project, available on all platforms. Aims to be a drop-in replacement for g++.

## Standard Containers

A container is a holder object that stores a collection of other objects (its elements). The container manages the storage space for its elements and provides member functions to access them, either directly or through iterators.

Containers replicate structures very commonly used in programming: dynamic arrays ([`vector`](https://cplusplus.com/reference/vector/vector/)), queues ([`queue`](https://cplusplus.com/reference/queue/queue/)), stacks ([`stack`](https://cplusplus.com/reference/stack/stack/)), heaps ([`priority_queue`](https://cplusplus.com/reference/queue/priority_queue/)), linked lists ([`list`](https://cplusplus.com/reference/list/list/)), trees ([`set`](https://cplusplus.com/set)), associative arrays ([`map`](https://cplusplus.com/map)), among others.

### `vector` class

TODO

## C/C++ Strings

In C, a string is a list of single `char`s ending with a special null-termination character, `\0`. For example, `char a[3] = {'a', 'b', 'c'};` isn't a string, just a list of chars. But,`"abc"` is a four characters string: `'a'`, `'b'`, `'c'` plus the ending null-terminator. That's why `char a[3] = "abc"` will produce a compile error, `char a[3]` cannot contains 4 characters.

In C++, the standard library provides us the `std::string` class. Thus, strings are **objects** that represent sequences of characters. The `string` class provides an interface similar to that of a **standard container** of bytes and uses C-strings under the hood.

## Pointers

TODO

## `auto`, `decltype` and `reinterpret_cast`

TODO

## Arrays

Conceptually, arrays are used to sequentially store multiple values of the same type in memory. The array, as well as its elements, has a predefined amount of bytes that are allocated right after its declaration. When there was only C, it was done with the `int a[10]` command. Later, with C++, it was introduced an container to the basic array, the `std::array`. There is a very similar standard container worth mentioning, `std::vector`, which should not be compared to an array as it internally works differently.

Therefore, there are 3 distinct things in C++ that can be mistakenly taken as equal:

- `array`, a basic data type that is around since C language;
- `std::array`, a C++ standard library container class that encapsulates a fixed sized basic-data-type `array`; and
- `std::vector`, a C++ standard library container class that is variable length and grows dynamically.

### C arrays

Declaration of an empty array of `int`s:

```c++
int integers[4];
```

That command above allocates in memory 4 sequential slots that can contain an integer each. As an `int` has 4 bytes, the whole array occupies 16 bytes. `integers` is a pointer to the first element, if there is any. That can be verified running:

```c++
int integers[4] = {0, 1, 2};
cout << "integers: " << integers << endl;
cout << "&integers[0]: " << &integers[0] << endl;

// Output example:
// integers: 0x5ffdf0
// &integers[0]: 0x5ffdf0
```

Note that `integers` and `&integers[0]` will return the same memory address. And since all elements have the same size (4 bytes), it's easy to get the second one, that's on address `0x5ffdf0 + 4 = 0x5ffdf4`. That's exactly what the `[]` operator does to get any element in an array.

Let's say you want to get the position 10 of an array of `double` stored in `0x5ffdf0`. Each `double` occupies 8 bytes. So, if the first element is at `0x5ffdf0`, the aimed value is `sizeof(double) * index` positions after. The `[]` operator has to return the value stored at `0x5ffdf0 + 8 * 10 = 0x5ffe40`.

### C++ Arrays

The big difference between the basic `array` data type and `std::array` is that it has member functions to return its fixed size, and member functions that return standard library random-access iterators.

Declaration of an empty array of `int`s:

```c++
array<int, 4> integers;
//or
array<int, 4> integers{};
// or
array<int, 4> integers = {};
```

That command above allocates in memory 4 sequential slots that can contain an integer each. As an `int` has 4 bytes, one might say the whole `std::array` occupies 16 bytes, but that isn't true. `integers` is an object the has an interface similar of the C++ standard containers (e.g. `size`, `front`, `back` methods), so it demands more than that.

Example of usage:

```c++
int main()
{
    array<float, 10> floats;

    // prints "4.48416e-44 0 3.64694e-20 4.59149e-41 0 0 0 0 0 0"
    for (auto f : floats)
    {
        cout << f << " ";
    }

    floats.fill(10);

    // prints "10 10 10 10 10 10 10 10 10 10"
    for (auto f : floats)
    {
        cout << f << " ";
    }
}
```

Example of sorting:

```c++
int main()
{
    array<int, 10> integers = {9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
    sort(integers.begin(), integers.end());
    for (auto i : integers)
    {
        cout << i << " ";
    }
}
// Output: 0 1 2 3 4 5 6 7 8 9
```

## Memory Allocation

Dynamically allocated memory is allocated on **Heap**, and non-static and local variables get memory allocated on **Stack**.

### `malloc` and `free`

C way of doing memory allocation. They do the same as `new` and `delete`;

### `new` and `delete`

Doing normal variable declaration with `bool a;` or `char a[20];` allocates and deallocates memory automatically. But, allocating with `int *p = new int[5];` puts the responsibility of deallocation on the programmer.

Allocating space for an int:

```c++
int main()
{
    int *p = NULL;
    p = new int;
    cout << p[0] << endl; // prints "-1163005939"

    p[0] = 100;
    cout << p[0] << endl; // prints "100"

    *p = 200;
    cout << *p << endl; // prints "200"

    return 0;
}
```

Allocating space and givin an initial value:

```c++
int main()
{
    int *i = new int(20);
    char *c = new char('v');
    float *f = new float(3.14);
}
```

Allocating a block of memory:

```c++
int main()
{
    int *pointer = new int[200];
    for (int i = 0; i < 200; i++)
    {
        pointer[i] = i;
    }
    return 0;
}
```

Allocating an object:

```c++
class Rectangle
{
    int length;
    int height;
    int width;
    Rectangle *children;

public:
    Rectangle()
    {
        length = 0;
        height = 0;
        width = 0;
        children = nullptr;
    }
};

int main()
{
    Rectangle *rect = new Rectangle();
}
```

Deleting a variable from memory:

```c++
int main()
{
    int *integer = new int(10);
    cout << *integer << endl; // prints "10"
    delete integer;
    cout << *integer << endl; // prints "-8754356480"
}
```

Deleting a sequential block of memory:

```c++
int main()
{
    int *integers = new int[10];
    for (int i = 0; i < 10; i++)
    {
        integers[i] = i;
    }
    delete[] integers;
}
```

## Classes

Declaration and usage example:

```c++
class Cookie {
    private:
        string color;
    public:
        Cookie (string color) {
            this->color = color;
        }
};

Cookie* cookie = new Cookie("green");
```

### `this` keyword

TODO

### Dot (`.`) and Arrow (`->`) operators

To access members of a structure, use the dot operator.

```c++
class Cookie() {
    public:
        string color;
};

Cookie cookie = Cookie();
cookie.color = "black";
```

To access members of a structure through a pointer, use the arrow operator.

```c++
class Cookie() {
    public:
        string color;
};

Cookie* cookie = new Cookie();
cookie->color = "black";
```

### Destructor

Even if it isn't declared, every class has a default destructor that deallocates the memory used by its attributes. But, have in mind that it doesn't perform deep-deallocation.

Example:

```c++
class Cookie {
    public:
        ~Cookie() {
        }
};
```

## Unit testing

TODO
