var jsrbtree = jsrbtree || {};

(function (jss) {
    'use strict';
	
    var Node = function (key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.count = 1;
        this.red = true;
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
        
        if(this._isRed(x.right) && !this._isRed(x.left)) x = this._rotateLeft(x);
        if(this._isRed(x.left) && this._isRed(x.left.left)) x = this._rotateRight(x);
        if(this._isRed(x.left) && this._isRed(x.right)) this._flipColor(x);
        
        
        x.count = 1 + this._count(x.left) + this._count(x.right);
        
        return x;
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
        return this._count(this.root) == 0;
    };
    
    RedBlackTree.prototype.size = function() {
        return this._count(this.root);  
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
                x = x.right;
            }
            else if (x.right == null) {
                x = x.left;
            }
            else {
                var t = x;
                x = this._min(t.right);
                x.right = this._delMin(t.right);
                x.left = t.left;
            }
        }
        
        if(x != null) {
            
            if(this._isRed(x.right) && !this._isRed(x.left)) x = this._rotateLeft(x);
            if(this._isRed(x.left) && this._isRed(x.left.left)) x = this._rotateRight(x);
            if(this._isRed(x.left) && this._isRed(x.right)) this._flipColor(x);
            
            x.count = 1 + this._count(x.left) + this._count(x.right);
        }
        
        return x;
    };
    
    RedBlackTree.prototype._isRed = function (x) {
        return x == null ? false : x.red;
    };
    
    RedBlackTree.prototype._flipColor = function(x) {
        x.left.red = false;
        x.right.red = false;
        x.red = true;
    };
    
    RedBlackTree.prototype._rotateLeft = function (x) {
        var oldX = x;
        var m = x.right;
        oldX.right = m.left;
        m.left = oldX;
        m.red = oldX.red;
        oldX.red = true;
        
        oldX.count = 1 + this._count(oldX.left) + this._count(oldX.right);
        
        return m;
    };
    
    RedBlackTree.prototype._rotateRight = function (x) {
        var oldX = x;
        var m = oldX.left;
        oldX.left = m.right;
        m.right = oldX;
        m.red = oldX.red;
        oldX.red = true;
        
        oldX.count = 1 + this._count(oldX.left) + this._count(oldX.right);
        
        return m;
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
    
    RedBlackTree.prototype._max = function (x) {
        if (x == null) {
            return null;
        }  
        if (x.right == null) {
            return x;
        }
        return this._max(x.right);
    };
    
    RedBlackTree.prototype.minKey = function (x) {
        var x = this._min(this.root);
        if (x != null) {
            return x.key;
        }
        return undefined;
    };
    
    RedBlackTree.prototype.maxKey = function(x) {
        var x = this._max(this.root);
        if (x != null) {
            return x.key;
        }
        return undefined;
    };
    
    RedBlackTree.prototype._delMin = function (x) {
        if (x == null) {
            return null;
        }  
        
        if (x.left == null) {
            return x.right;
        }
        
        x.left = this._delMin(x.left);
        x.count = 1 + this._count(x.left) + this._count(x.right);
        return x;
    };
    
    RedBlackTree.prototype.keySet = function() {
        var keys = [];
        
        this._collect(this.root, keys);
        return keys;
    };
    
    RedBlackTree.prototype._collect = function(x, queue) {
        if (x == null) {
            return;
        }  
        
        this._collect(x.left, queue);
        queue.push(x.key);
        this._collect(x.right, queue);
    };
    
    jss.RedBlackTree = RedBlackTree;
    
})(jsrbtree);

var module = module || {};
if(module) {
	module.exports = jsrbtree;
}