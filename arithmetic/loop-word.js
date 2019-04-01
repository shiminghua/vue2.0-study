/***
 * 循环单词
 */
const data = require('./loop-test-data');

// console.log(data.length);

const dict = ["picture", "turepic", "icturep", "word", "ordw", "lint"];

// 删除紧邻的相同字母
function deleteSameLetter(val) {
  const letterArr = val.split('');
  const len = letterArr.length;
  let resultLetter = [];
  let temp;
  // 记录每个单词出现的次数
  let letterNum = {};
  for (let i = 0; i < len; i++) {
    temp = letterArr[i];
    if (i === 0) {
      resultLetter.push(temp);
      letterNum[temp] = 1;
    }
    else if (temp != letterArr[i - 1]) {
      resultLetter.push(temp);
      if (letterNum[temp]) {
        letterNum[temp]++;
      }
      else {
        letterNum[temp] = 1;
      }
    }
  }
  // console.log('delete same letter', resultLetter);
  return {
    val,
    letter: resultLetter,
    wordLen: resultLetter.length,
    letterNum,
  };
}


// console.log(deleteSameLetter('aaaaabbbbbcddaac'));
// deleteSameLetter('picture');

// 生成一个单词的所有循环可能
function createLoopWord(val) {
  const arr = val.split('');
  const len = arr.length;
  let letterArr = arr.concat([]);
  // let loopWord = [];
  for (let i = 0; i < len - 1; i++) {
    letterArr.push(arr.shift())
  }

  return letterArr;
}

// console.log(createLoopWord('abcde'));

/**
 * 判断一个单词是否为另一个单词的循环单词
 * 是返回1，否返回0
 * @param {*} val1 
 * @param {*} val2 
 */
function isLoopWord(val1, val2) {
  // 长度不相等
  if (val1.length != val2.length) {
    return 0;
  }
  // 字符串完全相等
  if (val1 === val2) {
    return 0;
  }

}

function loopWord(arr) {

  let set = new Set();
  let num = 0;
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    let tempWord = word + word;
    let x = 0;

    for (let j = 0; j < arr.length; j++) {
      if (tempWord.indexOf(arr[j]) >= 0) {
        set.add(word);
        x++;
      }
    }

    if (x >= 2) {
      num++;
    }
    // console.log(num);
  }
  console.log(num);

  // console.log(letterArr);
}

loopWord(data);


// let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// for (let i = 0; i < a.length; i++) {

//   for (let j = 0; j < 5; j++) {
//     // console.log(a[j]);
//     console.log(a.splice(j, 1));

//     console.log(a);
//   }
// }
