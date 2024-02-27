---
title: 'C++'
description: "Notes about C++"
pubDate: 'Feb 26 2024'
updatedDate: 'Feb 26 2024'
heroImage: '/cpp-gradient.png'
---

## Intro

TODO

## Pointers

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

### Arrow operator (`->`)

TODO

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

## `vector` class

A vector is a type of container which can store elements of a similar type.

TODO

## Unit testing

TODO
