var Deque = require('../index').Deque;

test('Deque[] push front 1 = Deque[1]', function() {
    var dq = new Deque();
    dq.pushFront(1);
    expect(dq._first._value).toBe(1);
})
test('Deque[] push back 2 = Deque[2]', function() {
    var dq = new Deque();
    dq.pushBack(2);
    expect(dq._last._value).toBe(2);
})
test('Deque[3] push front 1 = Deque[1,3]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    dq.pushFront(1);
    expect(dq._first._value).toBe(1);
    expect(dq._last._value).toBe(3);
})
test('Deque[3] push back 2 = Deque[3,2]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    dq.pushBack(2);
    expect(dq._first._value).toBe(3);
    expect(dq._last._value).toBe(2);
})
test('Deque[3] pop front = Deque[]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    expect(dq.popFront()).toBe(3);
    expect(dq._first).toBe(null);
    expect(dq._last).toBe(null);
    expect(dq._size).toBe(0);
    expect(function(){dq.popFront()}).toThrow();
})
test('Deque[3] pop back = Deque[]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    expect(dq.popBack()).toBe(3);
    expect(dq._first).toBe(null);
    expect(dq._last).toBe(null);
    expect(dq._size).toBe(0);
    expect(function(){dq.popBack()}).toThrow();
})
test('Deque[3,4] remove head = Deque[4]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    dq.pushBack(4);
    expect(dq.popFront()).toBe(3);
    expect(dq._first._value).toBe(4);
    expect(dq._last._value).toBe(4);
    expect(dq._size).toBe(1);
})
test('Deque[3,4] remove tail = Deque[3]', function() {
    var dq = new Deque();
    dq.pushFront(4);
    dq.pushFront(3);
    expect(dq.popBack()).toBe(4);
    expect(dq._first._value).toBe(3);
    expect(dq._last._value).toBe(3);
    expect(dq._size).toBe(1);
})
test('Deque[5] front = 5', function() {
    var dq = new Deque();
    dq.pushFront(5);
    expect(dq.front()).toBe(5);
})
test('Deque[5] back = 5', function() {
    var dq = new Deque();
    dq.pushBack(5);
    expect(dq.back()).toBe(5);
})
test('Deque[] is empty = true', function() {
    var dq = new Deque();
    expect(dq.isEmpty()).toBe(true);
})
test('Deque[3] is empty = false', function() {
    var dq = new Deque();
    dq.pushFront(3);
    expect(dq.isEmpty()).toBe(false);
})
test('Deque[] size = 0', function() {
    var dq = new Deque();
    expect(dq.size()).toBe(0);
})
test('Deque[3,4,5,6,7] size = 5', function() {
    var dq =new Deque();
    dq.pushFront(7);
    dq.pushFront(6);
    dq.pushFront(5);
    dq.pushFront(4);
    dq.pushFront(3);
    expect(dq.size()).toBe(5);
})
test('Deque[3,4,5,6,7] clear = []', function() {
    var dq =new Deque();
    dq.pushFront(7);
    dq.pushFront(6);
    dq.pushFront(5);
    dq.pushFront(4);
    dq.pushFront(3);
    dq.clear();
    expect(dq.isEmpty()).toBe(true);
})