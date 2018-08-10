/**
 * 城市公交车 - 享元模式
 * 
 * 享元模式（flyweight）：运用共享技术有效的支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销。
 */



/**
 * 翻页需求
 */
// 享元对象
let Flyweight = function () {
  // 已创建的对象
  let created = [];
  // 创建一个新闻包装容器
  function create() {
    let dom = document.createElement('div');
    // 将容器插入新闻列表容器
    document.getElementById('container').appendChild(dom);
    // 缓存新创建的元素
    created.push(dom);
    // 返回新创建的元素
    return dom;
  }
  return {
    // 获取创建新闻元素方法
    getDiv() {
      // 如果已创建的元素小于当前页元素总个数，则创建
      if (created.length < 5) {
        return create();
      }
      else {
        // 获取第一个元素，并插入最后面
        let div = created.shift();
        created.push(div);
        return div;
      }
    },
  };
}();

console.log(Flyweight);

// 实现分页
const article = [];
for (let i = 0; i < 103; i++) {
  article.push(`第 ${i} 条新闻`);
}
let pager = {
  paper: 0,
  num: 5,
  len: article.length,
  // 添加5条新闻
  init() {
    for (let i = 0; i < this.num; i++) {
      if (article[i]) {
        // 通过享元类获取创建的元素并写入新闻内容
        Flyweight.getDiv().innerHTML = article[i];
      }
    }
  },
  // 下一页
  next() {
    let _this = this;
    document.getElementById('next_page').onclick = function () {
      // 如果内容不足5条则返回
      if (article.length < _this.num) {
        return;
      }
      // 获取当前页的第一条新闻索引
      let n = ++_this.paper * _this.num % _this.len;
      let j = 0;
      console.log(n);
      for (; j < _this.num; j++) {
        // 如果存在 n + j 条则插入
        if (article[n + j]) {
          Flyweight.getDiv().innerHTML = article[n + j];
        }
        else {
          Flyweight.getDiv().innerHTML = '';
        }
      }
    };
  }
};

pager.init();
pager.next();


/**
 * 享元动作
 */
let FlyweightMove = {
  moveX(x) {
    this.x = x;
  },
  moveY(y) {
    this.y = y;
  },
};

// 人继承移动方法
let Player = function (x, y, c) {
  this.x = x;
  this.y = y;
  this.color = c;
};
Player.prototype = FlyweightMove;
Player.prototype.changeC = function (c) {
  this.color = c;
};

// 让精灵继承移动的方法
let Spirit = function (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
};
Spirit.prototype = FlyweightMove;
Spirit.prototype.changeR = function (r) {
  this.r = r;
};

// 创建一个人
let player1 = new Player(5, 6, 'red');
console.log(player1);
// 让人移动起来
player1.moveX(6);
player1.moveY(7);
player1.changeC('pink');
console.log(player1);

// 创建一个精灵
let spirit1 = new Spirit(2, 3, 4);
console.log(spirit1);
// 让精灵移动起来
spirit1.moveX(3);
spirit1.moveY(4);
spirit1.changeR(5);
console.log(spirit1);
