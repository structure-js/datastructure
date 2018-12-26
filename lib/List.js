(function() {
    "use strict"
    /**
     * @class List
     * @classdesc A List is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var List = require("@structure-js/datastructure").List
     * var list = new List()
     * ```
     */
    var Deque = require('./Deque.js');
    function List() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    function Node(value, next, prev) {
        this._value = value;
        this._next = next;
        this._prev = prev;
    }
    List.prototype = {
        pushFront: Deque.prototype.pushFront,
        pushBack: Deque.prototype.pushBack,
        popFront: Deque.prototype.popFront,
        popBack: Deque.prototype.popBack,
        front: Deque.prototype.front,
        back: Deque.prototype.back,
        size: Deque.prototype.size,
        isEmpty: Deque.prototype.isEmpty,
        clear: Deque.prototype.clear,
        *[Symbol.iterator]() {
            if(this._first === null) return { done: true };
            var cur = this._first;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        at: function(idx) {
            var cur;
            if(idx > -1){
                cur = this._first;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                cur = this._last;
                while(++idx){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._prev;
                }
            }
            if(cur === null) throw new Error("Index out of range");
                return cur._value;
        },
        insert: function(idx,value) {
            var cur;
            if(idx == 0 || idx == this._size*-1){
                this.pushFront(value);
                return true;
            }
            if(idx > -1){
                cur = this._first;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                idx++;
                cur = this._last;
                while(idx++){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._prev;
                }
            }
            if(cur === null) throw new Error("Index out of range");
            var node = new Node(value,cur,cur._prev);
            cur._prev._next = node;
            cur._prev = node;
            this._size++;
            return true;
        },
        delete: function(idx){
            var cur;
            if(idx == 0 || idx == this._size*-1){
                return this.popFront(value);
            }else if(idx == -1 || idx == this._size-1){
                return this.popBack(value);
            }
            if(idx > -1){
                cur = this._first;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                idx++;
                cur = this._last;
                while(idx++){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._prev;
                }
            }
            if(cur === null) throw new Error("Index out of range");
            var value = cur._value;
            cur._prev._next = cur._next;
            cur._next._prev = cur._prev;
            this._size--;
            return value;
        }
    },
    module.exports = List;
})();