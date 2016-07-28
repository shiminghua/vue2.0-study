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

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var vue = new _index2.default();
	console.log(_index2.default);
	console.log(vue);
	console.log(_index2.default.version, _index2.default.$isServer, _index2.default.initGlobalAPI);
	console.log(vue.version, vue.$isServer, vue.initGlobalAPI);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _index = __webpack_require__(5);

	var _index2 = __webpack_require__(10);

	var _index3 = _interopRequireDefault(_index2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _index.initGlobalAPI)(_index3.default);

	/*****************************************
	 * Object.defineProperty 将属性添加到对象，或修改现有属性的特性。添加/修改访问器属性。修改DOM元素上的属性
	*/
	Object.defineProperty(_index3.default.prototype, '$isServer', {
	    get: function get() {
	        return _config2.default._isServer;
	    }
	});

	_index3.default.version = '2.0.0-beta.3';

	exports.default = _index3.default;


	(function (global, factory) {
	    // console.log(global);
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Vue = factory();
	})(undefined, function () {
	    return _index3.default;
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(4);

	/*******************
	 * 配置
	*/
	var config = {
	  /**************
	   * Option merge strategies (used in core/util/options)
	   * 选择合并策略（用于核心/工具/选项）
	  */
	  optionMergeStrategies: Object.create(null),

	  /************
	   * Whether to suppress warnings.
	   * 是否抑制警告
	  */
	  silent: false,

	  /***********
	   * Whether to enable devtools
	   * 是否启用工具
	  */
	  devtools: process.env.NODE_ENV !== 'production',

	  /*********
	   * Error handler for watcher errors
	   * 错误观察函数
	  */
	  errorHandler: null,

	  /***********
	   * Ignore certain custom elements
	   * 忽略某些自定义元素
	  */
	  ignoredElements: null,

	  /*************
	   * Custom user key aliases for v-on
	   * 对于 v-on 自定义用户密钥的别名
	  */
	  keyCodes: Object.create(null),

	  /*********
	   * Check if a tag is reserved so that it cannot be registered as a component. 
	   * This is platform-dependent and may be overwritten.
	   * 检查标签是否保留，以便它不能注册为组件。这是平台相关的，可能被覆盖。
	  */
	  isReservedTag: _util.no,

	  /***********
	   * Check if a tag is an unknown element. Platform-dependent.
	   * 检查标签是否是未知元素。依赖平台。
	  */
	  isUnknownElement: _util.no,

	  /************
	   * Get the namespace of an element
	   * 获取元素的命名空间
	  */
	  getTagNamespace: _util.noop,

	  /**********
	   * Check if an attribute must be bound using property, e.g. value Platform-dependent.
	   * 检查一个属性是否必须使用属性绑定，例如依赖于平台的值。
	  */
	  mustUseProp: _util.no,

	  /**********
	   * List of asset types that a component can own.
	   * 组件可以拥有的资产类型的列表。
	   * component  组件
	   * directive  指令
	   * filter     过滤器
	  */
	  _assetTypes: ['component', 'directive', 'filter'],

	  /**********
	   * List of lifecycle hooks.
	   * 生命周期钩子列表。
	  */
	  _lifecycleHooks: ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'],

	  /************
	   * Max circular updates allowed in a scheduler flush cycle.
	   * 在调度刷新周期中允许的最大循环更新。
	  */
	  _maxUpdateCount: 100,

	  /**********
	   * Server rendering?
	   * 服务器渲染？
	  */
	  _isServer: 'client' === 'server'
	};

	exports.default = config;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout.call(null, timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout.call(null, drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**************
	 * Convert a value to a string that is actually rendered.
	 * 将一个值转化为字符串
	*/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports._toString = _toString;
	exports.toNumber = toNumber;
	exports.makeMap = makeMap;
	exports.remove = remove;
	exports.hasOwn = hasOwn;
	exports.isPrimitive = isPrimitive;
	exports.cached = cached;
	exports.bind = bind;
	exports.toArray = toArray;
	exports.extend = extend;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.toObject = toObject;
	exports.noop = noop;
	exports.genStaticKeys = genStaticKeys;
	function _toString(val) {
	    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
	}

	/***************
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 * 将一个输入值转换为一个持久性的数字。
	 * 如果转换失败，则返回原始字符串
	*/
	function toNumber(val) {
	    var n = parseFloat(val, 10);
	    return n || n === 0 ? n : val;
	}

	/************
	 * Make a map and return a function for checking if a key is in that map.
	 * 创建一个map结构，并返回一个函数，来检查某个键值是否存在于map结构中
	 * 创建一个 Map 数据结构
	*/
	function makeMap(str, expectsLowerCase) {
	    var map = Object.create(null);
	    var list = str.split(',');
	    for (var i = 0; i < list.length; i++) {
	        map[list[i]] = true;
	    }
	    return expectsLowerCase ? function (val) {
	        return map[val.toLowerCase()];
	    } : function (val) {
	        return map[val];
	    };
	}

	/*************
	 * Check if a tag is a built-in tag.
	 * 检查标签是否是内置的标签
	*/
	var isBuiltInTag = exports.isBuiltInTag = makeMap('slot,component', true);

	/************
	 * Remove an item from an array
	 * 从数组中删除一个项目
	*/
	function remove(arr, item) {
	    if (arr.length) {
	        var index = arr.indexOf(item);
	        if (index > -1) {
	            return arr.splice(index, 1);
	        }
	    }
	}

	/****************
	 * Check whether the object has the property.
	 * 检查对象是否具有属性
	*/
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
	    return hasOwnProperty.call(obj, key);
	}

	/***********
	 * Check if value is primitive
	 * 检查是否为原始值，是否为字符串或数字
	*/
	function isPrimitive(value) {
	    return typeof value === 'string' || typeof value === 'number';
	}

	/************
	 * Create a cached version of a pure function.
	 * 创建一个纯函数的缓存版本
	*/
	function cached(fn) {
	    var cache = Object.create(null);
	    return function (str) {
	        var hit = cache[str];
	        return hit || (cache[str] = fn(str));
	    };
	}

	/***********
	 * Camelize a hyphen-delmited string.
	 * 转换格式  aaa-bbb-ccc => aaaBbbCcc
	*/
	var camelizeRE = /-(\w)/g;
	/*
	var camelize = cached(function(str) {
	    return str.replace(camelizeRE, function(_, c) {
	        return c ? c.toUpperCase() : '';
	    });
	});
	*/
	var camelize = exports.camelize = cached(function (str) {
	    return str.replace(camelizeRE, function (_, c) {
	        return c ? c.toUpperCase() : '';
	    });
	});

	/*********
	 * Simple bind, faster than native
	 * 简单绑定，比本地更快
	*/
	function bind(fn, ctx) {
	    function boundFn(a) {
	        var l = arguments.length;
	        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	    }
	    // record original fn length
	    // 记录原始的 FN 长度
	    boundFn._length = fn.length;
	    return boundFn;
	}

	/************
	 * Convert an Array-like object to a real Array.
	 * 将一个数组像对象转换成一个真正的数组。
	*/
	function toArray(list, start) {
	    start = start || 0;
	    var i = list.length - start;
	    var ret = new Array(i);
	    while (i--) {
	        ret[i] = list[i + start];
	    }
	    return ret;
	}

	/*************
	 * Mix properties into target object.
	 * 混合属性到目标对象，合并对象
	*/
	function extend(to, _from) {
	    for (var _key in _from) {
	        to[_key] = _from[_key];
	    }
	    return to;
	}

	/***********
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 * 快速对象检查，当我们知道它是一个 JSON 兼容类型时。
	*/
	function isObject(obj) {
	    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}

	/**********
	 * Strict object type check. Only returns true for plain JavaScript objects.
	 * 严格对象检查，只有obj为原生对象时返回 true
	*/
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject(obj) {
	    return toString.call(obj) === OBJECT_STRING;
	}

	/**************
	 * Merge an Array of Objects into a single Object.
	 * 将一个对象数组合并成一个单一对象
	*/
	function toObject(arr) {
	    var res = arr[0] || {};
	    for (var i = 1, len = arr.length; i < len; i++) {
	        if (arr[i]) {
	            extend(res, arr[i]);
	        }
	    }
	    return res;
	}

	/*************
	 * Perform no operation.
	 * 不执行操作 - 空函数
	*/
	function noop() {}

	/************
	 * Always return false.
	 * 总是返回错误 - false
	*/
	var no = exports.no = function no() {
	    return false;
	};

	/***********
	 * Generate a static keys string from compiler modules.
	 * 从编译器模块生成一个静态密钥字符串
	*/
	function genStaticKeys(modules) {
	    return modules.reduce(function (keys, m) {
	        return keys.concat(m.staticKeys || []);
	    }, []).join(',');
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initGlobalAPI = initGlobalAPI;

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _index = __webpack_require__(6);

	var util = _interopRequireWildcard(_index);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 工具方法
	// import { initUse } from './use'; // use方法：通过 Vue.use() 全局方法使用插件：
	// import { initMixin } from './mixin'; // 混合
	// import { initExtend } from './extend'; // 扩展
	// import { initAssetRegister } from './assets'; // 资产
	// import { set, del } from '../observer/index'; // 观察者
	// import builtInComponents from '../components/index'; // 组件

	console.log(util); // 配置文件
	function initGlobalAPI(Vue) {
	    // config
	    var configDef = {};
	    configDef.get = function () {
	        return _config2.default;
	    };
	    if (process.env.NODE_ENV !== 'production') {
	        configDef.set = function () {
	            // 发出警告：不更换vue.config对象，设置个人配置代替。
	            util.warn('Do not replace the Vue.config object, set individual fields instead.');
	        };
	    }
	    // 为 Vue 添加属性和访问器
	    Object.defineProperty(Vue, 'config', configDef);
	    Vue.util = util;
	    Vue.set = set;
	    Vue.delete = del;
	    Vue.nextTick = util.nextTick;

	    Vue.options = Object.create(null);
	    _config2.default._assetTypes.forEach(function (type) {
	        Vue.options[type + 's'] = Object.create(null);
	    });

	    util.extend(Vue.options.components, builtInComponents);

	    initUse(Vue);
	    initMixin(Vue);
	    initExtend(Vue);
	    initAssetRegisters(Vue);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/************
	 * 常用方法
	*/

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(4);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _lang = __webpack_require__(7);

	Object.keys(_lang).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _lang[key];
	    }
	  });
	});

	var _env = __webpack_require__(8);

	Object.keys(_env).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _env[key];
	    }
	  });
	});

	var _options = __webpack_require__(9);

	Object.keys(_options).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _options[key];
	    }
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/***************
	 * Check if a string starts with $ or _
	 * 检查一个字符串是不是以 $ 或者 _ 开始，是否为保留字
	*/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.isReserved = isReserved;
	exports.def = def;
	exports.parsePath = parsePath;
	function isReserved(str) {
	    var c = (str + '').charCodeAt(0);
	    return c === 0x24 || c === 0x5f;
	}

	/**************
	 * Define a property.
	 * 定义一个属性 
	 * enumerable  -  枚举
	*/
	function def(obj, key, val, enumerable) {
	    // 将属性添加到对象，或修改现有属性的特性
	    Object.defineProperty(obj, key, {
	        value: val, // 属性的值
	        enumerable: !!enumerable, // 如果为true，此属性将显示在for-in枚举中
	        writable: true, // 如果为false，在尝试写入这一属性时会失败
	        configurable: true // 如果为false，尝试删除属性或者将修改value之外的任何属性时，都会失败
	    });
	}

	/************
	 * Parse simple path.
	 * 解析简单路径 bail 保释
	*/
	var bailRE = /[^\w\.\$]/;
	function parsePath(path) {
	    if (bailRE.test(path)) {
	        return;
	    } else {
	        var _ret = function () {
	            var segments = path.split('.');
	            return {
	                v: function v(obj) {
	                    for (var i = 0, len = segments.length; i < len; i++) {
	                        if (!obj) {
	                            return;
	                        }
	                        obj = obj[segments[i]];
	                    }
	                    return obj;
	                }
	            };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/* global MutationObserver 全局DOM变动观察者 */
	/************
	 * can we use __proto__?
	 * 我们可以用__proto__？
	*/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var hasProto = exports.hasProto = '__proto__' in {};

	/*************
	 * Browser environment sniffing
	 * 浏览器环境嗅探
	*/
	var inBrowser = exports.inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	/***********
	 * detect devtools
	 * 检测工具
	*/
	var devtools = exports.devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/**********
	 * UA sniffing for working around browser-specific quirks
	 * UA嗅探在特定浏览器的怪癖工作
	*/
	var UA = exports.UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var iosVersionMatch = UA && isIos && UA.match(/os ([\d_]+)/);
	var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

	/*************
	 * MutationObserver is unreliable in iOS 9.3 UIWebView detecting it by checking presence of IndexedDB ref #3027
	 * 
	*/
	var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;

	/*************
	 * Defer a task to execute it asynchronously. Ideally this should be executed as a microtask, 
	 * so we leverage MutationObserver if it's available, and fallback to  setTimeout(0).
	 * 推迟一个异步执行它的任务。理想情况下本应作为微任务执行的，所以我们利用MutationObserver是否可用，并回退到setTimeout（0）。
	 * 延时执行函数
	 * 
	 * @param {Function} cb
	 * @param {Object} ctx
	*/
	var nextTick = exports.nextTick = function () {
	    var callbacks = [];
	    var pending = false; // 等待
	    var timerFunc = void 0;
	    function nextTickHandler() {
	        pending = false;
	        var copies = callbacks.slice(0); // 副本
	        callbacks = [];
	        for (var i = 0, len = copies.length; i < len; i++) {
	            copies[i]();
	        }
	    }
	    // istanbul ignore else 忽略其他
	    if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
	        (function () {
	            var counter = 1;
	            var observer = new MutationObserver(nextTickHandler);
	            var textNode = document.createTextNode(String(counter));
	            observer.observe(textNode, {
	                characterData: true
	            });
	            timerFunc = function timerFunc() {
	                counter = (counter + 1) % 2;
	                textNode.data = String(counter);
	            };
	        })();
	    } else {
	        /**********
	         * webpack attempts to inject a shim for setImmediate if it is used as a global, 
	         * so we have to work around that to avoid bundling unnecessary code.
	         * 避免不必要的代码捆绑
	        */
	        var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	        timerFunc = context.setImmediate || setTimeout;
	    }
	    return function (cb, ctx) {
	        var func = ctx ? function () {
	            cb.call(ctx);
	        } : cb;
	        callbacks.push(func);
	        if (pending) {
	            return;
	        }
	        pending = true;
	        timerFunc(nextTickHandler, 0);
	    };
	}();

	/******
	 * Set 数据结构
	*/
	var _Set = void 0;
	/******
	 * istanbul ignore if
	 * 忽视
	*/
	if (typeof Set !== 'undefined' && /native code/.test(Set.toString())) {
	    // use native Set when available.  可用的本地 Set 数据结构
	    exports._Set = _Set = Set;
	} else {
	    /*****
	     * a non-standard Set polyfill that only works with primitive keys.
	     * 一个非标准的实现
	    */
	    exports._Set = _Set = function () {
	        function Set() {
	            _classCallCheck(this, Set);

	            this.set = Object.create(null);
	        }

	        _createClass(Set, [{
	            key: 'has',
	            value: function has(key) {
	                return this.set[key] !== 'undefined';
	            }
	        }, {
	            key: 'add',
	            value: function add(key) {
	                this.set[key] = 1;
	            }
	        }, {
	            key: 'clear',
	            value: function clear() {
	                this.set = Object.create(null);
	            }
	        }]);

	        return Set;
	    }();
	}

	exports._Set = _Set;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _index = __webpack_require__(10);

	var _index2 = _interopRequireDefault(_index);

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _debug = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./debug\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _index3 = __webpack_require__(14);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**********
	 * Option overwriting strategies are functions that handle how to 
	 * merge a parent option value and a child option value into the final value.
	 * 功能重写策略，合并父子option
	 * start 策略
	*/
	var strats = _config2.default.optionMergeStrategies; // 选择合并策略（用于核心/工具/选项）

	/***************
	 * Default strategy
	 * 默认策略
	*/
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	    return childVal === undefined ? parentVal : childVal;
	};

	/**********
	 * Options with restrictions
	 * 选择与限制
	*/
	if (process.env.NODE_ENV !== 'production') {
	    strats.el = strats.propsData = function (parent, child, vm, key) {
	        if (!vm) {
	            (0, _debug.warn)('option "' + key + '" can only be used during instance ' + 'creation with the `new` keyword.');
	        }
	        return defaultStrat(parent, child);
	    };

	    strats.name = function (parent, child, vm) {
	        if (vm) {
	            (0, _debug.warn)('options "name" can only be used as a component definition option, ' + 'not during instance creation.');
	        }
	        return defaultStrat(parent, child);
	    };
	}

	/****************
	 * Helper that recursively merges two data objects together.
	 * 递归将两个数据对象合并在一起。
	*/
	function mergeData(to, from) {
	    var key = void 0,
	        toVal = void 0,
	        fromVal = void 0;
	    for (key in from) {
	        toVal = to[key];
	        fromVal = from[key];
	        if (!(0, _util.hasOwn)(to, key)) {
	            (0, _index3.set)(to, key, fromVal);
	        } else if ((0, _util.isObject)(toVal) && (0, _util.isObject)(fromVal)) {
	            mergeData(toVal, fromVal);
	        }
	    }
	    return to;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _init = __webpack_require__(11);

	var _state = __webpack_require__(13);

	var _render = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./render\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _events = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./events\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _lifecycle = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lifecycle\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function Vue(options) {
	    this._init(options);
	}

	(0, _init.initMixin)(Vue); // 初始化
	(0, _state.stateMixin)(Vue); // 状态
	(0, _events.eventsMixin)(Vue); // 事件
	(0, _lifecycle.lifecycleMixin)(Vue); // 生命周期
	(0, _render.renderMixin)(Vue); // 渲染

	exports.default = Vue;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initMixin = initMixin;

	var _proxy = __webpack_require__(12);

	var _state = __webpack_require__(13);

	var _render = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./render\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _events = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./events\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _lifecycle = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lifecycle\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _index = __webpack_require__(6);

	var uid = 0;
	function initMixin(Vue) {
	    Vue.prototype._init = function (options) {
	        var vm = this;
	        // a uid
	        vm._uid = uid++;
	        /****
	         * a flag to avoid this being observed
	         * 一个标记，以避免被观察到
	        */
	        vm._isVue = true;
	        /**
	         * merge options
	         * 合并选项
	        */
	        if (options && options._isComponent) {
	            /**
	             * optimize internal component instantiation since dynamic options merging is pretty slow, 
	             * and none of the internal component options needs special treatment.
	             * 优化内部组件实例化动态选择合并是非常缓慢的，和内部组件的选择都需要特殊处理。
	            */
	            initInternalComponent(vm, options);
	        } else {
	            /**
	             * vm.$options
	             * 当前实例的初始化选项。在选项中包含自定义属性时有用处：
	            */
	            vm.$options = (0, _index.mergeOptions)(resolveConstructorOptions(vm), options || {}, vm);
	        }
	        /***
	         * istanbul ignore else
	         * 忽略其他
	        */
	        if (process.env.NODE_ENV !== 'production') {
	            (0, _proxy.initProxy)(vm);
	        } else {
	            vm._renderProxy = vm;
	        }
	        /****
	         * expose real self
	         * 暴漏真实的自我
	        */
	        vm._self = vm;
	        (0, _lifecycle.initLifecycle)(vm);
	        (0, _events.initEvents)(vm);
	        (0, _lifecycle.callHook)(vm, 'beforeCreate');
	        (0, _state.initState)(vm);
	        (0, _lifecycle.callHook)(vm, 'created');
	        (0, _render.initRender)(vm);
	    };

	    /***
	     * 初始化内部组件
	     * initInternalComponent
	    */
	    function initInternalComponent(vm, options) {
	        /**
	         * vm.$options
	         * 当前实例的初始化选项。在选项中包含自定义属性时有用处：
	        */
	        var opts = vm.$options = Object.create(resolveConstructorOptions(vm));
	        /**
	         * doing this because it's faster than dynamic enumeration.
	         * 这样做，因为它的速度比动态枚举快。
	        */
	        opts.parent = options.parent; // 父元素
	        opts.propsData = options.propsData; // 属性
	        opts._parentVnode = options._parentVnode; // 父虚拟元素
	        opts._parentListeners = options._parentListeners; // 父元素监听事件
	        opts._renderChildren = options._renderChildren; // 渲染子元素
	        opts._componentTag = options._componentTag; // 组件target
	        if (options.render) {
	            opts.render = options.render;
	            opts.staticRenderFns = options.staticRenderFns;
	        }
	    }

	    /***
	     * 解决构造函数选项
	     * resolveConstructorOptions
	    */
	    function resolveConstructorOptions(vm) {
	        var Ctor = vm.constructor;
	        var options = Ctor.options;
	        if (Ctor.super) {
	            var superOptions = Ctor.super.options;
	            var cachedSuperOptions = Ctor.superOptions;
	            if (superOptions !== cachedSuperOptions) {
	                // super option changed
	                Ctor.superOptions = superOptions;
	                options = Ctor.options = (0, _index.mergeOptions)(superOptions, Ctor.extendOptions);
	                if (options.name) {
	                    options.components[options.name] = Ctor;
	                }
	            }
	        }
	        return options;
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initProxy = undefined;

	var _index = __webpack_require__(6);

	var hasProxy = void 0,
	    proxyHandlers = void 0,
	    initProxy = void 0; /* not type checking this file because flow doesn't play well with Proxy */

	if (process.env.NODE_ENV !== 'production') {
	    (function () {
	        var allowedGlobals = (0, _index.makeMap)('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require,__webpack_require__' // for Webpack/Browserify
	        );

	        hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

	        proxyHandlers = {
	            has: function has(target, key) {
	                var has = key in target;
	                var isAllowedGlobal = allowedGlobals(key);
	                if (!has && !isAllowedGlobal) {
	                    (0, _index.warn)('Trying to access non-existent property "' + key + '" while rendering. ' + 'Make sure to declare reactive data properties in the data option.', target);
	                }
	                return !isAllowedGlobal;
	            }
	        };

	        exports.initProxy = initProxy = function initProxy(vm) {
	            if (hasProxy) {
	                vm._renderProxy = new Proxy(vm, proxyHandlers);
	            } else {
	                vm._renderProxy = vm;
	            }
	        };
	    })();
	}

	exports.initProxy = initProxy;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initState = initState;

	var _watcher = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../observer/watcher\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _watcher2 = _interopRequireDefault(_watcher);

	var _dep = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../observer/dep\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _dep2 = _interopRequireDefault(_dep);

	var _index = __webpack_require__(14);

	var _index2 = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function initState(vm) {
	  vm._watchers = [];
	  initProps(vm); // 属性
	  initData(vm); // 数据
	  initComputed(vm); // 计算属性
	  initMethods(vm); // 方法
	  initWatch(vm); // 监听
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.set = set;

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _index = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*****************
	 * Set a property on an object. 
	 * Adds the new property and triggers change notification if the property doesn't already exist.
	 * 在对象上设置属性。添加新的属性，并触发更改通知，如果属性不存在。
	*/
	function set(obj, key, val) {
	    if (Array.isArray(obj)) {
	        obj.splice(key, 1, val);
	        return val;
	    }
	    if ((0, _index.hasOwn)(obj, key)) {
	        obj[key] = val;
	        return;
	    }
	    var ob = obj.__ob__;
	    if (obj._isVue || ob && ob.vmCount) {
	        // warn: 避免增加反应特性到Vue实例及其根$运行数据，在数据选项-申报前期。
	        process.env.NODE_ENV !== 'production' && (0, _index.warn)('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - delcare it upfront in the data option.');
	        return;
	    }
	    if (!ob) {
	        obj[key] = val;
	        return;
	    }
	    defineReactive(ob.value, key, val);
	    ob.dep.notify();
	    return val;
	}
	// import Dep from './dep';
	// import { arrayMethods } from './array';
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }
/******/ ]);