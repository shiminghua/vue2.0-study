import LinkedList from './linked_list';

describe('链表测试', () => {

  let linkedList = new LinkedList();

  // linkedList.length = 6;
  // console.log(linkedList.length);
  
  test('链表初始化', () => {
    expect(linkedList.size()).toBe(0);
    expect(linkedList.getHead().element).toBe('head');
    expect(linkedList.tail).toBeUndefined();
  });

  test('链表push测试', () => {
    linkedList.push(0);
    expect(linkedList.getFirstNode().element).toBe(0);
    expect(linkedList.size()).toBe(1);
    expect(linkedList.tail.element).toBe(0);
  });

  test('清空链表', () => {
    linkedList.pushArray([1, 2, 3, 4, 5]);
    linkedList.clean();
    expect(linkedList.size()).toBe(0);
  });

});
