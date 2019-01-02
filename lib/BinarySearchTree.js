(function () {
    "use strict";
    /**
     * @class BinarySearchTree
     * @classdesc BinarySearchTree keep its keys in sorted order, so that 
     * lookup and other operations can use the principle of binary search.
     * 
     * This is implemented using 'Red-black tree'. Red-black tree is a kind 
     * of self-balancing binary search tree.  Each node of the binary tree 
     * has an extra bit, and that bit is often interpreted as the color 
     * (red or black) of the node. These color bits are used to ensure the 
     * tree remains approximately balanced during insertions and deletions.
     * 
     * Red-black tree has 5 more requirements on a binary-search tree.
     * - Each node is either red or black.
     * - The root is black. (This rule is sometimes omitted. Since the root 
     *  can always be changed from red to black, but not necessarily vice 
     *  versa, this rule has little effect on analysis.)
     * - All leaves (NIL) are black.
     * - If a node is red, then both its children are black.
     * - Every path from a given node to any of its descendant NIL nodes 
     *       contains the same number of black nodes.
     * 
     * Time complexity
     * - searching : O(log n)
     * - insertion : O(log n)
     * - deletion : O(log n)
     * 
     * ref) [Wikipedia](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
     * 
     * @desc
     * #### Example -
     * ```js
     * var BinarySearchTree = require("@structure-js/datastructure").BinaryTree;
     * var binarySearchTree=new BinarySearchTree();
     * ```
     */

    let Tree = require('./Tree');
    let Queue = require('./Queue');

    const RED = 0;
    const BLACK = 1;
    const LEFT = 2;
    const RIGHT = 3;

    /**
     * Helper for Insertion, Deletion, etc for BinarySearchTree.
     *
     * @param {*} node
     * @returns {boolean}
     */
    let isRed = function (node) {
        if (!(node instanceof BinarySearchTree.Node)) {
            if (this.isEmpty()) throw new Error("NodeTypeError");
        }
        let temp = node;
        for (let i = 1; i < arguments.length; i++) {
            switch (arguments[i]) {
                case LEFT:
                    if (temp.getLeft() !== null) {
                        temp = temp.getLeft();
                    } else {
                        return false;
                    }
                    break;
                case RIGHT:
                    if (temp.getRight() !== null) {
                        temp = temp.getRight();
                    } else {
                        return false;
                    }
                    break;
            }
        }
        return temp.color === RED;
    }

    Number.prototype.compareTo = function(key){
        return this - key;
    }

    String.prototype.compareTo = function(key){
        if(this === key ) {
            return 0;
        }
        return this > key ? 1 : -1;
    }

    function BinarySearchTree() {
        this.size = 0;
        this.height = 0;
        this.root = null;

        return this;
    }

    BinarySearchTree.prototype = {
        isEmpty: Tree.prototype.isEmpty,
        getHeight: Tree.prototype.getHeight,
        _getHeight: Tree.prototype._getHeight,
        contains: Tree.prototype.contains,
        bfsIterator: Tree.prototype.bfsIterator,
        dfsIterator: Tree.prototype.dfsIterator,
        dfsIteratorPreOrder: Tree.prototype.dfsIteratorPreOrder,
        _dfsVisualization: Tree.prototype._dfsVisualization,
        /**
         * Return a node with key `key`
         * O(log n)
         *
         * @param {*} key
         * @returns
         */
        getNode: function(key){
            let queue = new Queue();

            queue.push(this.root);

            while(!queue.isEmpty()){
                let temp = queue.pop();

                if(temp===null){
                    return null;
                }

                // 2진 탐색 
                let compare = temp.key.compareTo(key);
                if(compare === 0){
                    return temp;
                }else if(compare > 0){
                    queue.push(temp.getLeft());
                }else{
                    queue.push(temp.getRight());
                }
            }
        },
        insert: function (key) {

            if (this.contains(key)) {
                throw new Error("AlreadyExistError : " + key);
            }

            this.root = this._insert(this.root, key);
            this.root.setParent(null);
            this.root.color = BLACK;
            this.size++;
        },
        _insert: function (node, key) {
            if (node === null) {
                return new BinarySearchTree.Node(key, RED);
            }

            let cmp = node.key.compareTo(key);
            if (cmp > 0) {
                let newNode = this._insert(node.getLeft(), key);
                newNode.setParent(node);
                node.setLeft(newNode);
            } else if (cmp < 0) {
                let newNode = this._insert(node.getRight(), key);
                newNode.setParent(node);
                node.setRight(newNode);
            } else {
                throw new Error("AlreadyExistError : " + key);
            }

            if (isRed(node, RIGHT) && !isRed(node, LEFT)) {
                node = this.rotateLeft(node);
            }
            if (isRed(node, LEFT) && isRed(node, LEFT, LEFT)) {
                node = this.rotateRight(node);
            }
            if (isRed(node, LEFT) && isRed(node, RIGHT)) {
                this.flipColors(node);
            }
            let leftSize = node.getLeft() !== null ? node.getLeft().size : 0;
            let rightSize = node.getRight() !== null ? node.getRight().size : 0;

            node.size = leftSize + rightSize + 1;

            return node;
        },
        delete: function (key) {
            if (!this.contains(key)) {
                return;
            }

            if (!isRed(this.root, LEFT) && !isRed(this.root, RIGHT)) {
                this.root.color = RED;
            }

            this.root = this._delete(this.root, key);

            if (!this.isEmpty()) {
                this.root.color = BLACK;
            }
            this.size--;
        },
        _delete: function (node, key) {
            if (node === null) {
                return null;
            }
            if (key.compareTo(node.key) < 0) {
                if (!isRed(node, LEFT) && !isRed(node, LEFT, LEFT)) {
                    node = this._moveRedLeft(node);
                }
                node.setLeft(this._delete(node.getLeft(), key));
            } else {
                if (isRed(node, LEFT)) {
                    node = this.rotateRight(node);
                }
                if (key.compareTo(node.key) === 0 && node.getRight() === null) {
                    return null;
                }
                if (!isRed(node, RIGHT) && !isRed(node, RIGHT, LEFT)) {
                    node = this._moveRedRight(node);
                }
                if (key.compareTo(node.key) === 0) {
                    let x = this.getNode(this.getMin(node.getRight()));
                    node.key = x.key;
                    // node.key = this.getNode(this.getMin(node.getRight())).key;
                    node.setRight(this._deleteMin2(node.getRight()));
                } else {
                    node.setRight(this._delete(node.getRight(), key));
                }
            }
            return this._balance(node);
        },
        deleteMin: function () {
            if (this.isEmpty()) throw new Error("NoSuchElementException");
            // if both children of root are black, set root to red
            if (!isRed(this.root, LEFT) && !isRed(this.root, RIGHT)) {
                this.root.color = RED;
            }
            this.root = this._deleteMin2(this.root);
            if (!this.isEmpty()) {
                this.root.color = BLACK;
            }
        },
        _deleteMin2: function (node) {
            if (node.getLeft() === null) {
                return null;
            }

            if (!isRed(node, LEFT) && !isRed(node, LEFT, LEFT)) {
                node = this._moveRedLeft(node);
            }

            node.setLeft(this._deleteMin2(node.getLeft()));
            return this._balance(node);
        },
        deleteMax: function () {
            if (this.isEmpty()) throw new Error("NoSuchElementException");
            // if both children of root are black, set root to red
            if (!isRed(this.root, LEFT) && !isRed(this.root, RIGHT)) {
                this.root.color = RED;
            }
            this.root = this._deleteMax(this.root);
            if (!this.isEmpty()) {
                this.root.color = BLACK;
            }
        },
        _deleteMax: function (node) {
            if (isRed(node, LEFT))
                node = this.rotateRight(node);

            if (node.getRight() === null)
                return null;

            if (!isRed(node, RIGHT) && !isRed(node, RIGHT, LEFT))
                node = this._moveRedRight(node);

            node.setRight(this._deleteMax(node.getRight()));

            return this._balance(node);
        },
        _moveRedLeft: function (node) {
            this.flipColors(node);
            if (isRed(node, RIGHT, LEFT)) {
                node.setRight(this.rotateRight(node.getRight()));
                node = this.rotateLeft(node);
                this.flipColors(node);
            }
            return node;
        },
        _moveRedRight: function (node) {
            // assert (h != null);
            // assert isRed(h) && !isRed(h.right) && !isRed(h.right.left);
            this.flipColors(node);
            if (isRed(node, LEFT, LEFT)) {
                node = this.rotateRight(node);
                this.flipColors(node);
            }
            return node;
        },
        _balance: function (node) {
            // assert (h != null);

            if (isRed(node, RIGHT)) node = this.rotateLeft(node);
            if (isRed(node, LEFT) && isRed(node, LEFT, LEFT)) node = this.rotateRight(node);
            if (isRed(node, LEFT) && isRed(node, RIGHT)) this.flipColors(node);

            // node.size = node.getLeft().size + node.getRight().size + 1;
            return node;
        },
        getMin: function (node) {
            if (!(node instanceof BinarySearchTree.Node)) {
                node = this.root;
                if (this.isEmpty()) {
                    return null;
                }
            }
            for (var temp = node; temp.getLeft() !== null; temp = temp.getLeft());

            return temp.key;
        },
        getMax: function (node) {
            if (!(node instanceof BinarySearchTree.Node)) {
                node = this.root;
                if (this.isEmpty()) {
                    return null;
                }
            }
            for (var temp = node; temp.getRight() !== null; temp = temp.getRight());

            return temp.key;
        },
        rotateRight: function (node) {
            let x = node.getLeft();
            node.setLeft(x.getRight());
            if (x.getRight() !== null) {
                x.getRight().setParent(node);
            }
            x.setParent(node.getParent());
            x.setRight(node);
            node.setParent(x);
            x.color = x.getRight().color;
            x.getRight().color = RED;
            // x.size=node.size;
            // node.size = size(node.getLeft()) + size(node.getRight()) +1;
            return x;
        },
        rotateLeft: function (node) {
            let x = node.getRight();
            node.setRight(x.getLeft());
            if (x.getLeft() !== null) {
                x.getLeft().setParent(node);
            }
            x.setLeft(node);
            x.setParent(node.getParent());
            node.setParent(x);
            x.color = x.getLeft().color;
            x.getLeft().color = RED;
            // x.size=node.size;
            // node.size = size(node.getLeft()) + size(node.getRight()) +1;
            return x;
        },
        flipColors: function (node) {
            node.flipColor();
            if (node.getLeft() !== null) {
                node.getLeft().flipColor();
            }
            if (node.getRight() !== null) {
                node.getRight().flipColor();
            }
        },
        _dfsVisualization: function(){
            this._dfsVisualization2(this.root, 0, true);
        },
        _dfsVisualization2: function (node, level) {
            if (node === null) {
                return;
            }
            let char = "";
            
            for(let i = 0; i < level;i++){
                if(i !== 0){
                    char += "  ";
                }
                char += "|";
            }
            if(level !== 0){
                char += "--";
            }

            console.log(char + node.key );
            for (let child of node._getChildren()) {
                if (child === node._getChildren()[0]) {
                    this._dfsVisualization2(child, level + 1, true);
                } else {
                    this._dfsVisualization2(child, level + 1, false);
                }
            }
        }
    };

    BinarySearchTree.Node = function (key, color) {
        this.key = key;
        this.color = color;
        this.parent = null;
        this.children = [];
        this.size = 0;

        // left
        this.children[0] = null;
        // right
        this.children[1] = null;
    }

    BinarySearchTree.Node.prototype = {
        _getChildren : Tree.Node.prototype._getChildren,
        hasChild : Tree.Node.prototype.hasChild,
        isRoot : Tree.Node.prototype.isRoot,
        getParent : Tree.Node.prototype.getParent,
        setParent : Tree.Node.prototype.setParent,
        flipColor : function () {
            this.color = isRed(this) ? BLACK : RED;
        },
        getLeft : function () {
            return this.children[0];
        },
        setLeft : function (node) {
            this.children[0] = node;
        },
        getRight : function () {
            return this.children[1];
        },
        setRight : function (node) {
            this.children[1] = node;
        },
        insertToLeft : function (child) {
            if (!(child instanceof BinarySearchTree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            if (this.getLeft() !== null) {
                throw new Error("AlreadyExistError : " + child.key);
            }
    
            this.children[0] = child;
            child.setParent(this);
            this.childrenSize++;
        },
        insertToRight : function (child) {
            if (!(child instanceof BinarySearchTree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            if (this.getRight() !== null) {
                throw new Error("AlreadyExistError : " + child.key);
            }
    
            this.children[1] = child;
            child.setParent(this);
            this.childrenSize++;
        },
        getGrandParent : function () {
            let parent = this.getParent()
            return parent !== null ? parent.getParent() : null;
        },
        getUncle : function () {
            let grandParent = this.getGrandParent();
            return this.getParent() === grandParent.getLeft() ?
                grandParent.getRight() : grandParent.getLeft();
        }
    }
    module.exports = BinarySearchTree;
})();