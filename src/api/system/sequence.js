import request from '@/utils/request'

export function nextval(name) {
  return request({
    url: '/entrust-admin/api/v1/sequence/nextval',
    method: 'get',
    params: { name: name },
  })
}
