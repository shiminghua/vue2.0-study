'use strict';

/***
 * 列表
*/
class List {
    constructor() {
        this.pos = 0; // 列表的当前位置
        this.listSize = 0; // 列表的元素个数
        this.dataStore = []; // 初始化一个空数组来保存列表元素
    }
    /***
     * 给列表添加元素
    */
    append(element) {
        this.dataStore[this.listSize++] = element;
    }
    /***
     * 查找元素位置
    */
    find(element) {
        for (let i = 0, len = this.dataStore.length; i < len; i++) {
            if (this.dataStore[i] === element) {
                return i;
            }
        }
        return -1;
    }
    /**
     * 从列表中删除元素
    */
    remove(element) {
        let foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            this.listSize--;
            return true;
        }
        return false;
    }
    /***
     * 返回列表中元素的个数
    */
    length() {
        return this.listSize;
    }
    /***
     * 返回列表的字符串形式
    */
    toString() {
        return this.dataStore;
    }
    /***
     * 向列表中插入一个元素
    */
    insert(element, after) {
        let insertPos = this.find(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            this.listSize++;
            return true;
        }
        return false;
    }
    /***
     * 清空列表中所有元素
    */
    clear() {
        delete this.dataStore; // 删除数组
        this.dataStore = []; // 创建一个空数组
        this.listSize = this.pos = 0; // 设置列表的当前位置和列表的元素个数为0
    }
    /***
     * 判断给定的值是否在列表中
    */
    contains(element) {
        for (let i = 0, len = this.dataStore.length; i < len; i++) {
            if (this.dataStore[i] === element) {
                return true;
            }
        }
        return false;
    }


    /*********************  迭代器方法  **********************/
    /***
     * 将列表的当前位置移动到第一个元素
    */
    front() {
        this.pos = 0;
    }
    /****
     * 将列表的当前位置移动到最后一个元素
    */
    end() {
        this.pos = this.listSize - 1;
    }
    /****
     * 将当前位置后移一位
    */
    prev() {
        if (this.pos > 0) {
            this.pos--;
        }
    }
    /***
     * 将当前位置前移一位
    */
    next() {
        if (this.pos < this.listSize - 1) {
            this.pos++;
        }
    }
    /***
     * 返回列表的当前位置
    */
    currPos() {
        return this.pos;
    }
    /***
     * 将当前位置移动到制定位置
    */
    moveTo(position) {
        this.pos = position;
    }
    /***
     * 返回当前位置的元素
    */
    getElement() {
        return this.dataStore[this.pos];
    }
}

export default List;