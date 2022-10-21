<template>
  <div class="w100 h100" @click.capture.stop="clickHandler($event)">
    <el-image v-if="this.src" fit="contain" ref="viewer" class="w100 h100" :src="src" :preview-src-list="previewSrcList"></el-image>
  </div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
const zipIcon = '/img/file-zip-fill.svg';
const IMAGE = 1,
  PDF = 2,
  ZIP = 3; // 1-image，2-pdf, 3-zip
export default {
  name: 'el-preview-file',
  props: {
    file: {
      type: [String, Object],
      required: true
    },
    previewSrcList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      src: '', // 视图url
      fileType: null
    };
  },
  created() {
    this.init();
  },
  watch: {
    file: {
      handler() {
        this.init();
      }
    }
  },
  methods: {
    init() {
      const pdfReg = /pdf$/i;
      const zipReg = /zip$/i;
      if (Object.prototype.toString.call(this.file) == '[object Object]') {
        const { fileSuffix, fileUrl, url, name, fileName } = this.file;
        if (pdfReg.test(fileSuffix) || pdfReg.test(fileName) || pdfReg.test(name) || pdfReg.test(fileUrl) || pdfReg.test(url)) {
          this.renderPdf(url || fileUrl);
          this.fileType = PDF;
        } else if (zipReg.test(fileSuffix) || zipReg.test(fileName) || zipReg.test(name) || zipReg.test(fileUrl) || zipReg.test(url)) {
          this.src = zipIcon;
          this.fileType = ZIP;
        } else {
          this.src = url || fileUrl;
          this.fileType = IMAGE;
        }
      } else if (typeof this.file == 'string') {
        if (pdfReg.test(this.file)) {
          this.renderPdf(this.file);
          this.fileType = PDF;
        } else if (zipReg.test(this.file)) {
          this.src = zipIcon;
          this.fileType = ZIP;
        } else {
          this.src = this.file;
          this.fileType = IMAGE;
        }
      }
    },
    clickHandler(ev) {
      if(!this.previewSrcList.length) return;
      if (this.fileType == PDF) {
        window.open(typeof this.file == 'string' ? this.file : this.file.url || this.file.fileUrl, '_plant');
      } else {
        this.$refs.viewer.clickHandler(ev);
      }
    },
    renderPdf(pdfPath) {
      // Will be using promises to load document, pages and misc data instead of
      // callback.
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
      const loadingTask = pdfjsLib.getDocument(pdfPath);
      loadingTask.promise
        .then(function (doc) {
          return doc.getPage(1);
        })
        .then((page) => {
          const scale = 1;
          const viewport = page.getViewport({ scale });
          const outputScale = window.devicePixelRatio || 1;
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = Math.floor(viewport.width) + 'px';
          canvas.style.height = Math.floor(viewport.height) + 'px';
          const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
          const renderContext = {
            canvasContext: context,
            transform,
            viewport
          };
          page.render(renderContext);
          window.setTimeout(() => {
            this.src = canvas.toDataURL();
          }, 1000);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tip {
  display: block;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #999;
}
</style>
