// 队列测试
import Queue from './queue';

describe('队列测试', () => {
  let queue = new Queue();

  test('初始化', () => {
    expect(queue.size()).toBe(0);
    expect(queue.length).toBe(0);
    expect(queue.deQueue()).toBeUndefined();
  });
});
