// 判断结束条件 - 可能性数组为空
// 成功：arr没有0值
// 失败：arr有0值

// 数独初始值
const data1 = [
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
// console.log('data', data1);

// 可能性数组
const possibleArr = [];
for (let i = 0; i < 9; i++) {
  if (!possibleArr[i]) {
    possibleArr[i] = [];
  }
  for (let j = 0; j < 9; j++) {
    possibleArr[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}

// console.log('possibleArr', possibleArr);


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

  return palace;

}

// console.log('palace', toPalace(data1));

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
// console.log('row', toRow(data1));


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

// console.log('col', toCol(data1));


// 获得可能性数组
function getPossibleArr(arr) {

  const palace = toPalace(arr);
  const row = toRow(arr);
  const col = toCol(arr);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      let tempArr = possibleArr[i][j];
      if (arr[i][j] > 0) {
        tempArr = [];
      }

      // 扫描行,存在则删除
      tempArr = tempArr.filter((num) => {
        return row[i].indexOf(num) < 0;
      });

      // 扫描列，存在删除
      tempArr = tempArr.filter((num) => {
        return col[j].indexOf(num) < 0;
      });

      // 扫描宫，存在删除
      tempArr = tempArr.filter((num) => {

        return palace[Math.floor(i / 3)][Math.floor(j / 3)].indexOf(num) < 0;
      });

      possibleArr[i][j] = tempArr;

    }

  }

  return possibleArr;
}


// 处理可能性只有一个数字的情况：如果有单个可能性值，直接填入
function alonePossible(possibleArr, arr, i, j, fn) {

  if (possibleArr[i][j].length === 1) {

    arr[i][j] = possibleArr[i][j][0];

    return arr;
  }
}




// 处理可能性有两个数字的情况，先填入第一个
function twoPossible(possibleArr, arr, i, j, fn, n = 0) {
  if (possibleArr[i][j].length === 2) {
    arr[i][j] = possibleArr[i][j][n];
    // isComplete(possibleArr, arr, fn);
    // isComplete(possibleArr, arr, () => {
    //   twoPossible(possibleArr, arr, i, j, fn, 1);
    //   isComplete(possibleArr, arr, fn);
    // });
  }
}


let x = 0;
// 判断递归完成和验证算法是否成功
function isComplete(possibleArr, arr, fn) {
  let possibleArrLen = 0;
  // 递归
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      // 计算可能性长度
      possibleArrLen += possibleArr[i][j].length;
      if (arr[i][j] > 0) {
        isSuccess = false;
      }
    }
  }


  console.log('---------->', possibleArr);
  console.log('==========>', arr);

  if (possibleArrLen === 0) {
    console.warn('完成递归');


    // 判断成功失败
    if (isSuccess) {
      console.log('运算成功！！！！！！！');
    }
    else {
      console.error('运算失败');
    }

  }

}



let isSuccess = true;

function sudoku(arr) {

  const possibleArr = getPossibleArr(arr);
  const row = toRow(arr);
  const col = toCol(arr);

  // console.log(possibleArr);

  // 递归
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      alonePossible(possibleArr, arr, i, j, sudoku);
      // twoPossible(possibleArr, arr, i, j, sudoku);

    }

  }

  hasOneNum(possibleArr, arr, sudoku);

  // hasOneNumOfCol(possibleArr, arr, sudoku);


  isComplete(possibleArr, arr, sudoku);

  return arr;
}


// 如果一行只出现一个数字一次，则填入
function hasOneNum(possibleArr, arr, fn) {
  let rowState;

  for (let i = 0; i < 9; i++) {
    rowState = {};
    for (let j = 0; j < 9; j++) {
      let tempArr = possibleArr[i][j];
      for (let x = 0; x < tempArr.length; x++) {

        if (!rowState[tempArr[x]]) {
          rowState[tempArr[x]] = {
            i,
            j,
            val: tempArr[x],
            num: 0,
          };
        }
        rowState[tempArr[x]].num++;

      }

    }

    console.log('row', rowState);

    let stateTemp;
    let stateArr = Object.keys(rowState);
    for (let i = 0; i < stateArr.length; i++) {
      stateTemp = rowState[stateArr[i]];
      if (stateTemp && stateTemp.num === 1) {
        arr[stateTemp.i][stateTemp.j] = stateTemp.val;
        return fn(arr);
        return arr;
      }
    }

  }


}


// 如果一列只出现一个数字一次，则填入
function hasOneNumOfCol(possibleArr, arr, fn) {
  let rowState;

  for (let i = 0; i < 9; i++) {
    rowState = {};
    for (let j = 0; j < 9; j++) {
      let tempArr = possibleArr[j][i];
      for (let x = 0; x < tempArr.length; x++) {

        if (!rowState[tempArr[x]]) {
          rowState[tempArr[x]] = {
            i,
            j,
            val: tempArr[x],
            num: 0,
          };
        }
        rowState[tempArr[x]].num++;

      }

    }
    console.log('col', rowState);
    let stateTemp;
    let stateArr = Object.keys(rowState);
    for (let i = 0; i < stateArr.length; i++) {
      stateTemp = rowState[stateArr[i]];
      if (stateTemp && stateTemp.num === 1) {
        arr[stateTemp.i][stateTemp.j] = stateTemp.val;
        // return fn(arr);
        return arr;
      }
    }

  }


}



for (let i = 0; i < 1000; i++) {
  let arrResult = sudoku(data1);
  // console.log(1111111111, arrResult);
  // sudoku(arrResult);
}