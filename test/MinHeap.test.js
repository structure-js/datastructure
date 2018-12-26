var MinHeap = require('../index').MinHeap;

test('MinHeap push 1 = [0,1]', function(){
    var mh = new MinHeap();
    mh.push(1);
    expect(mh._list).toEqual([0,1]);
})
test('MinHeap push 2,3,1 = [0,1,3,2]', function(){
    var mh = new MinHeap();
    mh.push(2);
    expect(mh._list).toEqual([0,2]);
    mh.push(3);
    expect(mh._list).toEqual([0,2,3]);
    mh.push(1);
    expect(mh._list).toEqual([0,1,3,2]);
})
test('MinHeap push 5,7,4,3,1 = [0,1,3,5,7,4]', function(){
    var mh = new MinHeap();
    mh.push(5);
    expect(mh._list).toEqual([0,5]);
    mh.push(7);
    expect(mh._list).toEqual([0,5,7]);
    mh.push(4);
    expect(mh._list).toEqual([0,4,7,5]);
    mh.push(3);
    expect(mh._list).toEqual([0,3,4,5,7]);
    mh.push(1);
    expect(mh._list).toEqual([0,1,3,5,7,4]);
})
test('MinHeap[0,1,3,5,7,4] pop = 1,3,4,5,7', function(){
    var mh = new MinHeap();
    mh.push(5);
    mh.push(7);
    mh.push(4);
    mh.push(3);
    mh.push(1);
    expect(mh.pop()).toBe(1);
    expect(mh._list).toEqual([0,3,4,5,7]);
    expect(mh.pop()).toBe(3);
    expect(mh._list).toEqual([0,4,7,5]);
    expect(mh.pop()).toBe(4);
    expect(mh._list).toEqual([0,5,7]);
    expect(mh.pop()).toBe(5);
    expect(mh._list).toEqual([0,7]);
    expect(mh.pop()).toBe(7);
    expect(mh._list).toEqual([0]);
    expect(function(){mh.pop()}).toThrow();
})
test('MinHeap[0,1,3,5,7,4] top = 1', function(){
    var mh = new MinHeap();
    mh.push(5);
    mh.push(7);
    mh.push(4);
    mh.push(3);
    mh.push(1);
    expect(mh.top()).toBe(1);
    expect(mh._list).toEqual([0,1,3,5,7,4]);
})
test('MinHeap[0,1,3,5,7,4] clear = [0]', function(){
    var mh = new MinHeap();
    mh.push(5);
    mh.push(7);
    mh.push(4);
    mh.push(3);
    mh.push(1);
    mh.clear();
    expect(mh._list).toEqual([0]);
})
test('MinHeap[0,1,3,5,7,4] is Empty = false', function(){
    var mh = new MinHeap();
    expect(mh.isEmpty()).toBe(true);
    mh.push(5);
    mh.push(7);
    mh.push(4);
    mh.push(3);
    mh.push(1);
    expect(mh.isEmpty()).toBe(false);
    mh.clear();
    expect(mh.isEmpty()).toBe(true);
})
test('MinHeap[0,1,3,5,7,4] size = 5', function(){
    var mh = new MinHeap();
    expect(mh.size()).toBe(0);
    mh.push(5);
    mh.push(7);
    mh.push(4);
    mh.push(3);
    mh.push(1);
    expect(mh.size()).toBe(5);
    mh.pop();
    expect(mh.size()).toBe(4);
    mh.clear();
    expect(mh.size()).toBe(0);
})