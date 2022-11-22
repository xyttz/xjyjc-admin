import request from '@/utils/request'

export function getMenuTableList(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/menus',
    method: 'get',
    params: queryParams,
  })
}

export function getStandardTableList(libParas) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/datalist',
    method: 'get',
    params: libParas,
  })
}

export function getStandardColunmList(libParas) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/colunms',
    method: 'get',
    params: libParas,
  })
}

export function patch(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/' + id,
    method: 'patch',
    data: data,
  })
}

export function list(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard',
    method: 'get',
    params: queryParams,
  })
}

export function add(params) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard',
    method: 'post',
    data: params,
  })
}

export function update(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/' + id,
    method: 'put',
    data: data,
  })
}

// 指标
export function addStard(params) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/addStardard',
    method: 'post',
    data: params,
  })
}
export function updateStard(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/updateStardard/' + id,
    method: 'put',
    data: data,
  })
}
export function delStard(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/' + id,
    method: 'delete',
  })
}

export function detailStard(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/standard/detailStardard/' + id,
    method: 'get',
  })
}
