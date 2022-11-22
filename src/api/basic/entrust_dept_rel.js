import request from '@/utils/request'
export function list(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/entrust/dpt/relation',
    method: 'get',
    params: queryParams,
  })
}

export function add(params) {
  return request({
    url: '/basicinfo-admin/api/v1/entrust/dpt/relation',
    method: 'post',
    data: params,
  })
}

export function del(id) {
  return request({
    url: '/basicinfo-admin/api/v1/entrust/dpt/relation/' + id,
    method: 'delete',
  })
}

export function detail(id) {
  return request({
    url: '/basicinfo-admin/api/v1/entrust/dpt/relation/' + id,
    method: 'get',
  })
}

export function update(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/entrust/dpt/relation/' + id,
    method: 'put',
    data: data,
  })
}

export function getEntrustSelectList() {
  return request({
    url: '/basicinfo-admin/api/v1/base/selectitem/entrustlist',
    method: 'get',
  })
}

export function listEntrustsByDept(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/entrust/dpt/relation/bydept',
    method: 'get',
    params: queryParams,
  })
}
