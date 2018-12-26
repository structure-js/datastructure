var MaxHeap = require('../lib/MaxHeap');

test('MaxHeap push 1 = [0,1]', function(){
    var mh = new MaxHeap();
    mh.push(1);
    expect(mh._list).toEqual([0,1]);
})
test('MaxHeap push 1,3,2 = [0,3,1,2]', function(){
    var mh = new MaxHeap();
    mh.push(1);
    expect(mh._list).toEqual([0,1]);
    mh.push(3);
    expect(mh._list).toEqual([0,3,1]);
    mh.push(2);
    expect(mh._list).toEqual([0,3,1,2]);
})
test('MaxHeap push 1,3,4,7,5 = [0,7,5,3,1,4]', function(){
    var mh = new MaxHeap();
    mh.push(1);
    expect(mh._list).toEqual([0,1]);
    mh.push(3);
    expect(mh._list).toEqual([0,3,1]);
    mh.push(4);
    expect(mh._list).toEqual([0,4,1,3]);
    mh.push(7);
    expect(mh._list).toEqual([0,7,4,3,1]);
    mh.push(5);
    expect(mh._list).toEqual([0,7,5,3,1,4]);
})
test('MaxHeap[0,7,5,3,1,4] pop = 7,5,4,3,1', function(){
    var mh = new MaxHeap();
    mh.push(1);
    mh.push(3);
    mh.push(4);
    mh.push(7);
    mh.push(5);
    expect(mh.pop()).toBe(7);
    expect(mh._list).toEqual([0,5,4,3,1]);
    expect(mh.pop()).toBe(5);
    expect(mh._list).toEqual([0,4,1,3]);
    expect(mh.pop()).toBe(4);
    expect(mh._list).toEqual([0,3,1]);
    expect(mh.pop()).toBe(3);
    expect(mh._list).toEqual([0,1]);
    expect(mh.pop()).toBe(1);
    expect(mh._list).toEqual([0]);
    expect(function(){mh.pop()}).toThrow();
})
test('MaxHeap[0,8,5,3,2,4] top = 8', function(){
    var mh = new MaxHeap();
    mh.push(2);
    mh.push(3);
    mh.push(4);
    mh.push(8);
    mh.push(5);
    expect(mh.top()).toBe(8);
    expect(mh._list).toEqual([0,8,5,3,2,4]);
})
test('MaxHeap[0,8,5,3,2,4] clear = [0]', function(){
    var mh = new MaxHeap();
    mh.push(2);
    mh.push(3);
    mh.push(4);
    mh.push(8);
    mh.push(5);
    mh.clear();
    expect(mh._list).toEqual([0]);
})
test('MaxHeap[0,8,5,3,2,4] is Empty = false', function(){
    var mh = new MaxHeap();
    expect(mh.isEmpty()).toBe(true);
    mh.push(2);
    mh.push(3);
    mh.push(4);
    mh.push(8);
    mh.push(5);
    expect(mh.isEmpty()).toBe(false);
    mh.clear();
    expect(mh.isEmpty()).toBe(true);
})
test('MaxHeap[0,8,5,3,2,4] size = 5', function(){
    var mh = new MaxHeap();
    expect(mh.size()).toBe(0);
    mh.push(2);
    mh.push(3);
    mh.push(4);
    mh.push(8);
    mh.push(5);
    expect(mh.size()).toBe(5);
    mh.pop();
    expect(mh.size()).toBe(4);
    mh.clear();
    expect(mh.size()).toBe(0);
})