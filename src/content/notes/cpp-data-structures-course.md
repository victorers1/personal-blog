---
title: 'Data Structures & Algorithms in C++'
description: "Notes from an Udemy Course"
pubDate: 'Feb 24 2024'
updatedDate: 'Mar 8 2024'
heroImage: '/cpp-gradient.png'
---

## Intro

- Course: [C++ Data Structures & Algorithms + LEETCODE Exercises](https://www.udemy.com/course/data-structures-algorithms-cpp/)
- Language version: C++11
- Compiler: I downloaded the [MSYS2](https://www.msys2.org/) tools collection to get `GCC`, `mingw-w64` and `pacman` package manager at once.
- IDE: VSCode

The code below is an indistinguishable mix of mine and the teacher's implementation (mostly his). Similarly, the text below is a mix of mine and the teacher's words.

## Pointers

Variables that store memory addresses, not actual values.

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

## Singly Linked List

### Node class

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

### Linked List with constructor

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

By default, a destructor will erase from memory the class attributes, that means that if you run the command `delete myLL`, only the variables `head`, `tail` and `length` will be freed. The Nodes will persist in memory forever if they are not manually deleted.

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

A.k.a `pop()`, it's the operation that removes a linked list tail. As it's a deletion operator, it must be prepared for when `length == 0`, when `length == 1`, and when `length > 1`.

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

Operation that retrieves a Node without changing anything in the Linked List.

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

I like to return the created Node.

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

Generally it's an *in-place* operation, that is, the LinkedList reverses itself instead of creating a reversed copy.

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

Implement a member function, findMiddleNode(), which finds and returns the middle node of the linked list.

Note: this LinkedList implementation does not have a length member variable.

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

Implement a function called hasLoop to detect if a given singly-linked list contains a loop (a cycle) or not.

The function should return true if a loop is detected in the linked list, and false otherwise.

You are required to use Floyd's cycle-finding algorithm (also known as the "tortoise and the hare" algorithm) to detect the loop.

This algorithm uses two pointers: a slow pointer and a fast pointer. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. If there is a loop in the linked list, the two pointers will eventually meet at some point. If there is no loop, the fast pointer will reach the end of the list.

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

Implement the findKthFromEnd member function for the LinkedList class, which returns the k-th node from the end of the linked list WITHOUT USING THE LENGTH of the list.

If the value of k is greater than the length of the list, the function should return nullptr.

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

#### Remove Duplicates

Implement the removeDuplicates member function for the LinkedList class, which removes all duplicate values from a singly linked list.

Note: This linked list class does NOT have a tail which will make this method easier to implement.

```c++
void removeDuplicates()
{
    Node *current = head;
    Node *previousToRunner = head;
    if (head == nullptr || head->next == nullptr)
    {
        return;
    }
    Node *runner = current->next;
    while (current->next != nullptr)
    {
        while (runner != nullptr)
        {
            if (runner->value == current->value)
            {
                previousToRunner->next = runner->next;
                delete runner;
                runner = previousToRunner->next;
                length--;
            }
            else
            {

                runner = runner->next;
                previousToRunner = previousToRunner->next;
            }
        }
        current = previousToRunner = current->next;
        runner = current->next;
    }
}
```

## Doubly Linked List

### Node Class

```c++
class Node
{
public:
    int value;
    Node *next;
    Node *prev;

    Node(int value)
    {
        this->value = value;
        next = nullptr;
        prev = nullptr;
    }
};
```

### Doubly Linked List with Constructor

```c++
class DoublyLinkedList
{
private:
    Node *head;
    Node *tail;
    int length;

public:
    DoublyLinkedList(int value)
    {
        Node *newNode = new Node(value);
        head = newNode;
        tail = newNode;
        length = 1;
    }
};
```

### Usage

```c++
DoublyLinkedList* myDLL = new DoublyLinkedList(7);
```

### Destructor

```c++

TODO

```

### To String

```c++
string toString()
{
    Node *temp = head;
    string result = "[";
    while (temp != nullptr)
    {
        result += to_string(temp->value);

        if (temp->next != nullptr)
        {
            result += "<->";
        }
        temp = temp->next;
    }
    result += "]";
    return result;
}
```

### Getters

```c++
Node *getHead()
{
    return head;
}
Node *getTail()
{
    return tail;
}
int size()
{
    return length;
}
```

### Append

```c++
void append(int value)
{
    Node *newNode = new Node(value);
    if (length == 0)
    {
        head = tail = newNode;
    }
    else
    {
        tail->next = newNode;
        newNode->prev = tail;
        tail = newNode;
    }
    length++;
}
```

### Delete Last

```c++
void pop()
{
    if (length == 0)
    {
        return;
    }
    else if (length == 1)
    {
        delete head;
        head = tail = nullptr;
    }
    else
    {
        tail = tail->prev;
        delete tail->next;
        tail->next = nullptr;
    }
    length--;
}
```

### Prepend

```c++
void prepend(int value)
{
    Node *newNode = new Node(value);
    if (length == 0)
    {
        head = tail = newNode;
    }
    else
    {
        head->prev = newNode;
        newNode->next = head;
        head = newNode;
    }
    length++;
}
```

### Delete First

```c++
void deleteFirst()
{
    if (length == 0)
    {
        return;
    }
    else if (length == 1)
    {
        delete head;
        head = tail = nullptr;
    }
    else
    {
        head = head->next;
        delete head->prev;
        head->prev = nullptr;
    }
    length--;
}
```

### Get Node

The algorithm made for Singly Linked List already does the jobs, but this version checks which end is closest to the given index and iterates from there.

```c++
Node *get(int index)
{
    if (!indexExists(index))
    {
        return nullptr;
    }
    else
    {
        Node *temp = head;
        if (index < length / 2)
        {
            for (int i = 0; i < index; i++)
            {
                temp = temp->next;
            }
        }
        else
        {
            temp = tail;
            for (int i = length - 1; i > index; i--)
            {
                temp = temp->prev;
            }
        }
        return temp;
    }
}
```

### Set Node

```c++
bool set(int index, int value)
{
    Node *node = get(index);
    if (node != nullptr)
    {
        node->value = value;
        return true;
    }
    return false;
}
```

### Insert Node

Uses `prepend` and `append` to insert at list ends.

```c++
bool insert(int index, int value)
{
    if (index < 0 || index > length)
    {
        return false;
    }
    else if (index == 0)
    {
        prepend(value);
        return true;
    }
    else if (index == length)
    {
        append(value);
        return true;
    }
    else if (indexExists(index))
    {
        Node *newNode = new Node(value);
        Node *before = get(index - 1);
        Node *after = before->next;
        before->next = newNode;
        after->prev = newNode;
        newNode->prev = before;
        newNode->next = after;
        length++;
        return true;
    }
    return false;
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
        Node *temp = get(index);
        temp->prev->next = temp->next;
        temp->next->prev = temp->prev;
        delete temp;
        length--;
    }
}
```

### Final Code

```c++
#include <iostream>
#include <string>
using namespace std;

class Node
{
public:
    int value;
    Node *next;
    Node *prev;

    Node(int value)
    {
        this->value = value;
        next = nullptr;
        prev = nullptr;
    }
};

class DoublyLinkedList
{
private:
    Node *head;
    Node *tail;
    int length;

public:
    DoublyLinkedList(int value)
    {
        Node *newNode = new Node(value);
        head = newNode;
        tail = newNode;
        length = 1;
    }

    Node *getHead()
    {
        return head;
    }
    Node *getTail()
    {
        return tail;
    }
    int size()
    {
        return length;
    }

    void append(int value)
    {
        Node *newNode = new Node(value);
        if (length == 0)
        {
            head = tail = newNode;
        }
        else
        {
            tail->next = newNode;
            newNode->prev = tail;
            tail = newNode;
        }
        length++;
    }

    void pop()
    {
        if (length == 0)
        {
            return;
        }
        else if (length == 1)
        {
            delete head;
            head = tail = nullptr;
        }
        else
        {
            tail = tail->prev;
            delete tail->next;
            tail->next = nullptr;
        }
        length--;
    }

    void prepend(int value)
    {
        Node *newNode = new Node(value);
        if (length == 0)
        {
            head = tail = newNode;
        }
        else
        {
            head->prev = newNode;
            newNode->next = head;
            head = newNode;
        }
        length++;
    }

    void deleteFirst()
    {
        if (length == 0)
        {
            return;
        }
        else if (length == 1)
        {
            delete head;
            head = tail = nullptr;
        }
        else
        {
            head = head->next;
            delete head->prev;
            head->prev = nullptr;
        }
        length--;
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
            if (index < length / 2)
            {
                for (int i = 0; i < index; i++)
                {
                    temp = temp->next;
                }
            }
            else
            {
                temp = tail;
                for (int i = length - 1; i > index; i--)
                {
                    temp = temp->prev;
                }
            }
            return temp;
        }
    }

    bool set(int index, int value)
    {
        Node *node = get(index);
        if (node != nullptr)
        {
            node->value = value;
            return true;
        }
        return false;
    }

    bool insert(int index, int value)
    {
        if (index < 0 || index > length)
        {
            return false;
        }
        else if (index == 0)
        {
            prepend(value);
            return true;
        }
        else if (index == length)
        {
            append(value);
            return true;
        }
        else if (indexExists(index))
        {
            Node *newNode = new Node(value);
            Node *before = get(index - 1);
            Node *after = before->next;

            before->next = newNode;
            after->prev = newNode;
            newNode->prev = before;
            newNode->next = after;
            length++;
            return true;
        }
        return false;
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
            Node *temp = get(index);
            temp->prev->next = temp->next;
            temp->next->prev = temp->prev;
            delete temp;
            length--;
        }
    }

    bool indexExists(int index)
    {
        return index >= 0 && index < length;
    }

    string toString()
    {
        Node *temp = head;
        string result = "[";
        while (temp != nullptr)
        {
            result += to_string(temp->value);
            if (temp->next != nullptr)
            {
                result += " <-> ";
            }
            temp = temp->next;
        }
        result += "]";
        return result;
    }
};

int main()
{
    DoublyLinkedList *myDLL = new DoublyLinkedList(7);

    cout << "Created Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->append(10);
    myDLL->append(11);
    cout << "Appended value 10 and 11 in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->pop();
    cout << "Popped value 11 in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->prepend(99);
    cout << "Prepends value 99 in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->deleteFirst();
    cout << "Deletes first value in Doubly Linked List: " << myDLL->toString() << endl;

    cout << "Get value " << myDLL->get(1)->value << " in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->set(0, 1);
    cout << "Set value " << myDLL->get(0)->value << " at index 0 in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->set(1, 2);
    cout << "Set value " << myDLL->get(1)->value << " at index 2 in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->insert(0, 22);
    cout << "Inserted value " << myDLL->get(0)->value << " at index 0 in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->insert(myDLL->size(), 2);
    cout << "Inserted value " << myDLL->get(myDLL->size() - 1)->value << " at index " << myDLL->size() - 1 << " in Doubly Linked List: " << myDLL->toString() << endl;


    myDLL->deleteNode(2);
    cout << "Deleted value at index 2 in Doubly Linked List: " << myDLL->toString() << endl;

    myDLL->deleteNode(0);
    cout << "Deleted value at index 0 in Doubly Linked List: " << myDLL->toString() << endl;

    return 0;
}
```

### Interview Questions

#### Swap First and Last Values

Implement a member function called `swapFirstLast()` that swaps the values of the first and last nodes in the list.

If the length of the list is less than 2, the function should not perform any operation.

```c++
void swapFirstLast()
{
    if (length > 1)
    {
        int temp = head->value;
        head->value = tail->value;
        tail->value = temp;
    }
}
```

#### Reverse List

Implement a member function called `reverse()` that reverses the order of the nodes in the list.

```c++
void reverse()
{
    if (length <= 1)
    {
        return;
    }
    Node *temp = head;
    while (temp!=nullptr)
    {
        Node* node = temp->next;
        temp->next = temp->prev;
        temp->prev = node;
        temp = temp->prev;
    }
    temp = head;
    head = tail;
    tail = temp;
}
```

#### Palindrome Checker

Implement a member function called `isPalindrome()` that checks if the list is a palindrome, i.e., its elements read the same forward and backward.

```c++
bool isPalindrome()
{
    if (length == 0)
    {
        return false;
    }
    else if (length == 1)
    {
        return true;
    }
    else
    {
        Node *forward = head;
        Node *backward = tail;
        while (forward != backward && forward->prev != backward)
        {
            if (forward->value != backward->value)
            {
                return false;
            }
            forward = forward->next;
            backward = backward->prev;
        }
        return true;
    }
}
```

## Stack

LIFO: Last in, First Out

### Node

Identical to the Singly Linked List node.

### Class Stack with Constructor

```c++
class Stack
{
private:
    Node *top;
    int height;

public:
    Stack(int value)
    {
        top = new Node(value);
        height = 1;
    }
};
```

### To String

```c++
string toString()
{
    Node *temp = top;
    string result = "";
    while (temp != nullptr)
    {
        result += "| " + to_string(temp->value) + " |\n";
        temp = temp->next;
    }
    return result;
}
```

### Getters

```c++
int getTop()
{
    return top->value;
}
int getHeight()
{
    return height;
}
```

### Push

```c++
void push(int value)
{
    Node *newNode = new Node(value);
    newNode->next = top;
    top = newNode;
    height++;
}
```

### Pop

```c++
int pop()
{
    if (height == 0)
    {
        return INT_MIN;
    }
    int poppedValue = top->value;
    Node *temp = top->next;
    delete top;
    top = temp;
    height--;
    return poppedValue;
}
```

### Interview Questions

#### Push for a Stack That Uses a Vector

Write the push() method to add an item onto a stack that is implemented with a vector.

```c++
void push(int value)
{
    stackVector.push_back(value);
}
```

#### Pop for a Stack That Uses a Vector

```c++
void pop()
{
    if (stackVector.size() > 0)
    {
        stackVector.pop_back();
    }
}
```

#### Reverse String

Implement a function called reverseString() that reverses the input string using a stack data structure.

```c++
string reverseString(const string &str)
{
    string result = "";
    stack<char> reverser = stack<char>();
    for (int i = 0; i < str.length(); i++)
    {
        reverser.push(str[i]);
    }
    for (int i = 0; i < str.length(); i++)
    {
        result += reverser.top();
        reverser.pop();
    }
    return result;
}
```

#### Balanced Parentheses Detector

Implement a function called isBalancedParentheses() that checks if the input string contains balanced parentheses.

```c++
bool isBalancedParentheses(const string &parentheses)
{
    stack<char> parenthesesStack = stack<char>();
    for (char c : parentheses)
    {
        if (c == '(')
        {
            parenthesesStack.push(c);
        }
        else if (c == ')')
        {
            if (parenthesesStack.size() > 0 && parenthesesStack.top() == '(')
            {
                parenthesesStack.pop();
            }
            else
            {
                return false;
            }
        }
    }
    return parenthesesStack.size() == 0;
}
```

## Queue

FIFO: First in, First out.

We'll implement it using a Singly Linked List under the hood. The leftmost element (head) will be the first in queue, the right-most element (tail) will be the last in queue;

### Node

Exactly the same as Singly Linked List and Stack.

### Class with Constructor

```c++
class Queue
{
private:
    Node *first;
    Node *last;
    int length;

public:
    Queue(int value)
    {
        first = new Node(value);
        last = first;
        length = 1;
    }
};
```

### Enqueue

```c++
void enqueue(int value)
{
    Node *newNode = new Node(value);
    if (length == 0)
    {
        first = last = newNode;
    }
    else
    {
        last->next = newNode;
        last = last->next;
    }
    length++;
}
```

### Dequeue

```c++
int dequeue()
{
    if (length == 0)
    {
        return INT_MIN;
    }
    else if (length == 1)
    {
        int dequeuedValue = first->value;
        delete first;
        first = last = nullptr;
        length--;
        return dequeuedValue;
    }
    else
    {
        int dequeuedValue = first->value;
        Node *temp = first->next;
        delete first;
        first = temp;
        length--;
        return dequeuedValue;
    }
}
```

### Interview Questions

#### Queue Using Stacks

In a typical queue, the `enqueue` operation is used to add an item to the end of the queue. In this problem, you are required to implement the `enqueue` method, but there's a twist. The underlying data structure is not a typical array or linked list; instead, you are using two stacks (`stack1` and `stack2`) to simulate the behavior of a queue.

**Background**:

A stack is a Last-In-First-Out (LIFO) data structure. A queue, on the other hand, is a First-In-First-Out (FIFO) data structure. The challenge here is to use the properties of two stacks to simulate the behavior of a queue. Specifically, you will be working with the `enqueue` operation, which should add items to the end of the simulated queue.

You're provided with a partial implementation of the `QueueUsingTwoStacks` class. Here's what you have:

- A `front` method that retrieves the front element of the queue without removing it.
- An `isEmpty` method that checks if the queue is empty.
- A partially implemented `enqueue` method.

The two stacks are represented by `stack1` and `stack2`.

**Task**:

Complete the `enqueue` and `dequeue` methods of the `QueueUsingTwoStacks` class.

```c++
#include <stack>
#include <climits>
using namespace std;

class QueueUsingTwoStacks
{
private:
    stack<int> stack1, stack2;

public:
    int front()
    {
        if (stack2.empty())
        {
            while (!stack1.empty())
            {
                stack2.push(stack1.top());
                stack1.pop();
            }
        }
        if (stack2.empty())
        {
            return INT_MIN;
        }
        return stack2.top();
    }

    bool isEmpty()
    {
        return stack1.empty() && stack2.empty();
    }

    void enqueue(int value)
    {
        stack1.push(value);
    }

    int dequeue()
    {
        int dequeuedValue = front();
        if (stack2.empty())
        {
            return INT_MIN;
        }
        else
        {
            stack2.pop();
            return dequeuedValue;
        }
    }
};
```

## Trees

### Terminology

#### Applied to Nodes

**Node**: a structure that is somehow associated with others of its onw kind. A node generally carries information inside itself.

**Parent**: a node that points to at least another one. That is, it has at least one child.

**Child**: a node that is pointed to by another. That is, a node that has parents.

**Siblings**: are nodes that have the same parent node.

**Root**: the first node added in a tree. The top most node.

**Leaf**: a child node that has no children. Those at the bottom of the tree.

#### Applied to Trees

**Subtree**: it's like the subset concept. Given an existent tree T1, take any of its nodes, say N1, and imagine it as being a root of a smaller tree that preserves N1 children. The resulting tree is called a subtree of T1.

**Branch**: it's any list of nodes in a tree that are in a non-repeating path from the root to any of its leaves.

**Height**: it's an integer given by the longest branch length.

**Full**: when every node points to exactly 0 or the maximum number of nodes it can have. For a binary tree, it's when every node has exactly 0 or 2 children.

**Perfect**: when every level of the tree is completely filled. That is, the graphical diagram is a perfectly symmetrical triangle.

**Complete**: when a tree was filled from left to right with no gaps.

**Binary Tree**: when all nodes of a tree have 2 pointers, commonly called `left` and `right`. These pointers can have null value, but they always exist.

**Balanced Binary Tree**: The absolute difference of heights of left and right subtrees at any node is less than 1.

### Binary Search Tree

A BST is a Binary Tree that follows this rule when a new node is inserted: *If the new node has an inner value lesser than the parent, it will be positioned on the left; if it has an inner value greater that the parent, it'll be positioned on the right*.

#### Big $\Omicron$

Lookup, insert and remove algorithms can be $\Omicron(n)$ in the worst possible case, when the tree has only one straight branch with no forks. But that would not be a tree, but a singly linked list. Because actual trees have multiple branches, this case isn't considered. So, those operations mentioned earlier are actually considered $\Omicron(\log n)$.

#### Node class

```c++
class Node
{
public:
    int value;
    Node *left;
    Node *right;

    Node(int value)
    {
        this->value = value;
        left = right = nullptr;
    }
};
```

#### Tree Class with Constructor

```c++
class BinarySearchTree
{
private:
    Node *root;

public:
    BinarySearchTree()
    {
        root = nullptr;
    }

    BinarySearchTree(int value)
    {
        root = new Node(value);
    }
};
```

#### Insert

```c++
bool insert(int value)
{
    Node *newNode = new Node(value);
    if (root == nullptr)
    {
        root = newNode;
        return true;
    }
    Node *temp = root;
    while (true)
    {
        if (temp->value == value)
        {
            return false;
        }
        else if (temp->value > value)
        {
            if (temp->left == nullptr)
            {
                temp->left = newNode;
                return true;
            }
            temp = temp->left;
        }
        else if (temp->value < value)
        {
            if (temp->right == nullptr)
            {
                temp->right = newNode;
                return true;
            }
            temp = temp->right;
        }
    }
    return false;
}
```

#### Contains

```c++
bool contains(int value)
{
    if (root == nullptr)
    {
        return false;
    }
    Node *temp = root;
    while (temp != nullptr)
    {
        if (temp->value == value)
        {
            return true;
        }
        else if (temp->value > value)
        {
            temp = temp->left;
        }
        else if (temp->value < value)
        {
            temp = temp->right;
        }
    }
    return false;
}
```

#### Final Code

```c++
#include <iostream>
using namespace std;

class Node
{
public:
    int value;
    Node *left;
    Node *right;

    Node(int value)
    {
        this->value = value;
        left = right = nullptr;
    }
};

class BinarySearchTree
{
private:
    Node *root;

public:
    BinarySearchTree()
    {
        root = nullptr;
    }

    BinarySearchTree(int value)
    {
        root = new Node(value);
    }

    Node *getRoot()
    {
        return root;
    }

    bool insert(int value)
    {
        Node *newNode = new Node(value);
        if (root == nullptr)
        {
            root = newNode;
            return true;
        }
        Node *temp = root;
        while (true)
        {
            if (temp->value == value)
            {
                return false;
            }
            else if (temp->value > value)
            {
                if (temp->left == nullptr)
                {
                    temp->left = newNode;
                    return true;
                }
                temp = temp->left;
            }
            else if (temp->value < value)
            {
                if (temp->right == nullptr)
                {
                    temp->right = newNode;
                    return true;
                }
                temp = temp->right;
            }
        }
        return false;
    }

    bool contains(int value)
    {
        if (root == nullptr)
        {
            return false;
        }
        Node *temp = root;
        while (temp != nullptr)
        {
            if (temp->value == value)
            {
                return true;
            }
            else if (temp->value > value)
            {
                temp = temp->left;
            }
            else if (temp->value < value)
            {
                temp = temp->right;
            }
        }
        return false;
    }
};

int main()
{
    BinarySearchTree emptyTree = BinarySearchTree();
    BinarySearchTree tree = BinarySearchTree(47);

    cout << "Creates an empty tree: " << emptyTree.getRoot() << endl;
    cout << "Creates an tree with root 47: " << tree.getRoot() << endl;

    tree.insert(21);
    tree.insert(76);
    tree.insert(18);
    tree.insert(52);
    tree.insert(82);
    tree.insert(27);

    cout << "Inserted values 21, 76, 18, 52, 82 and 27 to the tree" << endl;

    cout << "Root: " << tree.getRoot()->value << endl;
    cout << "Root -> left: " << tree.getRoot()->left->value << endl;
    cout << "Root -> left -> left : " << tree.getRoot()->left->left->value << endl;
    cout << "Root -> left -> right: " << tree.getRoot()->left->right->value << endl;
    cout << "Root -> right: " << tree.getRoot()->right->value << endl;
    cout << "Root -> right -> left: " << tree.getRoot()->right->left->value << endl;
    cout << "Root -> right -> right: " << tree.getRoot()->right->right->value << endl;

    cout << "Value 1" << (tree.contains(1) ? " is " : " is not ") << "in the tree" << endl;
    cout << "Value 76" << (tree.contains(76) ? " is " : " is not ") << "in the tree" << endl;
    cout << "Value 18" << (tree.contains(18) ? " is " : " is not ") << "in the tree" << endl;
    cout << "Value 19" << (tree.contains(19) ? " is " : " is not ") << "in the tree" << endl;
    cout << "Value 27" << (tree.contains(27) ? " is " : " is not ") << "in the tree" << endl;

    return 0;
}
```

## Hash Table

### Intro

Basically a table that associates an access address to a set of values or objects or anything that engineers will invent to store data. The table is commonly implemented as a sequential array.

When a new data will be inserted on the hash table, that data is somehow used to calculate its access address in the array. The calculation is done by the *Hash Function*.

### Collisions

Sometimes, different data can lead to the same access address in the hash table. There are two ways of handling this.

#### Separate Chaining

The hash table has some ways of storing both data in the same address. It can be done, for example, implementing the hash table as an array of linked lists. That way, each position can support any quantity of data.

#### Linear Probing

Instead of storing multiple data in the same address, when the hash function points to a spot that is already taken, the hash table can iterate through the following positions until it finds an available address.

### Node Class

```c++
class Node
{
public:
    string key;
    int value;
    Node *next;

    Node(string key, int value)
    {
        this->key = key;
        this->value = value;
        next = nullptr;
    }
};
```

### Hash Table Class

```c++
class HashTable
{
private:
    static const int SIZE = 7;
    Node *dataMap[SIZE];
};
```

### To String

```c++
string toString()
{
    string result = "";
    for (int i = 0; i < SIZE; i++)
    {
        result += to_string(i) + ":\n";
        if (dataMap[i] != nullptr)
        {
            Node *temp = dataMap[i];
            while (temp != nullptr)
            {
                result += "  {" + temp->key + ", " + to_string(temp->value) + "}";
                temp = temp->next;
            }
            result += "\n";
        }
    }
    return result;
}
```

### Hash Function

The function used in this course basically does:

- Iterates through each `char` of the the given key
- Multiplies each `char`s ascii values by 23 (an arbitrary prime number)
- Sums all of the previous multiplications results to get an integer
- Calculates de module of SIZE and the previous result
- The previous result is the hash, the address in the table

```c++
int hash(string key)
{
    int hash = 0;
    for (int i = 0; i < key.length(); i++)
    {
        int asciiValue = int(key[i]);
        hash = (hash + asciiValue * 23) % SIZE;
    }
    return hash;
}
```

### Set

```c++
void set(string key, int value)
{
    int index = hash(key);
    Node *newNode = new Node(key, value);
    if (dataMap[index] == nullptr)
    {
        dataMap[index] = newNode;
    }
    else
    {
        Node *temp = dataMap[index];
        while (temp->next != nullptr)
        {
            temp = temp->next;
        }
        temp->next = newNode;
    }
}
```

### Get

When `key` isn't present in the Hash table, return value will be `0`.

```c++
int get(string key)
{
    int index = hash(key);
    if (dataMap[index] != nullptr)
    {
        Node *temp = dataMap[index];
        while (temp != nullptr)
        {
            if (temp->key == key)
            {
                return temp->value;
            }
            temp = temp->next;
        }
    }
    return 0;
}
```

### Keys

```c++
vector<string> keys()
{
    vector<string> allKeys = vector<string>();
    for (int i = 0; i < SIZE; i++)
    {
        if (dataMap[i] != nullptr)
        {
            Node *temp = dataMap[i];
            while (temp != nullptr)
            {
                allKeys.push_back(temp->key);
                temp = temp->next;
            }
        }
    }
    return allKeys;
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
    string key;
    int value;
    Node *next;

    Node(string key, int value)
    {
        this->key = key;
        this->value = value;
        next = nullptr;
    }
};

class HashTable
{
private:
    static const int SIZE = 7;
    Node *dataMap[SIZE];

public:
    string toString()
    {
        string result = "";
        for (int i = 0; i < SIZE; i++)
        {
            result += to_string(i) + ":\n";
            if (dataMap[i] != nullptr)
            {
                Node *temp = dataMap[i];
                while (temp != nullptr)
                {
                    result += "  {" + temp->key + ", " + to_string(temp->value) + "}";
                    temp = temp->next;
                }
                result += "\n";
            }
        }
        return result;
    }

    int hash(string key)
    {
        int hash = 0;
        for (int i = 0; i < key.length(); i++)
        {
            int asciiValue = int(key[i]);
            hash = (hash + asciiValue * 23) % SIZE;
        }
        return hash;
    }

    void set(string key, int value)
    {
        int index = hash(key);
        Node *newNode = new Node(key, value);
        if (dataMap[index] == nullptr)
        {
            dataMap[index] = newNode;
        }
        else
        {
            Node *temp = dataMap[index];
            while (temp->next != nullptr)
            {
                temp = temp->next;
            }
            temp->next = newNode;
        }
    }

    int get(string key)
    {
        int index = hash(key);
        if (dataMap[index] != nullptr)
        {
            Node *temp = dataMap[index];
            while (temp != nullptr)
            {
                if (temp->key == key)
                {
                    return temp->value;
                }
                temp = temp->next;
            }
        }
        return 0;
    }

    vector<string> keys()
    {
        vector<string> allKeys = vector<string>();
        for (int i = 0; i < SIZE; i++)
        {
            if (dataMap[i] != nullptr)
            {
                Node *temp = dataMap[i];
                while (temp != nullptr)
                {
                    allKeys.push_back(temp->key);
                    temp = temp->next;
                }
            }
        }
        return allKeys;
    }
};

string vectorToString(vector<string> vector)
{
    string result = "";
    for (string s : vector)
    {
        result += s + " ";
    }
    return result;
}

int main()
{

    HashTable *myHT = new HashTable();
    cout << "Created empty HashTable:\n"
         << myHT->toString() << endl;

    myHT->set("dog", 2);
    myHT->set("cat", 20);
    myHT->set("pizza", 15);
    myHT->set("nails", 100);
    myHT->set("tile", 50);
    myHT->set("lumber", 80);
    myHT->set("bolts", 200);
    myHT->set("screws", 140);

    cout << "Added nodes to the HashTable:\n"
         << myHT->toString() << endl;

    cout << "Getting key dog: " << myHT->get("dog") << endl;
    cout << "Getting key cat: " << myHT->get("cat") << endl;
    cout << "Getting key nails: " << myHT->get("nails") << endl;
    cout << "Getting key bolts: " << myHT->get("bolts") << endl;
    cout << "Getting key abc: " << myHT->get("abc") << endl;

    cout << "HashTable keys: " + vectorToString(myHT->keys()) << endl;

    return 0;
}
```

### Big $\Omicron$

#### Hash Function

To calculate the complexity of an algorithm, the variable N is used to represent the number of data that the algorithm has to process. In the context of Hash tables, N is the number of key-values pairs stored in it.

The hash function receives a `string` of length L as input and its internal complexity can be any one of the previously mentioned, say $\Omicron(L^{2})$. But, to evaluate the general performance of the other algorithms in a hash table, the hash function is always considered $\Omicron(1)$. That is because it generally is $\Omicron(1)$ for real, but also because the string's length is not big enough to make a difference.

Note that the complexities of `get()` and `set()` algorithms below don't consider the `hash()`'s big $O$.

#### Get and Set

In a most technical sense, the worst case of a Hash table is when all of its values are stored in the same address. So theoretically, it's $\Omicron(n)$.

But, as this case has a probability of occurrence that tends to zero, to calculate $\Omicron(n)$, we do not take the actual worst case, but the worst case that occurs in practice. The complexity of the worst case, when all positions in the table have the same number of elements, is $\Omicron(1)$.

### Interview Questions

#### Item In Common

Implement a function called `itemInCommon()` that checks if two input vectors have at least one common item.

```c++
bool itemInCommon(vector<int> vect1, vector<int> vect2)
{
    unordered_map<int, bool> table = unordered_map<int, bool>();
    for (int v : vect1)
    {
        table[v] = true;
    }
    for (int v : vect2)
    {
        if (table[v])
        {
            return true;
        }
    }
    return false;
}
```

#### Find Duplicates

Implement a function called findDuplicates() that finds and returns all the duplicate elements in a given vector of integers.

```c++
vector<int> findDuplicates(const vector<int> &nums)
{
    unordered_map<int, bool> table = unordered_map<int, bool>();
    vector<int> repeated = vector<int>();
    for (int n : nums)
    {
        if (table[n])
        {
            repeated.push_back(n);
        }
        else
        {
            table[n] = true;
        }
    }
    return repeated;
}
```

#### First Non-Repeating Character

Implement a function called `firstNonRepeatingChar()` that finds and returns the first non-repeating character in a given string.

```c++
char firstNonRepeatingChar(const string &input_string)
{
    unordered_map<char, int> table = unordered_map<char, int>();
    for (char c : input_string)
    {
        table[c] = table[c] + 1;
    }
    for (char c : input_string)
    {
        if (table[c] == 1)
        {
            return c;
        }
    }
    return '\0';
}
```

#### Group Anagram

Implement a function called `groupAnagrams()` that groups a list of strings based on their anagram equivalence.

```c++
vector<vector<string>> groupAnagrams(const vector<string> &strings)
{
    unordered_map<string, vector<string>> table = unordered_map<string, vector<string>>();
    for (string s : strings)
    {
        string canonicalString = s;
        sort(canonicalString.begin(), canonicalString.end());
        table[canonicalString].push_back(s);
    }
    vector<vector<string>> result = vector<vector<string>>();
    for (const auto [key, value] : table)
    {
        result.push_back(value);
    }
    return result;
}
```

## Set

We're going to used the standard library's `unordered_set` class.

### Interview Questions

#### Remove Duplicates

Write a function called `removeDuplicates`.

This function takes a list of numbers as input and returns a new list that has all the duplicate numbers removed.

```c++
vector<int> removeDuplicates(const vector<int> &myList)
{
    unordered_set<int> set = unordered_set<int>();
    for (int i : myList)
    {
        set.insert(i);
    }
    vector<int> result = vector<int>();
    for (unordered_set<int>::iterator i = set.begin(); i != set.end(); i++)
    {
        result.push_back(*i);
    }
    return result;
}
```

#### Has Unique Chars

Write a function named `hasUniqueChars`. The function checks if all the characters in a given text are unique or not. If they are unique, the function will return true. If even one character is repeated, the function will return false.

**What Do We Mean by "Unique"?**

Unique means that no letter shows up more than once. For example, the word "apple" does not have unique characters because 'p' appears twice. But the word "orange" has unique characters because each letter is different.

```c++
bool hasUniqueChars(const string &str)
{
    unordered_set<int> set = unordered_set<int>();
    for (int i : str)
    {
        int setSize = set.size();
        set.insert(i);
        if (setSize == set.size())
        {
            return false;
        }
    }
    return true;
}
```

#### Find Pairs

Write a function called `findPairs`. This function takes two lists of numbers and a target number. It then finds pairs of numbers where one number is from the first list and the other is from the second list, and their sum equals the target number.

The function returns these pairs.

**What Do We Mean by "Pairs"?**

Pairs are sets of two numbers. For example, if we have 4 in one list and 6 in another, and our target number is 10, then (4, 6) is a pair that adds up to 10.

```c++
vector<vector<int>> findPairs(const vector<int> &arr1, const vector<int> &arr2, int target)
{
    unordered_set<int> set = unordered_set<int>();
    vector<vector<int>> pairs = vector<vector<int>>();
    for (int i : arr1)
    {
        set.insert(i);
    }
    for (int i : arr2)
    {
        int desiredValue = target - i;
        if (set.find(desiredValue) != set.end())
        {
            pairs.push_back(vector<int>{desiredValue, i});
        }
    }
    return pairs;
}
```

## Graphs

### Terminology

**Node or Vertex**: a structure that can be associated with others of the same type and carries some information. It is possible to have a disconnected Node.

**Edge or Connection**: it's what bounds two nodes together. It can be unidirectional (A -> B) or bidirectional (A <-> B).

**Weight**: scalar associated with an edge.

### Adjacency Matrix

After incrementally indexing every node of a graph with numbers from 0 to N, we can construct a (N+1)x(N+1) matrix where the element ij is 1 if the node i has an edge to j, and 0 otherwise. If the edges has weights, the adjacency matrix is filled up is them.

In a bidirectional graph, the resulting matrix is always symmetric. In a graph that nodes can't points to itself, the main diagonal is always zero.

### Adjacency List

After labeling every node of a graph with strings, we can create a Map whose keys are labels and each value is a list with the labels of the adjacent nodes.

Example:

```json
{
    "A": ["B", "E"],
    "B": ["A", "C"],
    "C": ["B", "D"],
    "D": ["C", "E"],
    "E": ["A", "D"]
}
```

By the adjacency list above we can conclude that the node A is adjacent to nodes B and E, and so on.

### Big $\Omicron$

#### Space complexity

The Space complexity of a graph stored as an adjacency matrix is $\Omicron(V^{2})$, while a graph stored as an adjacency list is $\Omicron(V + E)$. V = number of vertices, E = number of edges.

#### Time complexity

**Adding a vertex**: using an adjacency matrix, we need to create a new line and colum, which can only be done by recreating the whole matrix, so it's $\Omicron(V^{2})$. If we're using adjacency list, we simply have to add a new key in the Map $\Omicron(1)$.

**Adding an edge between vertices**: it is simply done by changing two values on a matrix or pushing back two elements on a list. Either way it's $\Omicron(1)$.

**Removing an edge between vertices**: similar to adding an edge, it's done by changing two values on a matrix or removing two items in a list of labels. Either way it's $\Omicron(1)$.

**Removing a vertex**: similar to adding a node, the adjacency matrix needs to be rewritten, so it's $\Omicron(V^{2})$. But, if the graph was implemented with an adjacency list, each list of labels needs to be iterated to find the occurrences of the node to be deleted, so it's $\Omicron(V)$.

### Bidirectional Graph class

```c++
#include <unordered_set>
#include <unordered_map>

using namespace std;

class Graph
{
private:
    unordered_map<string, unordered_set<string>> adjList;
};
```

All the following code will work with bidirectional graphs.

### To String

```c++
string toString()
{
    string result = "";
    for (auto [vertex, edges] : adjList)
    {
        result += vertex + ": [ ";
        for (auto edge : edges)
        {
            result += edge + " ";
        }
        result += "]\n";
    }
    return result;
}
```

### Add Vertex

```c++
bool addVertex(string vertex)
{
    if (adjList.count(vertex) == 0)
    {
        adjList[vertex];
        return true;
    }
    return false;
}
```

### Add Edge

```c++
bool addEdge(string vertex1, string vertex2)
{
    if (adjList.count(vertex1) != 0 && adjList.count(vertex2) != 0)
    {
        adjList.at(vertex1).insert(vertex2);
        adjList.at(vertex2).insert(vertex1);
        return true;
    }
    else
    {
        return false;
    }
}
```

### Remove Edge

```c++
bool removeEdge(string vertex1, string vertex2)
{
    if (adjList.count(vertex1) != 0 && adjList.count(vertex2) != 0)
    {
        adjList[vertex1].erase(vertex2);
        adjList[vertex2].erase(vertex1);
        return true;
    }
    else
    {
        return false;
    }
}
```

### Remove Vertex

```c++
bool removeVertex(string vertex)
{
    if (adjList.count(vertex) != 0)
    {
        for (string label : adjList[vertex])
        {
            adjList[label].erase(vertex);
        }
        adjList.erase(vertex);
        return true;
    }
    else
    {
        return false;
    }
}
```

### Final Code

```c++
#include <iostream>
#include <unordered_set>
#include <unordered_map>

using namespace std;

class Graph
{
private:
    unordered_map<string, unordered_set<string>> adjList;

public:
    string toString()
    {
        string result = "";
        for (auto [vertex, edges] : adjList)
        {
            result += vertex + ": [ ";
            for (auto edge : edges)
            {
                result += edge + " ";
            }
            result += "]\n";
        }
        return result;
    }

    bool addVertex(string vertex)
    {
        if (adjList.count(vertex) == 0)
        {
            adjList[vertex];
            return true;
        }
        return false;
    }

    bool addEdge(string vertex1, string vertex2)
    {
        if (adjList.count(vertex1) != 0 && adjList.count(vertex2) != 0)
        {
            adjList.at(vertex1).insert(vertex2);
            adjList.at(vertex2).insert(vertex1);
            return true;
        }
        else
        {
            return false;
        }
    }

    bool removeEdge(string vertex1, string vertex2)
    {
        if (adjList.count(vertex1) != 0 && adjList.count(vertex2) != 0)
        {
            adjList[vertex1].erase(vertex2);
            adjList[vertex2].erase(vertex1);
            return true;
        }
        else
        {
            return false;
        }
    }

    bool removeVertex(string vertex)
    {
        if (adjList.count(vertex) != 0)
        {
            for (string label : adjList[vertex])
            {
                adjList[label].erase(vertex);
            }
            adjList.erase(vertex);
            return true;
        }
        else
        {
            return false;
        }
    }
};

int main()
{
    Graph *myGraph = new Graph();

    cout << "Created Graph: " << myGraph->toString() << endl;

    myGraph->addVertex("A");
    myGraph->addVertex("B");
    myGraph->addVertex("C");
    myGraph->addVertex("D");

    cout << "Added vertices to Graph: " << endl
         << myGraph->toString() << endl;

    myGraph->addEdge("A", "Z");
    myGraph->addEdge("A", "B");
    myGraph->addEdge("B", "A");
    myGraph->addEdge("A", "D");
    myGraph->addEdge("D", "C");
    myGraph->addEdge("Z", "A");

    cout << "Added edges to the Graph:" << endl
         << myGraph->toString() << endl;

    myGraph->removeEdge("A", "B");

    cout << "Removes edge A->B of the Graph:" << endl
         << myGraph->toString() << endl;

    myGraph->removeVertex("Z");
    myGraph->removeVertex("A");
    myGraph->removeVertex("D");

    cout << "Removes vertices A and D of the Graph:" << endl
         << myGraph->toString() << endl;
}
```

## Recursion

We a function call itself... until it doesn't.

### Tree Traversal

#### Breadth First Search

Note this is a member method of the previous `BinarySearchTree` class and we're using a `queue` object.

```c++
void BreadthFirstSearch()
{
    queue<Node *> myQueue;
    myQueue.push(root);
    while (myQueue.size() > 0)
    {
        Node *currentNode = myQueue.front();
        myQueue.pop();
        cout << currentNode->value << " ";
        if (currentNode->left != nullptr)
        {
            myQueue.push(currentNode->left);
        }
        if (currentNode->right != nullptr)
        {
            myQueue.push(currentNode->right);
        }
    }
}
```

#### Depth First Search (PreOrder)

Print value first, recurse later.

```c++
void DFSPreOrder(Node *currentNode)
{
    cout << currentNode->value << " ";
    if (currentNode->left != nullptr)
    {
        DFSPreOrder(currentNode->left);
    }
    if (currentNode->right != nullptr)
    {
        DFSPreOrder(currentNode->right);
    }
}
```

#### Depth First Search (PostOrder)

Print children values first, then prints itself.

```c++
void DFSPostOrder(Node *currentNode)
{
    if (currentNode->left != nullptr)
    {
        DFSPostOrder(currentNode->left);
    }
    if (currentNode->right != nullptr)
    {
        DFSPostOrder(currentNode->right);
    }
    cout << currentNode->value << " ";
}
```

#### Depth First Search (InOrder)

This will print all tree values sorted in ascending order.

```c++
void DFSInOrder(Node *currentNode)
{
    if (currentNode->left != nullptr)
    {
        DFSInOrder(currentNode->left);
    }
    cout << currentNode->value << " ";
    if (currentNode->right != nullptr)
    {
        DFSInOrder(currentNode->right);
    }
}
```

## Sorting Algorithms

### Selection Sort

At every step, search for the smallest element and put it at the first non-sorted position. After doing that for `array.size()-1` times, the array is sorted.

```c++
void selectionSort(int array[], int size)
{
    for (int i = 0; i < size; i++)
    {
        int minIndex = i;
        for (int j = i + 1; j < size; j++)
        {
            if (array[j] < array[minIndex])
            {
                minIndex = j;
            }
        }
        if (i != minIndex)
        {
            int temp = array[minIndex];
            array[minIndex] = array[i];
            array[i] = temp;
        }
    }
}
```

### Insertion Sort

This algorithm has an advantage when dealing with already sorted or almost sorted array. Insertion sort time complexity is usually $\Omicron(n^{2})$, but in those mentioned cases, it's just $\Omicron(n)$.

```c++
void insertionSort(int array[], int size)
{
    for (int i = 1; i < size; i++)
    {
        int temp = array[i];
        int j = i - 1;
        while (j > -1 && temp < array[j])
        {
            array[j + 1] = array[j];
            array[j] = temp;
            j--;
        }
    }
}
```

### Merge Sort

Really cool algorithm that has a Space complexity of $\Omicron(n)$, and Time complexity of $\Omicron(n \log n)$.

First, we have to create an algorithm that given an array and valid indexes that represents the beginning, the middle and finish of the section we'll work with, creates two sub-arrays: one from beginning to middle, other from middle+1 to finish. After that, it'll overwrite the original array section with the sub-arrays values in a way they end up sorted. To place the values in a sorted way, we'll iterate through both sub-arrays, and at the iteration we'll check which of them has the smallest leftmost element. The smaller leftmost value will enter first the the original array.

Notice that this algorithm by itself doesn't completely sort an array, it just guarantees that the half with the smallest elements will be at the left side, and the half with the biggest elements will be at the right side.

```c++
void merge(int array[], int leftIndex, int midIndex, int rightIndex)
{
    int leftArraySize = midIndex - leftIndex + 1;
    int rightArraySize = rightIndex - midIndex;
    int leftArray[leftArraySize];
    int rightArray[rightArraySize];
    for (int i = 0; i < leftArraySize; i++)
    {
        leftArray[i] = array[leftIndex + i];
    }
    for (int i = 0; i < rightArraySize; i++)
    {
        rightArray[i] = array[midIndex + 1 + i];
    }
    int index = leftIndex;
    int i = 0;
    int j = 0;
    while (i < leftArraySize && j < rightArraySize)
    {
        if (leftArray[i] <= rightArray[j])
        {
            array[index] = leftArray[i];
            index++;
            i++;
        }
        else
        {
            array[index] = rightArray[j];
            index++;
            j++;
        }
    }
    while (i < leftArraySize)
    {
        array[index] = leftArray[i];
        index++;
        i++;
    }
    while (j < rightArraySize)
    {
        array[index] = rightArray[j];
        index++;
        j++;
    }
}

```

The real merge sort algorithm is below. It recursively calls itself two times, each one in a different half. When the array length reaches length == 1, it just returns doing nothing, because it's already sorted. If the length is greater than 1, it merges the given array passing indexes that divides it by half.

``` c++
void mergeSort(int array[], int leftIndex, int rightIndex)
{
    if (leftIndex >= rightIndex)
    {
        return;
    }
    int midIndex = leftIndex + (rightIndex - leftIndex) / 2;
    mergeSort(array, leftIndex, midIndex);
    mergeSort(array, midIndex + 1, rightIndex);
    merge(array, leftIndex, midIndex, rightIndex);
}
```

### Quick Sort

#### Swap Function

Since this operation is used a lot, we created a function to swap two values in an array.

```c++
void swap(int array[], int firstIndex, int secondIndex)
{
    int temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}
```

#### Pivot Function

It's the algorithm that does one iteration of quick sort in a sub-array of a given `array`. It begins iterating the sub-array inside `pivotIndex + 1` and `endIndex`. It basically places all the elements lesser than the pivot on the left and the elements greater than the pivot on the right, then inserts the pivot on the middle of those sub-arrays. The returned value is the index where the pivot ended.

```c++
int pivot(int array[], int pivotIndex, int endIndex)
{
    int swapIndex = pivotIndex;
    for (int i = pivotIndex + 1; i <= endIndex; i++)
    {
        if (array[i] < array[pivotIndex])
        {
            swapIndex++;
            swap(array, swapIndex, i);
        }
    }
    swap(array, pivotIndex, swapIndex);
    return swapIndex;
}
```

#### Final Code

```c++
void swap(int array[], int firstIndex, int secondIndex)
{
    int temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

int pivot(int array[], int pivotIndex, int endIndex)
{
    int swapIndex = pivotIndex;
    for (int i = pivotIndex + 1; i <= endIndex; i++)
    {
        if (array[i] < array[pivotIndex])
        {
            swapIndex++;
            swap(array, swapIndex, i);
        }
    }
    swap(array, pivotIndex, swapIndex);
    return swapIndex;
}

void quickSort(int array[], int leftIndex, int rightIndex)
{
    if (leftIndex >= rightIndex)
    {
        return;
    }
    int pivotIndex = pivot(array, leftIndex, rightIndex);
    quickSort(array, leftIndex, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, rightIndex);
}

int main()
{
    int array[] = {4, 6, 1, 7, 3, 2, 5};
    int size = sizeof(array) / sizeof(array[0]);
    quickSort(array, 0, size - 1);
    for (auto value : array)
    {
        cout << value << " ";
    }
}
```

### Interview Questions

#### Bubble Sort of LL

In this exercise, you will implement the `bubbleSort()` method to sort a singly linked list using the Bubble Sort algorithm. The goal is to sort the linked list in ascending order without creating any new nodes. You will only rearrange the `value` fields of the existing nodes.

```c++
void bubbleSort()
{
    if (length < 2)
    {
        return;
    }
    Node *sortedUntil = nullptr;
    for (int i = 0; i < length; i++)
    {
        Node *current = head;
        while (current->next != nullptr)
        {
            if (current->value > current->next->value)
            {
                swapNodeValues(current, current->next);
            }
            current = current->next;
        }
    }
}
```

#### Selection Sort of LL

Your task is to implement the `selectionSort()` method to sort a singly linked list using the Selection Sort algorithm. The goal is to sort the linked list in ascending order, but you can only change the value fields of the existing nodes.

```c++
void selectionSort()
{
    if (length < 2)
    {
        return;
    }
    Node *sortingNode = head;
    while (sortingNode != tail)
    {
        Node *iterator = sortingNode->next;
        Node *minValueNode = iterator;
        while (iterator != nullptr)
        {
            if (iterator->value < minValueNode->value)
            {
                minValueNode = iterator;
            }
            iterator = iterator->next;
        }
        if (minValueNode->value < sortingNode->value)
        {
            int value = sortingNode->value;
            sortingNode->value = minValueNode->value;
            minValueNode->value = value;
        }
        sortingNode = sortingNode->next;
    }
}
```

#### Insertion Sort of LL

Your task is to implement the `insertionSort()` method to sort a singly linked list using the Insertion Sort algorithm. The goal is to sort the linked list in ascending order. You should only change the `value` fields of the existing nodes and update the `next` pointers appropriately.

```c++
TODO
```

#### Merge Two Sorted LL

Your task is to implement the `merge(LinkedList& otherList)` method.

This method merges two sorted linked lists into a single sorted linked list. The `LinkedList` class has a `head`, `tail`, and `length` members. The nodes have value and next fields.

```c++
void merge(LinkedList &otherList)
{
    if (otherList.length == 0)
    {
        return;
    }
    else if (length == 0)
    {
        head = otherList.head;
        tail = otherList.tail;
        length = otherList.length;

        otherList.head = nullptr;
        otherList.tail = nullptr;
        otherList.length = 0;
        return;
    }
    int finalLength = length + otherList.length;
    Node *dummy = new Node(INT_MIN);
    Node *current = dummy;
    while (length > 0 && otherList.length > 0)
    {
        if (head->value <= otherList.head->value)
        {
            current->next = head;
            head = head->next;
            length--;
        }
        else
        {
            current->next = otherList.head;
            otherList.head = otherList.head->next;
            otherList.length--;
        }
        current = current->next;
    }
    if (length == 0)
    {
        current->next = otherList.head;
        tail = otherList.tail;
    }
    else if (otherList.length == 0)
    {
        current->next = head;
    }
    head = dummy->next;
    length = finalLength;
    delete dummy;
    otherList.head = nullptr;
    otherList.tail = nullptr;
    otherList.length = 0;
}
```

## Dynamic Programming

### Vector: Interview Questions

#### Remove Element

**Introduction**: Imagine you have a collection of items (represented by numbers), and you want to get rid of every occurrence of a specific item without using extra storage or another collection. The task is to perform this action using as minimal space as possible and in the most efficient way.

**Objective**: Write a function that takes in two parameters: a list of numbers (nums) and a target number (val). The goal is to remove all occurrences of the target number from the list without creating a new list. After the removals, the list should not have any gaps between the remaining numbers. The function should not return the modified list since it will be modified in place; however, the function should resize the list so that the remaining length matches the number of items left after the removals.

```c++
void removeElement(vector<int>& nums, int val) {
    size_t i = 0;
    for (size_t j = 0; j < nums.size(); j++) {
        if (nums[j] != val) {
            nums[i] = nums[j];
            i++;
        }
    }
    nums.resize(i);
}
```

#### Find Max Min

**Introduction**: Often in data processing or while analyzing a set of numbers, two primary metrics we are interested in are the highest (maximum) value and the lowest (minimum) value. The challenge here is to efficiently find these two metrics without sorting the list or using any external libraries.

**Objective**: Write a function that takes a list of integers and returns a new list containing two elements: the maximum and the minimum value in the input list.

```c++
vector<int> findMaxMin(vector<int> &myList)
{
    int max = myList[0], min = myList[0];
    for (size_t i = 1; i < myList.size(); i++)
    {
        if (myList[i] < min)
        {
            min = myList[i];
        }
        else if (myList[i] > max)
        {
            max = myList[i];
        }
    }
    return vector<int>{max, min};
}
```

#### Find Longest String

**Introduction**: Often in data processing or while analyzing a set of numbers, two primary metrics we are interested in are the highest (maximum) value and the lowest (minimum) value. The challenge here is to efficiently find these two metrics without sorting the list or using any external libraries.

**Objective**: Write a function that takes a list of integers and returns a new list containing two elements: the maximum and the minimum value in the input list.

```c++
string findLongestString(vector<string> &stringList)
{
    string longestStr = "";
    for (auto s : stringList)
    {
        if (s.size() > longestStr.size())
        {
            longestStr = s;
        }
    }
    return longestStr;
}
```

#### Remove Duplicates

**Introduction**: Working with sorted lists is common in programming. While these lists offer the advantage of easier search and analysis, they might contain consecutive duplicates which can be redundant for some applications. The challenge here is to efficiently remove these consecutive duplicate values in-place, without needing a separate data structure.

**Objective**: Write a function that, given a sorted list of integers, removes all consecutive duplicates and returns the length of the modified list. The function should perform the operation in-place, which means you shouldn't use an additional list to store the result.

```c++
int removeDuplicates(vector<int> &nums)
{
    if (nums.size() <= 1)
    {
        return nums.size();
    }
    int currentValue = INT_MIN;
    size_t writingIndex = 0;
    for (size_t i = 0; i < nums.size(); i++)
    {
        if (nums[i] != currentValue)
        {
            nums[writingIndex] = nums[i];
            currentValue = nums[i];
            writingIndex++;
        }
    }
    nums.resize(writingIndex);
    return writingIndex;
}
```

#### Max Profit

**Introduction**: The stock market is unpredictable, with prices of stocks rising and falling every day. For those who want to buy and sell stocks to gain profit, knowing when to buy at a low price and when to sell at a high price is crucial. This problem challenges you to determine the best day to buy and sell a stock to achieve maximum profit.

**Objective**: Given a list of integers where each integer represents the stock price of a company for a particular day (index 0 is Day 1, index 1 is Day 2, and so on), your task is to find the maximum profit you could achieve from buying the stock on one day and selling it on a later day. Note that you are only allowed to complete one transaction, i.e., you can only buy and sell the stock once.

```c++
int maxProfit(vector<int> &prices)
{
    if (prices.size() <= 1)
    {
        return 0;
    }
    int min = prices[0];
    int maxProfit = 0;
    int profit = 0;

    for (size_t i = 0; i < prices.size(); i++)
    {
        if (prices[i] < min)
        {
            min = prices[i];
        }
        profit = prices[i] - min;
        if (profit > maxProfit)
        {
            maxProfit = profit;
        }
    }
    return maxProfit;
}
```

#### Rotate

**Introduction**: Array manipulation is a common operation in data processing. One of the operations is rotating the elements of an array. In this problem, the task is to rotate an array to the right by a given number of steps. A rotation on the array means that each element moves to the right, and the last element wraps around to become the first.

**Objective**: Given a list of integers, `nums`, and an integer, k, rotate the elements of nums to the right by k steps.

My poor implementation:

```c++
void rotate(vector<int> &nums, int k)
{
    if (nums.size() < 2)
    {
        return;
    }
    if (nums.size() <= k)
    {
        k = k % nums.size();
    }
    for (size_t i = 0; i < k; i++)
    {
        nums.insert(nums.begin(), nums.back());
        nums.pop_back();
    }
}
```

Sophisticated implementation:

```c++
void rotate(vector<int>& nums, int k) {
    if (nums.empty()) return;

    k = k % nums.size();

    // Reverse the first part
    for (int start = 0, end = nums.size() - k - 1; start < end; start++, end--) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
    }

    // Reverse the second part
    for (int start = nums.size() - k, end = nums.size() - 1; start < end; start++, end--) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
    }

    // Reverse the whole array
    for (int start = 0, end = nums.size() - 1; start < end; start++, end--) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
    }
}
```
