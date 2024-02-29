---
title: 'C++'
description: "Notes about C++"
pubDate: 'Feb 26 2024'
updatedDate: 'Feb 29 2024'
heroImage: '/cpp-gradient.png'
---

## Intro

This notes has a bunch of C++ basic features. The best reference up-to-date: [cppreference.com](https://en.cppreference.com/w/)

### ISO

The **International Organization for Standardization** is an independent, non-governmental, international standard development organization composed of representatives from the national standards organizations of member countries.

Although one might think *ISO* is an abbreviation, the letters do not officially represent an acronym or initialism. Because "International Organization for Standardization" would have different acronyms in different languages (IOS in English, OIN in French), the founders decided to give it the short form ISO. ISO is derived from the Greek word isos (ίσος, meaning "equal").

### Standardization

C++ is standardized by a group known as [ISO/IEC JTC 1/SC 22](https://www.iso.org/committee/45202.html). That soup letters has these meanings:

- ISO: International Organization for Standardization
- IEC: International Electrotechnical Commission
- JTC 1: Joint Technical Committee number 1
- SC 22: Sub Committe number 22

So, they're a Sub Committe inside the Joint Technical Committee formed by ISO members and IEC members.

Version's informal names carries a 2-digit code representing the year it was released, e.g., `C++98`, `C++03`, `C++11`, `C++14`, `C++17`, `C++20`, `C++23`, `C++26` and so on. Note that in 2011 they adopted a schedule of 3 year relase interval.

| Year | ISO/IEC Standard | Informal name |
| --- | --- | --- |
|1998 | 14882:1998 | C++98|
|2003 | 14882:2003 | C++03|
|2011 | 14882:2011 | C++11, C++0x|
|2014 | 14882:2014 | C++14, C++1y|
|2017 | 14882:2017 | C++17, C++1z|
|2020 | 14882:2020 | C++20, C++2a|
|2023 | | C++23|

Newer C++ standards usually do not make old code invalid, generally they just add features to the language and standard library. But, C++11 fundamentally changed the language. You should never use any language standard below that or resources that use any language standard below C++11.

## Compilers

Biggest ones are:

- MSVC, developed by Microsoft for Windows.
- g++, the GNU compiler developed for Linux, but also available as ports for Windows.
- clang++, the C++ compiler developed by the LLVM project, available on all platforms. Aims to be a drop-in replacement for g++.

## Behaviors

### Undefined Behavior

TODO

## C/C++ Strings

TODO

## Pointers

TODO

## Arrays

Arrays are used to store multiple values of the same type sequentially in memory. The array, as well as its elements, has a predefined amount of bytes that are allocated right after its declaration.

Declaration of an empty array of `int`s:

```c++
int integers[4];
```

The command above sequentially allocates in memory 4 slots that can contains an integer each. As an `int` has 4 bytes, the whole array occupies 16 bytes. `integers` is a pointer to the first element, if there is any. That can be verified running:

```c++
int integers[4] = {0, 1, 2};
cout << "integers: " << integers << endl;
cout << "&integers[0]: " << &integers[0] << endl;

// Output example:
// integers: 0x5ffdf0
// &integers[0]: 0x5ffdf0
```

Note that `integers` and `&integers[0]` will return the same memory address. And since all elements has the same size (4 bytes), it's easy to get the second one, that's on address `0x5ffdf0 + 4 = 0x5ffdf4`. That's exactly what the `[]` operator does to get any element in an array.

Let's say you want to get the position 10 of an array of `double` stored in `0x5ffdf0`. Each `double` ocuppies 8 byte. So, if the first element is at `0x5ffdf0`, the aimed value is `sizeof(double) * index` positions after. The `[]` operator has to return the value stored at `0x5ffdf0 + 8 * 10 = 0x5ffe40`.

## `vector` class

TODO

### The `*void` type

TODO

## Memory Allocation

### `new` and `delete`

TODO

### `malloc` and `free`

TODO

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

### Desconstructor

Even if it's not declared, every class has a default destructor that deallocates the memory used by its attributes. But, have in mind that it doesn't perform deep-deallocation;

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
