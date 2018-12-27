var Tree = require('../index').Tree;

test('Tree init', function() {
    let tree = new Tree();

    expect(tree.root).toBe(null);
    expect(tree.nodeSize).toBe(0);
});

test('insertTo test', function(){
    let tree = new Tree();

    tree.setRoot(2);
    tree.insertTo(2,3);
    tree.insertTo(2,4);
    tree.insertTo(2,5);
    tree.insertTo(5,1);

    expect(()=>tree.insertTo(5,2)).toThrow(Error);

    expect(tree.contains(1)).toBe(true);
    expect(tree.contains(2)).toBe(true);
    expect(tree.contains(3)).toBe(true);
    expect(tree.contains(4)).toBe(true);
    expect(tree.contains(5)).toBe(true);
    expect(tree.contains(6)).toBe(false);

    expect(tree.nodeSize).toBe(5);
});

test('DFS', function(){
    let tree = new Tree();
    let Queue = require("../lib/Queue");

    tree.setRoot(2);
    tree.insertTo(2,3);
    tree.insertTo(3,6);
    tree.insertTo(2,4);
    tree.insertTo(2,5);
    tree.insertTo(5,1);

    testQueue = new Queue();
    
    for(let node of tree.dfsIterator()){
        testQueue.push(node);
    }
    expect(testQueue.pop()).toBe(tree.getNode(6));
    expect(testQueue.pop()).toBe(tree.getNode(3));
    expect(testQueue.pop()).toBe(tree.getNode(4));
    expect(testQueue.pop()).toBe(tree.getNode(1));
    expect(testQueue.pop()).toBe(tree.getNode(5));
    expect(testQueue.pop()).toBe(tree.getNode(2));
    
    for(let node of tree.dfsIteratorInOrder()){
        // console.log(node.value);
        testQueue.push(node);
    }
    expect(testQueue.pop()).toBe(tree.getNode(2));
    expect(testQueue.pop()).toBe(tree.getNode(3));
    expect(testQueue.pop()).toBe(tree.getNode(6));
    expect(testQueue.pop()).toBe(tree.getNode(4));
    expect(testQueue.pop()).toBe(tree.getNode(5));
    expect(testQueue.pop()).toBe(tree.getNode(1));
});