var BinarySearchTree = require('../lib/BinarySearchTree');

test('Tree init', function() {
    let tree = new BinarySearchTree();

    expect(tree.root).toBe(null);
    expect(tree.nodeSize).toBe(0);
});

test('insertTo test', function(){
    let tree = new BinarySearchTree();
    tree.insert(2);
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(5);
    tree.insert(8);
    tree.insert(9);
    tree.insert(10);
    tree.insert(11);
    tree.insert(20);
    tree.insert(15);
    tree.insert(17);
    tree.insert(16);
    tree.insert(12);
    tree.insert(13);

    tree._dfsVisualization();

    let bfsExpectList = [10,4,15,2,8,12,17,1,3,5,9,11,13,16,20];
    let cnt=0;
    for(let node of tree.bfsIterator()){
        expect(node.value).toBe(bfsExpectList[cnt]);
        cnt++;
    }


    // tree._dfsVisualization();
    expect(tree.root.value).toBe(10);
    expect(tree.getMax()).toBe(20);
    expect(tree.getMin()).toBe(1);
});

test('DFS', function(){
    
});