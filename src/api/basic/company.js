import request from '@/utils/request'
export function list(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/company',
    method: 'get',
    params: queryParams,
  })
}

export function add(params) {
  return request({
    url: '/basicinfo-admin/api/v1/base/company',
    method: 'post',
    data: params,
  })
}

export function del(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/company/' + id,
    method: 'delete',
  })
}

export function detail(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/company/' + id,
    method: 'get',
  })
}

export function update(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/company/' + id,
    method: 'put',
    data: data,
  })
}

export function getEntrustSelectList() {
  return request({
    url: '/basicinfo-admin/api/v1/base/selectitem/selectListByUser',
    method: 'get',
  })
}
