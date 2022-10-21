
import { Upload } from 'element-ui';
import FileViewer from './upload-list.vue'
import compressImage from '@/utils/compressImg.js';

let timer = null;
let beforeUploadMsg = []

function handlerBeforeUpload(file) {
  if (this.uploadFiles.length < 2) return true;
  const fileList = this.uploadFiles.slice(0, this.uploadFiles.length - 1)
  // 当开始校验设置一个宏任务，在本次微任务循环结束执行，避免当多个文件验证不通过时，弹出多次验证弹窗问题
  if (!timer) {
    timer = window.setTimeout(() => {
      if (beforeUploadMsg.length) {
        this.$message.warning(beforeUploadMsg[0])
        beforeUploadMsg = [];
      }
      window.clearTimeout(timer)
      timer = null;
    }, 0)
  }
  let res = true;
  let regStr = `.(${this.accept.replace(/(,\s+)/g, '|').replace(/\./g, '')})$`;
  if (!new RegExp(regStr, 'i').test(file.name)) {
    beforeUploadMsg.push('文件类型不正确!')
    res = false;
  } else if (file.size > this.limitSize * 1024 * 1024) {
    beforeUploadMsg.push(`文件超过${this.limitSize}M!`)
    res = false;
  } else {
    let lastFile = fileList[fileList.length - 1];
    if (/.zip$/i.test(lastFile.name)) {
      beforeUploadMsg.push('zip件不能多传或混传')
      res = false;
    } else if (/.pdf$/i.test(lastFile.name)) {
      beforeUploadMsg.push('pdf文件不能多传或混传')
      res = false;
    } else {
      if (/.(pdf|zip)$/i.test(file.name)) {
        beforeUploadMsg.push('图片与其他类型文件不能混传')
        res = false;
      }
    }
  }
  return res;
}

function handlerOnSuccess(res, file, fileList) {
  let data = res.data;
  if (res.code == 200) {
    (file.fileName = data.name), (file.fileUrl = data.url), (file.limitSize = data.size), (file.fileSuffix = data.type);
    this.fileList.splice(0, this.fileList.length, ...fileList);
  } else {
    this.$message.error(res.msg || '文件上传失败，请重新上传');
  }
}
function handlerOnRemove(file) {
  let i = this.fileList.indexOf(file)
  if (i > -1) this.fileList.splice(i, 1);
}
function handlerOnExceed() {
  this.$message.warning(`最多上传${this.limit}个文件`);
}

function handlerOnError() {
  this.$message.error('文件上传失败');
}

// 自定义上传行为
function httpRequest(options) {

  function getError(action, option, xhr) {
    let msg;
    if (xhr.response) {
      msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
      msg = `${xhr.responseText}`;
    } else {
      msg = `fail to post ${action} ${xhr.status}`;
    }

    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
  }

  function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }

  function upload(option) {
    if (typeof XMLHttpRequest === 'undefined') {
      return;
    }

    const xhr = new XMLHttpRequest();
    const action = option.action;

    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        option.onProgress(e);
      };
    }

    const formData = new FormData();

    if (option.data) {
      Object.keys(option.data).forEach(key => {
        formData.append(key, option.data[key]);
      });
    }

    formData.append(option.filename, option.file, option.file.name);

    xhr.onerror = function error(e) {
      option.onError(e);
    };

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr));
      }

      option.onSuccess(getBody(xhr));
    };

    xhr.open('post', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    for (let item in headers) {
      // eslint-disable-next-line no-prototype-builtins
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }
    xhr.send(formData);
    return xhr;
  }
  if (/image\/.*/.test(options.file.type) && options.file.size > this.minQuality * 1024 * 1024) {
    compressImage(options.file, this.qualityScale, this.minWitdh).then(blob => {
      const file = new File([blob], options.file.name, { type: blob.type });
      options.file = file;
      return upload(options);
    }).catch(err => {
      this.$message.error(err)
    });
  } else {
    return upload(options)
  }

}


export default {
  name: 'ElUpload',
  extends: Upload,
  components: { FileViewer },
  props: {
    // 扩展属性 提供默认的文件校验
    limitSize: {
      type: Number,
      default: 100,
    },
    // 扩展属性 质量压缩比例 0.1-1之间的小数 仅上传图片时有效
    qualityScale: {
      type: Number,
      default: 0.8,
    },
    // 扩展属性 最小质量 单位MB 小于minQuality不进行压缩（质量、尺寸） 仅上传图片时有效
    minQuality: {
      type: Number,
      default: 1,
    },
    // 扩展属性 最小尺寸  小于minWitdh不进行尺寸压缩  仅上传图片时有效
    minWitdh: {
      type: Number,
      default: 800,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    beforeUpload: {
      default() {
        return handlerBeforeUpload.bind(this)
      }
    },
    onSuccess: {
      default() {
        return handlerOnSuccess.bind(this)
      }
    },
    onRemove: {
      default() {
        return handlerOnRemove.bind(this)
      }
    },
    onExceed: {
      default() {
        return handlerOnExceed.bind(this)
      }
    },
    onError: {
      default() {
        return handlerOnError.bind(this)
      }
    },
    httpRequest: {
      default() {
        return httpRequest.bind(this)
      }
    }
  },
  render(h) {
    this.$scopedSlots.file = (props) => {
      return h(FileViewer, {
        props: { ...props, uploadFiles: this.uploadFiles, onPriview: this.OnPreview, fileUpload: this.reupload },
        on: {
          remove: (file) => {
            let i = this.uploadFiles.indexOf(file)
            if (i > -1) this.uploadFiles.splice(i, 1);
            this.onRemove(file, this.uploadFiles);
          },
        },
      })
    }
    return Upload.render.call(this, h)
  },
  methods: {
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      file.status = 'fail';
      this.onError(err, file, this.uploadFiles);
    },
    reupload(file) {
      file.status = 'ready';
      this.submit();
    }
  }
};


