const test_data = {
  "desc": "禁止上网查算法, 但是可以查语法, 可以查定义",
  "desc": "级别为入门和简单级别,均可以通过逻辑方式解答，解题过程不需要猜测。所有的题目都有唯一解。",
  "succ": "使用算法,解出来下面的数据题.不要求解出来全部的数据题.只要通过下面的测试,就算成功",
  "test0": {
    "input": {
      "r1": [0, 0, 0, 8, 0, 0, 1, 2, 9],
      "r2": [0, 0, 5, 0, 0, 0, 0, 0, 4],
      "r3": [4, 0, 0, 1, 9, 0, 0, 3, 0],
      "r4": [0, 0, 0, 0, 0, 0, 0, 8, 0],
      "r5": [0, 0, 0, 3, 0, 5, 2, 7, 0],
      "r6": [0, 0, 0, 0, 2, 0, 0, 0, 0],
      "r7": [1, 3, 0, 9, 0, 0, 0, 4, 0],
      "r8": [0, 8, 0, 0, 6, 0, 0, 0, 0],
      "r9": [0, 0, 6, 4, 0, 0, 0, 0, 0]
    },
    "output": {
    },
    "help": 0
  },
  "test1": {
    "input": {
      "r1": [0, 0, 0, 0, 6, 1, 0, 0, 9],
      "r2": [9, 0, 0, 5, 7, 0, 0, 0, 0],
      "r3": [6, 0, 0, 0, 0, 2, 0, 8, 0],
      "r4": [4, 0, 8, 0, 5, 3, 0, 0, 0],
      "r5": [0, 3, 0, 0, 0, 0, 0, 0, 5],
      "r6": [5, 0, 0, 9, 4, 0, 0, 0, 1],
      "r7": [0, 5, 4, 0, 8, 0, 0, 0, 0],
      "r8": [0, 7, 0, 1, 0, 0, 0, 0, 0],
      "r9": [0, 0, 0, 0, 0, 5, 1, 0, 0]
    },
    "output": {
    },
    "help": 0
  },
  "test2": {
    "input": {
      "r1": [0, 0, 0, 0, 9, 0, 0, 6, 0],
      "r2": [7, 4, 0, 0, 6, 0, 0, 0, 5],
      "r3": [0, 6, 0, 7, 1, 8, 0, 0, 0],
      "r4": [0, 1, 4, 0, 2, 0, 0, 3, 0],
      "r5": [0, 0, 0, 0, 0, 0, 4, 0, 0],
      "r6": [0, 0, 8, 0, 0, 0, 9, 0, 2],
      "r7": [0, 0, 0, 0, 4, 0, 5, 8, 0],
      "r8": [6, 0, 0, 1, 0, 0, 0, 0, 0],
      "r9": [0, 9, 0, 6, 0, 0, 0, 0, 0]
    },
    "output": {
    },
    "help": 0
  },
  "test3": {
    "input": {
      "r1": [0, 0, 0, 0, 5, 0, 0, 2, 0],
      "r2": [8, 9, 0, 0, 2, 0, 0, 0, 4],
      "r3": [0, 0, 5, 8, 1, 7, 0, 0, 0],
      "r4": [0, 1, 9, 0, 6, 0, 2, 3, 0],
      "r5": [0, 0, 0, 0, 0, 0, 0, 0, 0],
      "r6": [0, 0, 7, 0, 0, 0, 5, 0, 0],
      "r7": [0, 0, 0, 0, 9, 0, 0, 7, 0],
      "r8": [2, 0, 0, 1, 0, 0, 0, 0, 0],
      "r9": [0, 5, 0, 2, 0, 0, 0, 0, 0]
    },
    "output": {
    },
    "help": 0
  },
  "test4": {
    "input": {
      "r1": [0, 5, 0, 0, 2, 0, 6, 0, 0],
      "r2": [0, 0, 2, 0, 0, 4, 7, 1, 0],
      "r3": [0, 0, 0, 5, 0, 0, 0, 8, 0],
      "r4": [0, 0, 3, 4, 0, 0, 0, 0, 6],
      "r5": [4, 0, 0, 0, 0, 7, 0, 0, 0],
      "r6": [0, 0, 7, 0, 0, 9, 8, 0, 0],
      "r7": [0, 0, 0, 0, 0, 8, 5, 9, 0],
      "r8": [0, 8, 0, 0, 0, 0, 0, 0, 1],
      "r9": [6, 7, 0, 0, 0, 1, 2, 0, 0]
    },
    "output": {
    },
    "help": 0
  },
  "test5": {
    "input": {
      "r1": [0, 0, 9, 0, 2, 0, 0, 7, 0],
      "r2": [4, 0, 0, 0, 0, 0, 2, 0, 0],
      "r3": [0, 8, 0, 0, 0, 0, 3, 0, 5],
      "r4": [0, 0, 0, 7, 6, 0, 5, 2, 0],
      "r5": [3, 0, 0, 8, 0, 0, 0, 0, 0],
      "r6": [1, 0, 0, 0, 0, 4, 0, 0, 0],
      "r7": [0, 4, 0, 0, 0, 2, 6, 0, 0],
      "r8": [0, 0, 0, 0, 0, 1, 4, 0, 0],
      "r9": [7, 0, 0, 0, 0, 5, 0, 0, 8]
    },
    "output": {
    },
    "help": 0
  },
  "test6": {
    "input": {
      "r1": [0, 0, 0, 8, 0, 0, 1, 2, 9],
      "r2": [0, 0, 5, 0, 0, 0, 0, 0, 4],
      "r3": [4, 0, 0, 1, 9, 0, 0, 3, 0],
      "r4": [0, 0, 0, 0, 0, 0, 0, 8, 0],
      "r5": [0, 0, 0, 3, 0, 5, 2, 7, 0],
      "r6": [0, 0, 0, 0, 2, 0, 0, 0, 0],
      "r7": [1, 3, 0, 9, 0, 0, 0, 4, 0],
      "r8": [0, 8, 0, 0, 6, 0, 0, 0, 0],
      "r9": [0, 0, 6, 4, 0, 0, 0, 0, 0]
    },
    "output": {
    },
    "help": 0
  },
  "test7": {
    "input": {
      "r1": [0, 0, 0, 4, 0, 0, 1, 0, 5],
      "r2": [5, 0, 0, 0, 0, 0, 4, 3, 2],
      "r3": [0, 9, 4, 1, 0, 0, 0, 8, 0],
      "r4": [6, 0, 0, 0, 0, 1, 0, 0, 4],
      "r5": [1, 0, 0, 8, 0, 0, 0, 0, 0],
      "r6": [0, 8, 0, 0, 0, 4, 9, 0, 0],
      "r7": [7, 0, 0, 9, 0, 5, 0, 0, 0],
      "r8": [0, 0, 6, 0, 0, 0, 0, 0, 3],
      "r9": [0, 0, 0, 0, 0, 0, 0, 6, 0]
    },
    "output": {
    },
    "help": 0
  }
};

