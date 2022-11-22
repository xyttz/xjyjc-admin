import request from '@/utils/request'
export function list(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/entrust',
    method: 'get',
    params: queryParams,
  })
}

export function add(params) {
  return request({
    url: '/basicinfo-admin/api/v1/base/entrust',
    method: 'post',
    data: params,
  })
}

export function del(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/entrust/' + id,
    method: 'delete',
  })
}

export function detail(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/entrust/' + id,
    method: 'get',
  })
}

export function update(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/entrust/' + id,
    method: 'put',
    data: data,
  })
}
