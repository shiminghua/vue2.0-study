/**
 * 超级玛丽 - 状态模式
 * 
 * 状态模式（state）：当一个对象的内部状态发生改变时，会导致期行为的改变，这看起来像是改变了对象。
 */

// 1. 状态模式的最终目的即是简化分支判断流程。
// 2. 状态模式是解决程序中臃肿的分支判断语句问题，将每个分支转化为一种状态独立出来，方便每种状态的管理又不至于每次执行时遍历所有分支。

// 创建超级玛丽状态类
let MarryState = function () {
  // 内部状态私有变量
  let _currentState = {};
  // 动作与状态方法映射
  let states = {
    jump() {
      // 跳跃
      console.log('jump');
    },
    move() {
      // 移动
      console.log('move');
    },
    shoot() {
      // 射击
      console.log('shoot');
    },
    squat() {
      // 蹲下
      console.log('squat');
    },
  };

  // 动作控制类
  let Action = {
    // 改变状态方法
    changeState() {
      // 组合动作通过传递多个参数实现
      let arg = arguments;
      // 重置内部状态
      _currentState = {};
      // 如果有动作则添加动作
      if (arg.length >= 1) {
        for (let i = 0, len = arg.length; i < len; i++) {
          // 像内部状态中添加动作
          _currentState[arg[i]] = true;
        }
      }
      // 返回动作控制类
      return this;
    },
    // 执行动作
    goes() {
      // 遍历内部状态保存的动作
      for (let i in _currentState) {
        // 如果该动作存在则执行
        states[i] && states[i]();
      }
      return this;
    },
  };
  // 返回接口方法 change goes
  return {
    change: Action.changeState,
    goes: Action.goes,
  };
};

// 使用一
MarryState()
  .change('jump', 'shoot')
  .goes()
  .goes()
  .change('shoot')
  .goes();

// 使用二，推荐
let marry = new MarryState();
marry
  .change('squat', 'shoot')
  .goes()
  .change('jump')
  .goes()
  .change('move', 'shoot')
  .goes();

