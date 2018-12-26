(function() {
    "use strict"
    /**
     * @class Stack
     * @classdesc A Stack is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var Stack = require("@structure-js/datastructure").Stack
     * var stack = new Stack()
     * ```
     */
    function Stack() {
        this._top = null;
        this._size = 0;
    }
    function Node(value, next) {
        this._value = value;
        this._next = next;
    }
    Stack.prototype = {
        push: function(value) {
            var node = new Node(value,this._top);
            this._top = node;
            this._size++;
            return true;
        },
        pop: function() {
            if(this._top === null) throw Error("Object is empty!");
            var value = this._top._value;
            this._top = this._top._next;
            this._size--;
            return value;
        },
        top: function() {
            if(this._top === null) throw Error("Object is empty!");
            return this._top._value;
        },
        size: function() {
            return this._size;
        },
        isEmpty: function() {
            if(this._top === null) return true;
            return false;
        },
        clear: function() {
            this._top = null;
            this._size = 0;
        }
    }
    module.exports = Stack;
})();