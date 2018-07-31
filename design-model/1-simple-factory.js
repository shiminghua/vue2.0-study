/**
 * 简单工厂
 */

// 1. 通过简单工厂来创建对象，可以让这些对象公用一些资源而又私有一些资源。
// 2. 使用场合限制在创建单一对象。

// 篮球基类
const Basketball = function () {
  this.intro = '篮球盛行于美国';
};
Basketball.prototype = {
  getMember: function () {
    console.log('每个队伍需要5个队员');
  },
  getBallSize: function () {
    console.log('篮球很大');
  },
};

// 足球基类
const Football = function () {
  this.intro = '足球在世界范围内很流行';
};
Football.prototype = {
  getMember: function () {
    console.log('每个队伍需要11名队员');
  },
  getBallSize: function () {
    console.log('足球很大');
  },
};

// 网球基类
const Tennis = function () {
  this.intro = '每年有很多网球系列赛';
};
Tennis.prototype = {
  getMember: function () {
    console.log('每个队伍需要1名队员');
  },
  getBallSize: function () {
    console.log('网球很小');
  },
};


// 运动工厂
const SportsFactory = function (name) {
  switch (name) {
    case 'NBA':
      return new Basketball();
    case 'wordCup':
      return new Football();
    case 'FrenchOpen':
      return new Tennis();
  }
};

/**
 * 工厂模式
 */
function createBook(name, time, type) {
  let o = new Object();
  o.name = name;
  o.time = time;
  o.type = type;
  o.getName = function () { 
    console.log(this.name);
  };
  return o;
}
