/**
 * 汉诺塔 从a移动到c
 * @param {number} disc 圆盘
 * @param {string} a 源
 * @param {string} b 辅助
 * @param {string} c 目标
 */
const hanoi = function (disc, a, b, c) {
  if (disc > 0) {
    hanoi(disc - 1, a, c, b);
    document.writeln(`Move disc ${disc} from ${a} to ${c} <br />`);
    hanoi(disc - 1, b, a, c);
  }
};
hanoi(3, 'A', 'B', 'C');
document.writeln('----------------------------<br/>');
// hanoi(4, 'A', 'B', 'C');

/**
 * 阶乘 递归
 * 
 * 尾调用优化
 */
let factorial = function (i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};

console.log(factorial(5));