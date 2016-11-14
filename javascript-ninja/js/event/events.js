/**
 * event - Event对象
 * 创建一个新的对象来模拟浏览器的原始事件对象。
 * 将原始事件的属性进行规范化已匹配DOM Model。
 */
function fixEvent(event) {

  // 预定义常用的函数
  function returnTrue() { return true; }
  function returnFalse() { return false; }

  // 测试是否需要修复
  if (!event || !event.stopPropagation) {

    let old = event || window.event;

    // Clone the old object so that we can modify the values
    event = {};
    // 克隆现有的属性
    for (let prop in old) {
      event[prop] = old[prop];
    }

    // The event occurred on this element
    if (!event.target) {
      event.target = event.srcElement || document;
    }

    // Handle which other element the event is related to
    // 处理与事件相关的其他元素
    /**
     * relatedTarget 事件属性返回与事件的目标节点相关的节点。
     * 对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。
     * 对于 mouseout 事件来说，该属性是离开目标时，鼠标指针进入的节点。
     * 对于其他类型的事件来说，这个属性没有用。
     */
    event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;

    // Stop the default browser action
    event.preventDefault = function() {
      event.returnValue = false;
      event.isDefaultPrevented = returnTrue;
    };

    /**
     * 检查是否已对事件调用 preventDefault()；已调用则返回true，否则返回false。
     */
    event.isDefaultPrevented = returnFalse;

    // Stop the event from bubbling
    event.stopPropagation = function() {
      event.cancelBubble = true;
      event.isPropagationStopped = returnTrue;
    };

    /**
     * 检查 event.stopPropagation() 是否被调用：
     * 如果 event.stopPropagation() 被调用则该方法返回 true，否则返回 false。
     */
    event.isPropagationStopped = returnFalse;

    // Stop the event from bubbling and executing other handlers
    event.stopImmediatePropagation = function() {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    }

    /**
     * stopImmediatePropagation 的功能比stopPropagation 多一些，除了可以阻止事件冒泡之外，还可以把这个元素绑定的同类型事件也阻止了。
     */
    event.isImmediatePropagationStopped = returnFalse;

    // Handle mouse position
    if (event.clientX != null) {
      let doc = document.documentElement, body = document.body;
      
      event.pageX = event.clientX + 
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) - 
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      
      event.pageY = event.clientY + 
        (doc && doc.scrollTop || body && body.scrollTop || 0) - 
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // Handle key presses
    event.which = event.charCode || event.keyCode;

    /**
     * Fix button for mouse clicks:
     * 0 == left; 1 == middle; 2 == right
     */
    if (event.button != null) {
      event.button = (event.button & 1 ? 0 : (event.button & 4 ? 1: (event.button & 2 ? 2 : 0)));
    }

  }

  // 返回修复后的实例
  return event;

}


/**
 * event - 集中存储相关信息
 */
(function() {

  let cache = {},
    guidCounter = 1,
    expando = 'data' + (new Date).getTime();

  /**
   * 获取信息
   */
  this.getData = function(elem) {

    let guid = elem[expando];
    if (!guid) {
      guid = elem[expando] = guidCounter++;
      cache[guid] = {};
    }
    // console.log(expando, cache);
    return cache[guid];

  }

  /**
   * 删除信息
   */
  this.removeData = function(elem) {
    let guid = elem[expando];
    if (!guid) {
      return;
    }
    delete cache[guid];
    try {
      delete elem[expando];
    }
    catch (e) {
      if (elem.removeAttribute) {
        elem.removeAttribute(expando);
      }
    }
  }

})();

/**
 * 一个绑定事件处理程序并进行跟踪的函数
 * 1、Event 实例被修复
 * 2、将函数上下文设置成目标元素
 * 3、Event 实例作为唯一的参数传递给处理程序
 * 4、事件处理程序永远按照其绑定顺序进行执行
 */
(function() {

  let nextGuid = 1;

  // 绑定事件处理程序
  this.addEvent = function (elem, type, fn) {
    
    // 获取相关的数据块
    let data = getData(elem);

    // 创建处理程序存储
    if (!data.handlers) {
      data.handlers = {};
    }

    // 使用type创建type对应的数组
    if (!data.handlers[type]) {
      data.handlers[type] = [];
    }

    // 标记函数
    if (!fn.guid) {
      fn.guid = nextGuid++;
    }

    // 将处理程序添加到列表中
    data.handlers[type].push(fn);

    // 创建事件调度器
    if (!data.dispatcher) {
      data.disabled = false;
      data.dispatcher = function(event) {

        // 如果有禁用标记 disabled 就终止触发操作
        if (data.disabled) {
          return;
        }
        // 规范化event事件对象
        event = fixEvent(event);

        // 调用注册的处理程序
        let handlers = data.handlers[event.type];
        if (handlers) {
          for (let n = 0; n < handlers.length; n++) {
            handlers[n].call(elem, event);
          }
        }

      };

    }

    //注册调度器
    if (data.handlers[type].length === 1) {
      if (document.addEventListener) {
        elem.addEventListener(type, data.dispatcher, false);
      }
      else if (document.attachEvent) {
        elem.attachEvent('on' + type, data.dispatcher);
      }
    }

  }

  /**
   * 解绑事件处理程序
   * 1、removeEvent(element) 将一个元素的所有绑定事件进行清理
   * 2、removeEvent(element, 'click') 将一个元素特定类型的所有事件进行解绑
   * 3、removeEvent(element, 'click', handler) 将一个元素的特定处理程序进行解绑
   */
  this.removeEvent = function(elem, type, fn) {

    // 获取元素的关联数据
    let data = getData(elem);

    // 如果无事可做则直接返回
    if (!data.handlers) {
      return;
    }

    // 创建一个实用函数
    let removeType = function(t) {
      data.handlers[t] = [];
      tidyUp(elem, t);
    }

    // 删除所有的处理程序
    if (!type) {
      for (let t in data.handlers) {
        removeType(t);
      }
      return;
    }

    // 查找一个特定type的所有处理程序
    let handlers = data.handlers[type];
    if (!handlers) {
      return;
    }

    // 删除一个特定type的所有处理程序
    if (!fn) {
      removeType(type);
      return;
    }

    // 删除一个特定的处理程序
    if (fn.guid) {
      for (let n = 0; n < handlers.length; n++) {
        if (handlers[n].guid === fn.guid) {
          handlers.splice(n--, 1);
        }
      }
    }
    tidyUp(elem, type);

  }

})();

/**
 * tidyUp 清理资源
 */
function tidyUp(elem, type) {

  // 空对象判断
  function isEmpty(object) {
    for (let prop in object) {
      return false;
    }
    return true;
  }

  let data = getData(elem);

  // 检测某一事件类型的处理程序
  if (data.handlers[type].length === 0) {
    delete data.handlers[type];
    if (document.removeEventListener) {
      elem.removeEventListener(type, data.dispatcher, false);
    }
    else if (document.detachEvent) {
      elem.detachEvent('on' + type, data.dispatcher);
    }
  }

  // 判断是否还有其他事件类型的处理程序
  if (isEmpty(data.handlers)) {
    delete data.handlers;
    delete data.dispatcher;
  }

  // 判断是否还需要 data （即数据是否为空）
  if (isEmpty(data)) {
    removeData(elem);
  }

}


/**
 * 事件触发triggerEvent
 */