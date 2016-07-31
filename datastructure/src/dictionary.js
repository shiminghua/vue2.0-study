'use strict';

/*************
 * 字典
*/
class Dictionary {
    constructor() {
        // 使用数组实现字典
        this.dataStore = [];
    }
    /****
     * 添加元素
    */
    add(key, value) {
        this.dataStore[key] = value;
    }
    /****
     * 查找元素
    */
    find(key) {
        return this.dataStore[key];
    }
    /****
     * 删除
    */
    remove(key) {
        delete this.dataStore[key];
    }
    /****
     * 显示所有键值对
    */
    showAll() {
        let retArr = [];
        let dataStore = this.dataStore;
        Object.keys(dataStore).forEach(function(key) {
            retArr.push(key + ' -> ' + dataStore[key]);
        });
        // for (let key in Object.keys(this.dataStore)) {
        //     retArr.push(key + ' -> ' + this.dataStore[key]);
        // }
        return retArr;
    }
    /****
     * 字典中的元素个数
    */
    count() {
        return Object.keys(this.dataStore).length;
    }
    /****
     * 清空字典
    */
    clear() {
        delete this.dataStore;
        this.dataStore = [];
    }
}

export default Dictionary;