---
title: 'Dart Language'
description: "Warning: these notes aren't about Flutter"
pubDate: 'Feb 11 2024'
updatedDate: 'Mar 14 2024'
heroImage: '/dart-gradient.png'
---

## Intro

TODO

## Pattern Matching

Introduced in Dart 3. TODO

## Records

Introduced in Dart 3. TODO

## Nice Utilities

### Debounce

A class that prevents a method from being excessively called multiple times in a short period.

```dart
import 'dart:async';

class Debouncer {
  final int milliseconds;

  Timer? _timer;
  final Duration _delay;

  Debouncer({required this.milliseconds})
      : _delay = Duration(milliseconds: milliseconds);

  void run(void Function() f) {
    _timer?.cancel();
    _timer = Timer(_delay, f);
  }

  void dispose() {
    _timer?.cancel();
    _timer = null;
  }
}
```

Usage:

```dart
final debouncer = Debouncer(milliseconds: 250);

int main() {
    debouncer.run(
        () {
            print("Won't be executed because of the next line");
        }
    );

    debouncer.run(
        () {
            print("Will be executed after 250 milliseconds");
        }
    );

    debouncer.dispose();
}
```

The function `f` passed to the method `run` is executed after a pre-defined delay. When the `run` method is called again in the middle of a delay, the previous call to `f` is cancelled in favor to the current `f` and the delay starts again from 0.

As this implementation uses a `Timer` object, it's very important to **dispose** the debouncer when it won't be needed anymore.

### Singleton Pattern

It's a class that can have only one object instantiated. Every time the `new` operator is called on it, the constructor returns the same instance.

```dart
class Singleton {
  String name = 'name';

  /// Internal instance.
  /// Returned every time the command `new Singleton()` is called
  static Singleton? _instance;

  /// Private constructor.
  /// Used to run internal logic at construction time
  Singleton._privateConstructor() {
    // add logic here
  }

  /// Public constructor.
  /// Returns the same instance every time a new object would be created.
  factory Singleton() {
    _instance ??= Singleton._privateConstructor();
    return _instance!;
  }
}

void main() {
  final objA = Singleton();
  final objB = Singleton();

  print(objA == objB); // true
  print(objA.name == objB.name); // true
  objA.name = 'nome';
  print(objA.name == objB.name); // true
}
```

In the above code, the attribute `name` was added only for testing purposes. The private constructor is needed because it's the true responsible to initialize the object's attributes, allocate it in memory and return its reference. The factory method doesn't actually create anything, it's just used to call the private constructor or the previously created instance.

[Here](https://stackoverflow.com/a/12649574/9718711) is another implementation that creates an instance right at the class declaration:

```dart
class Singleton {
  static final Singleton _instance = Singleton._privateConstructor();

  factory Singleton() {
    return _instance;
  }

  Singleton._privateConstructor();
}
```

[Here](https://stackoverflow.com/a/55348216/9718711) is a implementation that exposes the `instance` attribute:

```dart
class Singleton {
  Singleton._privateConstructor();
  static final Singleton instance = Singleton._privateConstructor();
}
```

In the code above, `instance` can be exposed because it's `final`, so once attributed, can't be changed.

### Observer Pattern

Observer class:

```dart
abstract class Observer {
  void onUpdate(String data);
}

class ConcreteObserver implements Observer {
  final String name;

  ConcreteObserver(this.name);

  @override
  void onUpdate(String data) {
    print('$name received data: $data');
  }
}
```

Subject class:

```dart
class Subject {
  List<Observer> _observers = [];

  void addObserver(Observer observer) {
    _observers.add(observer);
  }

  void removeObserver(Observer observer) {
    _observers.remove(observer);
  }

  // Method to send data to observers
  void sendData(String data) {
    notifyObservers(data);
  }

  void notifyObservers(String data) {
    for (final obs in _observers) {
      obs.onUpdate(data);
    }
  }
}
```

Example of usage:

```dart
void main() {
  // Create a subject
  final subject = Subject();

  // Create observers
  final observer1 = ConcreteObserver("obs1");
  final observer2 = ConcreteObserver("obs2");

  // Register observers with the subject
  subject.addObserver(observer1);
  subject.addObserver(observer2);

  // Send data to observers
  subject.sendData('Hello');

  // Remove an observer
  subject.removeObserver(observer2);

  // Send more data to observers
  subject.sendData('World');
}
```

Example of output:

```text
obs1 received data: Hello
obs2 received data: Hello
obs1 received data: World
```

### Pair Class

If you want to implement by yourself:

```dart
class Pair<L, R> {
  final L left;
  final R right;

  Pair(this.left, this.right);
}

void main() {
  const pair = Pair<String, int>('key', 0);
  print(pair.left);
  print(pair.right);
}
```

Or you could just use the `MapEntry` class, which holds a `key`-`value` pair. To refer these getters as the typical `left`-`right` nomenclature, write an extension on `MapEntry<K, V>`.

```dart
extension MapEntryExt<K,V> on MapEntry<K, V> {
  K get left => key;
  V get right => value;
}

void main() {
  const pair = MapEntry('key', 0);
  print(pair.left);
  print(pair.right);
}
```

### DurationExtension

If you want to declare `Duration`s in a less verbose way:

```dart
extension DurationExt on int {
  Duration get ms => Duration(milliseconds: this);
  Duration get sec => Duration(seconds: this);
  Duration get min => Duration(minutes: this);
}
```

Usage:

```dart
final halfSec = 500.ms;
final twoSecs = 2.sec;
final oneHour = 60.min;
```

### Random Numbers

Basic usage:

```kotlin
import 'dart:math';

void main() {
  var random = Random();

  random.nextBool();
  random.nextDouble();
  random.nextInt(100);
  random.toString();
}
```

To generate numbers inside the interval $[min, max)$, use the function:

```dart
int random(int min, int max) {
    return min + Random().nextInt(max - min);
}
```
