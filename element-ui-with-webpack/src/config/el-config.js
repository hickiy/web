import TableColumn from './el-table-column';
import PreviewFile from './el-preview-file.vue';
import Upload from './el-upload.js'

export default {
  install(Vue) {
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(PreviewFile.name, PreviewFile);
    Vue.component(Upload.name, Upload);
  }
}
