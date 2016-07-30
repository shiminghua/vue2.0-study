/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _datastructure = __webpack_require__(1);

	var _datastructure2 = _interopRequireDefault(_datastructure);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_datastructure2.default);

	var movieList = new _datastructure2.default.List();

	for (var i = 0; i < 10; i++) {
	    movieList.append(i);
	}

	console.log(movieList.toString());

	function displayList(list) {
	    for (list.front(); list.currPos() < list.length() - 1; list.next()) {
	        console.log(list.currPos(), list.getElement());
	    }
	    list.next();
	    console.log(list.currPos(), list.getElement());
	}
	displayList(movieList);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _list = __webpack_require__(2);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/***
	 * 数据结构对象
	*/
	var DataStructure = Object.create(null);
	// 列表
	DataStructure.List = _list2.default;

	exports.default = DataStructure;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/***
	 * 列表
	*/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var List = function () {
	    function List() {
	        _classCallCheck(this, List);

	        this.pos = 0; // 列表的当前位置
	        this.listSize = 0; // 列表的元素个数
	        this.dataStore = []; // 初始化一个空数组来保存列表元素
	    }
	    /***
	     * 给列表添加元素
	    */


	    _createClass(List, [{
	        key: 'append',
	        value: function append(element) {
	            this.dataStore[this.listSize++] = element;
	        }
	        /***
	         * 查找元素位置
	        */

	    }, {
	        key: 'find',
	        value: function find(element) {
	            for (var i = 0, len = this.dataStore.length; i < len; i++) {
	                if (this.dataStore[i] === element) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	        /**
	         * 从列表中删除元素
	        */

	    }, {
	        key: 'remove',
	        value: function remove(element) {
	            var foundAt = this.find(element);
	            if (foundAt > -1) {
	                this.dataStore.splice(foundAt, 1);
	                this.listSize--;
	                return true;
	            }
	            return false;
	        }
	        /***
	         * 返回列表中元素的个数
	        */

	    }, {
	        key: 'length',
	        value: function length() {
	            return this.listSize;
	        }
	        /***
	         * 返回列表的字符串形式
	        */

	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.dataStore;
	        }
	        /***
	         * 向列表中插入一个元素
	        */

	    }, {
	        key: 'insert',
	        value: function insert(element, after) {
	            var insertPos = this.find(after);
	            if (insertPos > -1) {
	                this.dataStore.splice(insertPos + 1, 0, element);
	                this.listSize++;
	                return true;
	            }
	            return false;
	        }
	        /***
	         * 清空列表中所有元素
	        */

	    }, {
	        key: 'clear',
	        value: function clear() {
	            delete this.dataStore; // 删除数组
	            this.dataStore.length = 0; // 创建一个空数组
	            this.listSize = this.pos = 0; // 设置列表的当前位置和列表的元素个数为0
	        }
	        /***
	         * 判断给定的值是否在列表中
	        */

	    }, {
	        key: 'contains',
	        value: function contains(element) {
	            for (var i = 0, len = this.dataStore.length; i < len; i++) {
	                if (this.dataStore[i] === element) {
	                    return true;
	                }
	            }
	            return false;
	        }

	        /*********************  迭代器方法  **********************/
	        /***
	         * 将列表的当前位置移动到第一个元素
	        */

	    }, {
	        key: 'front',
	        value: function front() {
	            this.pos = 0;
	        }
	        /****
	         * 将列表的当前位置移动到最后一个元素
	        */

	    }, {
	        key: 'end',
	        value: function end() {
	            this.pos = this.listSize - 1;
	        }
	        /****
	         * 将当前位置后移一位
	        */

	    }, {
	        key: 'prev',
	        value: function prev() {
	            if (this.pos > 0) {
	                this.pos--;
	            }
	        }
	        /***
	         * 将当前位置前移一位
	        */

	    }, {
	        key: 'next',
	        value: function next() {
	            if (this.pos < this.listSize - 1) {
	                this.pos++;
	            }
	        }
	        /***
	         * 返回列表的当前位置
	        */

	    }, {
	        key: 'currPos',
	        value: function currPos() {
	            return this.pos;
	        }
	        /***
	         * 将当前位置移动到制定位置
	        */

	    }, {
	        key: 'moveTo',
	        value: function moveTo(position) {
	            this.pos = position;
	        }
	        /***
	         * 返回当前位置的元素
	        */

	    }, {
	        key: 'getElement',
	        value: function getElement() {
	            return this.dataStore[this.pos];
	        }
	    }]);

	    return List;
	}();

	exports.default = List;

/***/ }
/******/ ]);