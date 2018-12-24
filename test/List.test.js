var List = require('../lib/List');

test('List[] add head 1 = [1]', function() {
    var list = new List();
    list.addHead(1);
    expect(list._head._value).toBe(1);
})
test('List[] add tail 2 = [2]', function() {
    var list = new List();
    list.addTail(2);
    expect(list._tail._value).toBe(2);
})
test('List[3] add head 1 = [1,3]', function() {
    var list = new List();
    list.addHead(3);
    list.addHead(1);
    expect(list._head._value).toBe(1);
    expect(list._tail._value).toBe(3);
})
test('List[3] add tail 2 = [3,2]', function() {
    var list = new List();
    list.addHead(3);
    list.addTail(2);
    expect(list._head._value).toBe(3);
    expect(list._tail._value).toBe(2);
})
test('List[3] remove head = []', function() {
    var list = new List();
    list.addHead(3);
    expect(list.removeHead()).toBe(3);
    expect(list._head).toBe(null);
})
test('List[3] remove tail = []', function() {
    var list = new List();
    list.addHead(3);
    expect(list.removeTail()).toBe(3);
    expect(list._head).toBe(null);
})
test('List[3,4] remove head = [4]', function() {
    var list = new List();
    list.addHead(3);
    list.addTail(4);
    expect(list.removeHead()).toBe(3);
    expect(list._head._value).toBe(4);
})
test('List[3,4] remove tail = [3]', function() {
    var list = new List();
    list.addHead(3);
    list.addTail(4);
    expect(list.removeTail()).toBe(4);
    expect(list._head._value).toBe(3);
})
test('List[5] head = 5', function() {
    var list = new List();
    list.addHead(5);
    expect(list.head()).toBe(5);
})
test('List[5] tail = 5', function() {
    var list = new List();
    list.addTail(5);
    expect(list.tail()).toBe(5);
})
test('List[] is empty = true', function() {
    var list = new List();
    expect(list.isEmpty()).toBe(true);
})
test('List[3] is empty = false', function() {
    var list = new List();
    list.addHead(3);
    expect(list.isEmpty()).toBe(false);
})
test('List[] size = 0', function() {
    var list = new List();
    expect(list.size()).toBe(0);
})
test('List[3,4,5,6,7] size = 5', function() {
    var list = new List();
    list.addHead(7);
    list.addHead(6);
    list.addHead(5);
    list.addHead(4);
    list.addHead(3);
    expect(list.size()).toBe(5);
})
test('List[3,4,5,6,7] clear = []', function() {
    var list = new List();
    list.addHead(7);
    list.addHead(6);
    list.addHead(5);
    list.addHead(4);
    list.addHead(3);
    list.clear();
    expect(list.isEmpty()).toBe(true);
})
test('List[] head = null', function() {
    var list = new List();
    expect(list.head()).toBe(null);
})
test('List[] tail = null', function() {
    var list = new List();
    expect(list.tail()).toBe(null);
})
test('List[1,2,3,4,5] iterable test = 1,2,3,4,5', function() {
    var list = new List();
    list.addHead(5);
    list.addHead(4);
    list.addHead(3);
    list.addHead(2);
    list.addHead(1);
    var expected = 1;
    for(var e of list){
        expect(e).toBe(expected);
        expected++;
    }
})
test('List[] iterable test = undefined', function() {
    var list = new List();
    for(var e of list){
        expect(e).toBe(undefined);
    }
})