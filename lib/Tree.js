(function () {
    "use strict";
    /**
     * @class Tree
     * @classdesc A Tree is a non-linear data structure simulates a 
     * hierarchical tree structure, with a root value and subtrees of children 
     * with a parent node, represented as a set of linked nodes.
     * This is implemented with Adjacency List.
     * @desc
     * #### Example -
     * ```js
     * var Tree = require("@structure-js/datastructure").Tree
     * var tree=new Tree()
     * ```
     */

    let dfs = function(node, value){
        for(let child of node.getChildren()){
            let result = dfs(child, value);
            if(result !== null && result.value === value){
                return result;
            }
        }
        if(node.value === value){
            return node;
        }else{
            return null;
        }
    }

    function Tree() {
        this.nodeSize = 0;
        this.height = 0;
        let rootNode = null;

        this.getRootNode = function () {
            return rootNode;
        }

        this.setRootNode = function (value) {
            if(rootNode === null){
                rootNode = new Tree.Node(value);
                this.nodeSize++;
            }else{
                rootNode.value = value;
            }
        }

        return this;
    }

    Tree.prototype = {
        addNodeTo: function (targetValue, newValue) {
            if(this.has(newValue)){
                throw new Error("AlreadyExistError : " + newValue);
            }
            let targetNode = this.getNode(targetValue);
            let newNode  = new Tree.Node(newValue);
            newNode.setParent(targetNode);
            targetNode.addChild(newNode);
            this.nodeSize++;
        },
        has: function(value){
            if(this.getRootNode === null){
                throw new Error("EmptyTreeError : Called function 'has(value)' from empty tree.");
            }

            try {
                return this.getNode(value) instanceof Tree.Node;
            }catch(e){
                return false;
            }
        },
        // DFS
        getNode: function (value) {
            if(this.getRootNode() === null){
                return null;
            }

            for(let node of this.dfsIterator()){
                if (node.value === value){
                    return node;
                }
            }

            throw new Error('NonExistError : when you try to get ' + value);
        },
        deleteNode: function (value) {
            targetNode = this.getNode(value);
            if(targetNode==null){
                throw new Error('NonExistError : when you try to delete ' + value);
            }

            parentNode = targetNode.getParent();
            parentNode.deleteChild(targetNode);
            targetNode.setParent(null);
        },
        // pre-order
        dfsIterator: function* (node){
            if(!(node instanceof Tree.Node)){
                node = this.getRootNode();
            }
            for(let child of node.getChildren()){
                yield* this.dfsIterator(child);
            }
            yield node;
        },
        // in-order
        dfsIteratorInOrder: function* (node){
            if(!(node instanceof Tree.Node)){
                node = this.getRootNode();
            }
            yield node;
            for(let child of node.getChildren()){
                yield* this.dfsIteratorInOrder(child);
            }
        }
    }

    Tree.Node = function (value) {
        this.value = value;
        let parent;
        let children = [];
        let childrenSize = 0;

        this.getChildren = function () {
            return children;
        }

        this.getChildrenSize = function () {
            return childrenSize;
        }

        this.hasChild = function (child) {
            for (let temp of children) {
                if (temp === child) {
                    return true;
                }
            }
            return false;
        }

        this.addChild = function (child) {
            if (!(child instanceof Tree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            children.push(child);
            child.setParent(this);
            childrenSize++;
        }

        this.deleteChild = function (child) {
            if (!(child instanceof Tree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            let isDeleted = false;
            for (let i = 0; i < childrenSize; i++) {
                if (children[i] === child) {
                    children.splice(i, 1);
                    childrenSize--;
                    isDeleted = true;
                    break;
                }
            }

            if (!isDeleted) {
                throw new Error("NonExistentNodeError : " + child);
            }
        }

        this.getParent = function () {
            return parent;
        }

        this.setParent = function (_parent) {
            parent = _parent;
        }
    }

    Tree.Node.prototype = {

    }

    module.exports = Tree;
})();