---
title: 'JavaScript Language'
description: 'Oh, great. Another standard 😑'
pubDate: 'Feb 12 2024'
# updatedDate: Feb 13 2024
heroImage: '/js-gradient.png'
---

## Intro

Let's begin with basic definitions.

### ECMA

Acronym stands for **European Computer Manufacturers Association**. It's a nonprofit standards organization for information and communication systems. In 1994, changed its name to [Ecma International](https://en.wikipedia.org/wiki/Ecma_International) to reflect the organization's global reach and activities.

### ECMAScript

Also known as **ES**, it's a standard for scripting languages, including JavaScript, JScript, and ActionScript. It is best known as a JavaScript standard intended to ensure the interoperability of web pages across different web browsers. The standard official name is [ECMA-262](https://ecma-international.org/publications-and-standards/standards/ecma-262/).

#### Publications History

| Document name | Publication date | Abbreviation |
|---|---| --- |
| ECMA-262, 1st edition | June 1997 | n/a |
| ECMA-262, 2nd edition | August 1998 | n/a |
| ECMA-262, 3rd edition | December 1999 | n/a |
| ECMA-262, 4th edition  |(wasn't published)| n/a |
| ECMA-262, 5th edition | December 2009 | n/a |
| ECMA-262, 5.1th edition | June 2011 | n/a |
| ECMA-262, 6th edition | June 2015 | ES6 |
| ECMA-262, 7th edition | June 2016 | ES7 |
| ECMA-262, 8th edition | June 2017 | ES8 |
| ECMA-262, 9th edition | June 2018 | ES9 |
| ECMA-262, 10th edition | June 2019 | ES10 |
| ECMA-262, 11th edition | June 2020 | ES11 |
| ECMA-262, 12th edition | June 2021 | ES12 |
| ECMA-262, 13th edition | June 2022 | ES13 |
| ECMA-262, 14th edition | June 2023 | ES14 |

A standard may also be known by its publication date, so you may encounter someone in the web referring to the 5.1th edition as ECMAScript 2011, or to the 6th edition as ECMAScript 2015 and so on.

Since 2015, it became common to use the version number as the identifier. So, ECMAScript 2015 can be called ES6 (because it's the 6th version), ECMAScript 2016 can be referred as ES7 and so on.

#### ECMAScript 2015 (ES6) and beyond

Since ECMAScript 2015 (ES6) features are split into three groups for **shipping**, **staged**, and **in progress** features:

- All shipping features, which V8 considers stable, are turned on by default on Node.js and do NOT require any kind of runtime flag.
- Staged features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: `--harmony`.
- In progress features can be activated individually by their respective harmony flag, although this is highly discouraged unless for testing purposes. Note: these flags are exposed by V8 and will potentially change without any deprecation notice.

### V8 engine

Is a program writen in C++ that takes our JavaScript code, compiles it to machine code and executes it while browsing with Chrome. That was the original purpose, but the fact that it can also run standalone or be embedded into any C++ application made a huge difference after its release.

So, follow me:

- Computers doesn't understand JavaScript code by default
- JavaScript engines are programs that converts JavaScript code into machine code
- JavaScript engines are independent of the browsers in which they're hosted
- In addition to browsers, V8 engine can also run standalone or be embedded into any C++ application
- By embedding V8 into your own C++ application, you can write C++ code that get executed when a user write a JavaScript code
- Since C++ is great for lower level operations like file handling, database connections and network, by embedding a JS engine into your own C++ program, you have the power to add all of these functionalities to JavaScript
- This C++ application can take your JS code, parse into machine code and perform features that originally weren't available in JavaScript

That application was already made and it's called Node.js. V8 was the chosen engine to power Node.js back in 2009.

#### Other JS engines

Other browsers have their own JavaScript engine:

- Firefox has [SpiderMonkey](https://spidermonkey.dev/)
- Safari has [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore) (also called Nitro)
- Edge was originally based on [Chakra](https://github.com/chakra-core/ChakraCore) but has more recently been [rebuilt using Chromium](https://support.microsoft.com/en-us/microsoft-edge/download-the-new-microsoft-edge-based-on-chromium-0f4a3dd7-55df-60f5-739f-00010dba52cf) and the V8 engine.

and many others exist as well.

All those engines implement the ECMA ES-262 standard, also called ECMAScript, the standard used by JavaScript.

#### Compilation

JavaScript is generally considered an interpreted language, but modern engines no longer just interpret JavaScript, they compile it.

This has been happening since 2009, when the SpiderMonkey JavaScript compiler was added to Firefox 3.5, and everyone followed this idea.

JavaScript is internally compiled by V8 with **just-in-time** (JIT) **compilation** to speed up the execution.

This might seem counter-intuitive, but since the introduction of Google Maps in 2004, JavaScript has evolved from a language that was generally executing a few dozens of lines of code to complete applications with even thousands of lines running in the browser.

In this new world, compiling JavaScript makes sense because while it might take a bit more to have the JavaScript ready, once done it's going to be much more performant than purely interpreted code.

### Node.js

Node.js is a cross-platform, open-source JavaScript runtime environment that can run on several modern OS. It runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.

Node.js has a unique advantage because millions of frontend developers that write JavaScript for the browser are now able to write the server-side code in addition to the client-side code without the need to learn a completely different language.

In Node.js the new ECMAScript standards can be used without problems, as you don't have to wait for all your users to update their browsers - you are in charge of deciding which ECMAScript version to use by changing the Node.js version.

#### Differences from the browser

Despite the fact that it's always JavaScript, there are some key differences.

In the browser, most of the time what you are doing is interacting with the DOM, or other **Web Platform API** like Cookies. Those do not exist in Node.js. You don't have the document, window and all the other objects that are provided by the browser, just as in the browser we don't have the APIs that Node.js provides through its modules, like the filesystem access functionality.

Another difference is that Node.js supports both the CommonJS and ES module systems (since Node.js v12), while in the browser we are starting to see the ES Modules standard being implemented.

#### npm

The package manager allows programmers to publish and share Node.js packages, along with the accompanying source code, and is designed to simplify the installation, update and uninstallation of packages.

It consists of a Command Line Interface, also called npm, and an online database of public and paid-for private packages, called the npm registry. The registry is accessed via the client, and the available packages can be browsed and searched via the npm website. The package manager and the registry are managed by **npm, Inc**.

#### Release dates

| Node.js version | Codename | Release Date | npm version |
| --- | --- | --- | --- |
| v21.6.2   |     -    | 2024-02-13 | v10.2.4  |
| v20.11.1  |   Iron   | 2024-02-13 | v10.2.4  |
| v19.9.0   |     -    | 2023-04-10 | v9.6.3   |
| v18.19.1  | Hydrogen | 2024-02-13 | v10.2.4  |
| v17.9.1   |     -    | 2022-06-01 | v8.11.0  |
| v16.20.2  | Gallium  | 2023-08-08 | v8.19.4  |
| v15.14.0  |     -    | 2021-04-06 | v7.7.6   |
| v14.21.3  | Fermium  | 2023-02-16 | v6.14.18 |
| v13.14.0  |     -    | 2020-04-29 | v6.14.4  |
| v12.22.12 |  Erbium  | 2022-04-05 | v6.14.16 |
| v11.15.0  |     -    | 2019-04-30 | v6.7.0   |
| v10.24.1  | Dubnium  | 2021-04-06 | v6.14.12 |
| v9.11.2   |     -    | 2018-06-12 | v5.6.0   |
| v8.17.0   |  Carbon  | 2019-12-17 | v6.13.4  |
| v7.10.1   |     -    | 2017-07-11 | v4.2.0   |
| v6.17.1   |  Boron   | 2019-04-03 | v3.10.10 |
| v5.12.0   |     -    | 2016-06-23 | v3.8.6   |
| v4.9.1    |  Argon   | 2018-03-29 | v2.15.11 |
| v0.12.18  |     -    | 2017-02-22 | v2.15.11 |

#### Which ECMAScript version is Node.js using?

There is no correlation between Node.js version and ECMAScript version, they adopt new stuff feature by feature. The list of what's included in each Node.js can be seen [here](https://node.green/).

## Module Standards

JavaScript programs started off pretty small — most of its usage in the early days was to do isolated scripting tasks, providing a bit of interactivity to web pages where needed, large scripts were generally not needed. Fast forward a few years and we now have complete applications being run in browsers with a lot of JavaScript, as well as JavaScript being used in other contexts (e.g. Node.js).

It has therefore made sense to start thinking about providing mechanisms for splitting JavaScript programs up into separate modules that can be imported when needed. Node.js has had this ability for a long time, and there are a number of JavaScript libraries and frameworks that enable module usage (for example, other **CommonJS** and **AMD** based module systems like **RequireJS**, and more recently **Webpack** and **Babel**).

### CommonJS

The JavaScript language didn’t have a native way of organizing code before the ES2015 standard. Node.js filled this gap with the CommonJS module format. CommonJS's specification of how modules should work is widely used today for server-side JavaScript with Node.js. It is also used for browser-side JavaScript, but that code must be packaged with a transpiler since browsers don't support CommonJS.

CommonJS can be recognized by the use of the `require()` function and `module.exports`, while ES modules use `import` and `export` statements for similar (though not identical) functionality.

```javascript
//importing
const doSomething = require('./doSomething.js');

//exporting
module.exports = function doSomething(n) { }
```

- It's the original syntax from Node.js, althouht it already added support for ES Module standard.
- CJS imports module synchronously.
- You can import from a library `node_modules` or local dir. Either `const myModule = require('./some/local/file.js')` or `var React = require('react')` works.
- CJS will not work in the browser. It will have to be transpiled and bundled.

### AMD

AMD stands for Asynchronous Module Definition. Here is a sample code:

```javascript
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```

or

```javascript
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```

Observations on AMD:

- It register the factory function by calling `define()`, instead of immediately executing it.
- It passes dependencies as an array of string values, do not grab globals.
- Only execute the factory function once all the dependencies have been loaded and executed.
- Pass the dependent modules as arguments to the factory function.
- Imports modules asynchronously (hence the name).
- It's made for frontend, when it was proposed (while CJS was made for backend).

### ES Module

ECMAScript modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variety of import and export statements.

Syntax example:

```javascript
import {foo, bar} from './myLib';

...

export default function() {
  // your Function
};
export const function1() {...};
export const function2() {...};
```

- Works in many modern browsers
- It has the best of both worlds: CJS-like simple syntax and AMD's async
- Tree-shakeable, due to ES6's static module structure
- ESM allows bundlers like Rollup to remove unnecessary code, allowing sites to ship less codes to get faster load.
- Can be called in HTML, just do:

```html
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```

#### `.js` vs `.mjs`

`.js` is the original extension used for scripts writen in JavaScript since the beginning, before modules even exists.

When modules came up a new extension was created, `.mjs`. ESModules, including Node.js modules, must either end in `.mjs` or the nearest `package.json` file must contain `"type": "module"`.

Although that on the Web file extensions doesn't really matter, as long as the file is served with JavaScript MIME type `text/javascript`, this differentiation is mainly to make it crystal clear if a file is a module or a regular JS script.

### `require()` vs `import`

There are two ways of reusing code that's inside other file. When writing a CommonJS file, use `require()`; when writing an ES Module, use `import`.

#### `require()`

CommonJS export in `myModule.js`:

```javascript
module.exports = {
    foo: function(){ return 'bar';},
    baz: 123
}
```

CommonJS import in `index.js`:

```javascript
var http = require('http'); // to use built-in modules

var myModule = require('./myModule') // to use local modules
const foo = myModule.foo;
const baz = myModule.baz;
```

Observations on `require()`:

- Should be avoided in favor of `import`
- Exists only in CommonJS (Previous to ES6)
- Works only with `module.exports` command
- Can be called anywhere in a file
- Normally can't selectively load the pieces you need, by default computes full files
- Works as a function, computes imported file at runtime
- Has a sync execution
- Caches previouly imported modules, so they're all Singleton

#### `import`

ES6 export in `myModule.js`:

```javascript
export function foo(){ return 'bar';}
export const baz = 123;

// or
function foo(){ return 'bar';}
const baz = 123;
export default {foo, baz};
```

ES6 import in `index.js`:

```javascript
import * as A from './myModule.js';
const foo = A.foo;
const baz = A.baz;

// more direct way
import {foo, baz} from './myModule.js';
```

**import syntax**:

Observations on `import`:

- It's the prefered way over `require()`
- Exists in ES6 and later
- Works with both `module.exports` and `export`
- Can be called only at the beginning of the file
- Can load only the parts you want to use
- Can be evaluated at compile time
- Can be async

## `import` types

TODO Export vs Export default syntaxes

## Data Types

TODO

## Variables

TODO

## Arrow Functions

TODO

## Scopes

TODO

## Stric Mode

TODO

## Asynchronous Programming and Callbacks

TODO

### Promises

TODO

### Async and Await

TODO

## Closures

TODO

## The Event Loop

TODO

## Babel

TODO

## Webpack

TODO
