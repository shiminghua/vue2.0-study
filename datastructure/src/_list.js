function List() {
    this.dataStore = []; // 初始化一个空数组来保存列表元素
    this.pos = 0; // 列表的当前位置
    this.listSize = 0; // 列表的元素个数
}

List.prototype = {
    /***
     * 给列表添加元素
    */
    append: function(element) {
        this.dataStore[this.listSize++] = element;
    },
    /****
     * 查找元素位置
    */
    find: function(element) {
        for (var i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] === element) {
                return i;
            }
            return -1;
        }
    },
    /***
     * 从列表中删除元素
    */
    remove: function(element) {
        var foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            this.listSize--;
            return true;
        }
        return false;
    },
    /******
     * 返回列表中元素的个数
    */
    length: function() {
        return this.listSize;
    },
    /***
     * 返回列表的字符串形式
    */
    toString: function() {
        return this.dataStore;
    },
    /********
     * 向列表中插入一个元素
    */
    insert: function(element, after) {
        var insertPos = this.find(after);
        if(insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            this.listSize++;
            return true;
        }
        return false;
    },
    /***
     * 清空列表中所有元素
    */
    clear: function() {
        delete this.dataStore;
        this.dataStore.length = 0;
        this.listSize = this.pos = 0;
    },
    /**
     * 判断给定值是否在列表中
    */
    contains: function(element) {
        for (var i = 0; i < this.dataStore.legnth; i++) {
            if (this.dataStore[i] === element) {
                return true;
            }
        }
        return false;
    },
    /***
     * 将列表的当前位置移动到第一个元素
    */
    front: function() {
        this.pos = 0;
    },
    /***
     * 将列表的当前位置移动到最后一个位置
    */
    end: function() {
        this.pos = this.listSize - 1;
    },
    /****
     * 将当前位置后移一位
    */
    prev: function() {
        if (this.pos > 0) {
            this.pos--;
        }
    },
    /***
     * 将当前位置前移一位
    */
    next: function() {
        if (this.pos < this.listSize - 1) {
            this.pos++;
        }
    },
    /***
     * 返回列表的当前位置
    */
    currPos: function() {
        return this.pos;
    },
    /***
     * 将当前位置移动到指定位置
    */
    moveTo: function(position) {
        this.pos = position;
    },
    /***
     * 返回当前位置的元素
    */
    getElement: function() {
        return this.dataStore[this.pos];
    }
};