import { Message, TableColumnData } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style/css.js'
import { Response } from './types'

export function useMessage() {
  return Message
}

export function withAlignCenter(columns: TableColumnData[]): TableColumnData[] {
  return columns.map((item) => Object.defineProperty(item, 'align', {
    value: 'center',
    enumerable: true
  }))
}

export function mockAPIReturn(
  data?: unknown,
  msg?: string,
  status?: boolean
): Promise<Response> {
  return Promise.resolve({
    data: {
      data: data ?? null,
      msg: msg ?? '',
      status: status ?? true
    }
  })
}