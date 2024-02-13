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

Also known as **ES**, it's a standard for scripting languages, including JavaScript, JScript, and ActionScript. It is best known as a JavaScript standard intended to ensure the interoperability of web pages across different web browsers.

### V8 engine

Is a program writen in C++ that takes our JavaScript code, parses it and executes it while browsing with Chrome.

The cool thing is that the JavaScript engine is independent of the browser in which it's hosted. This key feature enabled the rise of Node.js. V8 was the chosen engine to power Node.js back in 2009.

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

#### Differences in relation to browser

Despite the fact that it's always JavaScript, there are some key differences.

In the browser, most of the time what you are doing is interacting with the DOM, or other **Web Platform API** like Cookies. Those do not exist in Node.js. You don't have the document, window and all the other objects that are provided by the browser, just as in the browser we don't have the APIs that Node.js provides through its modules, like the filesystem access functionality.

Another difference is that Node.js supports both the CommonJS and ES module systems (since Node.js v12), while in the browser we are starting to see the ES Modules standard being implemented.

### npm

The package manager allows programmers to publish and share Node.js packages, along with the accompanying source code, and is designed to simplify the installation, update and uninstallation of packages.

It consists of a Command Line Interface, also called npm, and an online database of public and paid-for private packages, called the npm registry. The registry is accessed via the client, and the available packages can be browsed and searched via the npm website. The package manager and the registry are managed by **npm, Inc**.

## ECMAScript 2015 (ES6) and beyond

TODO

## Module Standards

JavaScript programs started off pretty small — most of its usage in the early days was to do isolated scripting tasks, providing a bit of interactivity to web pages where needed, large scripts were generally not needed. Fast forward a few years and we now have complete applications being run in browsers with a lot of JavaScript, as well as JavaScript being used in other contexts (e.g. Node.js).

It has therefore made sense to start thinking about providing mechanisms for splitting JavaScript programs up into separate modules that can be imported when needed. Node.js has had this ability for a long time, and there are a number of JavaScript libraries and frameworks that enable module usage (for example, other **CommonJS** and **AMD** based module systems like **RequireJS**, and more recently **Webpack** and **Babel**).

### CommonJS

The JavaScript language didn’t have a native way of organizing code before the ES2015 standard. Node.js filled this gap with the CommonJS module format. CommonJS's specification of how modules should work is widely used today for server-side JavaScript with Node.js. It is also used for browser-side JavaScript, but that code must be packaged with a transpiler since browsers don't support CommonJS.

CommonJS can be recognized by the use of the `require()` function and `module.exports`, while ES modules use `import` and `export` statements for similar (though not identical) functionality.

```javascript
'use strict'

const CONNECTION_LIMIT = 0

function connect () { /* ... */ }

module.exports = {
  CONNECTION_LIMIT,
  connect
}
```

### ES Module

ECMAScript modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variety of import and export statements.

TODO

### AMD

TODO

#### `.js` vs `.mjs`

`.js` is the original extension used for scripts writen in JavaScript since the beginning, before modules even exists.

When modules came up a new extension was created, `.mjs`. ESModules, including Node.js modules, must either end in `.mjs` or the nearest `package.json` file must contain `"type": "module"`.

Although that on the Web file extensions doesn't really matter, as long as the file is served with JavaScript MIME type `text/javascript`, this differentiation is mainly to make it crystal clear if a file is a module or a regular JS script.

### Native Modules

Native modules in NodeJS context are modules that are written in C/C++ to interact with lower level functions/libraries. Those functions are then wrapped using the NaN, or node-addons-api to make then available in NodeJS.

## `require()` vs `import`

There are two ways of reusing code that's inside other file. When writing a CommonJS file, use `require()`; when writing an ES Module, use `import`.

### `require()`

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

### `import`

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

Export vs Export default

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
