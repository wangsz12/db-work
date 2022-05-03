import { ResponseData } from 'src/types';

export function trueReturn(data = null, msg = ''): ResponseData {
  return {
    data,
    msg,
    status: true,
  };
}

export function falseReturn(data = null, msg = ''): ResponseData {
  return {
    data,
    msg,
    status: false,
  };
}
