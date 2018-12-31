(function () {
    "use strict";
    /**
     * @class Tree
     * @classdesc Tree is a non-linear data structure simulates a 
     * hierarchical tree structure, with a root value and sub-trees of children 
     * with a parent node, represented as a set of linked nodes.
     * 
     * This doesn't allow duplicated value of node.
     * @desc
     * #### Example -
     * ```js
     * var Tree = require("@structure-js/datastructure").Tree
     * var tree=new Tree()
     * ```
     */

    let Queue = require("./Queue");

    function Tree(value) {
        this.nodeSize = 0;
        this.root = null;
        if(value !== undefined){
            this.setRoot(value);
        }

        this.setRoot = function (value) {
            if (!(value instanceof Tree.Node)) {
                if (this.root === null) {
                    this.root = new Tree.Node(value);
                    this.nodeSize++;
                } else {
                    this.root.value = value;
                }
            } else {
                this.root = value;
            }
        }

        return this;
    }

    Tree.prototype = {
        insertTo: function (targetValue, newValue) {
            if (this.contains(newValue)) {
                throw new Error("AlreadyExistError : " + newValue);
            }
            let targetNode = this.getNode(targetValue);
            let newNode = new Tree.Node(newValue);
            newNode.setParent(targetNode);
            targetNode.insert(newNode);
            this.nodeSize++;
        },
        /**
         * Return whether this tree is empty.
         *
         * @returns {boolean}
         */
        isEmpty: function () {
            return this.root === null;
        },
        /**
         * Return height of this tree.
         *
         * @returns {Number}
         */
        getHeight: function(){
            return this._getHeight(this.root);
        },
        /**
         * Return height of `node`.
         *
         * @param {*} node
         * @returns {Number}
         */
        _getHeight: function(node){
            if(node.childrenSize === 0){
                return 1;
            }else{
                let max = 0;
                for(let child of node.children){
                    let height = this._getHeight(child);
                    if(max < height){
                        max = height;
                    }
                } 
                return max + 1;
            }
        },
        /**
         * Return whether this tree contains `value`.
         *
         * @param {*} value
         * @returns
         */
        contains: function (value) {
            try {
                return this.getNode(value) instanceof Tree.Node;
            } catch (e) {
                return false;
            }
        },
        /**
         * Return the node that has `value` as its value.
         * 
         * @param {*} value
         * @returns {Tree.Node}
         */
        getNode: function (value) {
            if (this.root === null) {
                return null;
            }

            for (let node of this.dfsIterator()) {
                if (node.value === value) {
                    return node;
                }
            }

            throw new Error('NonExistError : when you try to get ' + value);
        },
        /**
         * Delete the node that has `value` as its value.
         *
         * @param {*} value
         */
        deleteNode: function (value) {
            targetNode = this.getNode(value);
            if (targetNode == null) {
                throw new Error('NonExistError : when you try to delete ' + value);
            }

            parentNode = targetNode.getParent();
            parentNode.deleteChild(targetNode);
            targetNode.setParent(null);
            this.nodeSize--;

            return targetNode;
        },
        /**
         * BFS iterator
         *
         * @param {*} node
         * @returns {Tree.Node}
         */
        bfsIterator: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
                if (this.root === null) {
                    return null;
                }
            }
            let queue = new Queue();
            queue.push(node);
            while (!queue.isEmpty()) {
                let n = queue.pop();
                yield n;

                for (let child of n._getChildren()) {
                    if (child !== null) {
                        queue.push(child);
                    }
                }
            }
        },
        /**
         * DFS iterator <- post-order
         *
         * @param {*} node
         * @returns {Tree.Node}
         */
        dfsIterator: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
                if (this.root === null) {
                    return null;
                }
            }
            for (let child of node._getChildren()) {
                if (child !== null) {
                    yield* this.dfsIterator(child);
                }
            }
            yield node;
        },
        // pre-order
        /**
         * DFS iterator <- pre-order
         *
         * @param {*} node
         */
        dfsIteratorPreOrder: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
            }
            yield node;
            for (let child of node._getChildren()) {
                yield* this.dfsIteratorPreOrder(child);
            }
        },
        /**
         * [This is for test]
         * Visualize this tree using pre-order DFS.
         *
         * @param {*} node
         * @param {*} level
         * @param {*} isFirst
         * @returns
         */
        _dfsVisualization: function (node, level, isFirst) {
            if (node === null) {
                return;
            }
            if (!(node instanceof Tree.Node)) {
                node = this.root;
                level = 0;
                isFirst = true;
            }
            let char = "";
            let i;
            if (!isFirst) {
                char += "\n";
                for (i = 0; i < level - 1; i++) {
                    char += "\t";
                }
            }
            if (level !== 0) {
                char += "\t";
            }
            process.stdout.write(char + node.value);
            for (let child of node._getChildren()) {
                if (child === node._getChildren()[0]) {
                    this._dfsVisualization(child, level + 1, true);
                } else {
                    this._dfsVisualization(child, level + 1, false);
                }
            }
        }
    }

    Tree.Node = function (value) {
        this.value = value;
        this.parent = null;
        this.children = [];
        this.childrenSize = 0;
    }

    Tree.Node.prototype = {
        /**
         *
         *
         * @returns
         */
        _getChildren: function () {
            return this.children;
        },
        /**
         *
         *
         * @returns
         */
        _getChildrenSize: function () {
            return this.childrenSize;
        },
        /**
         *
         *
         * @param {*} child
         * @returns
         */
        hasChild: function (child) {
            for (let temp of this.children) {
                if (temp === child) {
                    return true;
                }
            }
            return false;
        },
        /**
         *
         *
         * @param {*} child
         */
        insert: function (child) {
            if (!(child instanceof Tree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            this.children.push(child);
            child.setParent(this);
            this.childrenSize++;
        },
        /**
         *
         *
         * @param {*} child
         */
        deleteChild: function (child) {
            if (!(child instanceof Tree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            let isDeleted = false;
            for (let i = 0; i < this.childrenSize; i++) {
                if (this.children[i] === child) {
                    this.children.splice(i, 1);
                    this.childrenSize--;
                    isDeleted = true;
                    break;
                }
            }

            if (!isDeleted) {
                throw new Error("NonExistentNodeError : " + child);
            }
        },
        /**
         *
         *
         * @returns
         */
        isRoot: function () {
            return this.getParent() === null;
        },
        /**
         *
         *
         * @returns
         */
        getParent: function () {
            return this.parent;
        },
        /**
         *
         *
         * @param {*} _parent
         */
        setParent: function (_parent) {
            this.parent = _parent;
        }

    }

    let tree = new Tree();
    
    tree.setRoot(2);
    tree.insertTo(2,3);
    tree.insertTo(2,4);
    tree.insertTo(2,5);
    tree.insertTo(5,1);

    // tree.insertTo(5,2);

    console.log("tree.nodeSize : " + tree.nodeSize);
    console.log("tree.root.value : " + tree.root.value);
    console.log("tree.root.getParent() : " + tree.root.getParent());
    console.log("tree.root.children : ");
    console.log(tree.root.children);
    console.log("tree.root.children[0].value : " + tree.root.children[0].value);
    console.log("tree.root.children[0].getParent() : ");
    console.log(tree.root.children[0].getParent());
    // console.log("tree.height : " + tree.height); //not implement yet


    console.log("Breadth First Search")
    for(let node of tree.bfsIterator()){
        process.stdout.write(node.value + "\t");
    }
    console.log();

    console.log("Depth First Search post-order")
    for(let node of tree.dfsIterator()){
        process.stdout.write(node.value + "\t");
    }
    console.log();

    console.log("Depth First Search pre-order")
    for(let node of tree.dfsIteratorPreOrder()){
        process.stdout.write(node.value + "\t");
    }
    console.log();

    console.log(tree.getHeight());

    module.exports = Tree;
})();