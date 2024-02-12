---
title: 'JavaScript Language'
description: 'TypeScript but worse'
pubDate: 'Feb 11 2024'
# updatedDate: Feb 11 2024
heroImage: '/js-gradient.png'
---

## Intro

Basic definitions

### ECMA

TODO

### CommonJS vs ES Modules

### ES Modules

Files, including Node.js modules, must either end in `.mjs` or the nearest `package.json` file must contain `"type": "module"`.

### CommonJS

TODO

### Node.js

TODO

### Libraries

## `require` vs `import`

Two ways of using legacy code

### Node.js `require`

Exporting in `myModule.js`:

```javascript
// CommonJS syntax
module.exports = {
    foo: function(){ return 'bar';},
    baz: 123
}
```

Importing in `index.js`:

```javascript
var http = require('http'); // to use built-in modules

var myModule = require('./myModule') // to use local modules
const foo = myModule.foo;
const baz = myModule.baz;
```

`require` observations:

- Exists only in CommonJS (Previous to ES6)
- Works only with `module.exports` command
- Can be called anywhere in a file
- Should be avoided in favor of `import`

### ES6 `import`

Exporting in `myModule.js`:

```javascript
// ES6 syntax
export function foo(){ return 'bar';}
export const baz = 123;

// or
function foo(){ return 'bar';}
const baz = 123;
export default {foo, baz};
```

Importing in `index.js`:

```javascript
// ES6 syntax
import * as A from './myModule.js';
const foo = A.foo;
const baz = A.baz;

// more direct way
import {foo, baz} from './myModule.js';
```

**import syntax**:

`import` observations:

- Exists in ES6 and later
- Works with both `module.exports` and `export`
- Can be called only at the beginning of the file
- It's the prefered way over `require`

## `import` types

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.

Morbi tristique senectus et netus. Id semper risus in hendrerit gravida rutrum quisque non tellus. Habitasse platea dictumst quisque sagittis purus sit amet. Tellus molestie nunc non blandit massa. Cursus vitae congue mauris rhoncus. Accumsan tortor posuere ac ut. Fringilla urna porttitor rhoncus dolor. Elit ullamcorper dignissim cras tincidunt lobortis. In cursus turpis massa tincidunt dui ut ornare lectus. Integer feugiat scelerisque varius morbi enim nunc. Bibendum neque egestas congue quisque egestas diam. Cras ornare arcu dui vivamus arcu felis bibendum. Dignissim suspendisse in est ante in nibh mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi.

Mollis nunc sed id semper risus in. Convallis a cras semper auctor neque. Diam sit amet nisl suscipit. Lacus viverra vitae congue eu consequat ac felis donec. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Eget magna fermentum iaculis eu non diam. In vitae turpis massa sed elementum. Tristique et egestas quis ipsum suspendisse ultrices. Eget lorem dolor sed viverra ipsum. Vel turpis nunc eget lorem dolor sed viverra. Posuere ac ut consequat semper viverra nam. Laoreet suspendisse interdum consectetur libero id faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices tincidunt arcu non sodales neque. Tempus egestas sed sed risus pretium quam vulputate. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Fringilla urna porttitor rhoncus dolor purus non. Amet dictum sit amet justo donec enim.

Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tortor posuere ac ut consequat semper viverra. Tellus mauris a diam maecenas sed enim ut sem viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Arcu ac tortor dignissim convallis aenean et tortor at. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Egestas tellus rutrum tellus pellentesque eu. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Id donec ultrices tincidunt arcu. Id cursus metus aliquam eleifend mi.

Tempus quam pellentesque nec nam aliquam sem. Risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget velit. Ipsum a arcu cursus vitae. Facilisis magna etiam tempor orci eu lobortis elementum. Tincidunt dui ut ornare lectus sit. Quisque non tellus orci ac. Blandit libero volutpat sed cras. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Egestas integer eget aliquet nibh praesent tristique magna.
