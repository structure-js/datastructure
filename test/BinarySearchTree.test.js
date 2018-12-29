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

    // tree._dfsVisualization();

    //after insert
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

    tree.delete(13);
    tree.delete(9);
    tree.delete(1);
    tree.delete(10);

    tree.insert(13);

    //after delete
    let bfsExpectList2 = [11,4,17,3,8,15,20,2,5,13,16,12];
    cnt=0;
    for(let node of tree.bfsIterator()){
        expect(node.value).toBe(bfsExpectList2[cnt]);
        cnt++;
    }

    expect(tree.root.value).toBe(11);
    expect(tree.getMax()).toBe(20);
    expect(tree.getMin()).toBe(2);
    // 11b	4b	3b	2r
	// 	        8b	5r
	// 17b	15r	13b	12r
	// 		    16b
    // 	    20b
});

test('Insert custom object and compare', function(){
    let CustomObj = function(key, value){
        this.key = key;
        this.value = value;
    }

    let tree = new BinarySearchTree();

    tree._compare = function(o1, o2){
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
    
    expect(tree.root.value.value).toBe("heechanyang.github.io");
    expect(tree.getMax().key).toBe(20);
    expect(tree.getMax().value).toBe("ko.wix.com");
    expect(tree.getMin().key).toBe(1);
    expect(tree.getMin().value).toBe("www.naver.com");
});