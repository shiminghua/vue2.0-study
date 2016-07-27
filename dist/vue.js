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

	var _index = __webpack_require__(4);

	var _index2 = __webpack_require__(5);

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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(3);

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
	  devtools: 'development' !== 'production',

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Perform no operation.
	 * 不执行操作 - 空函数
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.noop = noop;
	function noop() {}

	/**
	 * Always return false.
	 * 总是返回错误 - false
	 */
	var no = exports.no = function no() {
	  return false;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initGlobalAPI = initGlobalAPI;

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function initGlobalAPI(Vue) {
	    Vue.initGlobalAPI = 'initGlobalAPI';
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _init = __webpack_require__(6);

	function Vue(options) {
	    this._init(options);
	}

	(0, _init.initMixin)(Vue);

	exports.default = Vue;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initMixin = initMixin;
	function initMixin(Vue) {
	    Vue.prototype._init = function (options) {
	        console.log('Vue init');
	    };
	}

/***/ }
/******/ ]);