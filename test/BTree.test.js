var BTree = require('../lib/BTree');

test('Tree init', function() {
    let tree = new BTree();

    expect(tree.root instanceof BTree.Node).toBe(true);
    expect(tree.size).toBe(0);
    expect(tree.height).toBe(0);
});

test('insertTo test', function(){
    let tree = new BTree();

    tree.insert(1, "github.com/HeechanYang");
    tree.insert(2, "github.com/structure-js/datastructure");
    tree.insert(3, "www.naver.com");
    tree.insert(4, "www.google.com");
    tree.insert(5, "www.daum.net");
    tree.insert(6, "www.11st.com");
    tree.insert(7, "www.wikipedia.com");
    tree.insert(8, "heechanyang.github.io");
    tree.insert(9, "www.firstmall.kr");
    tree.insert(10, "ko.wix.com");
    tree.insert(11, "www.sixshop.com/");
    tree.insert(12, "www.sabangnet.co.kr/");
    tree.insert(13, "www.compuzone.co.kr");
    tree.insert(14, "brunch.co.kr");
    tree.insert(15, "jaewook.net");
    tree.insert(16, "zmfmd.tistory.com");
    tree.insert(17, "www.zdnet.co.kr");
    tree.insert(18, "itfind.or.kr");
    tree.insert(19, "rpgxp7017.tistory.com");

    expect(tree.size).toBe(19);
    expect(tree.height).toBe(2);
    
    expect(tree.get(3)).toBe("www.naver.com");

    // tree._bfsVisualization();
});

test('DFS', function(){
    
});