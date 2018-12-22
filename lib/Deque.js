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
    var List = require('./List.js');
    var Queue = require('./Queue.js');
    function Deque() {
        this._list = new List();
    }
    Deque.prototype = {
        pushFront: function(value) {
            this._list.addHead(value);
        },
        pushBack: Queue.prototype.push,
        popFront: Queue.prototype.pop,
        popBack: function() {
            return this._list.removeTail();
        },
        front: Queue.prototype.front,
        back: function() {
            return this._list.tail();
        },
        size: Queue.prototype.size,
        isEmpty: Queue.prototype.isEmpty,
        clear: Queue.prototype.clear
    }
    module.exports = Deque;
})();