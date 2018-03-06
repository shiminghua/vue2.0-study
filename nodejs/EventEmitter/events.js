/**
 * EventEmitter events
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('event', (a, b) => {
  console.log('触发了一个事件！');
  // console.log(a, b, this);
});

myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    myEmitter.on('event', () => {
      console.log('新加事件');
    });
  }
});

myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('这是异步发生的');
  });
});

myEmitter.on('event', function (a, b) {
  console.log('function 触发事件');
  // console.log(a, b, this);
});

// 只触发一次
myEmitter.once('onceEvent', () => {
  console.log('只触发一次');
});

// process.on('uncaughtException', (err) => {
//   console.error('有错误1');
//   console.error(err);
// });

myEmitter.on('error', (err) => {
  console.error('有错误2');
  console.error(err);
});

myEmitter.on('removeListener', (event, listener) => {
  console.log('移除事件：', event);
});

myEmitter.emit('event', 'a', 'b');
myEmitter.emit('event', 1, 2);
myEmitter.emit('onceEvent');
myEmitter.emit('onceEvent');

myEmitter.emit('error', new Error('whoops!'));

console.log(myEmitter.eventNames());

// console.log('11111');
