var List = require('../index').List;

test('List[] push front 1 = List[1]', function() {
    var list = new List();
    list.pushFront(1);
    expect(list._first._value).toBe(1);
    expect(list._size).toBe(1);
})
test('List[] push back 2 = List[2]', function() {
    var list = new List();
    list.pushBack(2);
    expect(list._last._value).toBe(2);
    expect(list._size).toBe(1);
})
test('List[3] push front 1 = List[1,3]', function() {
    var list = new List();
    list.pushFront(3);
    list.pushFront(1);
    expect(list._first._value).toBe(1);
    expect(list._last._value).toBe(3);
    expect(list._size).toBe(2);
})
test('List[3] push back 2 = List[3,2]', function() {
    var list = new List();
    list.pushBack(3);
    list.pushBack(2);
    expect(list._first._value).toBe(3);
    expect(list._last._value).toBe(2);
    expect(list._size).toBe(2);
})
test('List[3] pop front = List[]', function() {
    var list = new List();
    list.pushFront(3);
    expect(list.popFront()).toBe(3);
    expect(list._first).toBe(null);
    expect(list._last).toBe(null);
    expect(list._size).toBe(0);
    expect(function(){list.popFront()}).toThrow();
})
test('List[3] pop back = List[]', function() {
    var list = new List();
    list.pushFront(3);
    expect(list.popBack()).toBe(3);
    expect(list._first).toBe(null);
    expect(list._last).toBe(null);
    expect(list._size).toBe(0);
    expect(function(){list.popBack()}).toThrow();
})
test('List[3,4] pop front = List[4]', function() {
    var list = new List();
    list.pushFront(4);
    list.pushFront(3);
    expect(list.popFront()).toBe(3);
    expect(list._first._value).toBe(4);
    expect(list._last._value).toBe(4);
    expect(list._size).toBe(1);
})
test('List[3,4] pop back = List[3]', function() {
    var list = new List();
    list.pushFront(4);
    list.pushFront(3);
    expect(list.popBack()).toBe(4);
    expect(list._first._value).toBe(3);
    expect(list._last._value).toBe(3);
    expect(list._size).toBe(1);
})
test('List[5] head = 5', function() {
    var list = new List();
    list.pushFront(5);
    expect(list.front()).toBe(5);
})
test('List[5] tail = 5', function() {
    var list = new List();
    list.pushBack(5);
    expect(list.back()).toBe(5);
})
test('List[] is empty = true', function() {
    var list = new List();
    expect(list.isEmpty()).toBe(true);
})
test('List[3] is empty = false', function() {
    var list = new List();
    list.pushFront(3);
    expect(list.isEmpty()).toBe(false);
})
test('List[] size = 0', function() {
    var list = new List();
    expect(list.size()).toBe(0);
})
test('List[3,4,5,6,7] size = 5', function() {
    var list = new List();
    list.pushFront(7);
    list.pushFront(6);
    list.pushFront(5);
    list.pushFront(4);
    list.pushFront(3);
    expect(list.size()).toBe(5);
})
test('List[3,4,5,6,7] clear = []', function() {
    var list = new List();
    list.pushFront(7);
    list.pushFront(6);
    list.pushFront(5);
    list.pushFront(4);
    list.pushFront(3);
    list.clear();
    expect(list.isEmpty()).toBe(true);
    expect(list._first).toBe(null);
    expect(list._last).toBe(null);
    expect(list._size).toBe(0);
    expect(function(){list.popFront()}).toThrow();
    expect(function(){list.popBack()}).toThrow();
})
test('List[] front = Error', function() {
    var list = new List();
    expect(function(){list.front()}).toThrow();
})
test('List[] back = Error', function() {
    var list = new List();
    expect(function(){list.back()}).toThrow();
})
test('List[1,2,3,4,5] iterable test = 1,2,3,4,5', function() {
    var list = new List();
    list.pushFront(5);
    list.pushFront(4);
    list.pushFront(3);
    list.pushFront(2);
    list.pushFront(1);
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
test('List[1,2,3,4,5] list.at()', function() {
    var list = new List();
    list.pushFront(5);
    list.pushFront(4);
    list.pushFront(3);
    list.pushFront(2);
    list.pushFront(1);
    expect(list.at(0)).toBe(1);
    expect(list.at(4)).toBe(5);
    expect(list.at(3)).toBe(4);
    expect(list.at(-1)).toBe(5);
    expect(list.at(-5)).toBe(1);
    expect(function(){list.at(-6)}).toThrow();
    expect(function(){list.at(6)}).toThrow();
})
test('List[1,3,4,5] list.insert(1,2) = [1,2,3,4,5]', function() {
    var list = new List();
    list.pushFront(5);
    list.pushFront(4);
    list.pushFront(3);
    list.pushFront(1);
    expect(list.insert(1,2)).toBe(true);
    expect(list.at(1)).toBe(2);
    expect(list.size()).toBe(5);
    var expected = 1;
    for(var e of list){
        // console.log(e);
        expect(e).toBe(expected);
        expected++;
    }
})
test('List[] list.insert()', function() {
    var list = new List();
    expect(list.insert(0,2)).toBe(true);
    expect(list.at(0)).toBe(2);
    expect(list.size()).toBe(1);
    expect(list.insert(0,1)).toBe(true);
    expect(list.at(0)).toBe(1);
    expect(list.size()).toBe(2);
    expect(list.insert(1,3)).toBe(true);
    expect(list.at(1)).toBe(3);
    expect(list.size()).toBe(3);
    expect(list.insert(-3,0)).toBe(true);
    expect(list.at(0)).toBe(0);
    expect(list.size()).toBe(4);
    var expected = [0,1,3,2];
    var i = 0;
    for(var e of list){
        expect(e).toBe(expected[i++]);
    }
})
test('List[0,1,3,2] list.delete(0) = 0', function(){
    var list = new List();
    list.pushFront(2);
    list.pushFront(3);
    list.pushFront(1);
    list.pushFront(0);
    expect(list.delete(0)).toBe(0);
    expect(list.size()).toBe(3);
    var expected = [1,3,2];
    var i = 0;
    for(var e of list){
        expect(e).toBe(expected[i++]);
    }
})
test('List[0,1,3,2] list.delete(1) = 1', function(){
    var list = new List();
    list.pushFront(2);
    list.pushFront(3);
    list.pushFront(1);
    list.pushFront(0);
    expect(list.delete(1)).toBe(1);
    expect(list.size()).toBe(3);
    var expected = [0,3,2];
    var i = 0;
    for(var e of list){
        expect(e).toBe(expected[i++]);
    }
})
test('List[0,1,3,2] list.delete(3) = 2', function(){
    var list = new List();
    list.pushFront(2);
    list.pushFront(3);
    list.pushFront(1);
    list.pushFront(0);
    expect(list.delete(3)).toBe(2);
    expect(list.size()).toBe(3);
    var expected = [0,1,3];
    var i = 0;
    for(var e of list){
        expect(e).toBe(expected[i++]);
    }
})
test('List[0,1,3,2] list.delete(-1) = 2', function(){
    var list = new List();
    list.pushFront(2);
    list.pushFront(3);
    list.pushFront(1);
    list.pushFront(0);
    expect(list.delete(-1)).toBe(2);
    expect(list.size()).toBe(3);
    var expected = [0,1,3];
    var i = 0;
    for(var e of list){
        expect(e).toBe(expected[i++]);
    }
})
test('List[0,1,3,2] list.delete(-2) = 3', function(){
    var list = new List();
    list.pushFront(2);
    list.pushFront(3);
    list.pushFront(1);
    list.pushFront(0);
    expect(list.delete(-2)).toBe(3);
    expect(list.size()).toBe(3);
    var expected = [0,1,2];
    var i = 0;
    for(var e of list){
        expect(e).toBe(expected[i++]);
    }
})