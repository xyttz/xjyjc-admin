import request from '@/utils/request'

export function list(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/logaspect/logs',
    method: 'get',
    params: queryParams,
  })
}
