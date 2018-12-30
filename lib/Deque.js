(function() {
    "use strict"
    /**
     * @class Deque
     * @classdesc A Deque is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var Deque = require("@structure-js/datastructure").Deque
     * var deque = new Deque()
     * ```
     */
    var Queue = require('./Queue.js');
    function Deque() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    function Node(value, next, prev) {
        this._value = value;
        this._next = next;
        this._prev = prev;
    }
    Deque.prototype = {
        *[Symbol.iterator]() {
            if(this._first === null) return { done: true };
            var cur = this._first;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        pushFront: function(value) {
            var node = new Node(value, this._first, null);
            if(this._first) this._first._prev = node;
            else this._last = node;
            this._first = node;
            this._size++;
            return true;
        },
        pushBack: Queue.prototype.push,
        popFront: Queue.prototype.pop,
        popBack: function() {
            if(this._last === null) throw new Error("Object is empty!");;
            var value = this._last._value;
            this._last = this._last._prev;
            if(this._last) this._last._next = null;
            else this._first = null;
            this._size--;
            return value;
        },
        front: Queue.prototype.front,
        back: function() {
            if(this.isEmpty()) throw new Error("Object is empty!");
            return this._last._value;
        },
        size: Queue.prototype.size,
        isEmpty: Queue.prototype.isEmpty,
        clear: Queue.prototype.clear
    }
    module.exports = Deque;
})();