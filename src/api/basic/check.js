import request from '@/utils/request'
export function getMenuTableList(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check',
    method: 'get',
    params: queryParams,
  })
}

export function getItemClassOptions() {
  return request({
    url: '/youlai-admin/api/v1/dict-items',
    method: 'get',
    params: { dictCode: 'unit_type' },
  })
}

export function getCheckItemList(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/itemlist',
    method: 'get',
    params: queryParams,
  })
}

export function add(params) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check',
    method: 'post',
    data: params,
  })
}

export function del(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/' + id,
    method: 'delete',
  })
}

export function detail(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/' + id,
    method: 'get',
  })
}

export function update(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/' + id,
    method: 'put',
    data: data,
  })
}

export function patch(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/' + id,
    method: 'patch',
    data: data,
  })
}

// 项目列表 begin
export function addItem(params) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/itemlist',
    method: 'post',
    data: params,
  })
}
export function updateItem(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/updateItem/' + id,
    method: 'put',
    data: data,
  })
}
export function delItem(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/delItem/' + id,
    method: 'delete',
  })
}

export function patchItem(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/patchItem/' + id,
    method: 'patch',
    data: data,
  })
}

// 委托单需要的数据
export function getEntrustCheckItemList(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/checklist',
    method: 'get',
    params: queryParams,
  })
}
export function getTableListNoPagination(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/checkclassnopagination',
    method: 'get',
    params: queryParams,
  })
}
export function getCheckItemListNoPagination(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/check/checkitemnopagination',
    method: 'get',
    params: queryParams,
  })
}
