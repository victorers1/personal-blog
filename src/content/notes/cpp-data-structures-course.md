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

## Queue

FIFO: First in, First out.

We'll implement it using Singly Linked List under the hood. The left-most element (head) will be the first in queue, the right-most element (tail) will be the last in queue;

### Node

Exactly the same of Singly Linked List and Stack.

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

TODO

```c++

```
