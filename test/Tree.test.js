var Tree = require('../lib/Tree');

test('Tree init', function() {
    let tree = new Tree();

    expect(tree.getRootNode()).toBe(null);
    expect(tree.nodeSize).toBe(0);
});

test('addNodeTo test', function(){
    let tree = new Tree();

    tree.setRootNode(2);
    tree.addNodeTo(2,3);
    tree.addNodeTo(2,4);
    tree.addNodeTo(2,5);
    tree.addNodeTo(5,1);

    expect(()=>tree.addNodeTo(5,2)).toThrow(Error);

    expect(tree.has(1)).toBe(true);
    expect(tree.has(2)).toBe(true);
    expect(tree.has(3)).toBe(true);
    expect(tree.has(4)).toBe(true);
    expect(tree.has(5)).toBe(true);
    expect(tree.has(6)).toBe(false);

    expect(tree.nodeSize).toBe(5);
});

test('DFS', function(){
    let tree = new Tree();
    let Queue = require("../lib/Queue");

    tree.setRootNode(2);
    tree.addNodeTo(2,3);
    tree.addNodeTo(3,6);
    tree.addNodeTo(2,4);
    tree.addNodeTo(2,5);
    tree.addNodeTo(5,1);

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