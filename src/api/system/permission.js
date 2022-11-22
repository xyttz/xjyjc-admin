import request from '@/utils/request'

export function getPermissionPageList(queryParams) {
  return request({
    url: '/youlai-admin/api/v1/permissions/page',
    method: 'get',
    params: queryParams,
  })
}

export function getPermissionList(queryParams) {
  return request({
    url: '/youlai-admin/api/v1/permissions',
    method: 'get',
    params: queryParams,
  })
}

export function detail(id) {
  return request({
    url: '/youlai-admin/api/v1/permissions/' + id,
    method: 'get',
  })
}

export function add(data) {
  return request({
    url: '/youlai-admin/api/v1/permissions',
    method: 'post',
    data: data,
  })
}

export function update(id, data) {
  return request({
    url: '/youlai-admin/api/v1/permissions/' + id,
    method: 'put',
    data: data,
  })
}

export function del(ids) {
  return request({
    url: '/youlai-admin/api/v1/permissions/' + ids,
    method: 'delete',
  })
}

export function patch(id, data) {
  return request({
    url: '/youlai-admin/api/v1/permissions/' + id,
    method: 'patch',
    data: data,
  })
}
