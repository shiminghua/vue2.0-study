'use strict';
import Watcher from '../observer/watcher';
import Dep from '../observer/dep';

import {
  observe,
  defineReactive,
  observerState
} from '../observer/index';

import {
  warn,
  hasOwn,
  isReserved,
  isPlainObject,
  bind,
  validateProp,
  noop
} from '../util/index';

export function initState(vm) {
    vm._watchers = [];
    initProps(vm); // 属性
    initData(vm); // 数据
    initComputed(vm); // 计算属性
    initMethods(vm); // 方法
    initWatch(vm); // 监听
};


