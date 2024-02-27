---
title: 'Data Structures & Algorithms in C++'
description: "Notes from an Udemy Course"
pubDate: 'Feb 24 2024'
updatedDate: 'Feb 26 2024'
heroImage: '/cpp-gradient.png'
---

## Intro

- Course: [C++ Data Structures & Algorithms + LEETCODE Exercises](https://www.udemy.com/course/data-structures-algorithms-cpp/)
- Language version: C++11
- Compiler: I downloaded the [MSYS2](https://www.msys2.org/) tools collection to get `GCC`, `mingw-w64` and `pacman` package manager at once.
- IDE: VSCode

The code below is an indistinguishable mix of mine and the teacher's implementation (mostly his).

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
    int* num2 = num1; // num2 will receive that same address in num1

    *num1 = 22; // The asterisk on the left means we're accessing the value at the address stored in num1

    cout << "num1 = " << *num1 << endl; // Will print 22
    cout << "num2 = " << *num2 << endl; // Will print 22
}
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

### Delete Last

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

### Delete First

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

### Index Is Valid

Checks if a given index will return a Node. A common operation that is used in many other algorithms.

```c++
bool indexExists(int index) {
    return index >=0 && index < length;
}
```

### Get Node by Index

Operation that retrieves a Node without changing anythingin the LinkedLink.

```c++
Node *get(int index)
{
    if (index < 0 || index >= length)
    {
        return nullptr;
    }
    else
    {
        Node *temp = head;
        for (int i = 0; i < index; i++)
        {
            temp = temp->next;
        }
        return temp;
    }
}
```

### Set Node's Value

```c++
bool set(int index, int value)
{
    Node *temp = get(index);

    if (temp != nullptr)
    {
        temp->value = value;
        return true;
    }
    return false;
}
```

### Insert Node

I like to return the created Node;

```c++
Node *insert(int index, int value)
{
    if (index < 0 || index > length)
    {
        return nullptr;
    }
    else if (length == 0)
    {
        head = tail = new Node(value);
        length = 1;
        return head;
    }
    else if (index == 0)
    {
        prepend(value);
        return head;
    }
    else if (index == length)
    {
        append(value);
        return tail;
    }
    else
    {
        Node *nodeToInsert = new Node(value);
        Node *temp = get(index - 1);
        nodeToInsert->next = temp->next;
        temp->next = nodeToInsert;
        length++;
        return nodeToInsert;
    }
}
```

### Delete Node

```c++
void deleteNode(int index)
{
    if (!indexExists(index))
    {
        return;
    }
    else if (index == 0)
    {
        deleteFirst();
    }
    else if (index == length - 1)
    {
        pop();
    }
    else
    {
        Node *previousNode = get(index - 1);
        Node *nodeToDelete = previousNode->next;
        previousNode->next = nodeToDelete->next;
        delete nodeToDelete;
        length--;
    }
}
```

### Reverse

Generally it's an *inplace* operation, that is, the LinkedList reverses itself instead of creating a reversed copy.

```c++
void reverse()
{
    Node *temp = head;
    head = tail;
    tail = temp;

    Node *after = temp->next;
    Node *before = nullptr;

    for (int i = 0; i < length; i++)
    {
        after = temp->next;
        temp->next = before;
        before = temp;
        temp = after;
    }
}
```

### Final Code

```c++
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Node
{
public:
    int value;
    Node *next;

    Node(int value)
    {
        this->value = value;
        next = nullptr;
    }
};

class LinkedList
{
private:
    Node *head;
    Node *tail;
    int length;

public:
    LinkedList(int value)
    {
        Node *newNode = new Node(value);
        head = newNode;
        tail = newNode;
        length = 1;
    }

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

    int getHead()
    {
        return head->value;
    }

    int getTail()
    {
        return tail->value;
    }

    int size()
    {
        return length;
    }

    Node *get(int index)
    {
        if (!indexExists(index))
        {
            return nullptr;
        }
        else
        {
            Node *temp = head;
            for (int i = 0; i < index; i++)
            {
                temp = temp->next;
            }
            return temp;
        }
    }

    bool set(int index, int value)
    {
        Node *temp = get(index);

        if (temp != nullptr)
        {
            temp->value = value;
            return true;
        }
        return false;
    }

    bool indexExists(int index)
    {
        return index >= 0 && index < length;
    }

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

    Node *insert(int index, int value)
    {
        if (index < 0 || index > length)
        {
            return nullptr;
        }
        else if (length == 0)
        {
            head = tail = new Node(value);
            length = 1;
            return head;
        }
        else if (index == 0)
        {
            prepend(value);
            return head;
        }
        else if (index == length)
        {
            append(value);
            return tail;
        }
        else
        {
            Node *nodeToInsert = new Node(value);
            Node *temp = get(index - 1);
            nodeToInsert->next = temp->next;
            temp->next = nodeToInsert;
            length++;
            return nodeToInsert;
        }
    }

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

    void deleteNode(int index)
    {
        if (!indexExists(index))
        {
            return;
        }
        else if (index == 0)
        {
            deleteFirst();
        }
        else if (index == length - 1)
        {
            pop();
        }
        else
        {
            Node *previousNode = get(index - 1);
            Node *nodeToDelete = previousNode->next;
            previousNode->next = nodeToDelete->next;
            delete nodeToDelete;
            length--;
        }
    }

    void reverse()
    {
        Node *temp = head;
        head = tail;
        tail = temp;

        Node *after = temp->next;
        Node *before = nullptr;

        for (int i = 0; i < length; i++)
        {
            after = temp->next;
            temp->next = before;
            before = temp;
            temp = after;
        }
    }

    /**
     * Prints this LinkedList in a human friendly way.
     */
    string toString()
    {
        Node *temp = head;
        string result = "[";

        while (temp != nullptr)
        {
            result += to_string(temp->value);

            if (temp->next != nullptr)
            {
                result += " -> ";
            }

            temp = temp->next;
        }

        result += "]";

        return result;
    }
};

int main()
{
    LinkedList *myLL = new LinkedList(4);
    cout << "Created LinkedList: " << myLL->toString() << endl;

    myLL->prepend(10);
    cout << "Prepended value 10: " << myLL->toString() << endl;

    myLL->append(11);
    cout << "Appended value 11: " << myLL->toString() << endl;

    myLL->prepend(999);
    cout << "Prepended value 999: " << myLL->toString() << endl;

    cout << "Popped value " << myLL->pop() << ": " << myLL->toString() << endl;

    cout << "Popped value " << myLL->pop() << ": " << myLL->toString() << endl;

    cout << "Deleted first value " << myLL->deleteFirst() << ": " << myLL->toString() << endl;

    cout << "Getting value at 0: " << myLL->get(0)->value << endl;

    cout << "Getting address of index -1: " << myLL->get(-1) << endl;

    myLL->set(0, 999) ? cout << "Setting value 999 to index 0: " << myLL->toString() << endl
                      : cout << "Cannot set value 10 to index 0" << endl;

    myLL->set(-1, 10) ? cout << "Setting value 10 to index -1: " << myLL->toString() << endl
                      : cout << "Cannot set value 10 to index -1" << endl;

    myLL->insert(0, 80);
    cout << "Inserting value " << myLL->get(0)->value << " at position 0: " << myLL->toString() << endl;

    myLL->insert(myLL->size(), 1);
    cout << "Inserting value " << myLL->get(myLL->size() - 1)->value << " at end: " << myLL->toString() << endl;

    myLL->insert(myLL->size() - 1, 2);
    cout << "Inserting value " << myLL->get(myLL->size() - 1)->value << " at penultimate position: " << myLL->toString() << endl;

    myLL->insert(1, 2);
    cout << "Inserting value " << myLL->get(1)->value << " at index 1: " << myLL->toString() << endl;

    myLL->deleteNode(1);
    cout << "Deleting value 2 at index 1: " << myLL->toString() << endl;

    myLL->deleteNode(myLL->size() - 1);
    cout << "Deleting value " << myLL->get(myLL->size() - 1)->value << " at tail: " << myLL->toString() << endl;

    myLL->reverse();
    cout << "Reversing LinkedList: " << myLL->toString() << endl;

    delete myLL;

    cout << "Deleted LinkedList: " << myLL << endl;

    return 0;
}
```

### Interview Questions

It's a set on questions with no video explanation, only text hints. The code below are my implementations before seeing the teacher's commented answers (which I only remembered they existed after doing the whole test).

#### Find Middle Node

```c++
Node *findMiddleNode()
{
    if (head == nullptr)
    {
        return nullptr;
    }
    else if (head->next == nullptr)
    {
        return head;
    }
    else
    {
        Node *slow = head;
        Node *fast = head;

        while (fast != nullptr && fast->next!=nullptr)
        {
            slow = slow->next;
            fast = fast->next;

            if (fast != nullptr)
            {
                fast = fast->next;
            }
        }

        return slow;
    }
}
```

#### Has Loop

```c++
bool hasLoop()
{
    if (length == 0)
    {
        return false;
    }
    else if (length == 1)
    {
        Node *next = head->next;
        return head == next || tail == next;
    }
    else
    {
        Node *slow = head;
        Node *fast = head;

        while (fast != nullptr && fast->next != nullptr)
        {
            slow = slow->next;
            fast = fast->next;
            if (fast != nullptr)
            {
                fast = fast->next;
            }

            if (fast == slow)
            {
                return true;
            }
        }

        return false;
    }
}
```

#### Find Kth Node From End

```c++
Node *findKthFromEnd(int k)
{
    Node *fast = head;
    Node *slow = head;

    for (int i = 0; i < k; i++)
    {
        if (fast == nullptr)
        {
            return nullptr;
        }
        fast = fast->next;
    }

    while (fast != nullptr)
    {
        fast = fast->next;
        slow = slow->next;
    }

    return slow;
}
```
