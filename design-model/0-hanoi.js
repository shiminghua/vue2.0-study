/**
 * 汉诺塔
 * @param {number} disc 圆盘
 * @param {string} src 源
 * @param {string} aux 辅助
 * @param {string} dst 技术
 */
const hanoi = function (disc, src, aux, dst, flag) {
  console.log(disc);
  console.log(`${flag} Move disc ${disc} from ${src} to ${dst} `);
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux, '----> ');
    document.writeln(`Move disc ${disc} from ${src} to ${dst} <br />`);
    hanoi(disc - 1, aux, src, dst, '====> ');
  }
};

hanoi(2, 'A', 'B', 'C', 'first');
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