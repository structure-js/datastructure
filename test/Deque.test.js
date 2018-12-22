var Deque = require('../lib/Deque');

test('Deque[] add head 1 = [1]', function() {
    var dq = new Deque();
    dq.pushFront(1);
    expect(dq._list.head()).toBe(1);
})
test('Deque[] add tail 2 = [2]', function() {
    var dq = new Deque();
    dq.pushBack(2);
    expect(dq._list.tail()).toBe(2);
})
test('Deque[3] add head 1 = [1,3]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    dq.pushFront(1);
    expect(dq._list.head()).toBe(1);
    expect(dq._list.tail()).toBe(3);
})
test('Deque[3] add tail 2 = [3,2]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    dq.pushBack(2);
    expect(dq._list.head()).toBe(3);
    expect(dq._list.tail()).toBe(2);
})
test('Deque[3] remove head = []', function() {
    var dq = new Deque();
    dq.pushFront(3);
    expect(dq.popFront()).toBe(3);
    expect(dq._list.isEmpty()).toBe(true);
    expect(dq._list.isEmpty()).toBe(true);
})
test('Deque[3] remove tail = []', function() {
    var dq = new Deque();
    dq.pushFront(3);
    expect(dq.popBack()).toBe(3);
    expect(dq._list.isEmpty()).toBe(true);
    expect(dq._list.isEmpty()).toBe(true);
})
test('Deque[3,4] remove head = [4]', function() {
    var dq = new Deque();
    dq.pushFront(3);
    dq.pushBack(4);
    expect(dq.popFront()).toBe(3);
    expect(dq._list.head()).toBe(4);
    expect(dq._list.tail()).toBe(4);
})
test('Deque[3,4] remove tail = [3]', function() {
    var dq = new Deque();
    dq.pushFront(4);
    dq.pushFront(3);
    expect(dq.popBack()).toBe(4);
    expect(dq._list.head()).toBe(3);
    expect(dq._list.tail()).toBe(3);
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