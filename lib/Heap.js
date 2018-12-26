(function() {
    "use strict"
    /**
     * @class Heap
     * @classdesc A Heap is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var Heap = require("@structure-js/datastructure").MaxHeap
     * var Heap = new MaxHeap()
     * ```
     */
    function Heap() {
        this._list = [0];
        this._compare = function(){};
    }
    Heap.prototype = {
        push: function(value) {
            this._list.push(value);
            var curIdx = this._list.length - 1;
            var parentsIdx = parseInt(curIdx / 2);
            while(parentsIdx){
                if(this._compare(this._list[parentsIdx], value)) return 0;
                var tmp = this._list[parentsIdx];
                this._list[parentsIdx] = this._list[curIdx];
                this._list[curIdx] = tmp;
                curIdx = parentsIdx;
                parentsIdx = parseInt(parentsIdx / 2);
            }
            return 0;
        },
        pop: function() {
            if(this._list.length === 1) throw new Error("MaxHeap is empty!")
            var value = this._list[1];
            this._list[1] = this._list[this._list.length - 1];
            this._list.pop();
            var idx = 1;
            while(idx*2 < this._list.length){
                if(idx*2+1 < this._list.length){
                    if(this._compare(this._list[idx],this._list[idx*2]) && this._compare(this._list[idx],this._list[idx*2+1])){
                        return value;
                    }else if(this._compare(this._list[idx*2],this._list[idx*2+1])){
                        var tmp = this._list[idx];
                        this._list[idx] = this._list[idx*2];
                        this._list[idx*2] = tmp;
                        idx = idx*2;
                    }else{
                        var tmp = this._list[idx];
                        this._list[idx] = this._list[idx*2+1];
                        this._list[idx*2+1] = tmp;
                        idx = idx*2+1;
                    }
                }else{
                    if(this._compare(this._list[idx],this._list[idx*2])){
                        return value;
                    }else{
                        var tmp = this._list[idx];
                        this._list[idx] = this._list[idx*2];
                        this._list[idx*2] = tmp;
                        idx = idx*2;
                    }
                }
            }
            return value;
        },
        top: function() {
            return this._list[1];
        },
        clear: function() {
            this._list = [0];
        },
        isEmpty: function() {
            if(this._list.length === 1) return true;
            return false;
        },
        size: function() {
            return this._list.length - 1;
        }
    }
    module.exports = Heap;
})();