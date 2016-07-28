'use strict';
import config from '../config'; // 配置文件
import * as util from '../util/index'; // 工具方法
// import { initUse } from './use'; // use方法：通过 Vue.use() 全局方法使用插件：
// import { initMixin } from './mixin'; // 混合
// import { initExtend } from './extend'; // 扩展
// import { initAssetRegister } from './assets'; // 资产
// import { set, del } from '../observer/index'; // 观察者
// import builtInComponents from '../components/index'; // 组件

console.log(util);

export function initGlobalAPI(Vue) {
    // config
    const configDef = {};
    configDef.get = () => config;
    if (process.env.NODE_ENV !== 'production') {
        configDef.set = () => {
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
    config._assetTypes.forEach(type => {
        Vue.options[type + 's'] = Object.create(null);
    });

    util.extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
};