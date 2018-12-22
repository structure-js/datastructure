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
    var List = require('./List.js');
    function Queue() {
        this._list = new List();
    }
    Queue.prototype = {
        push: function(value) {
            this._list.addTail(value);
        },
        pop: function() {
            return this._list.removeHead();      
        },
        front: function() {
            return this._list.head();
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
    module.exports = Queue;
})();