(function () {
    "use strict";
    /**
     * @class BTree
     * @classdesc BTree 
     * 
     * B-tree is a self-balancing tree data structure that maintains sorted 
     * data and allows searches, sequential access, insertions, and deletions 
     * in logarithmic time. The B-tree is a generalization of a binary search 
     * tree in that a node can have more than two children. Unlike self-balancing 
     * binary search trees, the B-tree is well suited for storage systems that 
     * read and write relatively large blocks of data, such as discs. It is 
     * commonly used in databases and file systems.
     * 
     * - 
     * - All leaf nodes have same distance with root node.
     * 
     * Time complexity
     * - spacing : O(n) 
     * - searching : O(log n)
     * - insertion : O(log n)
     * - deletion : O(log n)
     * 
     * ref) [Wikipedia](en.wikipedia.org/wiki/B-tree)
     * 
     * @desc
     * #### Example -
     * ```js
     * var BTree = require("@structure-js/datastructure").BTree;
     * var bTree=new BTree();
     * ```
     */

    let Tree = require('./Tree');
    let Queue = require('./Queue');

    const M = 6;

    function BTree() {
        this.size = 0;
        this.height = 0;
        this.root = new BTree.Node(0);
        this.compare = function(k1, k2){
            return k1 - k2;
        }

        return this;
    }

    BTree.prototype = new Tree();

    BTree.prototype.insert = function (key) {

        let u = this.insert2(this.root, key, this.height);
        this.size++;
        if (u == null) return;

        // need to split root
        let t = new BTree.Node(2);
        t.children[0] = new BTree.Entry(this.root.children[0].key, this.root);
        t.children[1] = new BTree.Entry(u.children[0].key, u);
        this.root = t;
        this.height++;
    }
    BTree.prototype.insert2 = function (node, key, ht) {
        let i;
        let t = new BTree.Entry(key, null);

        if (ht == 0) {  // external node
            for (i = 0; i < node.size; i++) {
                if (this.compare(node.children[i].key, key) > 0) break;
            }
        } else {        // internal node
            for (i = 0; i < node.size; i++) {
                if (((i + 1) === node.size) || (this.compare(node.children[i + 1].key, key) > 0)) {
                    let u = this.insert2(node.children[i++].nextNode, key, ht - 1);   //node type
                    if (u === null) {
                        return null;
                    }
                    t.key = u.children[0].key;
                    t.nextNode = u;
                    break;
                }
            }
        }

        for (let j = node.size; j > i; j--) {
            node.children[j] = node.children[j - 1];
        }
        node.children[i] = t;
        node.size++;
        if (node.size < M) {
            return null;
        } else {
            return this.split(node);
        }
    }

    BTree.prototype.get = function (key) {
        if (key == null) throw new IllegalArgumentException("argument to get() is null");

        let result = this.search(this.root, new BTree.Entry(key, null), this.height);
        if (result !== null) {
            return result.key;
        } else {
            return null;
        }
    }

    BTree.prototype.search = function (node, key, ht) {
        let children = node.children;

        
        if (ht === 0) { // external node
            for (let i = 0; i < node.size; i++) {
                if (this.compare(children[i].key, key) === 0) {
                    return children[i];
                }
            }
        } else {        // internal node
            for (let i = 0; i < node.size; i++) {
                if (((i + 1) === node.size) || (this.compare(children[i + 1].key, key) > 0)) {
                    return this.search(children[i].nextNode, key, ht - 1);
                }
            }
        }
        return null;
    }

    BTree.prototype.split = function (node) {
        let t = new BTree.Node(M / 2);
        node.size = M / 2;
        let splited = [];
        for (let i = 0; i < M / 2; i++) {
            t.children[i] = node.children[M / 2 + i];
            splited.push(M / 2 + i);
        }
        for (let i = splited.length - 1; i >= 0; i--) {
            node.children.splice(splited[i], 1);
        }
        return t;
    }

    BTree.prototype.delete = function (key) {
    }

    BTree.prototype._bfsVisualization = function () {
        let queue = new Queue();

        queue.push(this.root);
        let height = this.height;
        while (!queue.isEmpty()) {
            let tempQueue = new Queue();
            let space = "";
            for (let i = 0; i < height * 7; i++) {
                space += "\t";
            }
            process.stdout.write(space);
            while (!queue.isEmpty()) {
                for (let child of queue.pop().children) {
                    if (!(child instanceof BTree.Entry)) continue;
                    process.stdout.write((child.key + "\t"));
                    if (child.nextNode !== null) {
                        tempQueue.push(child.nextNode);
                    }
                }
                process.stdout.write("\t\t");
            }
            queue = tempQueue;
            console.log();
            height--;
        }
    }

    BTree.Node = function (size) {
        this.children = new Array(M);
        this.size = size;
    }

    BTree.Node.prototype = new Tree.Node();

    BTree.Node.prototype.getChildren = function () {
        return this.children;
    }

    BTree.Entry = function (key, nextNode) {
        this.key = key;
        this.nextNode = nextNode;
    }
    module.exports = BTree;
})();