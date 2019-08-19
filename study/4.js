
function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('a');
      resolve('a');
    }, 1000);
  });
}

function b() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('b');
      resolve('b');
    }, 5000);
  });
}

Promise.race([a(), b()])
.then((res) => {
  console.log(res);
});
