/**
 * 递归
 */

// 经典递归问题实战

// 1. 阶乘
const Factorial = {
  /**
   * 阶乘的递归实现
   * @param {number} n 
   */
  recursion(n) {
    // 递归的终止条件
    if (n === 1) {
      return 1; // 简单情景
    }
    // 相同重复逻辑，缩小问题的规模
    return n * this.recursion(n - 1);
  },
  /**
   * 阶乘的循环实现
   * @param {number} n 
   */
  loop(n) {
    let result = n;
    while (n > 1) {
      n--;
      result = result * n;
    }
    return result;
  },
};

console.log(Factorial.recursion(5), Factorial.loop(6));

// 2. 斐波那契数列
/**
 * 斐波那契数列
 * 斐波纳契数列，又称黄金分割数列，指的是这样一个数列：1、1、2、3、5、8、13、21、…… 
 * 在数学上，斐波纳契数列以如下被以递归的方法定义：F0=0，F1=1，Fn=F(n-1)+F(n-2)（n>=2，n∈N*）。 
 * 
 * 两种递归解法：经典解法和优化解法 
 * 两种非递归解法：递推法和数组法
 */

