(function() {
    "use strict"
    /**
     * @class Queue
     * @classdesc A Queue is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var Queue = require("@structure-js/datastructure").Queue
     * var queue = new Queue()
     * ```
     */
    function Queue() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    function Node(value, next, prev) {
        this._value = value;
        this._next = next;
        this._prev = prev;
    }
    Queue.prototype = {
        *[Symbol.iterator]() {
            if(this._first === null) return { done: true };
            var cur = this._first;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        push: function(value) {
            var node = new Node(value, null, this._last);
            if(this._last) this._last._next = node;
            else this._first = node;
            this._last = node;
            this._size++;
            return true;
        },
        pop: function() {
            if(this._first === null) throw new Error("Object is empty!");
            var value = this._first._value;
            this._first = this._first._next;
            if(this._first) this._first._prev = null;
            else this._last = null;
            this._size--;
            return value;
        },
        front: function() {
            if(this.isEmpty()) throw new Error("Object is empty!");
            return this._first._value;
        },
        size: function() {
            return this._size;
        },
        isEmpty: function() {
            if(this._first === null && this._last === null) return true;
            return false;
        },
        clear: function() {
            this._first = null;
            this._last = null;
            this._size = 0;
        }
    }
    module.exports = Queue;
})();