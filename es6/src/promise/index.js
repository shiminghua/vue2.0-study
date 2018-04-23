/**
 * promise
 */

let rejected

let possiblyUnhandledRejections = new Map();

window.onunhandledrejection = function (event) {
  possiblyUnhandledRejections.set(event.promise, event.reason);
};

window.onrejectionhandled = function (event) {
  possiblyUnhandledRejections.delete(event.promise);
};

setInterval(function () {
  possiblyUnhandledRejections.forEach(function (reason, promise) {
    console.log(reason.message ? reason.message : reason);
  });
  possiblyUnhandledRejections.clear();
  console.log(1111);
}, 6000);


// rejected = Promise.reject(new Error('Explosion!'));

let p1 = new Promise(function (resolve, reject) {
  resolve(42);
});
let p2 = new Promise(function (resolve, reject) {
  resolve(43);
});
let p3 = new Promise(function (resolve, reject) {
  resolve(44);
});
let p4 = Promise.all([p1, p2, p3]);
p4.then(function (value) {
  console.log(value);
});