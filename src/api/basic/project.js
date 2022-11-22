import request from '@/utils/request'
export function list(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/project',
    method: 'get',
    params: queryParams,
  })
}

export function add(params) {
  return request({
    url: '/basicinfo-admin/api/v1/base/project',
    method: 'post',
    data: params,
  })
}

export function del(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/project/' + id,
    method: 'delete',
  })
}

export function detail(pronum) {
  return request({
    url: '/basicinfo-admin/api/v1/base/project/bypronum/' + pronum,
    method: 'get',
  })
}

export function detailProjectInfoById(id) {
  return request({
    url: '/basicinfo-admin/api/v1/base/project/' + id,
    method: 'get',
  })
}

export function update(id, data) {
  return request({
    url: '/basicinfo-admin/api/v1/base/project/' + id,
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

export function getDeptUserTreeList() {
  return request({
    url: '/basicinfo-admin/api/v1/base/selectitem/userTreeListByUser',
    method: 'get',
  })
}

export function listProjects(queryParams) {
  return request({
    url: '/basicinfo-admin/api/v1/base/project/list',
    method: 'get',
    params: queryParams,
  })
}
