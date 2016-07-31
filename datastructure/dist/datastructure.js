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
	    // list.next();
	    // console.log(list.currPos(), list.getElement());
	}
	// displayList(movieList);

	// movieList.clear();
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

	/*************
	 * 字典测试
	*/
	var dictionary = new _datastructure2.default.Dictionary();
	dictionary.add('aa', 11);
	dictionary.add('bb', 22);
	dictionary.clear();
	console.log(dictionary.showAll());

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

	var _linkedlist = __webpack_require__(5);

	var _dictionary = __webpack_require__(6);

	var _dictionary2 = _interopRequireDefault(_dictionary);

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
	// 链表
	DataStructure.LinkedList = _linkedlist.LinkedList;
	// 双向链表
	DataStructure.TwowayLinkedList = _linkedlist.TwowayLinkedList;
	// 循环链表
	DataStructure.CircularLinkedList = _linkedlist.CircularLinkedList;
	// 字典
	DataStructure.Dictionary = _dictionary2.default;

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
	            this.dataStore = []; // 创建一个空数组
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/***************** 链表 **************/

	/**********************
	 * 单项链表 
	 * 头节点为 head {element: 'head', next: null}
	*/
	// 节点类

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = function Node(element) {
	    _classCallCheck(this, Node);

	    this.element = element;
	    this.next = null;
	};
	// 链表类


	var LinkedList = function () {
	    function LinkedList() {
	        _classCallCheck(this, LinkedList);

	        // 链表的头节点
	        this.head = new Node('head');
	        // 链表的当前节点
	        this.currNode = this.head;
	    }
	    /***
	     * 查找节点
	    */


	    _createClass(LinkedList, [{
	        key: 'find',
	        value: function find(item) {
	            // 当前节点设为 head 节点
	            var currNode = this.head;
	            while (currNode !== null && currNode.element !== item) {
	                currNode = currNode.next;
	            }
	            return currNode;
	        }
	        /****
	         * 插入新节点
	        */

	    }, {
	        key: 'insert',
	        value: function insert(newElement, item) {
	            // 定义新节点
	            var newNode = new Node(newElement);
	            // item的节点位置
	            var currNode = this.find(item);
	            // 新节点的 next 设置为item节点的 next
	            newNode.next = currNode.next;
	            // item节点的 next 设置为 newNode
	            currNode.next = newNode;
	        }
	        /****
	         * 查找前一个节点
	        */

	    }, {
	        key: 'findPrevious',
	        value: function findPrevious(item) {
	            var currNode = this.head;
	            while (currNode.next !== null && currNode.next.element !== item) {
	                currNode = currNode.next;
	            }
	            return currNode;
	        }
	        /*****
	         * 删除节点
	        */

	    }, {
	        key: 'remove',
	        value: function remove(item) {
	            var prevNode = this.findPrevious(item);
	            if (prevNode.next !== null) {
	                prevNode.next = prevNode.next.next;
	            }
	        }
	        /****
	         * 显示链表中的元素
	        */

	    }, {
	        key: 'display',
	        value: function display() {
	            var currNode = this.head;
	            var retArr = [];
	            while (currNode.next !== null) {
	                currNode = currNode.next;
	                retArr.push(currNode.element);
	            }
	            return retArr;
	        }
	        /****
	         * 在链表中向前移动N个元素
	        */

	    }, {
	        key: 'advance',
	        value: function advance(n) {
	            while (n > 0) {
	                n--;
	                if (this.currNode.next !== null) {
	                    this.currNode = this.currNode.next;
	                } else {
	                    throw new Error('超出链表范围');
	                }
	            }
	        }
	        /****
	         * 只显示当前节点
	        */

	    }, {
	        key: 'show',
	        value: function show() {
	            return this.currNode.element;
	        }
	    }]);

	    return LinkedList;
	}();

	;

	/********
	 * 双向链表
	*/
	// 节点类

	var TwowayNode = function (_Node) {
	    _inherits(TwowayNode, _Node);

	    function TwowayNode(element) {
	        _classCallCheck(this, TwowayNode);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TwowayNode).call(this, element));

	        _this.previous = null;
	        return _this;
	    }

	    return TwowayNode;
	}(Node);
	// 链表类


	var TwowayLinkedList = function (_LinkedList) {
	    _inherits(TwowayLinkedList, _LinkedList);

	    function TwowayLinkedList() {
	        _classCallCheck(this, TwowayLinkedList);

	        // 链表的头节点
	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TwowayLinkedList).call(this));

	        _this2.head = new TwowayNode('head');
	        // 链表的当前节点
	        _this2.currNode = _this2.head;
	        return _this2;
	    }
	    /****
	     * 插入节点
	    */


	    _createClass(TwowayLinkedList, [{
	        key: 'insert',
	        value: function insert(newElement, item) {
	            var newNode = new TwowayNode(element);
	            var current = this.find(item);
	            newNode.next = current.next;
	            newNode.previous = current;
	            current.next.previous = newNode;
	            current.next = newNode;
	        }
	        /****
	         * 删除节点
	        */

	    }, {
	        key: 'remove',
	        value: function remove(item) {
	            var currNode = this.find(item);
	            if (currNode.next !== null) {
	                currNode.previous.next = currNode.next;
	                currNode.next.previous = currNode.previous;
	                currNode.next = null;
	                currNode.previous = null;
	                // currNode = null;
	            }
	        }
	        /****
	         * 查找最后一个节点
	        */

	    }, {
	        key: 'findLast',
	        value: function findLast() {
	            var currNode = this.head;
	            while (currNode.next !== null) {
	                currNode = currNode.next;
	            }
	            return currNode;
	        }
	        /****
	         * 反向显示链表中的元素
	        */

	    }, {
	        key: 'displayReverse',
	        value: function displayReverse() {
	            // let currNode = this.head;
	            var currNode = this.findLast();
	            var retArr = [];
	            while (currNode.previous !== null) {
	                currNode = currNode.previous;
	                retArr.push(currNode);
	            }
	            return retArr;
	        }
	        /****
	         * 在链表中向后移动N个元素
	        */

	    }, {
	        key: 'back',
	        value: function back(n) {
	            while (n > 0) {
	                if (this.currNode.previous !== null) {
	                    this.currNode = this.currNode.previous;
	                } else {
	                    throw new Error('超出链表范围');
	                }
	            }
	        }
	    }]);

	    return TwowayLinkedList;
	}(LinkedList);

	/********************************
	 * 循环链表
	*/


	var CircularLinkedList = function (_LinkedList2) {
	    _inherits(CircularLinkedList, _LinkedList2);

	    function CircularLinkedList() {
	        _classCallCheck(this, CircularLinkedList);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(CircularLinkedList).call(this));

	        _this3.head.next = _this3.head;
	        return _this3;
	    }
	    /*****
	     * 显示链表中的元素
	    */


	    _createClass(CircularLinkedList, [{
	        key: 'display',
	        value: function display() {
	            var currNode = this.head;
	            var retArr = [];
	            while (currNode.next !== null && currNode.next.element !== 'head') {
	                currNode = currNode.next;
	                retArr.push(currNode);
	            }
	            return retArr;
	        }
	    }]);

	    return CircularLinkedList;
	}(LinkedList);

	exports.LinkedList = LinkedList;
	exports.TwowayLinkedList = TwowayLinkedList;
	exports.CircularLinkedList = CircularLinkedList;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/*************
	 * 字典
	*/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dictionary = function () {
	    function Dictionary() {
	        _classCallCheck(this, Dictionary);

	        // 使用数组实现字典
	        this.dataStore = [];
	    }
	    /****
	     * 添加元素
	    */


	    _createClass(Dictionary, [{
	        key: 'add',
	        value: function add(key, value) {
	            this.dataStore[key] = value;
	        }
	        /****
	         * 查找元素
	        */

	    }, {
	        key: 'find',
	        value: function find(key) {
	            return this.dataStore[key];
	        }
	        /****
	         * 删除
	        */

	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            delete this.dataStore[key];
	        }
	        /****
	         * 显示所有键值对
	        */

	    }, {
	        key: 'showAll',
	        value: function showAll() {
	            var retArr = [];
	            var dataStore = this.dataStore;
	            Object.keys(dataStore).forEach(function (key) {
	                retArr.push(key + ' -> ' + dataStore[key]);
	            });
	            // for (let key in Object.keys(this.dataStore)) {
	            //     retArr.push(key + ' -> ' + this.dataStore[key]);
	            // }
	            return retArr;
	        }
	        /****
	         * 字典中的元素个数
	        */

	    }, {
	        key: 'count',
	        value: function count() {
	            return Object.keys(this.dataStore).length;
	        }
	        /****
	         * 清空字典
	        */

	    }, {
	        key: 'clear',
	        value: function clear() {
	            delete this.dataStore;
	            this.dataStore = [];
	        }
	    }]);

	    return Dictionary;
	}();

	exports.default = Dictionary;

/***/ }
/******/ ]);