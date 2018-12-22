var Stack = require('../lib/Stack');

test('Stack[] push 1 = [1]', function() {
    var s = new Stack();
    s.push(1);
    expect(s._list.head()).toBe(1);
})
test('Stack[3] push 1 = [3,1]', function() {
    var s = new Stack();
    s.push(3);
    s.push(1);
    expect(s._list.head()).toBe(3);
    expect(s._list.tail()).toBe(1);
})
test('Stack[3] pop = []', function() {
    var s = new Stack();
    s.push(3);
    expect(s.pop()).toBe(3);
    expect(s._list.isEmpty()).toBe(true);
})
test('Stack[3,4] pop = [3]', function() {
    var s = new Stack();
    s.push(3);
    s.push(4);
    expect(s.pop()).toBe(4);
    expect(s._list.head()).toBe(3);
})
test('Stack[5] top = 5', function() {
    var s = new Stack();
    s.push(5);
    expect(s.top()).toBe(5);
})
test('Stack[] is empty = true', function() {
    var s = new Stack();
    expect(s.isEmpty()).toBe(true);
})
test('Stack[3] is empty = false', function() {
    var s = new Stack();
    s.push(3);
    expect(s.isEmpty()).toBe(false);
})
test('Stack[] size = 0', function() {
    var s = new Stack();
    expect(s.size()).toBe(0);
})
test('Stack[3,4,5,6,7] size = 5', function() {
    var s = new Stack();
    s.push(3);
    s.push(4);
    s.push(5);
    s.push(6);
    s.push(7);
    expect(s.size()).toBe(5);
})
test('Stack[3,4,5,6,7] clear = []', function() {
    var s = new Stack();
    s.push(3);
    s.push(4);
    s.push(5);
    s.push(6);
    s.push(7);
    s.clear();
    expect(s.isEmpty()).toBe(true);
})