/**
 * 有序车站 - 职责链模式
 * 
 * 职责链模式（chain of responsibility）：解决请求的发送者与请求的接收者之间的耦合，通过职责链上的多个对象对分解请求流程，实现请求在多个对象之间的传递，知道最后一个对象完成请求的处理。
 */

// 第一站 - 请求模块
/**
 * 异步请求对象
 * 
 */
const sendData = function (data, dealType, dom) {
  let xhr = new XMLHttpRequest();
  let url = 'getData.php?mod=userInfo';
  xhr.onload = function (event) {
    // 请求成功
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      dealData(xhr.responseText, dealType, dom);
    }
    // 请求失败
    else {

    }
  };
  // 拼接请求字符串
  for (let i in data) {
    url += `&${i}=${data[i]}`;
  }
  // 发送异步请求
  xhr.open('get', url, true);
  xhr.send(null);
};

// 下一站 - 相应数据适配模块
/**
 * 处理响应数据
 * 
 */
const dealData = function (data, dealType, dom) {
  // 对象 toString 简化引用
  const dataType = Object.prototype.toString.call(data);
  // 判断相应数据处理对象
  switch (dealType) {
    // 输入框提示功能
    case 'sug':
      if (dataType === '[object Array]') {
        return createSug(data, dom);
      }
      // 将相应的对象数据转化为数组
      if (dataType === '[object Object]') {
        let newData = [];
        for (let i in data) {
          newData.push(data[i]);
          return createSug(newData, dom);
        }
      }
      return createSug([data], dom);
      break;
    case 'validate':
      return createValidateResult(data, dom);
      break;
  }
};

// 终点站 - 创建组件模块
/**
 * 创建提示框组件
 * 
 */
const createSug = function (data, dom) {
  let i = 0,
    len = data.length,
    html = '';
  // 拼接每一条提示语句
  for (; i < len; i++) {
    html += `<li>${data[i]}</li>`;
  }
  // 显示提示框
  dom.parentNode.getElementByTagName('ul')[0].innerHTML = html;
};
/**
 * 创建校验组件
 * 
 */
const createValidateResult = function (data, dom) {
  dom.parentNode.getElementByTagName('span')[0].innerHTML = data;
};
