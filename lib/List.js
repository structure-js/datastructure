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
    function List() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }
    function Node(value, next, prev) {
        this._value = value;
        this._next = next;
        this._prev = prev;
    }
    List.prototype = {
        *[Symbol.iterator]() {
            if(this._head === null) return { done: true };
            var cur = this._head;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        addHead: function(value) {
            var node = new Node(value, this._head, null);
            if(this._head) this._head._prev = node;
            else this._tail = node;
            this._head = node;
            this._size++;
            return true;
        },
        addTail: function(value) {
            var node = new Node(value, null, this._tail);
            if(this._tail) this._tail._next = node;
            else this._head = node;
            this._tail = node;
            this._size++;
            return true;
        },
        removeHead: function() {
            if(this._head === null) return null;
            var value = this._head._value;
            this._head = this._head._next;
            if(this._head) this._head._prev = null;
            else this._tail = null;
            this._size--;
            return value;      
        },
        removeTail: function() {
            if(this._tail === null) return null;
            var value = this._tail._value;
            this._tail = this._tail._prev;
            if(this._tail) this._tail._next = null;
            else this._head = null;
            this._size--;
            return value;
        },
        head: function() {
            if(this.isEmpty()) return null
            return this._head._value;
        },
        tail: function() {
            if(this.isEmpty()) return null
            return this._tail._value;
        },
        size: function() {
            return this._size;
        },
        isEmpty: function() {
            if(this._head === null && this._tail === null) return true;
            else return false;
        },
        at: function(idx) {
            var cur;
            if(idx > -1){
                cur = this._head;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                cur = this._tail;
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
                this.addHead(value);
                return true;
            }else if(idx == this._size-1){
                this.addTail(value);
                return true;
            }
            if(idx > -1){
                idx--;
                cur = this._head;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                idx++;
                cur = this._tail;
                while(++idx){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._prev;
                }
            }
            if(cur === null) throw new Error("Index out of range");
            var next = cur._next;
            var node = new Node(value,next,cur);
            cur._next = node;
            next._prev = node;
            this._size++;
            return true;
        },
        clear: function() {
            this._head = null;
            this._tail = null;
            this._size = 0;
        }
    }
    module.exports = List;
})();