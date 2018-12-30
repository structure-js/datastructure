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

    function Tree() {
        this.nodeSize = 0;
        this.height = 0;
        this.root = null;

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
        isEmpty: function () {
            return this.root === null;
        },
        contains: function (value) {
            try {
                return this.getNode(value) instanceof Tree.Node;
            } catch (e) {
                return false;
            }
        },
        // DFS
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
        deleteNode: function (value) {
            targetNode = this.getNode(value);
            if (targetNode == null) {
                throw new Error('NonExistError : when you try to delete ' + value);
            }

            parentNode = targetNode.getParent();
            parentNode.deleteChild(targetNode);
            targetNode.setParent(null);
        },
        // bfs
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

                for (let child of n.getChildren()) {
                    if (child !== null) {
                        queue.push(child);
                    }
                }
            }
        },
        // post-order
        dfsIterator: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
                if (this.root === null) {
                    return null;
                }
            }
            for (let child of node.getChildren()) {
                if (child !== null) {
                    yield* this.dfsIterator(child);
                }
            }
            yield node;
        },
        // pre-order
        dfsIteratorPreOrder: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
            }
            yield node;
            for (let child of node.getChildren()) {
                yield* this.dfsIteratorPreOrder(child);
            }
        },
        // pre-order
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
            for (let child of node.getChildren()) {
                if (child === node.getChildren()[0]) {
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
        getChildren: function () {
            return this.children;
        },
        getChildrenSize: function () {
            return this.childrenSize;
        },
        hasChild: function (child) {
            for (let temp of this.children) {
                if (temp === child) {
                    return true;
                }
            }
            return false;
        },
        insert: function (child) {
            if (!(child instanceof Tree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            this.children.push(child);
            child.setParent(this);
            this.childrenSize++;
        },
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
        isRoot: function () {
            return this.getParent() === null;
        },
        getParent: function () {
            return this.parent;
        },
        setParent: function (_parent) {
            this.parent = _parent;
        }

    }

    module.exports = Tree;
})();