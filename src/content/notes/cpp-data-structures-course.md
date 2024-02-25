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

Every class has a destructor, even if it's not declared, it has a default destructor.

Example:

```c++
class Cookie {
    public:
        ~Cookie() {
        }
};
```

## Linked List

### Simple Node class

```c++
class Node {
    public:
        int value;
        Node* next;

        Node(int value) {
            this->value = value;
            next = nullptr;
        }
};
```

### Simple LinkedList with constructor

```c++
class LinkedList {
    private :
        Node* head;
        Node* tail;
        int length;

    public:
        LinkedList(int value) {
            Node* newNode = new Node(value);
            head = newNode;
            tail = newNode;
            length = 1;
        }
};
```

### Usage

```c++
LinkedList* myLL = new LinkedList(4);
```

### Destructor

By default a destrutor will erase from memory the class attributes, that means that if you run the command `delete myLL`, only the variables `head`, `tail` and `length` will be freed. The Nodes will persist on memory forever if they are not manually deleted.

```c++
~LinkedList()
{
    Node *temp = head;
    while (head != nullptr)
    {
        head = head->next;
        delete temp;
        temp = head;
    }
}
```

### Append

Adds a new Node at the end of the LinkedList. A special case is when the linked list is still empty, so it has a IF-ELSE to distinguish that.

```c++
void append(int value)
{
    Node *nodeToAppend = new Node(value);
    if (length == 0)
    {
        tail = nodeToAppend;
        head = nodeToAppend;
    }
    else
    {
        tail->next = nodeToAppend;
        tail = nodeToAppend;
    }
    length++;
}
```

### Prepend

Adds new Node at the start of the LinkedList:

```c++
void prepend(int value)
{
    Node *nodeToPrepend = new Node(value);
    if (length == 0)
    {
        head = tail = nodeToPrepend;
    }
    else
    {
        nodeToPrepend->next = head;
        head = nodeToPrepend;
    }
    length++;
}
```

### Delete last

A.k.a `pop()`, it's the operation that removes a linked list tail. As it's a deletion operator, it must be prepared to when `length == 0`, when `length == 1`, and when `length > 1`.

```c++
/**
 * Pops last Node from this linked list and returns its value
 */
int pop()
{
    int poppedValue = 0;

    if (length == 1)
    {
        poppedValue = head->value;
        delete head;
        head = tail = nullptr;
        length = 0;
    }
    else if (length > 1)
    {
        Node *temp = head;
        while (temp->next != tail)
        {
            temp = temp->next;
        }
        poppedValue = tail->value;
        delete tail;
        tail = temp;
        tail->next = nullptr;
        length--;
    }
    return poppedValue;
}
```

### Delete first

```c++
int deleteFirst()
{
    int deletedValue = 0;
    if (length == 1)
    {
        deletedValue = head->value;
        delete head;
        head = tail = nullptr;
        length = 0;
    }
    else if (length > 1)
    {
        Node *temp = head;
        head = head->next;
        deletedValue = temp->value;
        delete temp;
        length--;
    }

    return deletedValue;
}
```

### Get

```c++
```

### Set

```c++
```

### Insert

```c++
```

### Delete Node

```c++
```

### Reverse

```c++
```

## Unit testing

TODO
