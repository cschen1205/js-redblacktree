var expect    = require("chai").expect;
var jsrbtree = require("../src/jsrbtree");

describe("Red Black Tree", function() {
  describe("without customized comparer", function() {
      
    var bst = new jsrbtree.RedBlackTree();
      
    bst.put(2, 2.4);
    bst.put(4, 3.2);
    it("should store two values at this point", function() {
        expect(bst.size()).to.equal(2);
        expect(bst.get(2)).to.equal(2.4);
        expect(bst.get(4)).to.equal(3.2);
        expect(bst.isEmpty()).to.equal(false);
        expect(bst.containsKey(2)).to.equal(true);
        expect(bst.containsKey(4)).to.equal(true);
        expect(bst.get(3)).to.equal(undefined);
    });
  });
         
});