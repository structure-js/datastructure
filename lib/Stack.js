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
    var List = require('./List.js');
    function Stack() {
        this._list = new List();
    }
    Stack.prototype = {
        push: function(value) {
            this._list.addTail(value);
        },
        pop: function() {
            return this._list.removeTail();
        },
        top: function() {
            return this._list.tail();
        },
        size: function() {
            return this._list.size();
        },
        isEmpty: function() {
            return this._list.isEmpty();
        },
        clear: function() {
            this._list.clear();
        }
    }
    module.exports = Stack;
})();