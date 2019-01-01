# datastructure
> datastructure is a library of data structures available in JavaScript.

### Demo

#### [Visualization demo site](http://structure-js-visualization.s3-website.ap-northeast-2.amazonaws.com/)
![demo](https://github.com/structure-js/images/blob/master/visualization.gif)

### Overview

* [Linked list](https://github.com/structure-js/datastructure/wiki/List)
* [Stack](https://github.com/structure-js/datastructure/wiki/Stack)
* [Queue](https://github.com/structure-js/datastructure/wiki/Queue)
* [Deque](https://github.com/structure-js/datastructure/wiki/Deque)
* [Heap](https://github.com/structure-js/datastructure/wiki/Heap)
* [PriorityQueue](https://github.com/structure-js/datastructure/wiki/PriorityQueue)
* [Graph](https://github.com/structure-js/datastructure/wiki/Graph)
* [Tree](https://github.com/structure-js/datastructure/wiki/Tree)
* [BinarySearchTree](https://github.com/structure-js/datastructure/wiki/BinarySearchTree)
* [Btree](https://github.com/structure-js/datastructure/wiki/BTree)

### Repo Structure
* `lib/` - data structure library
* `test/` - test
* `index.js` - index

### Installation and Settings
#### Build requirements
* `Node.js 6.x+`

#### Installation
```
npm i @structure-js/datastructure
```

#### How to use
```
const List = require('@structure-js/datastructure').List;
const Graph = require('@structure-js/datastructure').Graph;
const BST = require('@structure-js/datastructure').BinarySearchTree;

let list = new List();
let graph = new Graph();
let bst = new BST();

...
```

### Contributors
korsejong, HeechanYang

### License
```
MIT License

Copyright (c) 2018 structure-js

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
