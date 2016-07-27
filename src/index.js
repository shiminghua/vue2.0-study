'use strict';
import Vue from './core/index';

let vue = new Vue();
console.log(Vue);
console.log(vue);
console.log(Vue.version, Vue.$isServer, Vue.initGlobalAPI);
console.log(vue.version, vue.$isServer, vue.initGlobalAPI);