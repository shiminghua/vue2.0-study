// 双向链表测试
import DoublyLinkedList from './doubly_linked_list';

describe('双向链表测试', () => {

  let linkedList = new DoublyLinkedList();

  test('链表初始化', () => {
    expect(linkedList.size()).toBe(0);
    expect(linkedList.getHead().element).toBe('head');
    expect(linkedList.getTail().element).toBe('tail');
    expect(linkedList.head.next.element).toBe('tail');
    expect(linkedList.tail.prev.element).toBe('head');
    expect(linkedList.getFirstNode()).toBeUndefined();
  });

  test('链表push测试', () => {
    linkedList.push(0);
    expect(linkedList.getFirstNode().element).toBe(0);
    expect(linkedList.size()).toBe(1);
    expect(linkedList.getLastNode().element).toBe(0);
    linkedList.push(10);
    expect(linkedList.getFirstNode().element).toBe(0);
    expect(linkedList.size()).toBe(2);
    expect(linkedList.getLastNode().element).toBe(10);
    linkedList.pushArray([2, 3, 4, 100]);
    expect(linkedList.getFirstNode().element).toBe(0);
    expect(linkedList.size()).toBe(6);
    expect(linkedList.getLastNode().element).toBe(100);
  });

  test('清空链表', () => {

    linkedList.clean();
    expect(linkedList.size()).toBe(0);
    expect(linkedList.getFirstNode()).toBeUndefined();
    expect(linkedList.getLastNode()).toBeUndefined();
    expect(linkedList.getHead().element).toBe('head');
    expect(linkedList.getTail().element).toBe('tail');
    expect(linkedList.getHead().next).toBe(linkedList.getTail());
    expect(linkedList.getTail().prev).toBe(linkedList.getHead());
  });

  test('链表查询', () => {
    linkedList.clean();
    linkedList.pushArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(linkedList.indexOf(0)).toBe(0);
    expect(linkedList.indexOf(9)).toBe(9);
    expect(linkedList.indexOf(5)).toBe(5);
    expect(linkedList.indexOf(10)).toBe(-1);
    expect(linkedList.indexOf(-1)).toBe(-1);
    expect(linkedList.indexOf(20)).toBe(-1);
    expect(linkedList.indexOf(-10)).toBe(-1);
  });

  test('链表插入', () => {
    linkedList.clean();
    linkedList.pushArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
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

    linkedList.clean();
    linkedList.pushArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    linkedList.insertArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
    expect(linkedList.size()).toBe(20);
    expect(linkedList.getFirstNode().element).toBe(0);
    expect(linkedList.getLastNode().element).toBe(9);
    // console.log(linkedList.toArray());
    // console.log(linkedList.toString());
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

    linkedList.clean();
    linkedList.addHeadArray([0, 1, 2, 3, 4]);
    expect(linkedList.getFirstNode().element).toBe(0);
    expect(linkedList.getLastNode().element).toBe(4);
    expect(linkedList.size()).toBe(5);
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

});
