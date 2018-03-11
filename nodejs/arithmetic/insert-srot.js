/**
 * 排序算法 - 插入排序
 */


const arrBasic = [];
let basicLen = 100000;
for (let i = 0; i < basicLen; i++) {
  // arrBasic[i] = basicLen - i;
  arrBasic[i] = i;
}

// 计算时间
function getTimeInterval(fn) {
  let start = Date.now();
  fn();
  console.log(Date.now() - start);
}

function insertionSort(arr) {
  for (let j = 1, len = arr.length; j < len; j++) {
    let key = arr[j];
    let i = j - 1;
    while (i >= 0 && arr[i] < key) {
      arr[i + 1] = arr[i];
      i = i - 1;
    }
    arr[i + 1] = key;
  }
  return arr;
}

getTimeInterval(() => {
  insertionSort(arrBasic);
});



/**
 * 排序算法 - 选择排序
 */
function insertionSelect(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let key = arr[i];
    let j = i + 1;
    let x = i;
    while (j < len) {
      if (arr[j] < key) {
        key = arr[j];
        x = j;
      }
      j++;
    }
    arr[x] = arr[i];
    arr[i] = key;
  }
  return arr;
}

getTimeInterval(() => {
  insertionSelect(arrBasic);
});
