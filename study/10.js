
async function delay(time, fn) {
  const promiseDelay = new Promise((resolve, reject) => {
    setTimeout(resolve, time, 'success');
  });
  await promiseDelay;
  fn();
}

function a() {
  console.log(1);
}

delay(3000, a);