console.log(test_data);


const sudoku_data1 = [
  [0, 0, 0, 8, 0, 0, 1, 2, 9],
  [0, 0, 5, 0, 0, 0, 0, 0, 4],
  [4, 0, 0, 1, 9, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 0, 3, 0, 5, 2, 7, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [1, 3, 0, 9, 0, 0, 0, 4, 0],
  [0, 8, 0, 0, 6, 0, 0, 0, 0],
  [0, 0, 6, 4, 0, 0, 0, 0, 0]
];

/**
  1、拆分为九宫
  2、定义一个二维数组
  3、遍历行、列、宫，确定每个位置的取值范围
  4、只有一个取值范围的可以填到数独中去
  5、重复以上操作
 */

// 拆出九个宫
function toPalace(arr) {

  let palace = [];

  for (let i = 0; i < 9; i++) {

    if (!palace[Math.floor(i / 3)]) {
      palace[Math.floor(i / 3)] = [];
    }
    // console.log(palace);
    for (let x = 0; x < 3; x++) {
      if (!palace[Math.floor(i / 3)][0]) {
        palace[Math.floor(i / 3)][0] = [];
      }
      palace[Math.floor(i / 3)][0].push(arr[i][x]);

    }

    for (let y = 3; y < 6; y++) {
      if (!palace[Math.floor(i / 3)][1]) {
        palace[Math.floor(i / 3)][1] = [];
      }
      palace[Math.floor(i / 3)][1].push(arr[i][y]);

    }

    for (let z = 6; z < 9; z++) {
      if (!palace[Math.floor(i / 3)][2]) {
        palace[Math.floor(i / 3)][2] = [];
      }
      palace[Math.floor(i / 3)][2].push(arr[i][z]);

    }

  }

  console.log(1111111, palace);

  return palace;

}

// 遍历行
function toRow(arr) {
  let results = [];
  let rowArr;
  for (let i = 0; i < 9; i++) {
    rowArr = [];
    for (let j = 0; j < 9; j++) {
      rowArr.push(arr[i][j]);
    }
    results[i] = rowArr;
    // console.log('row', rowArr);
  }
  // console.log(results);
  return results;
}

// 遍历列
function toCol(arr) {
  let results = [];
  let colArr;
  for (let i = 0; i < 9; i++) {
    colArr = [];
    for (let j = 0; j < 9; j++) {
      colArr.push(arr[j][i]);
    }
    results[i] = colArr;
    // console.log('col', colArr);
  }
  return results;
}

// toPalace(sudoku_data1);
// toRow(sudoku_data1);
// toCol(sudoku_data1);



let possible = [[], [], [], [], [], [], [], [], []];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let completed = true;
let a = 1;
let possibleLength = 0;

let isLengthOne = true;

function sudoku(arr) {

  const palace = toPalace(sudoku_data1);
  const row = toRow(sudoku_data1);
  const col = toCol(sudoku_data1);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      if (arr[i][j] > 0) {
        possible[i][j] = [];
      }
      else {
        // 扫描行,存在则删除
        possible[i][j] = nums.filter((num) => {
          return row[i].indexOf(num) < 0;
        });

        // 扫描列，存在删除
        possible[i][j] = possible[i][j].filter((num) => {
          return col[j].indexOf(num) < 0;
        });
        // console.log('----->>>', possible[i][j]);
        // 扫描宫，存在删除
        possible[i][j] = possible[i][j].filter((num) => {
          // console.log(Math.floor(i / 3), Math.floor(j / 3), palace[Math.floor(i / 3)][Math.floor(j / 3)]);
          return palace[Math.floor(i / 3)][Math.floor(j / 3)].indexOf(num) < 0;
        });


      }
    }

    // console.log('=====>>>', possible[i][j]);


  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      isLengthOne = false;
      // 可能性为数组长度为1时，确定填写
      if (possible[i][j].length >= 1) {
        if (possible[i][j].length === 1) {

          arr[i][j] = possible[i][j][0];
          // possible[i][j][0] = [];

          isLengthOne = true;
          // return arr;
          sudoku(arr);
        }
        // sudoku(arr);
      }



      // 判断递归结束条件
      if (arr[i][j] <= 0) {
        completed = false;
      }

    }

    if (!isLengthOne) {
      // 计算每行数字出现个数，出现一次的填写
      let possibleCol;
      let possibleRow = possible[i];
      let possibleResult = {};
      for (let x = 0; x < 9; x++) {
        possibleCol = possibleRow[x];
        for (let y = 0; y < possibleCol.length; y++) {
          possibleNum = possibleCol[y];
          if (!possibleResult[possibleNum]) {
            possibleResult[possibleNum] = {
              num: 0,
              x: i,
              y: x,
              val: possibleNum,
            };
          }
          possibleResult[possibleNum].num++;
        }
      }

      

      Object.keys(possibleResult).forEach((key) => {
        if (possibleResult[key].num === 1) {
          arr[possibleResult[key].x][possibleResult[key].y] = possibleResult[key].val;
          // console.log('aaaaaaaaaaaaaaaaaaaaaa',a++);
          // return arr;
          sudoku(arr);
        }
        else if (possibleResult[key].num === 2) {
          arr[possibleResult[key].x][possibleResult[key].y] = possibleResult[key].val;
          // console.log('aaaaaaaaaaaaaaaaaaaaaa',a++);
          // return arr;
          console.log('=====', possibleResult);
          sudoku(arr);
        }
      });

    }




  }




  // 判断结束条件
  if (!completed) {
    // sudoku(arr);
  }

  // 递归结束
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      possibleLength += possible[i][j].length;
    }
  }
console.log(possibleLength);
  if (possibleLength <= 0) {
    console.log('递归结束');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[i][j] === 0) {
          console.error('失败');
          break;
        }
        else {
          console.warn('成功');
          break;
        }
      }
    }
  }

  console.log('----------> results: ', possible);
  console.log('+++++ 结果：', arr);
  // return arr;
  // sudoku(arr);
}

sudoku(sudoku_data1);

// for (let i = 0; i < 81; i++) {
//   let arr = sudoku(sudoku_data1);
//   console.log(99999999, arr);
//   sudoku(arr);
// }


// let arr = sudoku(sudoku_data1);
//   sudoku(arr);
