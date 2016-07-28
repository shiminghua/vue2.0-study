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
            warn(
                `option "${key}" can only be used during instance ` + 
                'creation with the `new` keyword.'
            );
        }
        return defaultStrat(parent, child);
    };

    strats.name = function(parent, child, vm) {
        if(vm) {
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