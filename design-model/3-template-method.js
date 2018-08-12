/**
 * 照猫画虎 - 模板方法模式
 * 
 * 模板方法模式（template method）：父类中定义一组算法骨架，而将一些实现步骤延迟到子类中，使得子类可以不改变父类的算法结构的同时可重新定义算法中某些实现步骤。
 */

// 继承
function inheritObject(o) {
  let F = function () { };
  F.prototype = o;
  return new F();
}
function inheritPrototype(subClass, superClass) {
  let p = inheritObject(superClass.prototype);
  subClass.prototype = p;
  p.constructor = subClass;
}

// 提示框
// 创建基本提示框
let Alert = function (data) {
  // 没有数据则返回
  if (!data) {
    return;
  }
  // 设置内容
  this.content = data.content;
  // 创建提示框面板
  this.panel = document.createElement('div');
  // 创建提示内容组件
  this.contentNode = document.createElement('p');
  // 创建确定按钮组件
  this.confirmBtn = document.createElement('span');
  // 创建关闭按钮组件
  this.closeBtn = document.createElement('b');
  // 为提示框面板添加类
  this.panel.className = 'alert';
  // 为关闭按钮添加类
  this.closeBtn.className = 'a-close';
  // 为确定按钮添加类
  this.confirmBtn.className = 'a-confirm';
  // 为确定按钮添加文案
  this.confirmBtn.innerHTML = data.confirm || '确认';
  // 为提示内容添加文本
  this.contentNode.innerHTML = this.content;
  // 点击确定按钮执行方法
  this.success = data.success || function () { };
  // 点击关闭按钮执行方法
  this.fail = data.fail || function () { };
};

// 提示框原型方法
Alert.prototype = {
  // 创建方法
  init() {
    // 生成提示框
    this.panel.appendChild(this.closeBtn);
    this.panel.appendChild(this.contentNode);
    this.panel.appendChild(this.confirmBtn);
    // 插入页面中
    document.body.appendChild(this.panel);
    // 绑定事件
    this.bindEvent();
    // 显示提示框
    this.show();
  },
  bindEvent() {
    let _this = this;
    // 关闭按钮点击事件
    this.closeBtn.onclick = function () {
      // 执行关闭取消方法
      _this.fail();
      // 隐藏弹层
      _this.hide();
    };
    // 确定按钮点击事件
    this.confirmBtn.onclick = function () {
      // 执行关闭确认方法
      _this.success();
      // 隐藏弹层
      _this.hide();
    };
  },
  // 隐藏弹层方法
  hide() {
    this.panel.style.display = 'none';
  },
  // 显示弹层方法
  show() {
    this.panel.style.display = 'block';
  },
};

// 右侧按钮提示框
let RightAlert = function (data) {
  // 继承基本提示框构造函数
  Alert.call(this, data);
  // 为确认框添加 right 类设置位置居右
  this.confirmBtn.className = this.confirmBtn.className + ' right';
};
// 继承基本提示框方法
// RightAlert.prototype = new Alert();
inheritPrototype(RightAlert, Alert);

// 标题提示框
let TitleAlert = function (data) {
  Alert.call(this, data);
  this.title = data.title;
  this.titleNode = document.createElement('h3');
  this.titleNode.innerHTML = this.title;
};
// TitleAlert.prototype = new Alert();
inheritPrototype(TitleAlert, Alert);
// 对基本提示框创建方法扩展
TitleAlert.prototype.init = function () {
  // 插入标题
  this.panel.insertBefore(this.titleNode, this.panel.firstChild);
  // 继承基本提示框 init 方法
  Alert.prototype.init.call(this);
};

// 继承类也可错位模板类
// 带有取消按钮的弹出框
let CancelAlert = function (data) {
  TitleAlert.call(this, data);
  this.cancel = data.cancel;
  this.cancelBtn = document.createElement('span');
  this.cancelBtn.className = 'cancel';
  this.cancelBtn.innerHTML = this.cancel || '取消';
};
// CancelAlert.prototype = new TitleAlert();
inheritPrototype(CancelAlert, TitleAlert);
CancelAlert.prototype.init = function () {
  TitleAlert.prototype.init.call(this);
  this.panel.appendChild(this.cancelBtn);
};
CancelAlert.prototype.bindEvent = function () {
  let _this = this;
  TitleAlert.prototype.bindEvent.call(this);
  this.cancelBtn.onclick = function () {
    _this.fail();
    _this.hide();
  };
};

// 创建一个提示框
new CancelAlert({
  title: '提示标题',
  content: '提示内容',
  success() {
    console.log('ok');
  },
  fail() {
    console.log('cancel');
  },
}).init();


/**
 * 创建多类导航
 */
// 格式化字符串方法
function formateString(str, data) {
  return str.replace(/\{#(\w+)#\}/g, (match, key) => {
    return typeof data[key] === undefined ? '' : data[key];
  });
}
// 基础导航
let Nav = function (data) {
  // 基础导航样式模板
  this.item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';
  // 创建字符串
  this.html = '';
  // 格式化数据
  for (let i = 0, len = data.length; i < len; i++) {
    this.html += formateString(this.item, data[i]);
  }
  return this.html;
};

// 带有消息提醒信息导航
let NumNav = function (data) {
  // 消息提醒信息组件模板
  let tpl = '<b>{#num#}</b>'
  // 装饰数据
  for (let i = 0, len = data.length; i < len; i++) {
    data[i].name += formateString(tpl, data[i]);
  }
  // 继承基础导航类，并返回字符串
  return Nav.call(this, data);
}

// 带有链接地址的导航
let LinkNav = function (data) {
  let tpl = '<span>{#link#}</span>';
  for (let i = 0, len = data.length; i < len; i++) {
    data[i].name += formateString(tpl, data[i]);
  }
  return Nav.call(this, data);
};

/**
 * 创建导航
 */
let nav = document.getElementById('content');
// 添加内容
nav.innerHTML = NumNav([
  {
    href: 'http://www.baidu.com/',
    title: '百度一下，你就知道',
    name: '百度',
    num: '10'
  },
  {
    href: 'http://www.taobao.com/',
    title: '淘宝商城',
    name: '淘宝',
    num: '2',
  },
  {
    href: 'http://www.qq.com/',
    title: '腾讯首页',
    name: '腾讯',
    num: '3',
  }
]);
