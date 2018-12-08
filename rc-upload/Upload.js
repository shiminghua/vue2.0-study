/**
 * Upload
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AjaxUploader from './AjaxUploader';
import IframeUploader from './IframeUploader';

// 空函数
function emptyFn() { }
function empty() { }
// 空对象
function emptyObj() {
  return Object.create(null);
}

class Upload extends Component {

  // static propTypes = {
  //   data: PropTypes.object,
  //   headers: PropTypes.object,
  //   name: PropTypes.string,
  //   forceAjax: PropTypes.bool,
  //   multipart: PropTypes.bool,
  //   onProgress: PropTypes.func,
  //   onStart: PropTypes.func,
  //   onError: PropTypes.func,
  //   onSuccess: PropTypes.func,
  //   multiple: PropTypes.bool,
  //   beforeUpload: PropTypes.func,
  //   withCredentials: PropTypes.bool,

  //   accept: PropTypes.string, // 接受上传的文件类型
  //   action: PropTypes.string.isRequired,
  // };

  // static defaultProps = {
  //   data: emptyObj(), // 其他要发布的数据对象;other data object to post
  //   /**
  //    * http headers to post, available in modern browsers
  //    * http标头在现代浏览器中可用。
  //    */
  //   headers: emptyObj(),
  //   name: 'file', // 发到后台的文件参数名。file param post to server
  //   action: '', // 上传地址
  //   /**
  //    * force to use ajax render. used for server render
  //    * 强制使用ajax呈现。用于服务器呈现。
  //    */
  //   forceAjax: false,
  //   multipart: false, // 是否支持多选文件，ie10+ 支持。
  //   onProgress: emptyFn, // 进度回调。progress callback, only for modern browsers
  //   onStart: emptyFn, // 开始上传文件。start upload file
  //   onError: emptyFn, // 错误回调.error callback
  //   onSuccess: emptyFn, // 成功回调。success callback
  //   multiple: false, // 是否支持多选文件，ie10+ 支持。
  //   /**
  //    * before upload check, return false or a rejected Promise will stop upload, 
  //    * only for modern browsers
  //    * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
  //    */
  //   beforeUpload: null,
  //   /**
  //    * ajax upload with cookie send
  //    * 上传请求时是否携带 cookie
  //    */
  //   withCredentials: false,
  // };

  static propTypes = {
    component: PropTypes.string,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    action: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    name: PropTypes.string,
    multipart: PropTypes.bool,
    directory: PropTypes.bool,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onProgress: PropTypes.func,
    onStart: PropTypes.func,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    headers: PropTypes.object,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    beforeUpload: PropTypes.func,
    customRequest: PropTypes.func,
    onReady: PropTypes.func,
    withCredentials: PropTypes.bool,
    supportServerRender: PropTypes.bool,
  }

  static defaultProps = {
    component: 'span',
    prefixCls: 'ant-upload',
    data: {},
    headers: {},
    name: 'file',
    multipart: false,
    onReady: empty,
    onStart: empty,
    onError: empty,
    onSuccess: empty,
    supportServerRender: false,
    multiple: false,
    beforeUpload: null,
    customRequest: null,
    withCredentials: false,
  }

  state = {
    Component: null,
  }

  componentDidMount() {
    if (this.props.supportServerRender) {
      /* eslint react/no-did-mount-set-state:0 */
      this.setState({
        Component: this.getComponent(),
      }, this.props.onReady);
    }
  }

  getComponent() {
    return typeof File !== 'undefined' ? AjaxUploader : IframeUploader;
  }

  abort(file) {
    this.uploader.abort(file);
  }

  saveUploader = (node) => {
    this.uploader = node;
  }

  render() {
    if (this.props.supportServerRender) {
      const ComponentUploader = this.state.Component;
      if (ComponentUploader) {
        return <ComponentUploader {...this.props} ref={this.saveUploader} />;
      }
      return null;
    }
    const ComponentUploader = this.getComponent();
    return <ComponentUploader {...this.props} ref={this.saveUploader} />
  }

}

export default Upload;