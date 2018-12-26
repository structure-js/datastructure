(function() {
    "use strict"
    /**
     * @class Min Heap
     * @classdesc A Min Heap is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var MinHeap = require("@structure-js/datastructure").MinHeap
     * var minHeap = new MinHeap()
     * ```
     */
    var Heap = require('./Heap.js');
    function MinHeap() {
        this._list = [0];
        this._compare = function(x,y){
            return x < y;
        };
    }
    MinHeap.prototype = {
        push: Heap.prototype.push,
        pop: Heap.prototype.pop,
        top: Heap.prototype.top,
        clear: Heap.prototype.clear,
        isEmpty: Heap.prototype.isEmpty,
        size: Heap.prototype.size
    }
    module.exports = MinHeap;
})();