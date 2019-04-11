/***
 * 循环单词
 */
const data = require('./loop-test-data');


function loop_word(arrs) {

  // 定义数组，保存结果
  let results = [];
  let len = arrs.length;
  let wordMap = new Map();

  // 外层循环
  for (let i = 0; i < len; i++) {
    let word = arrs[i];
    // 定义循环单词的超集
    let superset_loop_word = word + word;

    for (let j = i + 1; j < len; j++) {



    }

  }

  console.log(results);

}

// loop_word(data);


function loopWord(arr) {

  let results = [];
  let count = 0;
  let word;
  let check = [];
  let obj = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    check[i] = false;
  }
  // 遍历每个单词
  for (let i = 0, len = arr.length; i < len; i++) {

    flag = false;
    word = arr[i];
    // check[i] = true;
    if (!check[i]) {
      let x = 0;
      // 循环比较每个单词是否是旋转单词
      for (let j = i + 1, len = arr.length; j < len; j++) {

        if (sameLoopWord(word, arr[j])) {
          x++;
          check[j] = true;
          saveLoopWord(obj, arr[i], arr[j]);
        }

      }
      if (x >= 1) {
        count++;
      }
    }

  }

  console.log(results);
  console.log(count);
  console.log(obj);

}

function sameLoopWord(stra, strb) {

  if (stra.length != strb.length) {
    return false;
  }

  const loopWord = stra + stra;

  if (loopWord.indexOf(strb) >= 0) {
    return true;
  }

  return false;

}

// 保存循环单词
function saveLoopWord(obj, stra, strb) {
  if (!obj[stra + stra]) {
    obj[stra + stra] = {
      words: new Set()
    };
  }

  obj[stra + stra].words.add(stra);
  obj[stra + stra].words.add(strb);
}

// console.log(sameLoopWord('abcd', 'bcdaa'));
loopWord(data);