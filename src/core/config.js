'use strict';
import { no, noop } from '../shared/util'; 

/*******************
 * 配置
*/
const config = {
    /**************
     * Option merge strategies (used in core/util/options)
     * 选择合并策略（用于核心/工具/选项）
    */
    optionMergeStrategies: Object.create(null),

    /************
     * Whether to suppress warnings.
     * 是否抑制警告
    */
    silent: false,

    /***********
     * Whether to enable devtools
     * 是否启用工具
    */
    devtools: 'development' !== 'production',

    /*********
     * Error handler for watcher errors
     * 错误观察函数
    */
    errorHandler: null,

    /***********
     * Ignore certain custom elements
     * 忽略某些自定义元素
    */
    ignoredElements: null,

    /*************
     * Custom user key aliases for v-on
     * 对于 v-on 自定义用户密钥的别名
    */
    keyCodes: Object.create(null),

    /*********
     * Check if a tag is reserved so that it cannot be registered as a component. 
     * This is platform-dependent and may be overwritten.
     * 检查标签是否保留，以便它不能注册为组件。这是平台相关的，可能被覆盖。
    */
    isReservedTag: no,

    /***********
     * Check if a tag is an unknown element. Platform-dependent.
     * 检查标签是否是未知元素。依赖平台。
    */
    isUnknownElement: no,

    /************
     * Get the namespace of an element
     * 获取元素的命名空间
    */
    getTagNamespace: noop,

    /**********
     * Check if an attribute must be bound using property, e.g. value Platform-dependent.
     * 检查一个属性是否必须使用属性绑定，例如依赖于平台的值。
    */
    mustUseProp: no,

    /**********
     * List of asset types that a component can own.
     * 组件可以拥有的资产类型的列表。
     * component  组件
     * directive  指令
     * filter     过滤器
    */
    _assetTypes: ['component', 'directive', 'filter'],

    /**********
     * List of lifecycle hooks.
     * 生命周期钩子列表。
    */
    _lifecycleHooks: ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'],

    /************
     * Max circular updates allowed in a scheduler flush cycle.
     * 在调度刷新周期中允许的最大循环更新。
    */
    _maxUpdateCount: 100,

    /**********
     * Server rendering?
     * 服务器渲染？
    */
    _isServer: 'client' === 'server'
};

export default config;