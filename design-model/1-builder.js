/**
 * 分即是合 - 建造者模式
 * 
 * 建造者模式（builder）：将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。
 */

 // 1. 在建造者模式中我们关心的是对象的创建过程
 // 2. 我们通常将创建对象的类模块化，这样是被创建的类的每一个模块都可以得到灵活的运用于高质量的复用。
 // 3. 我们最终的需求是得到一个完整的个体，因此在拆分创建的整个过程，我们将得到一个统一的结果。

// 创建一位人类
let Human = function (param) {
  // 技能
  this.skill = param && param.skill || '保密';
  // 兴趣爱好
  this.hobby = param && param.hobby || '保密';
};
// 人类原型方法
Human.prototype = {
  getSkill: function () {
    return this.skill;
  },
  getHobby: function () {
    return this.hobby;
  },
};

// 实例化姓名类
let Named = function (name) {
  let that = this;
  // 构造器
  // 构造函数解析姓名的姓与名
  (function (name, that) {
    that.wholeName = name;
    if (name.indexOf(' ') > -1) {
      that.firstName = name.slice(0, name.indexOf(' '));
      that.secondName = name.slice(name.indexOf(' '));
    }
  })(name, that);
};

// 实例化职位类
let Work = function (work) {
  let that = this;
  // 构造器
  // 构造函数中通过传入的职位特征来设置相应职位及描述
  (function (work, that) {
    switch (work) {
      case 'code':
        that.work = '工程师';
        that.workDescript = '每天沉醉于编程';
        break;
      case 'UI':
      case 'UE':
        that.work = '设计师';
        that.workDescript = '设计更似一种艺术';
        break;
      case 'teach':
        that.work = '教师';
        that.workDescript = '分享也是一种快乐';
        break;
      default:
        that.work = work;
        that.workDescript = '对不起，还没有您所选职位的描述';
        break;
    }
  })(work, that);
};
// 更换期望的职位
Work.prototype.changeWork = function (work) {
  this.work = work;
};
// 添加对职位的描述
Work.prototype.changeWorkDescript = function (setence) {
  this.workDescript = setence;
};

/**
 * 应聘者建造者
 * @param {name} string 姓名
 * @param {work} string 期望职位
 */
let Person = function (name, work) {
  // 创建应聘者缓存对象
  let _person = new Human();
  // 创建应聘者姓名解析对象
  _person.name = new Named(name);
  // 创建应聘者期望职位
  _person.work = new Work(work);
  // 返回
  return _person;
};

// 使用和测试
let person = new Person('xiao ming', 'code');

console.log(person.skill);
console.log(person.hobby);
console.log(person.name);
console.log(person.work);
person.work.changeWorkDescript('更改了描述');
console.log(person.work);
console.log(person.work.workDescript);
