'use strict';

import config from '../config';

let warn; // 警告
let formatComponentName; // 格式化组件名称

// 如果是开发环境
if (process.env.NODE_ENV !== 'production') {
    const hasConsole = typeof console !== 'undefined';

    warn = (msg, vm) => {
        if (hasConsole && !config.silent) {
            // console.error('[Vue warn]: ' + msg +' ' + (vm ? formatLocation(formatComponentName(vm)) : ''));
            console.error(`[Vue warn]: ${msg} ` + (vm ? formatLocation(formatComponentName(vm)) : ''));
        }
    };

    formatComponentName = vm => {
        if(vm.$root === vm) {
            return 'root instance';
        }
        const name = vm._isVue 
            ? vm.$options.name || vm.$options._componentTag 
            : vm.name;
        return name ? `component <${name}>` : `anonymous component`;

    }

    const formatLocation = str => {
        // 如果是匿名组件
        if(str === 'anonymous component') {
            // better debugging messages - 更好的调试信息
            str += ` - use the "name" option for better debugging messages.)`;
        }
        return `(found in ${str})`;
    }
}

export { warn, formatComponentName };