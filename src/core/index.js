'use strict';
import config from './config';
import { initGlobalAPI } from './global-api/index';
import Vue from './instance/index';

initGlobalAPI(Vue);

/*****************************************
 * Object.defineProperty 将属性添加到对象，或修改现有属性的特性。添加/修改访问器属性。修改DOM元素上的属性
*/
Object.defineProperty(Vue.prototype, '$isServer', {
    get: () => config._isServer
});

Vue.version = '2.0.0-beta.3';

export default Vue;

(function(global, factory) {
    // console.log(global);
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : 
    typeof define === 'function' && define.amd ? define(factory) : 
    (global.Vue = factory());
}(this, function() {
    return Vue;
}));
