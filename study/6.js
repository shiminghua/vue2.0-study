function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('a');
      resolve('a');
    }, 1000);
  });
}

async function b() {
  
  const s = await 3;
console.log(s);
const result = await a();
  console.log('b');
}

b();
