
function a() {
  this.a = 0;

  setInterval(() => {
    console.log(this, this.a, this.a++);
  }, 1000);
}

// a();

class b {
  constructor(x) {
this.x = x;
  }

  test() {
    console.log(this.x);
  }
}

class c extends b {
  constructor(x, y) {
    super(x);
    this.y = y;
  }
  print() {
    super.test();
    console.log(this.x, this.y);
  }
}

let cc = new c(5, 6);
cc.print();
