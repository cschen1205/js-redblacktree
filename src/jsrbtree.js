var jsrbtree = jsrbtree || {};

(function (jss) {
    'use strict';
	
    jss.less = function (a1, a2, compare) {
        return compare(a1, a2) < 0; 
    };
    
    
})(jsrbtree);

if(module) {
	module.exports = jsrbtree;
}