/**
 * 抽象工厂模式
 * 
 * 抽象工厂模式（abstract factory）：通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责创建莫一类产品的实例。
 */

// 抽象工厂方法
let VehicleFactory = function (subType, superType) {
  // 判断抽象工厂中是否有该抽象类
  if (typeof VehicleFactory[superType] === 'function') {
    // 缓存类
    function F() { };
    // 继承父类属性和方法
    F.prototype = new VehicleFactory[superType]();
    // 子类原型继承‘父类’
    subType.prototype = new F();
    // 将子类 constructor 指向子类
    subType.constructor = subType;
  }
  else {
    // 不存在该抽象类，抛出错误
    throw new Error('未创建该抽象类');
  }
};

// 小汽车抽象类
VehicleFactory.Car = function () {
  this.type = 'car';
};
VehicleFactory.Car.prototype = {
  getPrice: function () {
    throw new Error('抽象方法不能调用');
  },
  getSpeed: function () {
    throw new Error('抽象方法不能调用');
  },
};
// 公交车抽象类
VehicleFactory.Bus = function () {
  this.type = 'bus';
};
VehicleFactory.Bus.prototype = {
  getPrice: function () {
    throw new Error('抽象方法不能调用');
  },
  getPassengerNum: function () {
    throw new Error('抽象方法不能调用');
  },
};
// 货车抽象类
VehicleFactory.Truck = function () {
  this.type = 'truck';
};
VehicleFactory.Truck.prototype = {
  getPrice: function () {
    throw new Error('抽象方法不能调用');
  },
  getTrainload: function () {
    throw new Error('抽象方法不能调用');
  },
};

// 使用

// 宝马汽车子类
let BMW = function (price, speed) {
  this.price = price;
  this.speed = speed;
};
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function () {
  return this.price;
};
BMW.prototype.getSpeed = function () {
  return this.speed;
};

// 兰博基尼汽车子类
let Lamborghini = function (price, speed) {
  this.price = price;
  this.speed = speed;
};
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(Lamborghini, 'Car');
Lamborghini.prototype.getPrice = function () {
  return this.price;
};
Lamborghini.prototype.getSpeed = function () {
  return this.speed;
};

// 宇通汽车子类
let YUTONG = function (price, passenger) {
  this.price = price;
  this.passenger = passenger;
};
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(YUTONG, 'Bus');
YUTONG.prototype.getPrice = function () {
  return this.price;
};
YUTONG.prototype.getPassengerNum = function () {
  return this.passenger;
};

// 奔驰汽车子类
let BenzTruck = function (price, trainLoad) {
  this.price = price;
  this.trainLoad = trainLoad;
};
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(BenzTruck, 'Truck');
BenzTruck.prototype.getPrice = function () {
  return this.price;
};
BenzTruck.prototype.getTrainload = function () {
  return this.trainLoad;
};

// 测试
const truck = new BenzTruck(100000, 1000);
console.log(truck);
console.log(truck.type);
console.log(truck.getPrice());
console.log(truck.getTrainload());
