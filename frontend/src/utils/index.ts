import { Message, TableColumnData } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style/css.js'

export function useMessage() {
  return Message
}

export function withAlignCenter(columns: TableColumnData[]): TableColumnData[] {
  return columns.map((item) => Object.defineProperty(item, 'align', {
    value: 'center',
    enumerable: true
  }))
}