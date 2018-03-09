
const arr = [2, 5, 4, 6, 1, 3, 8, 9, 7, 0];

for (let j = 1, len = arr.length; j < len; j++) {
  let key = arr[j];
  let i = j - 1;
  console.log(i, key);
  while (i >= 0 && arr[i] > key) {
    arr[i + 1] = arr[i];
    i = i - 1;
  }
  console.log(i);
  arr[i + 1] = key;
}

console.log(arr);