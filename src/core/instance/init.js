'use strict';
import { initProxy } from './proxy';
import { initState } from './state';
import { initRender } from './render';
import { initEvents } from './events';
import { initLifecycle, callHook } from './lifecycle';
import { mergeOptions } from '../util/index';


let uid = 0;
export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        let vm = this;
        // a uid
        vm._uid = uid++;
        /****
         * a flag to avoid this being observed
         * 一个标记，以避免被观察到
        */
        vm._isVue = true;
        /**
         * merge options
         * 合并选项
        */
        if (options && options._isComponent) {
            /**
             * optimize internal component instantiation since dynamic options merging is pretty slow, 
             * and none of the internal component options needs special treatment.
             * 优化内部组件实例化动态选择合并是非常缓慢的，和内部组件的选择都需要特殊处理。
            */
            initInternalComponent(vm, options);
        }
        else {
            /**
             * vm.$options
             * 当前实例的初始化选项。在选项中包含自定义属性时有用处：
            */
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm),
                options || {},
                vm
            );
        }
        /***
         * istanbul ignore else
         * 忽略其他
        */
        if (process.env.NODE_ENV !== 'production') {
            initProxy(vm);
        }
        else {
            vm._renderProxy = vm;
        }
        /****
         * expose real self
         * 暴漏真实的自我
        */
        vm._self = vm;
        initLifecycle(vm);
        initEvents(vm);
        callHook(vm, 'beforeCreate');
        initState(vm);
        callHook(vm, 'created');
        initRender(vm);
    }

    /***
     * 初始化内部组件
     * initInternalComponent
    */
    function initInternalComponent(vm, options) {
        /**
         * vm.$options
         * 当前实例的初始化选项。在选项中包含自定义属性时有用处：
        */
        const opts = vm.$options = Object.create(resolveConstructorOptions(vm));
        /**
         * doing this because it's faster than dynamic enumeration.
         * 这样做，因为它的速度比动态枚举快。
        */
        opts.parent = options.parent; // 父元素
        opts.propsData = options.propsData; // 属性
        opts._parentVnode = options._parentVnode; // 父虚拟元素
        opts._parentListeners = options._parentListeners; // 父元素监听事件
        opts._renderChildren = options._renderChildren; // 渲染子元素
        opts._componentTag = options._componentTag; // 组件target
        if (options.render) {
            opts.render = options.render;
            opts.staticRenderFns = options.staticRenderFns;
        }
    }

    /***
     * 解决构造函数选项
     * resolveConstructorOptions
    */
    function resolveConstructorOptions(vm) {
        const Ctor = vm.constructor;
        let options = Ctor.options;
        if (Ctor.super) {
            const superOptions = Ctor.super.options;
            const cachedSuperOptions = Ctor.superOptions;
            if (superOptions !== cachedSuperOptions) {
                // super option changed
                Ctor.superOptions = superOptions;
                options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
                if (options.name) {
                    options.components[options.name] = Ctor;
                }
            }
        }
        return options;
    }

}