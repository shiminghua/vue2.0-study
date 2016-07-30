'use strict';

/* global MutationObserver 全局DOM变动观察者 */
/************
 * can we use __proto__?
 * 我们可以用__proto__？
*/
export const hasProto = '__proto__' in {};

/*************
 * Browser environment sniffing
 * 浏览器环境嗅探
*/
export const inBrowser = 
    typeof window !== 'undefined' && 
    Object.prototype.toString.call(window) !== '[object Object]';

/***********
 * detect devtools
 * 检测工具
*/
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/**********
 * UA sniffing for working around browser-specific quirks
 * UA嗅探在特定浏览器的怪癖工作
*/
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
const iosVersionMatch = UA && isIos && UA.match(/os ([\d_]+)/);
const iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

/*************
 * MutationObserver is unreliable in iOS 9.3 UIWebView detecting it by checking presence of IndexedDB ref #3027
 * 
*/
const hasMutationObserverBug = 
    iosVersion && 
    Number(iosVersion[0]) >= 9 && 
    Number(iosVersion[1]) >= 3 && 
    !window.indexedDB;

/*************
 * Defer a task to execute it asynchronously. Ideally this should be executed as a microtask, 
 * so we leverage MutationObserver if it's available, and fallback to  setTimeout(0).
 * 推迟一个异步执行它的任务。理想情况下本应作为微任务执行的，所以我们利用MutationObserver是否可用，并回退到setTimeout（0）。
 * 延时执行函数
 * 
 * @param {Function} cb
 * @param {Object} ctx
*/
export const nextTick = (function() {
    let callbacks = [];
    let pending = false; // 等待
    let timerFunc;
    function nextTickHandler() {
        pending = false;
        const copies = callbacks.slice(0); // 副本
        callbacks = [];
        for (let i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
    // istanbul ignore else 忽略其他
    if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
        let counter = 1;
        const observer = new MutationObserver(nextTickHandler);
        const textNode = document.createTextNode(String(counter));
        observer.observe(textNode, {
            characterData: true
        });
        timerFunc = function() {
            counter = (counter + 1) % 2;
            textNode.data = String(counter);
        };
    }
    else {
        /**********
         * webpack attempts to inject a shim for setImmediate if it is used as a global, 
         * so we have to work around that to avoid bundling unnecessary code.
         * 避免不必要的代码捆绑
        */
        const context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
        timerFunc = context.setImmediate || setTimeout;
    }
    return function(cb, ctx) {
        const func = ctx ? function () { cb.call(ctx) } : cb;
        callbacks.push(func);
        if(pending) {
            return;
        }
        pending = true;
        timerFunc(nextTickHandler, 0);
    };
})();


/******
 * Set 数据结构
*/
let _Set;
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
    _Set = class Set {
        constructor() {
            this.set = Object.create(null);
        }
        has (key) {
            return this.set[key] !== 'undefined';
        }
        add (key) {
            this.set[key] = 1;
        }
        clear () {
            this.set = Object.create(null);
        }
    };
}

export { _Set };