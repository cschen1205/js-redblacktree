var expect    = require("chai").expect;
var jsrbtree = require("../src/jsrbtree");

describe("Red Black Tree", function() {
  describe("without customized comparer", function() {
      
    
    
    it("should store two values at this point", function() {
        var bst = new jsrbtree.RedBlackTree();
      
    bst.put(2, 2.4);
    bst.put(4, 3.2);
    bst.put(5, 3.4);
    bst.put(6, 3.4);
        expect(bst.size()).to.equal(4);
        expect(bst.get(2)).to.equal(2.4);
        expect(bst.get(4)).to.equal(3.2);
        expect(bst.isEmpty()).to.equal(false);
        expect(bst.containsKey(2)).to.equal(true);
        expect(bst.containsKey(4)).to.equal(true);
        expect(bst.get(3)).to.equal(undefined);
        expect(bst.get(6)).to.equal(3.4);
    });
      
    
    it("should overwrite old value when put using same key", function(){
        var bst = new jsrbtree.RedBlackTree();
      
        bst.put(2, 2.4);
        bst.put(4, 3.2);
        bst.put(5, 3.4);
        bst.put(6, 3.4);
        bst.put(6, 5.4);
        expect(bst.size()).to.equal(4);
        expect(bst.containsKey(6));
        expect(bst.get(6)).to.equal(5.4);
        
        var keys = bst.keySet();
        for(var i = 1; i < keys.length; ++i) {
            expect(keys[i-1]).to.below(keys[i]);
        }
    });
      
    it("should delete correctly", function () {
        var bst = new jsrbtree.RedBlackTree();
        
        for(var i = 0; i < 100; i+=2) {
            bst.put(i, i);
        }
        for(var i = 1; i < 100; i+=2) {
            bst.put(i, i);
        }
        
        var count = 100;
        expect(bst.size()).to.equal(count);
        for(var i = 0; i < 100; i += 5) {
            bst.delete(i);
            count--;
            expect(bst.size()).to.equal(count);
        }
    });
    

  });
         
});