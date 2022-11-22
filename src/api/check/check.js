import request from '@/utils/request'

export function getByEntkey(entkey, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/check/' + entkey,
    method: 'get',
  })
}

export function checkSubmit(entkey, formParams, pathType, oprtype) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/check/update/' + entkey + '/' + oprtype,
    method: 'put',
    data: formParams,
  })
}
