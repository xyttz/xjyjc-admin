import request from '@/utils/request'

export function getList(params) {
  return request({
    // url: '/router/getList',
    url: '/youlai-admin/api/v1/menus/route',
    method: 'get',
    params,
  })
}
