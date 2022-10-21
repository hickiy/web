
import { TableColumn } from 'element-ui';
import { phoneNumberFiter, idCardFiter } from '@/utils/reg';

export default {
  extends: TableColumn,
  name: TableColumn.name,
  props: {
    align: {
      type: String,
      default: 'center', // 默认居中展示
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true, // 默认单元格溢出使用tooltip展示
    },
    minWidth: {
      type: [Number, String], // 默认最小宽度100px
      default: 120
    },
    /* 是否身份证号 */
    isIdCard: {
      type: Boolean,
      default: false,
    },
    /* 是否手机号 */
    isPhoneNumber: {
      type: Boolean,
      default: false,
    }
  },
  created() {
    /* 此处通过column组件的renderCell函数对单元格实际渲染内容进行加工
     * 只对类型为default的culumn进行对应操作
     * 如果存在作用域插槽则跳过此步骤
     */
    const originRenderCell = this.columnConfig.renderCell;
    this.columnConfig.renderCell = (h, data) => {
      let cellVNode = originRenderCell(h, data);
      let children = cellVNode.children && cellVNode.children[0];
      let text = children && !children.tag ? children.text : null;
      if (text) {
        if (this.isIdCard) text = idCardFiter(text);
        if (this.isPhoneNumber) text = phoneNumberFiter(text);
        cellVNode.children[0] = h('span', text);
      }
      return cellVNode;
    }
  },
}
