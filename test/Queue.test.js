var Queue = require('../lib/Queue');

test('Queue[] push 1 = [1]', function() {
    var q = new Queue();
    q.push(1);
    expect(q._list.head()).toBe(1);
})
test('Queue[3] push 1 = [3,1]', function() {
    var q = new Queue();
    q.push(3);
    q.push(1);
    expect(q._list.head()).toBe(3);
    expect(q._list.tail()).toBe(1);
})
test('Queue[3] pop = []', function() {
    var q = new Queue();
    q.push(3);
    expect(q.pop()).toBe(3);
    expect(q._list.isEmpty()).toBe(true);
})
test('Queue[3,4] pop = [4]', function() {
    var q = new Queue();
    q.push(3);
    q.push(4);
    expect(q.pop()).toBe(3);
    expect(q._list.head()).toBe(4);
})
test('Queue[5] front = 5', function() {
    var q = new Queue();
    q.push(5);
    expect(q.front()).toBe(5);
})
test('Queue[] is empty = true', function() {
    var q = new Queue();
    expect(q.isEmpty()).toBe(true);
})
test('Queue[3] is empty = false', function() {
    var q = new Queue();
    q.push(3);
    expect(q.isEmpty()).toBe(false);
})
test('Queue[] size = 0', function() {
    var q = new Queue();
    expect(q.size()).toBe(0);
})
test('Queue[3,4,5,6,7] size = 5', function() {
    var q = new Queue();
    q.push(3);
    q.push(4);
    q.push(5);
    q.push(6);
    q.push(7);
    expect(q.size()).toBe(5);
})
test('Queue[3,4,5,6,7] clear = []', function() {
    var q = new Queue();
    q.push(3);
    q.push(4);
    q.push(5);
    q.push(6);
    q.push(7);
    q.clear();
    expect(q.isEmpty()).toBe(true);
})