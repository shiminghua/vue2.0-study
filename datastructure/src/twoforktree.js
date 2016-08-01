'use strict';

/******************************
 * 二叉查找树
*/
// 二叉查找树节点
class Node {
    constructor(data, left, right) {
        // 数据
        this.data = data;
        // 左节点
        this.left = left;
        // 右节点
        this.right = right;
    }
    /****
     * 显示节点
    */
    show() {
        return this.data;
    }
}
// 二叉查找树类
class TwoForkTree {
    constructor() {
        // 根节点
        this.root = null;
    }
    /****
     * 加入新节点
    */
    insert(data) {
        // 初始化新节点
        let node = new Node(data, null, null);
        // 如果不存在跟节点，将新节点设为跟节点
        if (this.root == null) {
            this.root = node;
        }
        else {
            let current = this.root;
            let parent;
            // 循环二叉树
            while (true) {
                parent = current;
                console.log('----parent:', parent.data);
                // 如果新值小于当前节点的值，查找左节点
                if (data < current.data) {
                    current = current.left;
                    if (current == null) {
                        parent.left = node;
                        break;
                    }
                }
                // 新值大于当前节点的值，查找右节点
                else {
                    current = current.right;
                    if (current == null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }
    /****
     * 中序遍历二叉树
    */
    inOrder(node) {
        let retArr = [];
        if (node != null) {
            this.inOrder(node.left);
            retArr.push(node.show());
            this.inOrder(node.right);
        }
    }
}

let orderTree = (function() {
    let retArr = [];
    function order(node) {
        if (!(node == null)) {
            order(node.left);
            retArr.push(node.show());
            order(node.right);
        }
        return retArr;
    }
    return order;
})();

let getOrderFunc = function(type) {

}

export default TwoForkTree;