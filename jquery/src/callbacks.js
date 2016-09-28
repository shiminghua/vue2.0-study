/**
 * callbacks
 */
import jQuery from './core';

let rnotwhite = /\S+/g;

// Convert String-formatted options into Object-formatted ones
// 将字符串参数转为对象参数
function createOptions(options) {
  let object = {};
  jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
    object[ flag ] = true;
  } );
  return object;
}

/**
 * jQuery.callbacks
 * 使用以下参数创建一个回调列表：
 * options：一个可选的空间分隔的选项列表，将改变回调列表的行为方式或一个更传统的选项对象
 * 默认情况下，一个回调列表将像一个事件回调列表，并可以“发射”多次。
 * 
 * Possible options: 可能的选项
 * 
 * once：确保这个回调列表只执行（ .fire() ）一次(像一个递延 Deferred).
 * memory：保持以前的值，将添加到这个列表的后面的最新的值立即执行调用任何回调 (像一个递延 Deferred).
 * unique：确保一次只能添加一个回调(所以在列表中没有重复的回调).
 * stopOnFalse：当一个回调返回false 时中断调用
 */
jQuery.Callbacks = function( options ) {

  // Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
  options = typeof options === 'string' ? 
    createOptions( options ) : 
    jQuery.extend( {}, options );
  
  let 
    // Flag to know if list is currently firing
    // 知道列表是否正在发射的标志
    firing, 
    // Last fire value for non-forgettable lists
    // 保持以前的值，将添加到这个列表的后面的最新的值立即执行调用任何回调 (像一个递延 Deferred).
    memory,
    // Flag to know if list was already fired
    fired,
    // Flag to prevent firing
    locked,
    // Actual callback list
    // 真正的回调函数列表
    list = [],
    // Queue of execution data for repeatable lists
    // 可重复列表的执行数据队列
    queue = [],
    // Index of currently firing callback (modified by add/remove as needed)
    // 当前发射回调的索引（需要通过添加/删除修改）
    firingIndex = -1,
    // Fire callbacks
    fire = function() {

      // Enforce single-firing
      // 执行单个回调
      locked = options.once;

      // Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
      //执行回调所有等待处决，
      //尊重firingindex覆盖和运行时间的变化
      fired = firing = true;
      for ( ; queue.length; firingIndex = -1 ) {

        memory = queue.shift();

        while ( ++firingIndex < list.length ) {

          // Run callback and check for early termination
          // 运行回调和检查提前终止
          if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false && options.stopOnFalse ) {
            // Jump to end and forget the data so .add doesn't re-fire
            firingIndex = list.length;
            memory = false;
          }

        }

      }

      // Forget the data if we're done with it
      if ( !options.memory ) {
        memory = false;
      }

      firing = false;

      // Clean up if we're done firing for good
      if ( locked ) {
        // Keep an empty list if we have data for future add calls
        if ( memory ) {
          list = [];
        }
        // Otherwise, this object is spent
        else {
          list = '';
        }
      }

    },

    // Actual Callbacks object
    // 实际回调对象
    self = {

      // Add a callback or a collection of callbacks to the list
      add: function() {
        if ( list ) {
          // If we have memory from a past run, we should fire after adding
          // 如果我们有过去的记忆，我们应该在加入后开火
          if ( memory && !firing ) {
            firingIndex = list.length - 1;
            queue.push( memory );
          }

          ( function add( args ) {
            //jQuery.each，对args传进来的列表的每一个对象执行操作
            jQuery.each( args, function( _, arg ) {

              // 如果是函数
              if ( jQuery.isFunction( arg ) ) {
                // 确保是否可以重复
                if ( !options.unique || !self.has( arg ) ) {
                  list.push( arg );
                }
              }
              //如果是类数组或对象,递归
              else if ( arg && arg.length && jQuery.type !== 'string' ) {
                // Inspect recursively
                add( arg );
              }

            } );
          } )( arguments );

          if ( memory && !firing ) {
            fire();
          }
        }
        return this;
      },
      // Remove a callback from the list
      // 在回调列表中移除一个回调函数
      remove: function() {

        jQuery.each( arguments, function( _, arg) {
          let index;
          while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
            list.splice(index, 1);
            // Handle firing indexes
            if ( index <= firingIndex ) {
              firingIndex--;
            }
          }
        } );
        return this;
      },
      // Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached..
      has: function( fn ) {
        return fn ? jQuery.inArray( fn, list ) : list.length > 0;
      },

      // Remove all callbacks from the list
      empty: function() {
        if ( list ) {
          list = [];
        }
        return this;
      },

      // Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
      disable: function() {
        locked = queue = [];
        list = memory = '';
        return this;
      },

      disabled: function() {
        return !list;
      },

      // Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
      lock: function() {
        locked = queue = [];
        if ( !memory && !firing ) {
          list = memory = '';
        }
        return this;
      },

      locked: function() {
        return !!locked;
      },

      // Call all callbacks with the given context and arguments
      fireWith: function( context, args ) {
        if ( !locked ) {
          args = args || [];
          args = [ context, args.slice ? args.slice() : args ];
          queue.push( args );
          if ( !firing ) {
            fire();
          }
        }
        return this;
      },

      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith( this, arguments );
        return this;
      },

      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!fired;
      }

    }

    return self;

};

export default jQuery;