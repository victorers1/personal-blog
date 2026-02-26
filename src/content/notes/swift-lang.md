---
title: 'Swift Language'
description: "The only way to go swift, is to go well"
pubDate: 'Feb 23 2026'
updatedDate: 'Feb 23 2026'
heroImage: '/swift-gradient.png'
---

## Intro

The official Apple language.

## Examples

### Optionals

```swift
let optionalBool: Bool? = nil
let optionalInt: Int? = nil
let optionalStr: String? = nil
```

#### `nil` coalescing

```swift
let nonOptionalBool: Bool = optionalBool ?? false
```

#### `if let`

```swift
/// Without var creation
if let optionalBool, let optionalInt, let optionalStr {
    print("optionalBool, optionalInt AND optionalStr are not optional in here: \(optionalBool), \(optionalInt), \(optionalStr)")
} else {
    print("either optionalBool OR optionalInt OR optionalStr are nil")
}

/// With var creation
if let aBoolValue = optionalBool, let aIntValue = optionalInt, let aStrValue = optionalStr {
    print("aBoolValue, aIntValue AND aStrValue are not optional: \(aBoolValue), \(aIntValue), \(aStrValue)")
} else {
    print("either optionalBool OR optionalInt OR optionalStr are nil")
}
```

#### `guard let`

```swift
/// With var creation
guard let aBoolValue = optionalBool, let aIntValue = optionalInt, let aStrValue = optionalStr else {
    print("either optionalBool OR optionalInt OR optionalStr are nil, no variable was created")
}

/// A `guard` statement makes you sure that the created variables are not optional
print("aBoolValue, aIntValue AND aStrValue are not optional: \(aBoolValue), \(aIntValue), \(aStrValue)")
s
/// Without var creation
guard let optionalBool, let optionalInt, let optionalStr else {
    print("either optionalBool OR aIntValue OR aStrValue are nil, no variable was created")
}

print("optionalBool, optionalInt AND optionalStr are not optional anymore: \(optionalBool), \(optionalInt), \(optionalStr)")
```

### Tuples

```swift
/// Access
let tuple: (String, Int) = ("One", 1)
print("Name: \(tuple.0), Value: \(tuple.1)")

let (name, value): (String, Int) = ("One", 1)
print("Name: \(name), Value: \(value)")

for (index, char) in "String".enumerated() {
    print("Index: \(index), Character: \(char)")
}

let letters: [(Int, Character)] = "String".enumerated().map { tuple in
    (tuple.offset, tuple.element)
}

print("First letter: \(letters.first!.1), Last letter: \(letters.last!.1)")
```

### Enum

#### Raw values

```swift
/// `Int` protocol makes `Planet.mercury` have an EXPLICIT raw value of 1, `Planet.venus` have an IMPLICIT raw value of 2, and so on
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}

/// `String` protocol makes `Color.red` have an IMPLICIT raw value of "red" and so on
enum Color: String {
    case red, green, blue
}
```

#### Iterating

```swift
/// `CaseIterable` protocol enables `CompassPoint.allCases` list
enum CompassPoint: CaseIterable {
    case north
    case south
    case east
    case west

    var direction: String {
        switch self {
        case .north:
            "Up"
        case .south:
            "Down"
        case .east:
            "Right"
        case .west:
            "Left"
        }
    }
}

print("There are \(CompassPoint.allCases.count) compass points.")

let go: CompassPoint = .west
print("Go \(go.direction)")
```

#### Associated values

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

var productBarcode = Barcode.upc(8, 85909, 51226, 3)

if case .upc(let numberSystem, _, _, let check) = productBarcode { // Unwrapping only two .ups values
    print("numberSystem: \(numberSystem), check: \(check)")
}

productBarcode = .qrCode("ABCDEFGHIJKLMNOP") // old values are lost

print(productBarcode)
```

### Iterables and common iteration methods

```swift
let fruitsArray: [String] = ["Apple", "Orange", "Orange"]
if let firstFruit = fruitsArray.first {
    print("First fruit: \(firstFruit)")
}

var booleans: Array<Bool> = [true, false, true]
let falseCount = booleans.count(where: { element in
    !element
})

/// Adding elements
booleans.append(false)
booleans.append(contentsOf: [true, true])
booleans = booleans + [false, true]
booleans.insert(true, at: 0)
booleans.insert(contentsOf: [false, true], at: 1)
print("The last false is in: \(booleans.lastIndex(of: false) ?? 0)")

/// Sets
var fruitsSet: Set<String> = []
fruitsArray.forEach { fruitsSet.insert($0) }
print("fruitsSet: \(fruitsSet)")
```

### `filter`

```swift
let trueCount = booleans.filter(\.self).count
print("trueCount: \(trueCount)")

let onlyFalses: [Bool] = booleans.filter({ !$0 }) // one-line shorthand
print("onlyFalses: \(onlyFalses)")

let fruitsWithA = fruits.filter { f in
    f.lowercased().starts(with: "a")
}
print("fruitsWithA: \(fruitsWithA)")
```

### `map`

```swift
let uppercasedFruits = fruits.map { fruit in
    fruit.uppercased()
}
print("uppercasedFruits: \(uppercasedFruits)")

let booleansString = booleans.map(\.description)
print("booleansString: \(booleansString)")
```

### `sort`

```swift
let sortedTrueFirst = booleans.sorted { a, b in
    a == true && b == false
}
print("sortedBooleans: \(sortedTrueFirst)")

/// Integer sorting method
func areInIncreasingOrder(a: Int, b: Int) -> Bool {
    a < b
}

let integers = [9, 4, 7, 8, 6, 1, 5, 2, 3, 0]
let sortedIntegers = integers.sorted(by: areInIncreasingOrder)
print("sortedIntegers: \(sortedIntegers)")
```

### Dictionary

```swift
let empty: [String: Int] = [:]
var fruits: [String: [String]] = ["a": ["Apple"], "b": ["Banana"], "c": ["Carrot"]]

/// [] returns an optional
let fruitsWithA: [String]? = fruits["a"]
let fruitsWithZ: [String] = fruits["z"] ?? []

fruits["d"] = ["Durian"]
fruits["a"]?.append("Avocado")
print(fruits)

let json: [String: Any] = [
    "name": "Flank",
    "age": 29,
    "isPremium": false,
    "friends": ["Milano", "Bertrand"]
    "address": [
        "street": "Rua das Flores",
        "number": 123,
        "city": "São Paulo"
    ],
]
```

### Loops

```swift
let seconds: Range<Int> = 0 ..< 60
let secs: ClosedRange<Int> = 0 ... 59
for num in secs {
    print(num)
}

let natoAlphabet = ["Alpha", "Bravo", "Delta", "Echo", "Foxtrot"]
for letter in natoAlphabet {
    print(letter)
}

for (index, second) in seconds.enumerated() {
    if index % 2 == 0 { continue }
    if second > 30 { break }
    print("second \(index) == \(second)")
}
```
