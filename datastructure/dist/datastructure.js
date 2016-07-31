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

	/****
	 * 列表测试
	*/
	var movieList = new _datastructure2.default.List();

	for (var i = 0; i < 10; i++) {
	    movieList.append(i);
	}

	function displayList(list) {
	    for (list.front(); list.currPos() < list.length() - 1; list.next()) {
	        console.log(list.currPos(), list.getElement());
	    }
	    list.next();
	    console.log(list.currPos(), list.getElement());
	}
	// displayList(movieList);

	/***
	 * 栈测试
	*/
	function mulBase(num, base) {
	    var stack = new _datastructure2.default.Stack();
	    do {
	        stack.push(num % base);
	        num = Math.floor(num / base);
	    } while (num > 0);

	    var converted = '';
	    while (stack.length() > 0) {
	        converted += stack.pop();
	    }
	    return converted;
	}

	var newNum = mulBase(10, 2);
	console.log(newNum);

	/*****
	 * 队列测试 - 技术排序
	*/
	function distribute(nums, queues, n, digit) {
	    for (var _i = 0; _i < n; _i++) {
	        if (digit === 1) {
	            queues[nums[_i] % 10].enqueue(nums[_i]);
	        } else {
	            queues[Math.floor(nums[_i] / 10)].enqueue(nums[_i]);
	        }
	    }
	}
	function collect(queues, nums) {
	    var i = 0;
	    for (var digit = 0; digit < 10; digit++) {
	        while (!queues[digit].empty()) {
	            nums[i++] = queues[digit].dequeue();
	        }
	    }
	}
	function dispArray(arr) {
	    // for (let i = 0; i < arr.length; i++) {
	    //     console.log(arr[i] + ' ');
	    // }
	    console.log(arr.join());
	}

	var queues = [];
	for (var _i2 = 0; _i2 < 10; _i2++) {
	    queues[_i2] = new _datastructure2.default.Queue();
	}
	var nums = [];
	for (var _i3 = 0; _i3 < 10; _i3++) {
	    nums[_i3] = Math.floor(Math.random() * 101);
	}

	console.log('Before redix sort:');
	dispArray(nums);
	distribute(nums, queues, 10, 1);
	collect(queues, nums);
	dispArray(nums);
	distribute(nums, queues, 10, 10);
	collect(queues, nums);
	dispArray(nums);

	var arr = new Array();
	arr['aaa'] = 'bbb';
	arr['ccc'] = 'ddd';
	console.log(Array.prototype.slice.call(Object.keys(arr)));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _list = __webpack_require__(2);

	var _list2 = _interopRequireDefault(_list);

	var _stack = __webpack_require__(3);

	var _stack2 = _interopRequireDefault(_stack);

	var _queue = __webpack_require__(4);

	var _queue2 = _interopRequireDefault(_queue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/***
	 * 数据结构对象
	*/
	var DataStructure = Object.create(null);
	// 列表
	DataStructure.List = _list2.default;
	// 栈
	DataStructure.Stack = _stack2.default;
	// 队列
	DataStructure.Queue = _queue2.default;

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/************
	 * 栈
	*/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stack = function () {
	    function Stack() {
	        _classCallCheck(this, Stack);

	        // 保存栈内元素的数组
	        this.dataStore = [];
	        // 栈顶位置
	        this.top = 0;
	    }

	    _createClass(Stack, [{
	        key: 'push',


	        /***
	         * 入栈
	        */
	        value: function push(element) {
	            this.dataStore[this.top++] = element;
	        }
	        /***
	         * 察看栈顶元素，不会删除栈顶元素
	        */

	    }, {
	        key: 'peek',
	        value: function peek() {
	            return this.dataStore[this.top - 1];
	        }
	        /****
	         * 出栈
	        */

	    }, {
	        key: 'pop',
	        value: function pop() {
	            return this.dataStore[--this.top];
	        }
	        /***
	         * 清空栈数据
	        */

	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.top = 0;
	        }
	        /****
	         * 返回栈内的元素个数
	        */

	    }, {
	        key: 'length',
	        value: function length() {
	            return this.top;
	        }
	    }]);

	    return Stack;
	}();

	exports.default = Stack;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/****
	 * 队列
	*/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Queue = function () {
	    function Queue() {
	        _classCallCheck(this, Queue);

	        // 保存队列元素的数组
	        this.dataStore = [];
	    }
	    /****
	     * 向队尾添加元素
	    */


	    _createClass(Queue, [{
	        key: 'enqueue',
	        value: function enqueue(element) {
	            this.dataStore.push(element);
	        }
	        /****
	         * 删除队首的元素
	        */

	    }, {
	        key: 'dequeue',
	        value: function dequeue() {
	            return this.dataStore.shift();
	        }
	        /****
	         * 读取队首的元素
	        */

	    }, {
	        key: 'front',
	        value: function front() {
	            return this.dataStore[0];
	        }
	        /****
	         * 读取队尾的元素
	        */

	    }, {
	        key: 'back',
	        value: function back() {
	            return this.dataStore[this.dataStore.length - 1];
	        }
	        /****
	         * 显示队列内的所有元素
	        */

	    }, {
	        key: 'toString',
	        value: function toString() {
	            var retStr = '';
	            for (var i = 0, len = this.dataStore.length; i < len; i++) {
	                retStr += this.dataStore[i] + '\r\n';
	            }
	            return retStr;
	        }
	        /****
	         * 判断队列是否为空
	        */

	    }, {
	        key: 'empty',
	        value: function empty() {
	            return this.dataStore.length === 0;
	        }
	    }]);

	    return Queue;
	}();

	exports.default = Queue;

/***/ }
/******/ ]);