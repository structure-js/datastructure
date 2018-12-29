var BTree = require('../lib/BTree');

test('Tree init', function() {
    let tree = new BTree();

    expect(tree.root instanceof BTree.Node).toBe(true);
    expect(tree.size).toBe(0);
    expect(tree.height).toBe(0);
});

test('Insert custom object and compare', function(){
    let CustomObj = function(key, value){
        this.key = key;
        this.value = value;
    }

    let tree = new BTree();

    tree.compare = function(o1, o2){
        return o1.key - o2.key;
    };

    tree.insert(new CustomObj(2, "github.com/HeechanYang"));
    tree.insert(new CustomObj(3, "github.com/structure-js/datastructure"));
    tree.insert(new CustomObj(1, "www.naver.com"));
    tree.insert(new CustomObj(4, "www.google.com"));
    tree.insert(new CustomObj(5, "www.daum.net"));
    tree.insert(new CustomObj(8, "www.11st.com"));
    tree.insert(new CustomObj(9, "www.wikipedia.com"));
    tree.insert(new CustomObj(10, "heechanyang.github.io"));
    tree.insert(new CustomObj(11, "www.firstmall.kr"));
    tree.insert(new CustomObj(20, "ko.wix.com"));
    tree.insert(new CustomObj(15, "www.sixshop.com/"));
    tree.insert(new CustomObj(17, "www.sabangnet.co.kr/"));
    tree.insert(new CustomObj(16, "www.compuzone.co.kr"));
    tree.insert(new CustomObj(12, "brunch.co.kr"));
    tree.insert(new CustomObj(13, "jaewook.net"));

    expect(tree.size).toBe(15);
    expect(tree.height).toBe(1);
    
    expect(tree.get(3).value).toBe("github.com/structure-js/datastructure");

    // tree._bfsVisualization();
});

test('DFS', function(){
    
});