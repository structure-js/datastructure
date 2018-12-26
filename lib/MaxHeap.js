(function() {
    "use strict"
    /**
     * @class Max Heap
     * @classdesc A Max Heap is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var MaxHeap = require("@structure-js/datastructure").MaxHeap
     * var maxHeap = new MaxHeap()
     * ```
     */
    var Heap = require('./Heap.js');
    function MaxHeap() {
        this._list = [0];
        this._compare = function(x,y){
            return x > y;
        };
    }
    MaxHeap.prototype = {
        push: Heap.prototype.push,
        pop: Heap.prototype.pop,
        top: Heap.prototype.top,
        clear: Heap.prototype.clear,
        isEmpty: Heap.prototype.isEmpty,
        size: Heap.prototype.size
    }
    module.exports = MaxHeap;
})();