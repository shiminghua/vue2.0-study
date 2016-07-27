/**********************
 * Vue.js v2.0.0-beta.3
 * (c) 2014-2016 Evan You
 * Released under the MIT License.
 * 麻省理工学院许可证发布。
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory : 
    typeof define === 'function' && define.amd ? define(factory) : (global.Vue = factory);
} (this, function () {
    'use strict';

    /**************
     * Convert a value to a string that is actually rendered.
     * 将一个值转化为字符串
    */
    function _toString(val) {
        return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
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
        }
    }

    /*************
     * Check if a tag is a built-in tag.
     * 检查标签是否是内置的标签
    */
    var isBuiltInTag = makeMap('slot,component', true);

    /************
     * Remove an item from an array
     * 从数组中删除一个项目
    */
    function remove(arr, item) {
        if(arr.length) {
            var index = arr.indexOf(item);
            if(index > -1) {
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
     * 检查是否为原始值
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
        return function(str) {
            var hit = cache[str];
            return hit || (cache[str] = fn(str));
        }
    }

    /***********
     * Camelize a hyphen-delmited string.
     * 转换格式  aaa-bbb-ccc => aaaBbbCcc
    */
    var camelizeRE = /-(\w)/g;
    var camelize = cached(function(str) {
        return str.replace(camelizeRE, function(_, c) {
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
     * 混合属性到目标对象
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
        return obj !== null && typeof obj === 'object';
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
        for (var i = 1; i < arr.length; i++) {
            if(arr[i]) {
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
    var no = function no() {
        return false;
    }

    /***********
     * Generate a static keys string from compiler modules.
     * 从编译器模块生成一个静态密钥字符串
    */
    function genStaticKeys(modules) {
        return modules.reduce(function(keys, m) {
            return keys.concat(m.staticKeys || []);
        }, []).join(',');
    }



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
        isReservedTag: no,

        /***********
         * Check if a tag is an unknown element. Platform-dependent.
         * 检查标签是否是未知元素。依赖平台。
        */
        isUnknownElement: no,

        /************
         * Get the namespace of an element
         * 获取元素的命名空间
        */
        getTagNamespace: noop,

        /**********
         * Check if an attribute must be bound using property, e.g. value Platform-dependent.
         * 检查一个属性是否必须使用属性绑定，例如依赖于平台的值。
        */
        mustUseProp: no,

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

    /***************
     * Check if a string starts with $ or _
     * 检查一个字符串是不是以 $ 或者 _ 开始
    */
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
     * 解析简单路径
    */
    var bailRE = /[^\w\.\$]/;
    function parsePath(path) {
        if(bailRE.test(path)) {
            return;
        }
        else {
            var _ret = function() {
                var segments = path.split('.');
                return {
                    v: function v(obj) {
                        for(var i = 0; i < segments.length; i++) {
                            if(!obj) {
                                return;
                            }
                            else {
                                obj = obj[segments[i]];
                            }
                        }
                        return obj;
                    }
                };
            }();

            if (typeof _ret === 'object') {
                return _ret.v;
            }
        }
    }

    /* global MutationObserver 全局DOM变动观察者 */
    /************
     * can we use __proto__?
     * 我们可以用__proto__？
    */
    var hasProto = '__proto__' in {};

    /*************
     * Browser environment sniffing
     * 浏览器环境嗅探
    */
    var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

    /***********
     * detect devtools
     * 检测工具
    */
    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    /**********
     * UA sniffing for working around browser-specific quirks
     * UA嗅探在特定浏览器的怪癖工作
    */
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
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
    */
    var nextTick = function() {
        var callbacks = [];
        var pending = false; // 等待
        var timerFunc = void 0; // void 0 === undefined  => true
        function nextTickHandler() {
            pending = false;
            var copies = callbacks.slice(0); // 副本
            callbacks = [];
            for(var i = 0; i < copies.length; i++) {
                copies[i]();
            }
        }

        // istanbul ignore else 忽略其他
        if(typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
            (function() {
                var counter = 1; // 计数器
                var observer = new MutationObserver(nextTickHandler);
                var textNode = document.createTextNode(String(counter));
                observer.observe(textNode, {
                    characterData: true // 是否观察目标节点的子文本节点
                });
                timerFunc = function timerFunc() {
                    counter = (counter + 1) % 2;
                    textNode.data = String(counter);
                }
            })();
        }
        else {
            /**********
             * webpack attempts to inject a shim for setImmediate if it is used as a global, 
             * so we have to work around that to avoid bundling unnecessary code.
             * 避免不必要的代码捆绑
            */
            var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
            timerFunc = context.setImmediate || setTimeout;
        }
        return function(cb, ctx) {
            var func = ctx ? function () {
                cb.call(ctx);
            } : cb;
            callbacks.poush(func);
            if(pending) {
                return;
            }
            timerFunc(nextTickHandler, 0);
        }
    };


    /************************************************************************
     * Set 数据结构
    */
    var _Set = void 0;
    /******
     * istanbul ignore if
     * 忽视
    */
    if(typeof Set !== 'undefined' && /native code/.test(Set.toString())) {
        // use native Set when available.  可用的本地 Set 数据结构
        _Set = Set;
    }
    else {
        /*****
         * a non-standard Set polyfill that only works with primitive keys.
         * 一个非标准的实现
        */
        _Set = function() {
            function Set() {
                this.set = Object.create(null);
            }

            Set.prototype.has = function has(key) {
                return this.set[key] !== 'undefined';
            }

            Set.prototype.add = function add(key) {
                this.set[key] = 1;
            }

            Set.prototype.clear = function clear() {
                this.set = Object.create(null);
            }
        }();
    }


    /****************************************************************************
     * 代理
    */
    var hasProxy = void 0;
    var proxyHandlers = void 0;
    var initProxy = void 0;
    if('development' !== 'production') {
        (function() {
            var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require,__webpack_require__' // for Webpack/Browserify
            );

            hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

            proxyHandlers = {
                has: function has(target, key) {
                    var has = key in target;
                    var isAllowedGlobal = allowedGlobals(key);
                    if(!has && !isAllowedGlobal) {
                        // 试图访问不存在的属性 key 
                        warn('Trying to access non-existent property "' + key + '" while rendering. ' + 'Make sure to declare reactive data properties in the data option.', target);
                    }
                    return !isAllowedGlobal;
                }
            };

            initProxy = function initProxy(vm) {
                if(hasProxy) {
                    vm._renderProxy = new Proxy(vm, proxyHandlers);
                }
                else {
                    vm._renderProxy = vm;
                }
            };
        })();
    }


    /**********************************************************************
     * dep 数据执行保护的缩写
    */
    var uid$2 = 0;
    /***************
     * A dep is an observable that can have multiple directives subscribing to it.
     * dep 数据是可见的，可以有多个指令订阅它
    */
    var Dep = function() {
        function Dep() {
            this.id = uid$2++;
            this.subs = [];
        }

        // 添加
        Dep.prototype.addSub = function addSub(sub) {
            this.subs.push(sub);
        };

        // 移除
        Dep.prototype.removeSub = function removeSub(sub) {
            remove(this.subs, sub);
        };

        // 依赖
        Dep.prototype.depend = function depend() {
            if (Dep.target) {
                Dep.target.addDep(this);
            }
        };

        // notify
        Dep.prototype.notify = function notify() {
            // stablize the subscriber list first
            var subs = this.subs.slice();
            for (var i = 0, l = subs.length; i < l; i++) {
                subs[i].update();
            }
        };

        return Dep;
    }();

    Dep.target = null;
    var targetStack = [];

    function pushTarget(_target) {
        if(Dep.target) {
            targetStack.push(_target);
        }
        else {
            Dep.target = _target;
        }
    }

    function popTarget() {
        Dep.target = targetStack.pop();
    }


    /***********************************************
     * 队列
     * We have two separate queues: 
     * one for internal component re-render updates and one for user watcher registered via $watch(). 
     * We want to guarantee re-render updates to be called before user watchers so that when user watchers are triggered, 
     * the DOM would already be in updated state.
     * 我们有两个单独的队列：一个内部组件重新渲染更新和一个用户注册通过watch()美元的守望者。
     * 我们要保证重新渲染更新被称为用户，当用户在观察者观察者引发，DOM将已经在更新的状态。
    */


    /*****************************************************************
     * 初始化 Vue
    */
    var uid = 0;
    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            var vm = this;
            // a uid
            vm.uid = uid++;
            /**
             * a flag to avoid this being observed
             * 一个标记，避免被观察到
            */
            vm._isVue = true;
            // merge options  合并选项
            if(options && options._isComponent) {
                /**
                 * optimize internal component instantiation since dynamic options merging is pretty slow, 
                 * and none of the internal component options needs special treatment.
                 * 优化内部组件实例化动态选择合并是非常缓慢的，和内部组件的选择都需要特殊处理。
                */
                initInternalComponent(vm, options);
            }
            else {
                vm.$options = mergeOptions(resolveConstructorOptions(vm), options || {}, vm);
            }

            /***
             * istanbul ignore else
             * 忽略其他
            */
            if('development' !== 'production') {
                initProxy(vm);
            }
            else {

            }
            // expose real self  暴漏真实的自我
            vm._self = vm;
            initLifecycle(vm); // 生命周期
            initEvents(vm); // 事件
            callHook(vm, 'beforeCreate'); // 钩子函数
            callHook(vm, 'created');
            initState(vm); // 状态
            initRender(vm); // 渲染
        };
    }

    /****
     * 初始化内部组件
    */
    function initInternalComponent(vm, options) {
        var opts = vm.$options = Object.create(resolveConstructorOptions(vm));
        /***
         * doing this because it's faster than dynamic enumeration.
         * 这么做是因为它比动态枚举快
        */
        opts.parent = options.parent;
        opts.propsData = options.propsData;
        opts._parentVnode = options._parentVnode;
        opts._parentListeners = options._parentListeners;
        opts._renderChildren = options._renderChildren;
        opts._componentTag = options._componentTag;
        if (options.render) {
            opts.render = options.render;
            opts.staticRenderFns = options.staticRenderFns;
        }
    }

    // 构造函数配置
    function resolveConstructorOptions(vm) {
        var Ctor = vm.constructor;
        var options = vm.options;
        if (Ctor.super) {
            var superOptions = Ctor.super.options;
            var cachedSuperOptions = Ctor.superOptions;
            if (superOptions !== cachedSuperOptions) {
                // super option changed
                Ctor.superOptions = superOptions;
                options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
                if(options.name) {
                    options.components[options.name] = Ctor;
                }
            }
        }
        return options;
    }



    /**********
     * Make sure component options get converted to actual constructors.
     * 确保组件选项转换为实际的构造函数。
    */
    function normalizeComponents(options) {
        if(options.components) {
            var components = options.components;
            var def = void 0;
            for (var key in components) {
                var lower = key.toLowerCase();
                if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
                    'development' !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
                    continue;
                }
                def = components[key];
                if (isPlainObject(def)) {
                    components[key] = Vue.extend(def);
                }
            }
        }
    }

    /***
     * Merge two option objects into a new one. Core utility used in both instantiation and inheritance.
     * 将两个选项对象合并成一个新的。用于实例化和继承的核心效用。
    */
    function mergeOptions(parent, child, vm) {
        normalizeComponents(child); // 规范组件
        normalizeProps(child); // 规范属性
        normalizeDirectives(child); // 规范指令
        var extendsFrom = child.extends;
        if(extendsFrom) {
            parent = typeof extendsFrom === 'function' ? mergeOptions(parent, extendsFrom.options, vm) : mergeOptions(parent, extendsFrom, vm);
        }
        if(child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                var mixin = child.mixins[i];
                if (mixin.prototype instanceof Vue) {
                    mixin = mixin.options;
                }
                parent = mergeOptions(parent, mixin, vm);
            }
        }
        var options = {};
        var key = void 0;
        for (key in parent) {
            mergeField(key);
        }
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key);
            }
        }
        function mergeField(key) {
            var strat = strats[key] || defaultStrat;
            options[key] = strat(parent[key], child[key], vm, key);
        }
        return options;
    }


    /***********************************************************************
     * Vue
    */
    function Vue(options) {
        this._init(options);
    }

    initMixin(Vue);


}));