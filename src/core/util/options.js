'use strict';
import Vue from '../instance/index';
import config from '../config';
import { warn } from './debug';
import { set } from '../observer/index';
import {
    extend,
    isObject,
    isPlainObject,
    hasOwn,
    camelize,
    capitalize,
    isBuiltInTag
} from '../../shared/util';


/**********
 * Option overwriting strategies are functions that handle how to 
 * merge a parent option value and a child option value into the final value.
 * 功能重写策略，合并父子option
 * start 策略
*/
const strats = config.optionMergeStrategies; // 选择合并策略（用于核心/工具/选项）

/***************
 * Default strategy
 * 默认策略
*/
const defaultStrat = function(parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
}

/**********
 * Options with restrictions
 * 选择与限制
*/
if (process.env.NODE_ENV !== 'production') {
    strats.el = strats.propsData = function(parent, child, vm, key) {
        if (!vm) {
            // key 键值只能在实例创建过程中使用，请使用新的关键字
            warn(
                `option "${key}" can only be used during instance ` + 
                'creation with the `new` keyword.'
            );
        }
        return defaultStrat(parent, child);
    };

    strats.name = function(parent, child, vm) {
        if(vm) {
            // name 只能用为组件定义，不能在创建过程中使用
            warn(
                'options "name" can only be used as a component definition option, ' +
                'not during instance creation.'
            );
        }
        return defaultStrat(parent, child);
    }
}

/****************
 * Helper that recursively merges two data objects together.
 * 递归将两个数据对象合并在一起。
*/
function mergeData (to, from) {
    let key, toVal, fromVal;
    for (key in from) {
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            set(to, key, fromVal);
        }
        else if (isObject(toVal) && isObject(fromVal)) {
            mergeData(toVal, fromVal);
        }
    }
    return to;
}

/******************************************************************************
 * Data
 * 数据
*/
strats.data = function(parentVal, childVal, vm) {
    
}

/**
 * Make sure component options get converted to actual constructors.
 * 确保组件选项转换为实际的构造函数。
*/
function normalizeComponents(options) {
    if (options.components) {
        const components = options.components;
        let def;
        for (const key in components) {
            const lower = key.toLowerCase();
            if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
                // 不要使用内置的或保留的HTML元素作为组件
                process.env.NODE_ENV !== 'production' 
                && warn('Do not use built-in or reserved HTML elements as component ' +'id: ' + key);
                continue;
            }
            def = components[key];
            if (isPlainObject(def)) {
                components[key] = Vue.extend(def);
            }
        }
    }
}

/****
 * Ensure all props option syntax are normalized into the Object-based format.
 * 确保所有的属性选项语法都归为基于对象的格式。
*/
function normalizeProps(options) {
    const props = options.props;
    if (!props) {
        return;
    }
    const res = {};
    let i, val, name;
    if (Array.isArray(props)) {
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'string') {
                name = camelize(val);
                res[name] = { type: null };
            }
            else if (process.env.NODE_ENV !== 'production') {
                warn('props must be strings when using array syntax.');
            }
        }
    }
    else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ? val : { type: val };
        }
    }
    options.props = res;
}

/********
 * Normalize raw function directives into object format.
 * 将原始函数指令正常化为对象格式。
*/
function normalizeDirectives(options) {
    const dirs = options.directives;
    if(dirs) {
        for (const key in dirs) {
            const def = dirs[key];
            if (typeof def === 'function') {
                dirs[key] = { bind: def, update: def };
            }
        }
    }
}


/*******************
 * Merge two option objects into a new one. 
 * Core utility used in both instantiation and inheritance.
 * 将两个选项对象合并成一个新的。用于实例化和继承的核心效用。
*/
export function mergeOptions(parent, child, vm) {
    normalizeComponents(child); // 规范组件
    normalizeProps(child); // 规范属性
    normalizeDirectives(child); // 规范指令
    const extendsFrom = child.extends; // 扩展
    // 如果有扩展
    if (extendsFrom) {
        parent = typeof extendsFrom === 'function' 
            ? mergeOptions(parent, extendsFrom.options, vm) 
            : mergeOptions(parent, extendsFrom, vm);
    }
    // 如果有混合
    if (child.mixins) {
        for (let i = 0, l = child.mixins.length; i < l; i++) {
            let mixin = child.mixins[i];
            // 如果 mixin 是Vue的实例
            if (mixin.prototype instanceof  Vue) {
                mixin = mixin.options;
            }
            parent = mergeOptions(parent, mixin, vm);
        }
    }

    const options = {};
    let key;
    for (key in parent) {
        mergeField(key);
    }
    for (key in child) {
        // 如果key不是parent的属性
        if (!hasOwn(parent, key)) {
            mergeField(key);
        }
    }
    function mergeField(key) {
        const strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
}