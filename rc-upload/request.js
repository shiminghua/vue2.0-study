/**
 * request
 */

function getError(option, xhr) {
  const msg = `cannot post ${option.action}  ${xhr.status}`;
  const error = new Error(msg);
  error.status = xhr.status;
  error.method = 'post';
  error.url = option.action;
  return error;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  }
  catch (e) {
    return text;
  }
}

/**
 * 上传图片
 * @param {object} option 
// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  data: Object,
//  filename: String,
//  file: File,
//  withCredentials: Boolean,
//  action: String,
//  headers: Object,
// }
 */
function upload(option) {

  const xhr = new XMLHttpRequest();

  // 上传百分比
  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = Math.floor(e.loaded / e.total * 100);
      }
      option.onProgress(e);
    };
  }

  // 上传数据 FormData
  let formData = new FormData();
  if (option.data) {
    // 附加数据
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key]);
    });
  }
  // 上传的文件数据
  formData.append(option.filename, option.file);

  // 错误处理
  xhr.onerror = function error(err) {
    option.onError(err);
  }

  // 上传成功处理
  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  }

  // 打开上传
  xhr.open('post', option.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  // 是否携带cookies
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  // 设置请求头
  const headers = option.headers || {};

  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  // 开始上传
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };

}

export default upload;