'use strict';
import { initMixin } from './init.js';
import { stateMixin } from './state';
import { renderMixin } from './render';
import { eventsMixin } from './events';
import { lifecycleMixin } from './lifecycle';

function Vue(options) {
    this._init(options);
}

initMixin(Vue); // 初始化
stateMixin(Vue);  // 状态
eventsMixin(Vue); // 事件
lifecycleMixin(Vue); // 生命周期
renderMixin(Vue); // 渲染

export default Vue;