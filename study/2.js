
function a() {
  console.log(arguments);
  Array.prototype.slice.call(null, arguments);
}

// a(2,3,4);

function b(a = 1, b, ...c) {
  b = b || 3;

  console.log(a, b);

  console.log(c);
}
b(undefined, 2, 1, 2, 3, 4, 5);

// function
