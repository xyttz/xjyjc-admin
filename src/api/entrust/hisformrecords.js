import request from '@/utils/request'
export function hislist(type, code) {
  return request({
    url: '/entrust-admin/api/v1/history/form',
    method: 'get',
    params: { type: type, code: code },
  })
}
