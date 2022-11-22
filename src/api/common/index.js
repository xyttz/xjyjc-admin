import request from '@/utils/request'
export function getPhraseWord() {
  return request({
    url: '/youlai-admin/api/v1/index/phrasewords',
    method: 'get',
  })
}

export function getUpgradeInfos() {
  return request({
    url: '/youlai-admin/api/v1/index/upgrade',
    method: 'get',
  })
}
