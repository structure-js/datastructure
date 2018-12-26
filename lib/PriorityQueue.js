(function() {
    "use strict"
    /**
     * @class Priority Queue
     * @classdesc A Priority Queue is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var PriorityQueue = require("@structure-js/datastructure").PriorityQueue
     * var priorityQueue = new PriorityQueue()
     * ```
     */
    var Heap = require('./Heap.js');
    function PriorityQueue(compare) {
        this._list = [0];
        this._compare = compare;
    }
    PriorityQueue.prototype = {
        push: Heap.prototype.push,
        pop: Heap.prototype.pop,
        top: Heap.prototype.top,
        clear: Heap.prototype.clear,
        isEmpty: Heap.prototype.isEmpty,
        size: Heap.prototype.size
    }
    module.exports = PriorityQueue;
})();