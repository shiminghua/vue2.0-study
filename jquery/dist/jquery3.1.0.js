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
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * 全局标记
	 */
	var arr = [],
	    document = window.document,
	    getProto = Object.getPrototypeOf,
	    // 获取原型对象

	_slice = arr.slice,
	    concat = arr.concat,
	    push = arr.push,
	    indexOf = arr.indexOf,
	    class2type = {},
	    toString = class2type.toString,
	    hasOwn = class2type.hasOwnProperty,
	    fnToString = hasOwn.toString,
	    ObjectFunctionString = fnToString.call(Object),
	    support = {},
	    DOMEval = function () {
	  function DOMEval(code, doc) {
	    doc = doc || document;
	    var script = doc.createElement('script');

	    script.text = code;
	    doc.head.appendChild(script).parentNode.removeChild(script);
	  }
	  return DOMEval;
	}();

	var version = '3.1.0',
	    jQuery = function jQuery(selector, context) {
	  return jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
	  return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {
	  //  The current version of jQuery being used
	  jquery: version,

	  constructor: jQuery,

	  // The default length of a jQuery object is 0
	  length: 0,

	  toArray: function toArray() {
	    return _slice.call(this);
	  },

	  // Get the Nth element in the matched element set OR
	  // Get the whole matched element set as a clean array
	  get: function get(num) {

	    // Return all the elements in a clean array
	    if (num == null) {
	      return _slice.call(this);
	    }

	    // Return just the one element from the set
	    return num < 0 ? this[num + this.length] : this[num];
	  },

	  // Take an array of elements and push it onto the stack
	  // (returning the new matched element set)
	  pushStack: function pushStack(elems) {

	    // Build a new jQuery matched element set
	    var ret = jQuery.merge(this.constructor(), elems);

	    // Add the old object onto the stack (as a reference)
	    ret.prevObject = this;

	    // Return the newly-formed element set
	    return ret;
	  },

	  // Execute a callback for every element in the matched set.
	  each: function each(callback) {
	    return jQuery.each(this, callback);
	  },

	  map: function map(callback) {
	    return this.pushStack(jQuery.map(this, function (elem, i) {
	      return callback.call(elem, i, elem);
	    }));
	  },

	  slice: function slice() {
	    return this.pushStack(_slice.apply(this, arguments));
	  },

	  first: function first() {
	    return this.eq(0);
	  },

	  last: function last() {
	    return this.eq(-1);
	  },

	  eq: function eq(i) {
	    var len = this.length,
	        j = +i + (i < 0 ? len : 0);
	    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	  },

	  end: function end() {
	    return this.prevObject || this.constructor();
	  },

	  // For internal use only.
	  // Behaves like an Array's method, not like a jQuery method.
	  push: push,
	  sort: arr.sort,
	  splice: arr.splice

	};

	/**
	 * 扩展方法
	 */
	jQuery.extend = jQuery.fn.extend = function () {

	  var options = void 0,
	      name = void 0,
	      src = void 0,
	      copy = void 0,
	      copyIsArray = void 0,
	      clone = void 0,
	      target = arguments[0] || {},
	      i = 1,
	      length = arguments.length,
	      deep = false;

	  // 处理一个深拷贝的情况
	  // Handle a deep copy situation
	  if (typeof target === 'boolean') {
	    deep = target;

	    // 跳过布尔值
	    // Skip the boolean and the target
	    target = arguments[i] || {};
	    i++;
	  }

	  // 当目标是一个字符串或其他（在深拷贝的情况下）
	  // Handle case when target is a string or something (possible in deep copy)
	  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && !jQuery.isFunction(target)) {
	    target = {};
	  }

	  // 只传一个参数的时候，扩展jQuery本身
	  // Extend jQuery itself if only one argument is passed
	  if (i === length) {
	    target = this;
	    i--;
	  }

	  /**
	   * 开始拷贝
	   */
	  for (; i < length; i++) {

	    // 只处理非空值
	    // Only deal with non-null/undefined values
	    if ((options = arguments[i]) != null) {

	      // 扩展基本对象
	      // Extend the base object
	      for (name in options) {
	        src = target[name];
	        copy = options[name];

	        // 防止死循环
	        // Prevent never-ending loop
	        if (target === copy) {
	          continue;
	        }

	        // 递归，如果合并普通的对象或数组
	        // Recurse if we're merging plain objects or arrays
	        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

	          // 如果是数组
	          if (copyIsArray) {
	            copyIsArray = false;
	            clone = src && jQuery.isArray(src) ? src : [];
	          } else {
	            clone = src && jQuery.isPlainObject(src) ? src : {};
	          }

	          // 从不移动原始对象，克隆他们
	          // Never move original objects, clone them
	          target[name] = jQuery.extend(deep, clone, copy);
	        }
	        // 不引入不确定的值
	        // Don't bring in undefined values
	        else if (copy !== undefined) {
	            target[name] = copy;
	          }
	      }
	    }
	  }

	  // 返回修改后的对象
	  // Return the modified object
	  return target;
	};

	/**
	 * 扩展jQuery对象，原型继承模式
	 */
	jQuery.extend({

	  // Unique for each copy of jQuery on the page
	  expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

	  // 没有ready模块时，假设jQuery已经ready
	  isReady: true,

	  // 错误
	  error: function error(msg) {
	    throw new Error(msg);
	  },

	  // 空函数
	  noop: function noop() {},

	  // 是否为函数
	  isFunction: function isFunction(obj) {
	    return jQuery.type(obj) === 'function';
	  },

	  // 是否为数组
	  isArray: Array.isArray,

	  // 是否是window对象
	  isWindow: function isWindow(obj) {
	    return obj != null && obj === obj.window;
	  },

	  // 是否是数字
	  isNumeric: function isNumeric(obj) {
	    // As of jQuery 3.0, isNumeric is limited to
	    // strings and numbers (primitives or objects)
	    // that can be coerced to finite numbers (gh-2662)
	    var type = jQuery.type(obj);
	    return (type === 'number' || type === 'string') &&
	    // parseFloat NaNs numeric-cast false positives ("")
	    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	    // subtraction forces infinities to NaN
	    !isNaN(obj - parseFloat(obj));
	  },

	  // 是否为原生对象
	  isPlainObject: function isPlainObject(obj) {

	    var proto = void 0,
	        Ctor = void 0;

	    // Detect obvious negatives
	    // Use toString instead of jQuery.type to catch host objects
	    if (!obj || toString.call(obj) !== '[object Object]') {
	      return false;
	    }

	    proto = getProto(obj);

	    // Objects with no prototype (e.g., `Object.create( null )`) are plain
	    if (!proto) {
	      return true;
	    }

	    // Objects with prototype are plain iff they were constructed by a global Object function
	    Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
	    return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
	  },

	  // 是否为空对象
	  isEmptyObject: function isEmptyObject(obj) {

	    /* eslint-disable no-unused-vars */
	    // See https://github.com/eslint/eslint/issues/6125
	    var name = void 0;
	    for (name in obj) {
	      return false;
	    }
	    return true;
	  },

	  type: function type(obj) {
	    if (obj == null) {
	      return obj + '';
	    }

	    // Support: Android <=2.3 only (functionish RegExp)
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	  },

	  // Evaluates a script in a global context
	  globalEval: function globalEval(code) {
	    DOMEval(code);
	  },

	  // Convert dashed to camelCase; used by the css and data modules
	  // Support: IE <=9 - 11, Edge 12 - 13
	  // Microsoft forgot to hump their vendor prefix (#9572)
	  camelCase: function camelCase(string) {
	    return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
	  },

	  // 标签名
	  nodeName: function nodeName(elem, name) {
	    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	  },

	  each: function each(obj, callback) {
	    var length = void 0,
	        i = 0;

	    if (isArrayLike(obj)) {
	      length = obj.length;
	      for (; i < length; i++) {
	        if (callback.call(obj[i], i, obj[i]) === false) {
	          break;
	        }
	      }
	    } else {
	      for (i in obj) {
	        if (callback.call(obj[i], i, obj[i]) === false) {
	          break;
	        }
	      }
	    }

	    return obj;
	  },

	  // Support: Android <=4.0 only
	  trim: function trim(text) {
	    return text == null ? '' : (text + '').replace(rtrim, '');
	  },

	  // results is for internal usage only
	  makeArray: function makeArray(arr, results) {
	    var ret = results || [];

	    if (arr != null) {
	      if (isArrayLike(Object(arr))) {
	        jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
	      } else {
	        push.call(ret, arr);
	      }
	    }

	    return ret;
	  }

	});

/***/ }
/******/ ]);