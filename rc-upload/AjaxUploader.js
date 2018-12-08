/**
 * AjaxUploader
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import defaultRequest from './request';
import getUid from './uid';
import attrAccept from './attr-accept';
import traverseFileTree from './traverseFileTree';


class AjaxUploader extends Component {

  static propTypes = {
    name: PropTypes.string, // file param post to server; default 'file'
    style: PropTypes.object, // root component inline style
    className: PropTypes.string, // root component className
    disabled: PropTypes.bool, // whether disabled; default false
    component: PropTypes.string, // default 'span'
    supportServerRender: PropTypes.bool, // whether to support server render; default false
    onReady: PropTypes.func, // only call when supportServerRender is true, upload is rendered completely
    action: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]), // form action url
    directory: PropTypes.bool, // support upload whole directory; default false
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]), // other data object to post or a function which returns a data object
    headers: PropTypes.object, // http headers to post, available in modern browsers; default {}
    accept: PropTypes.string, // input accept attribute
    multiple: PropTypes.bool, // only support ie10+
    onStart: PropTypes.func, // start upload
    onError: PropTypes.func, // error callback
    onSuccess: PropTypes.func, // success callback
    onProgress: PropTypes.func, // progress callback, only for modern browsers
    beforeUpload: PropTypes.func, // before upload check, return false or a rejected Promise will stop upload, only for modern browsers; default null
    customRequest: PropTypes.func, // provide an orerride for the default xhr behavior for additional customization; default null
    withCredentials: PropTypes.bool, // ajax upload with cookie send; default false

    prefixCls: PropTypes.string,
    children: PropTypes.any,
  };

  state = {
    uid: getUid(),
  };

  reqs = {};

  onChange = (e) => {
    const files = e.target.files;
    this.uploadFiles(files);
    this.reset();
  };

  onClick = () => {
    const el = this.fileInput;
    if (!el) {
      return;
    }
    el.click();
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.onClick();
    }
  };

  onFileDrop = e => {
    e.preventDefault();

    if (e.type === 'dragover') {
      return;
    }

    if (this.props.directory) {
      traverseFileTree(
        e.dataTransfer.items,
        this.uploadFiles,
        _file => attrAccept(_file, this.props.accept)
      );
    }
    else {
      const files = Array.prototype.slice.call(e.dataTransfer.files).filter(file => {
        attrAccept(file, this.props.accept);
      });
      this.uploadFiles(files);
    }

  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.abort();
  }

  uploadFiles = files => {
    const postFiles = Array.prototype.slice.call(files);
    postFiles.forEach(file => {
      file.uid = getUid();
      this.upload(file, postFiles);
    });
  };

  upload(file, fileList) {

    const { beforeUpload } = this.props;
    if (!beforeUpload) {
      // always async in case use react state to keep fileList
      return setTimeout(() => this.post(file), 0);
    }

    const before = beforeUpload(file, fileList);
    if (before && before.then) {
      before.then(processedFile => {
        const processedFileType = Object.prototype.toString.call(processedFile);
        if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
          return this.post(processedFile);
        }
        return this.post(file);
      }).catch(e => {
        console && console.log(e); // eslint-disable-line
      });
    }
    else if (before !== false) {
      setTimeout(() => this.post(file), 0);
    }
  }

  post(file) {
    if (!this._isMounted) {
      return;
    }

    const { onStart, onProgress, onSuccess, onError, action, customRequest, name, headers, withCredentials } = this.props;
    const propsData = this.props.data;
    let data;
    if (typeof propsData === 'function') {
      data = propsData(file);
    }
    else {
      data = propsData;
    }

    new Promise(resolve => {
      if (typeof action === 'function') {
        return resolve(action(file));
      }
      resolve(action);
    }).then(action => {
      const { uid } = file;
      const request = customRequest || defaultRequest;
      this.reqs[uid] = request({
        action,
        filename: name,
        file,
        data,
        headers,
        withCredentials,
        onProgress: onProgress ? e => {
          onProgress(e, file);
        } : null,
        onSuccess: (ret, xhr) => {
          delete this.reqs[uid];
          onSuccess(ret, file, xhr);
        },
        onError: (err, ret) => {
          delete this.reqs[uid];
          onError(err, ret, file);
        },
      });
      onStart(file);
    });

  }

  reset() {
    this.setState({
      uid: getUid(),
    });
  }

  abort(file) {
    const reqs = this.reqs;
    if (file) {
      let uid = file;
      if (file && file.uid) {
        uid = file.uid;
      }
      if (reqs[uid]) {
        reqs[uid].abort();
        delete reqs[uid];
      }
    }
    else {
      Object.keys(reqs).forEach(uid => {
        if (reqs[uid]) {
          reqs[uid].abort();
        }

        delete reqs[uid];
      });
    }
  }

  saveFileInput = (node) => {
    this.fileInput = node;
  };

  render() {

    const {
      component: Tag,
      prefixCls,
      className,
      disabled,
      style,
      multiple,
      accept,
      children,
      directory,
    } = this.props;

    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [className]: className,
    });

    const events = disabled ? {} : {
      onClick: this.onClick,
      onKeyDown: this.onKeyDown,
      onDrop: this.onFileDrop,
      onDragOver: this.onFileDrop,
      tabIndex: '0',
    };

    return (
      <Tag
        {...events}
        className={cls}
        role='button'
        style={style}
      >
        <input
          type='file'
          ref={this.saveFileInput}
          key={this.state.uid}
          style={{ display: 'none' }}
          accept={accept}
          directory={directory ? 'directory' : null}
          webkitdirectory={directory ? 'webkitdirectory' : null}
          multiple={multiple}
          onChange={this.onChange}
        />
        {children}
      </Tag>
    );

  }

}

export default AjaxUploader;
