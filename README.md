# js-redblacktree
Package provides javascript implementation of red black tree. The api of the red black tree is designed so that it matches with the api of the Java counterpart SortedMap api.



[![Build Status](https://travis-ci.org/cschen1205/js-redblacktree.svg?branch=master)](https://travis-ci.org/cschen1205/js-redblacktree) [![Coverage Status](https://coveralls.io/repos/github/cschen1205/js-redblacktree/badge.svg?branch=master)](https://coveralls.io/github/cschen1205/js-redblacktree?branch=master) 


# Install

Run the following npm command to install

```bash
npm install js-redblacktree
```

# Usage

To sort an array "a" using any of the sorting algorithms:

```javascript
var jsrbtree = require("js-redblacktree");

var bst = new jsrbtree.RedBlackTree();
      
bst.put(2, 2.4);
bst.put(4, 3.2);
bst.put(5, 3.4);
bst.put(6, 3.4);
bst.put(6, 5.4);

console.log(bst.get(2)); // display 2.4
console.log(bst.get(6)); // display 5.4
console.log(bst.containsKey(6)); // display true

console.log(bst.size()); // display 4;
console.log(bst.isEmpty()); // display false

bst.delete(6); 
console.log(bst.size()); // display 3
console.log(bst.containsKey(6)); // display false;
console.log(bst.get(6)); // display undefined

// print out sorted keys

var keys = bst.keySet();
for(var i = 1; i < keys.length; ++i) {
    console.log(keys[i]);
}

```