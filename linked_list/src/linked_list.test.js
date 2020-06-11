import LinkedList from './linked_list';

describe('链表测试', () => {

  let linkedList = new LinkedList();

  test('链表初始化', () => {
    expect(linkedList.size()).toBe(0);
    expect(linkedList.getFirstElement()).toBeUndefined();
    expect(linkedList.getLastElement()).toBeUndefined();
  });

  test('链表push测试', () => {
    linkedList.push(0);
    expect(linkedList.getFirstElement()).toBe(0);
    expect(linkedList.size()).toBe(1);
    expect(linkedList.getLastElement()).toBe(0);
  });

  test('清空链表', () => {
    linkedList.pushArray([1, 2, 3, 4, 5]);
    linkedList.clean();
    expect(linkedList.size()).toBe(0);
    expect(linkedList.getHead().next).toBeUndefined();
    expect(linkedList.getTail()).toBeUndefined();
    expect(linkedList.getFirstNode()).toBeUndefined();
  });

  test('查询链表', () => {
    linkedList.clean();
    linkedList.pushArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(linkedList.indexOf(0)).toBe(0);
    expect(linkedList.indexOf(9)).toBe(9);
    expect(linkedList.indexOf(5)).toBe(5);
    expect(linkedList.indexOf(10)).toBe(-1);
    expect(linkedList.indexOf(-1)).toBe(-1);
    expect(linkedList.indexOf(20)).toBe(-1);
  });

  test('链表插入', () => {
    linkedList.insert(20, 5);
    expect(linkedList.indexOf(20)).toBe(5);
    expect(linkedList.size()).toBe(11);
    linkedList.insert(100, 0);
    expect(linkedList.indexOf(100)).toBe(0);
    expect(linkedList.size()).toBe(12);
    linkedList.insert(200, 12);
    expect(linkedList.indexOf(200)).toBe(12);
    expect(linkedList.size()).toBe(13);
    linkedList.insert(300, 1);
    expect(linkedList.indexOf(300)).toBe(1);
    expect(linkedList.size()).toBe(14);
    linkedList.insert(400, 13);
    expect(linkedList.indexOf(400)).toBe(13);
    expect(linkedList.size()).toBe(15);
  });

  test('链表删除', () => {
    linkedList.clean();
    linkedList.pushArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(linkedList.removeAt(0)).toBe(0);
    expect(linkedList.indexOf(0)).toBe(-1);
    expect(linkedList.indexOf(1)).toBe(0);
    expect(linkedList.size()).toBe(9);

    expect(linkedList.removeAt(8)).toBe(9);
    expect(linkedList.getElementAt(7)).toBe(8);
    expect(linkedList.size()).toBe(8);

    expect(linkedList.remove(4)).toBe(4);
    expect(linkedList.size()).toBe(7);

    expect(linkedList.remove(10)).toBeUndefined();
    expect(linkedList.size()).toBe(7);
  });

  test('在头部添加节点', () => {
    linkedList.clean();
    linkedList.addHead(0);
    expect(linkedList.getElementAt(0)).toBe(0);
    expect(linkedList.length).toBe(1);
    linkedList.addHead(1);
    expect(linkedList.indexOf(1)).toBe(0);
    expect(linkedList.getElementAt(0)).toBe(1);
    expect(linkedList.size()).toBe(2);
  });

  test('在头部删除节点', () => {
    linkedList.clean();
    linkedList.addHead(0);
    linkedList.addHead(1);
    expect(linkedList.removeHead()).toBe(1);
    expect(linkedList.removeHead()).toBe(0);
    expect(linkedList.removeHead()).toBeUndefined();
  });

  test('在尾部删除节点', () => {
    linkedList.clean();
    linkedList.addHead(0);
    linkedList.addHead(1);

    expect(linkedList.removeTail()).toBe(0);
    expect(linkedList.size()).toBe(1);
    expect(linkedList.removeTail()).toBe(1);
    expect(linkedList.removeTail()).toBeUndefined();
  });

  test('复制链表', () => {
    linkedList.clear();
    linkedList.pushArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let linkedList2 = linkedList.copy();

    expect(linkedList.size()).toBe(10);
    expect(linkedList.getFirstElement()).toBe(0);
    expect(linkedList.getLastElement()).toBe(9);
  });

  test('链表concat测试', () => {

    linkedList.clear();
    linkedList.pushArray([0, 1, 2, 3, 4, 5]);
    expect(linkedList.size()).toBe(6);
    expect(linkedList.getFirstElement()).toBe(0);
    expect(linkedList.getLastElement()).toBe(5);

    let linkedList2 = LinkedList.fromArray([6, 7, 8, 9]);
    linkedList.concat(linkedList2);

    expect(linkedList.size()).toBe(10);
    expect(linkedList.getFirstElement()).toBe(0);
    expect(linkedList.getLastElement()).toBe(9);

    linkedList.clear();
    linkedList.concat(linkedList2);
    expect(linkedList.size()).toBe(4);
    expect(linkedList.getFirstElement()).toBe(6);
    expect(linkedList.getLastElement()).toBe(9);

    linkedList.clear();
    linkedList2.clear();
    linkedList.pushArray([0, 1, 2, 3, 4, 5]);
    linkedList.concat(linkedList2);
    expect(linkedList.size()).toBe(6);
    expect(linkedList.getFirstElement()).toBe(0);
    expect(linkedList.getLastElement()).toBe(5);
  });

  test('在任意位置插入链表', () => {
    linkedList.clear();
    linkedList.pushArray([0, 1, 2, 3, 4, 5]);
    let linkedList2 = LinkedList.fromArray([6, 7, 8, 9]);
    linkedList.insert(linkedList2, 0);
  });
});
