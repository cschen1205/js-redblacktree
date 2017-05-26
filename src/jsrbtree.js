var jsrbtree = jsrbtree || {};

(function (jss) {
    'use strict';
	
    jss.less = function (a1, a2, compare) {
        return compare(a1, a2) < 0; 
    };
    
    var Node = function (key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.count = 1;
    };
    
    jss.Node = Node;
    
    var RedBlackTree = function (compare) {
        this.root = null;
        this.N = 0;
        if (!compare) {
            compare = function(a1, a2) {
                return a1 - a2;  
            };
        }
        this.compare = compare;
    };
    
    RedBlackTree.prototype.put = function(key, value) {
        this.root = this._put(this.root, key, value);  
    };
    
    RedBlackTree.prototype._put = function(x, key, value) {
        if (x == null) {
            return new jss.Node(key, value);
        }  
        var cmp = this.compare(key, x.key);
        if(cmp < 0) {
            x.left = this._put(x.left, key, value);
        } else if(cmp > 0) {
            x.right = this._put(x.right, key, value);
        } else {
            x.value = value;
        }
        
        x.count = 1 + this._count(x.left) + this._count(x.right);
    };
    
    RedBlackTree.prototype._count = function (x) {
        return x == null ? 0 : x.count;
    };
    
    RedBlackTree.prototype.get = function (key) {
        var x = this._get(this.root, key);
        if (x != null) {
            return x.value;
        }
        return undefined;
    };
    
    RedBlackTree.prototype._get = function (x, key) {
        if (x == null) {
            return null;
        }
        var cmp = this.compare(key, x.key);
        if (cmp < 0) {
            return this._get(x.left, key);
        }
        if (cmp > 0) {
            return this._get(x.right, key);
        }
        return x;
    };
    
    RedBlackTree.prototype.containsKey = function (key) {
        var x = this._get(this.root, key);
        return x != null;
    };
    
    RedBlackTree.prototype.isEmpty = function () {
        return this._count(this.root) > 0;
    };
    
    RedBlackTree.prototype.size = function() {
        this._count(this.root);  
    };
    
    RedBlackTree.prototype.delete = function(key) {
        this.root = this._delete(this.root, key);
    };
    
    RedBlackTree.prototype._delete = function(x, key) {
        if (x == null) {
            return null;
        }  
        
        var cmp = this.compare(key, x.key);
        if (cmp < 0) {
            x.left = this._delete(x.left, key);
        } else if (cmp > 0) {
            x.right = this._delete(x.right, key); 
        } else {
            if (x.left == null) {
                return x.right;
            }
            if (x.right == null) {
                return x.left;
            }
            
            var m = this._min(x.right);
            
            m.left = x.left;
            m.right = this._delMin(x.right);
            
            return m;
        }
        
        return x;
    };
    
    RedBlackTree.prototype._min = function (x) {
        if (x == null) {
            return null;
        }  
        if (x.left == null) {
            return x;
        }
        return this._min(x.left);
    };
    
    RedBlackTree.prototype._delMin = function (x) {
        if (x == null) {
            return null;
        }  
        
        if (x.left = null) {
            return x.right;
        }
        
        x.left = this._delMin(x.left);
        
        return x;
    };
    
    jss.RedBlackTree = RedBlackTree;
    
})(jsrbtree);

if(module) {
	module.exports = jsrbtree;
}