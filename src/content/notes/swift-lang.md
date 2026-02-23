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

### Switch

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

#### Iterating over enum

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
