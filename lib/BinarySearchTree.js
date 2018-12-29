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

    function BinarySearchTree() {
        this.nodeSize = 0;
        this.height = 0;
        this.root = null;

        return this;
    }

    const RED = 0;
    const BLACK = 1;
    const LEFT = 2;
    const RIGHT = 3;

    let isRed = function(node){
        // console.log('isRed');
        if (!(node instanceof BinarySearchTree.Node)) {
            if (this.isEmpty()) throw new Error("NodeTypeError");
        }
        let temp = node;
        // console.log(node);
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
        // console.log(temp);
        return temp.color === RED;
    }

    BinarySearchTree.prototype = new Tree();
    
    BinarySearchTree.prototype.insert = function (value) {
        if (this.contains(value)) {
            throw new Error("AlreadyExistError : " + value);
        }

        this.root = this._insert(this.root, value);
        this.root.setParent(null);
        this.root.color = BLACK;
        this.nodeSize++;
    }
    BinarySearchTree.prototype._insert = function (node, value) {
        if(node === null){
            return new BinarySearchTree.Node(value, RED);
        }

        let cmp = this.compare(node.value, value); 
        if(cmp > 0){
            let newNode = this._insert(node.getLeft(), value);
            newNode.setParent(node);
            node.setLeft(newNode);
        }else if(cmp < 0){
            let newNode = this._insert(node.getRight(), value);
            newNode.setParent(node);
            node.setRight(newNode);
        }else{
            throw new Error("AlreadyExistError : " + value);
        }

        if(isRed(node, RIGHT) && !isRed(node, LEFT)){
            node = this.rotateLeft(node);
        }
        if(isRed(node, LEFT) && isRed(node, LEFT,LEFT)){
            node = this.rotateRight(node);
        }
        if(isRed(node, LEFT) && isRed(node, RIGHT)){
            this.flipColors(node);
        }
        //node.size = node.left.size + node.right.size + 1;

        return node;
    }

    BinarySearchTree.prototype.delete = function (value) {
        if(!this.contains(value)){
            return;
        }

        if(!isRed(this.root, LEFT) && !isRed(this.root, RIGHT)){
                this.root.color = RED;
        }
        
        this.setRoot(this._delete(this.root, value));

        if(!this.isEmpty()){
            this.root.color = BLACK;
        }
    }

    BinarySearchTree.prototype._delete = function (node, value) {
        if(node===null){
            return null;
        }
        if (this.compare(value, node.value) < 0) {
            if (!isRed(node, LEFT) && !isRed(node,LEFT,LEFT)) {
                node = this.moveRedLeft(node);
            }
            node.setLeft(this._delete(node.getLeft(), value));
        } else {
            if (isRed(node, LEFT)) {
                node = this.rotateRight(node);
            }
            if (this.compare(value, node.value) === 0 && node.getRight() === null) {
                return null;
            }
            if (!isRed(node, RIGHT) && !isRed(node, RIGHT, LEFT)) {
                node = this.moveRedRight(node);
            }
            if (this.compare(value, node.value) === 0) {
                let x = this.getNode(this.getMin(node.getRight()));
                node.value = x.value;
                // node.value = this.getNode(this.getMin(node.getRight())).value;
                node.setRight(this._deleteMin(node.getRight()));
            } else {
                node.setRight(this._delete(node.getRight(), value));
            }
        }
        return this.balance(node);
    }

    BinarySearchTree.prototype.deleteMin = function(){
        if(this.isEmpty()) throw new Error("NoSuchElementException");
        // if both children of root are black, set root to red
        if (!isRed(this.root, LEFT) && !isRed(this.root,RIGHT)){
            this.root.color = RED;
        }
        this.root = this._deleteMin(this.root);
        if (!this.isEmpty()) {
            this.root.color = BLACK;
        }
    }
    BinarySearchTree.prototype._deleteMin = function(node){
        if (node.getLeft() === null){
            return null;
        }

        if (!isRed(node,LEFT) && !isRed(node, LEFT, LEFT)){
            node = this.moveRedLeft(node);
        }

        node.setLeft(this._deleteMin(node.getLeft()));
        return this.balance(node);
    }

    BinarySearchTree.prototype.deleteMax = function(){
        if(this.isEmpty()) throw new Error("NoSuchElementException");
        // if both children of root are black, set root to red
        if (!isRed(this.root, LEFT) && !isRed(this.root,RIGHT)){
            this.root.color = RED;
        }
        this.root = this.deleteMax2(this.root);
        if (!this.isEmpty()) {
            this.root.color = BLACK;
        }
    }

    BinarySearchTree.prototype.deleteMax2 = function (node) {
        if (isRed(node, LEFT))
            node = this.rotateRight(node);

        if (node.getRight() === null)
            return null;

        if (!isRed(node, RIGHT) && !isRed(node, RIGHT, LEFT))
            node = this.moveRedRight(node);

        node.setRight(this.deleteMax2(node.getRight()));

        return this.balance(node);
    }

    BinarySearchTree.prototype.moveRedLeft = function (node) {
        this.flipColors(node);
        if (isRed(node,RIGHT,LEFT)) {
            node.setRight(this.rotateRight(node.getRight()));
            node = this.rotateLeft(node);
            this.flipColors(node);
        }
        return node;
    }

    BinarySearchTree.prototype.moveRedRight = function (node) {
        // assert (h != null);
        // assert isRed(h) && !isRed(h.right) && !isRed(h.right.left);
        this.flipColors(node);
        if (isRed(node,LEFT,LEFT)) {
            node = this.rotateRight(node);
            this.flipColors(node);
        }
        return node;
    }

    BinarySearchTree.prototype.balance = function (node) {
        // assert (h != null);

        if (isRed(node,RIGHT)) node = this.rotateLeft(node);
        if (isRed(node, LEFT) && isRed(node,LEFT,LEFT)) node = this.rotateRight(node);
        if (isRed(node, LEFT) && isRed(node, RIGHT)) this.flipColors(node);

        // node.size = node.getLeft().size + node.getRight().size + 1;
        return node;
    }

    BinarySearchTree.prototype.getMin = function(node){
        if(!(node instanceof BinarySearchTree.Node)){
            node = this.root;
            if(this.isEmpty()){
                return null;
            }
        }
        for(var temp = node; temp.getLeft()!==null; temp = temp.getLeft());

        return temp.value;
    }

    BinarySearchTree.prototype.getMax = function(node){
        if(!(node instanceof BinarySearchTree.Node)){
            node = this.root;
            if(this.isEmpty()){
                return null;
            }
        }
        for(var temp = node; temp.getRight()!==null;temp=temp.getRight());

        return temp.value;
    }

    BinarySearchTree.prototype.compare = function (value1, value2) {
        return value1 - value2;
    }

    BinarySearchTree.prototype.rotateRight = function (node) {
        let x = node.getLeft();
        node.setLeft(x.getRight());
        if(x.getRight()!==null){
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
    }

    BinarySearchTree.prototype.rotateLeft = function (node) {
        let x = node.getRight();
        node.setRight(x.getLeft());
        if(x.getLeft()!==null){
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
    }
    BinarySearchTree.prototype.flipColors = function (node) {
        node.flipColor();
        if(node.getLeft()!==null){
            node.getLeft().flipColor();
        }
        if(node.getRight()!==null){
            node.getRight().flipColor();
        }
    }
    BinarySearchTree.prototype._dfsVisualization = function (node, level, isFirst){
        if(node===null){
            return;
        }
        if(!(node instanceof Tree.Node)){
            node = this.root;
            level = 0;
            isFirst = true;
        }
        let char = "";
        let i;
        if(!isFirst){
            console.log();
            for (i = 0; i < level - 1; i++) {
                char += "\t";
            }
        }
        if(level !== 0){
            char += "\t";
        }
        
        process.stdout.write(char + node.value+ (isRed(node)?'r':'b'));
        for(let child of node.getChildren()){
            if(child === node.getChildren()[0]){
                this._dfsVisualization(child, level+1, true);
            }else{
                this._dfsVisualization(child, level+1, false);
            }
        }
    }

    BinarySearchTree.Node = function (value,color) {
        this.value = value;
        this.color = color;
        this.parent = null;
        this.children = [];
        this.size = 0;

        // left
        this.children[0] = null;
        // right
        this.children[1] = null;
    }

    BinarySearchTree.Node.prototype = new Tree.Node();

    BinarySearchTree.Node.prototype.getChildren = function () {
        return this.children;
    }

    BinarySearchTree.Node.prototype.flipColor = function () {
        this.color = isRed(this) ? BLACK : RED;
    }
    BinarySearchTree.Node.prototype.getLeft = function () {
        return this.children[0];
    }

    BinarySearchTree.Node.prototype.setLeft = function (node) {
        this.children[0] = node;
    }

    BinarySearchTree.Node.prototype.getRight = function () {
        return this.children[1];
    }

    BinarySearchTree.Node.prototype.setRight = function (node) {
        this.children[1] = node;
    }

    BinarySearchTree.Node.prototype.insertToLeft = function (child) {
        if (!(child instanceof BinarySearchTree.Node)) {
            throw new Error("NodeTypeError : " + child);
        }
        if (this.getLeft() !== null) {
            throw new Error("AlreadyExistError : " + child.value);
        }

        this.children[0] = child;
        child.setParent(this);
        this.childrenSize++;
    }

    BinarySearchTree.Node.prototype.insertToRight = function (child) {
        if (!(child instanceof BinarySearchTree.Node)) {
            throw new Error("NodeTypeError : " + child);
        }
        if (this.getRight() !== null) {
            throw new Error("AlreadyExistError : " + child.value);
        }

        this.children[1] = child;
        child.setParent(this);
        this.childrenSize++;
    }

    BinarySearchTree.Node.prototype.getGrandParent = function () {
        let parent = this.getParent()
        return parent !== null ? parent.getParent() : null;
    }

    BinarySearchTree.Node.prototype.getUncle = function () {
        let grandParent = this.getGrandParent();
        return this.getParent() === grandParent.getLeft() ? 
            grandParent.getRight() : grandParent.getLeft();
    }
    module.exports = BinarySearchTree;
})();